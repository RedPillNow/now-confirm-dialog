namespace NowElements {
	/**
	 * Type representing details expected when firing a Zion.EventHelpers.open_confirm event.
	 * Steps for opening a dialog:
	 */
	export type ConfirmDialogConfig = {
		dialogTitle: string;
		dialogText: string;
		confirmButtonText?: string;
		cancelButtonText?: string;
		confirmCallback?: any;
		cancelCallback?: any;
		confirmButtonBackground?: string;
		confirmButtonColor?: string;
		cancelButtonBackground?: string;
		noCancelButton?: boolean;
	};

	/**
	 * Confirmation dialog for use in Red Pill Now apps
	 *
	 * @author Keith Strickland
	 */
	export class NowConfirmDialog extends Polymer.Element {
		static get is() { return 'now-confirm-dialog'; }
		static get properties() {
			return {
				dialogTitle: String,
				dialogText: {
					type: String,
					observer: '_onDialogTextChange'
				},
				confirmButtonText: {
					type: String,
					value: 'OK'
				},
				cancelButtonText: {
					type: String,
					value: 'Cancel'
				},
				confirmButtonBackground: {
					type: String,
					observer: '_onConfirmBackgroundChange'
				},
				confirmButtonColor: {
					type: String,
					observer: '_onConfirmColorChange'
				},
				cancelButtonBackground: {
					type: String,
					observer: '_onCancelBackgroundChange'
				},
				cancelButtonColor: {
					type: String,
					observer: '_onCancelColorChange'
				},
				noCancelButton: {
					type: Boolean,
					value: false,
					reflectToAttribute: true
				},
				_cancelCallback: Function,
				_confirmCallback: Function,
				targetMoveCssSelector: String,
			};
		}
		get is() {
			return NowConfirmDialog.is;
		}

		_closeDialogListener: any;
		connectedCallback() {
			super.connectedCallback();
			this._closeDialogListener = this._onDialogClosed.bind(this);
			this.$.dialog.addEventListener('iron-overlay-closed', this._closeDialogListener);
		}
		disconnectedCallback() {
			this.$.dialog.removeEventListener('iron-overlay-closed', this._closeDialogListener);
		}
		/**
		 * Fired when the dialogText property changes
		 * @private
		 * @param {string} dialogText
		 */
		private _onDialogTextChange(dialogText) {
			if (dialogText.indexOf('\n') > -1) {
				this.$.dialogText.classList.toggle('preText', true);
			} else {
				this.$.dialogText.classList.toggle('preText', false);
			}
		}
		/**
		 * Fired when the dialog closes. Fires dig-confirm-canceled and dig-confirm-confirmed. Also
		 * runs any cancelCallback or confirmCallback methods
		 * @param  {Event} evt    The event object
		 * @param  {Object} detail The detail object
		 * @listens #dialog.iron-overlay-closed
		 */
		private _onDialogClosed(evt: CustomEvent) {
			let detail = evt.detail;
			if (!detail.confirmed) {
				if (this.get('_cancelCallback')) {
					this.get('_cancelCallback').call(this);
				}
				let evt = new CustomEvent('now-confirm-canceled');
				this.dispatchEvent(evt);
			}else if (detail.confirmed) {
				if (this.get('_confirmCallback')) {
					this.get('_confirmCallback').call(this);
				}
				let evt = new CustomEvent('now-confirm-confirmed');
				this.dispatchEvent(evt);
			}
		}
		/**
		 * Fired when the confirmButtonBackground changes. Sets the custom style variable --confirm-button-background
		 * @param  {String} newVal The new color
		 * @param  {String} oldVal The old color
		 */
		private _onConfirmBackgroundChange(newVal, oldVal) {
			if (newVal) {
				this.updateStyles({'--now-confirm-dialog-confirm-button-background': newVal});
			}
		}
		/**
		 * Fired when the confirmButtonColor changes. Sets the custom style variable --confirm-button-color
		 * @param  {String} newVal The new color
		 * @param  {String} oldVal The old color
		 */
		private _onConfirmColorChange(newVal, oldVal) {
			if (newVal) {
				this.updateStyles({'--now-confirm-dialog-conform-button-color': newVal })
			}
		}
		/**
		 * Fired when the cancelButtonBackground changes. Sets the custom style variable --cancel-button-background
		 * @param  {String} newVal The new color
		 * @param  {String} oldVal The old color
		 */
		private _onCancelBackgroundChange(newVal, oldVal) {
			if (newVal) {
				this.updateStyles({'--now-confirm-dialog-cancel-button-background': newVal})
			}
		}
		/**
		 * Fired when the cancelButtonColor changes. Sets the custom style variable --cancel-button-color
		 * @param  {String} newVal The new color
		 * @param  {String} oldVal The old color
		 * @return {[type]}        [description]
		 */
		private _onCancelColorChange(newVal, oldVal) {
			if (newVal) {
				this.updateStyles({'--now-confirm-dialog-cancel-button-color': newVal})
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
			if (this.get('targetMoveCssSelector')) {
				let elem = document.querySelector(this.get('targetMoveCssSelector'));
				if (elem) {
					elem.appendChild(this);
				}
			}
			(<any>this.$.dialog).open();
			this.set('_cancelCallback', cancelCallback);
			this.set('_confirmCallback', confirmCallback);
		}
		/**
		 * Closes the dialog. Will cause the cancel callback to be run
		 * in the iron-overlay-closed event handler
		 */
		close() {
			(<any>this.$.dialog).close();
			if (this.get('targetMoveCssSelector')) {
				let movedDialog = document.querySelector(this.get('targetMoveCssSelector') + ' > now-confirm-dialog');
				if (movedDialog) {
					movedDialog.parentNode.removeChild(movedDialog);
				}
			}
		}
	}
}

customElements.define(NowElements.NowConfirmDialog.is, NowElements.NowConfirmDialog);

