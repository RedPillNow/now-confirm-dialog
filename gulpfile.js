/*
 Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

'use strict';

// Include promise polyfill for node 0.10 compatibility
require('es6-promise').polyfill();

// Include Gulp & tools we'll use
var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var merge = require('merge-stream');
var path = require('path');
var fs = require('fs');
var glob = require('glob-all');
var historyApiFallback = require('connect-history-api-fallback');
var packageJson = require('./package.json');
var crypto = require('crypto');
var ensureFiles = require('./gulp-tasks/ensure-files.js');
var url = require('url');
var proxy = require('proxy-middleware');
var replace = require('gulp-replace');
var plumber = require('gulp-plumber');
var gulpIf = require('gulp-if');
var size = require('gulp-size');
var minifyHtml = require('gulp-minify-html');
var htmlmin = require('gulp-htmlmin');
var minifyCss = require('gulp-minify-css');
var useref = require('gulp-useref');
var vulcanize = require('gulp-vulcanize');
var changed = require('gulp-changed');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
//var polylint = require('gulp-polylint');

// TypeScript support
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

var AUTOPREFIXER_BROWSERS = [
	'ie >= 10',
	'ie_mob >= 10',
	'ff >= 30',
	'chrome >= 34',
	'safari >= 7',
	'opera >= 23',
	'ios >= 7',
	'android >= 4.4',
	'bb >= 10'
];

var DIST = 'dist';

var dist = function(subpath) {
	return !subpath ? DIST : path.join(DIST, subpath);
};

/**
 *  Standard error handler, for use with the plumber plugin or on() function.
 */
function handleError(error) {
	console.log("Error (ending current task):", error.message);
	this.emit("end"); //End function
	process.exit(1);
}

var styleTask = function(stylesPath, srcs) {
	return gulp.src(srcs.map(function(src) {
		return path.join('src', stylesPath, src);
	}))
		.pipe(plumber({errorHandler: handleError}))
		.pipe(changed(stylesPath, {extension: '.css'}))
		.pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
		.pipe(gulp.dest('.tmp/' + stylesPath))
		.pipe(minifyCss())
		.pipe(gulp.dest(dist(stylesPath)))
		.pipe(size({title: stylesPath}));
};

var imageOptimizeTask = function(src, dest) {
	return gulp.src(src)
		.pipe(plumber({errorHandler: handleError}))
		.pipe(imagemin({
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest(dest))
		.pipe(size({title: 'images'}));
};

var optimizeHtmlTask = function(src, dest) {
	var assets = useref.assets({
		searchPath: ['.tmp', 'src']
	});

	return gulp.src(src)
		.pipe(plumber({errorHandler: handleError}))
		.pipe(assets)
		// Concatenate and minify JavaScript
		.pipe(gulpIf('*.js', uglify({
			preserveComments: 'some'
		})))
		// Concatenate and minify styles
		// In case you are still using useref build blocks
		.pipe(gulpIf('*.css', minifyCss()))
		.pipe(assets.restore())
		.pipe(useref())
		// Minify any HTML
		.pipe(gulpIf('*.html', minifyHtml({
			quotes: true,
			empty: true,
			spare: true
		})))
		// Output files
		.pipe(gulp.dest(dest))
		.pipe(size({
			title: 'html'
		}));
};

gulp.task('typescript', function() {
	var destDir = 'src';

	return gulp.src(['src/**/*.ts', '!src/bower_components/**/*'])
		.pipe(plumber({errorHandler: handleError}))
		.pipe(sourcemaps.init())
		.pipe(ts(tsProject))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(destDir));
});

// gulp.task('polylint', function() {
// 	return gulp.src(['src/elements/**/*.html', '!src/elements/elements.html'])
// 		.pipe(plumber({errorHandler: handleError}))
// 		.pipe(polylint())
// 		.pipe(polylint.reporter(polylint.reporter.stylishlike))
// 		.pipe(polylint.reporter.fail({ buffer: true, ignoreWarnings: false }));
// });

// Compile and automatically prefix stylesheets
gulp.task('styles', function() {
	return styleTask('styles', ['**/*.css']);
});

// Ensure that we are not missing required files for the project
// "dot" files are specifically tricky due to them being hidden on
// some systems.
gulp.task('ensureFiles', function(cb) {
	var requiredFiles = ['.bowerrc'];

	ensureFiles(requiredFiles.map(function(p) {
		return path.join(__dirname, p);
	}), cb);
});

// Optimize images
gulp.task('images', function() {
	return imageOptimizeTask('src/images/**/*', dist('images'));
});

// Copy all files at the root level (src)
gulp.task('copy', function() {
	var src = gulp.src([
		'src/*',
		'src/**/images/*',
		'src/**/styles/*',
		'!src/demo',
		'!src/test',
		'!src/bower_components',
		'!**/.DS_Store'
	], {
		dot: true
	}).pipe(gulp.dest(dist()));

	// Copy over only the bower_components we need
	// These are things which cannot be vulcanized
	var bower = gulp.src([
		'src/bower_components/{webcomponentsjs,platinum-sw,sw-toolbox,promise-polyfill}/**/*'
	]).pipe(plumber({errorHandler: handleError}))
		.pipe(gulp.dest(dist('bower_components')));

	return merge(src, bower)
		.pipe(size({
			title: 'copy'
		}));
});

// Copy web fonts to dist
gulp.task('fonts', function() {
	return gulp.src(['src/fonts/**'])
		.pipe(plumber({errorHandler: handleError}))
		.pipe(gulp.dest(dist('fonts')))
		.pipe(size({
			title: 'fonts'
		}));
});

// Scan your HTML for assets & optimize them
gulp.task('html', function() {
	return optimizeHtmlTask(
		['src/**/*.html', '!src/{elements,test,bower_components}/**/*.html'],
		dist());
});

gulp.task("install-typings", function() {
	return gulp.src("./typings.json")
		.pipe(gulpTypings());
});

// Clean output directory
gulp.task('clean', function() {
	return del(['.tmp', dist(), 'src/{test,elements}/**/*.{js,map}']);
});

// Watch files for changes & reload
gulp.task('serve', ['styles', 'typescript'], function() {

	browserSync({
		port: 5000,
		notify: false,
		logPrefix: 'PSK',
		snippetOptions: {
			rule: {
				match: '<span id="browser-sync-binding"></span>',
				fn: function(snippet) {
					return snippet;
				}
			}
		},
		// Run as an https by uncommenting 'https: true'
		// Note: this uses an unsigned certificate which on first access
		//       will present a certificate warning in the browser.
		// https: true,
		server: {
			baseDir: ['.tmp', '.'],
			index: 'index.html',
			directory: true,
			middleware: [historyApiFallback()]
		}
	});

	gulp.watch(['*.html'], [reload]);
	gulp.watch(['src/**/*.html'], ['typescript', reload]);
	gulp.watch(['src/styles/**/*.css'], ['styles', reload]);
	gulp.watch(['src/**/*.ts'], ['typescript', reload]);
	gulp.watch(['src/images/**/*'], reload);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function() {
	browserSync({
		port: 5001,
		notify: false,
		logPrefix: 'PSK',
		snippetOptions: {
			rule: {
				match: '<span id="browser-sync-binding"></span>',
				fn: function(snippet) {
					return snippet;
				}
			}
		},
		// Run as an https by uncommenting 'https: true'
		// Note: this uses an unsigned certificate which on first access
		//       will present a certificate warning in the browser.
		// https: true,
		server: dist(),
		middleware: [historyApiFallback()]
	});
});

// Serve + tests
gulp.task('serve:tests', function(cb) {
	runSequence(
		'serve',
		'wct',
		cb);
});

// Serve:dist + tests
gulp.task('serve:dist:tests', function(cb) {
	runSequence(
		'serve:dist',
		'wct',
		cb);
});

// Build production files, the default task
gulp.task('default', ['clean'], function(cb) {
	// Uncomment 'cache-config' if you are going to use service workers.
	runSequence(
		['ensureFiles', 'copy', 'styles'],
		['typescript'],
		['images', 'fonts', 'html'],
		cb);
});

// Load tasks for web-component-tester
// Adds tasks for `gulp test:local` and `gulp test:remote`
require('web-component-tester').gulp.init(gulp);

// Load custom tasks from the `tasks` directory
try {
	require('require-dir')('tasks');
} catch (err) {
	// Do nothing
}
