/// <reference path="../bower_components/polymer-ts/polymer-ts.d.ts"/>

@component('now-basic-app-layout')
class BasicAppLayout extends polymer.Base {

	@property({type:String})
	prop1: string;
}

BasicAppLayout.register();
