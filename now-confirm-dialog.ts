namespace NowElements {

	/**
	 * Confirmation dialog for use in Red Pill Now apps
	 *
	 * @author Keith Strickland
	 */
	@component('now-confirm-dialog')
	export class NowConfirmDialog extends NowElements.BaseElement {

		/**
		 * The title of the dialog
		 * @type {String}
		 */
		@property({
			type: String
		})
		dialogTitle: string
		/**
		 * The text of the dialog
		 * @type {String}
		 */
		@property({
			type: String
		})
		dialogText: string
		/**
		 * The text which shows in the confirm button
		 * @type {String}
		 */
		@property({
			type: String,
			value: 'OK'
		})
		confirmButtonText: string;
		/**
		 * The text which shows in the cancel button
		 * @type {Stromg}
		 */
		@property({
			type: String,
			value: 'Cancel'
		})
		cancelButtonText: string;
		/**
		 * The hex color of the confirm button background
		 * @type {String}
		 */
		@property({
			type: String,
			observer: '_onConfirmBackgroundChange'
		})
		confirmButtonBackground: string;
		/**
		 * The hex color of the confirm button text
		 * @type {String}
		 */
		@property({
			type: String,
			observer: '_onConfirmColorChange'
		})
		confirmButtonColor: string;
		/**
		 * The hex color of the cancel button background
		 * @type {String}
		 */
		@property({
			type: String,
			observer: '_onCancelBackgroundChange'
		})
		cancelButtonBackground: string;
		/**
		 * The hex color of the cancel button text
		 * @type {String}
		 */
		@property({
			type: String,
			observer: '_onCancelColorChange'
		})
		cancelButtonColor: string;
		/**
		 * True if there should be no cancel button
		 * @type {Boolean}
		 */
		@property({
			type: Boolean,
			value: false,
			reflectToAttribute: true
		})
		noCancelButton: boolean;
		/**
		 * The callback function to run if the dialog is cancelled
		 * @type {Function}
		 */
		@property({
			type: Function
		})
		_cancelCallback: any;
		/**
		 * The callback function to run if the dialog is confirmed
		 * @type {Function}
		 */
		@property({
			type: Function
		})
		_confirmCallback: any;
		/**
		 * Define this property to move this element when opened into the element
		 * with the provided selector. This is to ensure that the overlay
		 * does not appear over the dialog.
		 */
		@property({
			type: String
		})
		targetMoveCssSelector: string;

		/**
		 * Fired when the dialog closes. Fires dig-confirm-canceled and dig-confirm-confirmed. Also
		 * runs any cancelCallback or confirmCallback methods
		 * @param  {Event} evt    The event object
		 * @param  {Object} detail The detail object
		 */
		@listen('dialog.iron-overlay-closed')
		_onDialogClosed(evt, detail) {
			if (!detail.confirmed) {
				if (this._cancelCallback) {
					this._cancelCallback.call(this);
				}
				this.fire('dig-confirm-canceled');
			}else if (detail.confirmed) {
				if (this._confirmCallback) {
					this._confirmCallback.call(this);
				}
				this.fire('dig-confirm-confirmed');
			}
		}
		/**
		 * Fired when the confirmButtonBackground changes. Sets the custom style variable --confirm-button-background
		 * @param  {String} newVal The new color
		 * @param  {String} oldVal The old color
		 */
		_onConfirmBackgroundChange(newVal, oldVal) {
			if (newVal) {
				this.customStyle['--now-confirm-dialog-confirm-button-background'] = newVal;
				this.updateStyles();
			}
		}
		/**
		 * Fired when the confirmButtonColor changes. Sets the custom style variable --confirm-button-color
		 * @param  {String} newVal The new color
		 * @param  {String} oldVal The old color
		 */
		_onConfirmColorChange(newVal, oldVal) {
			if (newVal) {
				this.customStyle['--now-confirm-dialog-conform-button-color'] = newVal;
				this.updateStyles();
			}
		}
		/**
		 * Fired when the cancelButtonBackground changes. Sets the custom style variable --cancel-button-background
		 * @param  {String} newVal The new color
		 * @param  {String} oldVal The old color
		 */
		_onCancelBackgroundChange(newVal, oldVal) {
			if (newVal) {
				this.customStyle['--now-confirm-dialog-cancel-button-background'] = newVal;
				this.updateStyles();
			}
		}
		/**
		 * Fired when the cancelButtonColor changes. Sets the custom style variable --cancel-button-color
		 * @param  {String} newVal The new color
		 * @param  {String} oldVal The old color
		 * @return {[type]}        [description]
		 */
		_onCancelColorChange(newVal, oldVal) {
			if (newVal) {
				this.customStyle['--now-confirm-dialog-cancel-button-color'] = newVal;
				this.updateStyles();
			}
		}
		/**
		 * Opens the dialog and sets the cancel and confirm callbacks
		 * @param  {Function} confirmCallback Function to run when the dialog is confirmed
		 * @param  {Function} cancelCallback  Function to run when the dialog is cancelled
		 */
		open(confirmCallback, cancelCallback) {
			// WARNING!!! TODO:
			// Moving this as a child of a top level element, outside of the app-*-layout element
			// is to fix this bug https://github.com/PolymerElements/paper-dialog/issues/7
			// which is kind of ridiculus for a production ready platform.
			// Luckily there really is no data binding with this component or that too
			// would be broken.
			if (this.targetMoveCssSelector) {
				let elem = document.querySelector(this.targetMoveCssSelector);
				if (elem) {
					elem.appendChild(this);
				}
			}
			this.$.dialog.open();
			if (cancelCallback) {
				this._cancelCallback = cancelCallback;
			}
			if (confirmCallback) {
				this._confirmCallback = confirmCallback;
			}
		}
		/**
		 * Closes the dialog. Will cause the cancel callback to be run
		 * in the iron-overlay-closed event handler
		 */
		close() {
			this.$.dialog.close();
			if (this.targetMoveCssSelector) {
				let movedDialog = document.querySelector(this.targetMoveCssSelector + ' > now-confirm-dialog');
				if (movedDialog) {
					movedDialog.parentNode.removeChild(movedDialog);
				}
			}
		}
	}
}

NowElements.NowConfirmDialog.register();
