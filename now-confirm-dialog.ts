import {html, PolymerElement} from '@polymer/polymer/polymer-element'
import {customElement, property} from '@polymer/decorators';
import '@polymer/paper-dialog/paper-dialog';
import '@polymer/paper-button/paper-button';

export interface ConfirmDialogConfig {
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
}

@customElement('now-confirm-dialog')
export class NowConfirmDialog extends PolymerElement {
	static is = 'now-confirm-dialog';
	get is() {
		return NowConfirmDialog.is;
	}

	@property({type: String})
	dialogTitle: string;

	@property({
		type: String,
		observer: '_onDialogTextChange'
	})
	dialogText: string;

	@property({type: String})
	confirmButtonText: string = 'OK';

	@property({type: String})
	cancelButtonText: string = 'Cancel';

	@property({
		type: String,
		observer: '_onConfirmBackgroundChange'
	})
	confirmButtonBackground: string;

	@property({
		type: String,
		observer: '_onConfirmColorChange'
	})
	confirmButtonColor: string;

	@property({
		type: String,
		observer: '_onCancelBackgroundChange'
	})
	cancelButtonBackground: string;

	@property({
		type: String,
		observer: '_onCancelColorChange'
	})
	cancelButtonColor: string;

	@property({
		type: Boolean,
		reflectToAttribute: true
	})
	noCancelButton: boolean = false;

	@property({type: String})
	targetMoveCssSelector: string;

	@property({type: Object})
	_cancelCallback: any;

	@property({type: Object})
	_confirmCallback: any;

	private _closeDialogListener: any;

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
	private _onDialogTextChange(dialogText: string) {
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
	private _onConfirmBackgroundChange(newVal: string, oldVal: string) {
		if (newVal) {
			this.updateStyles({'--now-confirm-dialog-confirm-button-background': newVal});
		}
	}
	/**
	 * Fired when the confirmButtonColor changes. Sets the custom style variable --confirm-button-color
	 * @param  {String} newVal The new color
	 * @param  {String} oldVal The old color
	 */
	private _onConfirmColorChange(newVal: string, oldVal: string) {
		if (newVal) {
			this.updateStyles({'--now-confirm-dialog-conform-button-color': newVal })
		}
	}
	/**
	 * Fired when the cancelButtonBackground changes. Sets the custom style variable --cancel-button-background
	 * @param  {String} newVal The new color
	 * @param  {String} oldVal The old color
	 */
	private _onCancelBackgroundChange(newVal: string, oldVal: string) {
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
	private _onCancelColorChange(newVal: string, oldVal: string) {
		if (newVal) {
			this.updateStyles({'--now-confirm-dialog-cancel-button-color': newVal})
		}
	}
	/**
	 * Opens the dialog and sets the cancel and confirm callbacks
	 * @param  {Function} confirmCallback Function to run when the dialog is confirmed
	 * @param  {Function} cancelCallback  Function to run when the dialog is cancelled
	 */
	open(confirmCallback: any, cancelCallback: any) {
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
			if (movedDialog && movedDialog.parentNode) {
				movedDialog.parentNode.removeChild(movedDialog);
			}
		}
	}

	static get template() {
		return html`
		<style>
			:host {
				display: block;
				box-sizing: border-box;
				max-width: 450px;

				--paper-dialog: {
					max-width: 450px;
				};

				@apply --now-confirm-dialog;
			}
			h2 {
				padding: 0 15px;
				@apply --now-confirm-dialog-header;
			}
			.cancelButton {
				background: var(--now-confirm-dialog-cancel-button-background, #c12e2a);
				color: var(--now-confirm-dialog-cancel-button-color, white);
			}
			.confirmButton {
				background: var(--now-confirm-dialog-confirm-button-background, #419641);
				color: var(--now-confirm-dialog-confirm-button-color, white);
			}
			.dialogText {
				padding: 15px;
				margin-top: 0;
			}
			.dialogText.preText {
				white-space: pre;
			}
		</style>

		<paper-dialog
			id="dialog"
			entry-animation="scale-up-animation"
			exit-animation="fade-out-animation"
			modal>
			<h2>{{dialogTitle}}</h2>
			<!-- Whitespace is rendered which is why the dialogText is not indented -->
			<div id="dialogText" class="dialogText">
	{{dialogText}}
			</div>
			<div class="buttons">
				<paper-button
					class="cancelButton"
					hidden$="{{noCancelButton}}"
					dialog-dismiss>
					{{cancelButtonText}}
				</paper-button>
				<paper-button
					class="confirmButton"
					dialog-confirm
					autofocus>
					{{confirmButtonText}}
				</paper-button>
			</div>
		</paper-dialog>
		`;
	}
}
