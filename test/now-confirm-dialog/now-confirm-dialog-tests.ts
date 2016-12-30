/* No TS definitions for WebComponentTester, so use declare. */
 declare var fixture;
 declare var flush;
 declare var stub;

/**
 * Tests for now-confirm-dialog.
 */
describe('now-confirm-dialog tests', function () {
	let element: NowElements.NowConfirmDialog;

	before(function () {
		element = fixture('now-confirm-dialog');
	});

	after(function () {
	});

	beforeEach(function () {
	});

	afterEach(function () {
	});

	it('should be instantiated', function() {
		chai.expect(element.is).equals('now-confirm-dialog');
	});

	it('should register as opened when opened and NOT opened when closed', function () {
		element.open(null, null);
		let dialog = <any> Polymer.dom(element.root).querySelector('paper-dialog');
		chai.expect(dialog.opened).to.be.true;
		element.close();
		chai.expect(dialog.opened).to.be.false;
	});

	it('should hide the cancel button if noCancelButton is true', function () {
		element.open(null, null);
		let cancelButton = Polymer.dom(element.root).querySelector('.cancelButton');
		element.noCancelButton = true;
		chai.expect(cancelButton.hasAttribute('hidden')).to.be.true;
		element.noCancelButton = false;
		element.close();
	});

	it('should set the cancel and confirm callbacks', function (done) {
		let confirmCallback = function () { console.log('confirm callback') };
		let cancelCallback = function () { console.log('cancel callback') };
		element.open(confirmCallback, cancelCallback);
		chai.expect(element._confirmCallback).to.be.ok;
		chai.expect(element._cancelCallback).to.be.ok;
		let confirmButton = <any> Polymer.dom(element.root).querySelector('.confirmButton');
		confirmButton.click();
		element.close();
		done();
	});
});

describe('now-confirm-dialog tests', function () {
	let element: NowElements.NowConfirmDialog;

	before(function () {
		element = fixture('now-confirm-dialog-dynamic');
	});

	after(function () {
	});

	beforeEach(function () {
	});

	afterEach(function () {
	});

	it('should be instantiated', function () {
		chai.expect(element.is).equals('now-confirm-dialog');
	});

	it('should have custom background and colors defined for cancel and confirm buttons', function () {
		chai.expect(element.customStyle['--now-confirm-dialog-confirm-button-background']).equals('purple');
		chai.expect(element.customStyle['--now-confirm-dialog-conform-button-color']).equals('black');
		chai.expect(element.customStyle['--now-confirm-dialog-cancel-button-background']).equals('pink');
		chai.expect(element.customStyle['--now-confirm-dialog-cancel-button-color']).equals('black');
	});

	it('should have dynamic text and title', function () {
		element.dialogText = 'This is custom text';
		element.dialogTitle = 'Custom Title';
		element.open(null, null);
		let title = <any> Polymer.dom(element.root).querySelector('h2');
		let text = <any> Polymer.dom(element.root).querySelector('.dialogText');
		chai.expect(title.innerText.indexOf('Custom Title')).is.greaterThan(-1);
		chai.expect(text.innerText.indexOf('This is custom text')).is.greaterThan(-1);
		element.close();
	});

	it('should have custom text for the confirm and cancel buttons', function () {
		let cancelButton = <any> Polymer.dom(element.root).querySelector('.cancelButton');
		let confirmButton = <any> Polymer.dom(element.root).querySelector('.confirmButton');
		element.confirmButtonText = 'YUP';
		element.cancelButtonText = 'NOPE';
		chai.expect(cancelButton.innerText.indexOf('NOPE')).is.greaterThan(-1);
		chai.expect(confirmButton.innerText.indexOf('YUP')).is.greaterThan(-1);
	});
});
