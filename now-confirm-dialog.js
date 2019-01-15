var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NowConfirmDialog_1;
import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import { customElement, property } from '@polymer/decorators';
import '@polymer/paper-dialog/paper-dialog';
import '@polymer/paper-button/paper-button';
;
let NowConfirmDialog = NowConfirmDialog_1 = class NowConfirmDialog extends PolymerElement {
    constructor() {
        super(...arguments);
        this.confirmButtonText = 'OK';
        this.cancelButtonText = 'Cancel';
        this.noCancelButton = false;
    }
    get is() {
        return NowConfirmDialog_1.is;
    }
    connectedCallback() {
        super.connectedCallback();
        this._closeDialogListener = this._onDialogClosed.bind(this);
        this.$.dialog.addEventListener('iron-overlay-closed', this._closeDialogListener);
    }
    disconnectedCallback() {
        this.$.dialog.removeEventListener('iron-overlay-closed', this._closeDialogListener);
    }
    _onDialogTextChange(dialogText) {
        if (dialogText.indexOf('\n') > -1) {
            this.$.dialogText.classList.toggle('preText', true);
        }
        else {
            this.$.dialogText.classList.toggle('preText', false);
        }
    }
    _onDialogClosed(evt) {
        let detail = evt.detail;
        if (!detail.confirmed) {
            if (this.get('_cancelCallback')) {
                this.get('_cancelCallback').call(this);
            }
            let evt = new CustomEvent('now-confirm-canceled');
            this.dispatchEvent(evt);
        }
        else if (detail.confirmed) {
            if (this.get('_confirmCallback')) {
                this.get('_confirmCallback').call(this);
            }
            let evt = new CustomEvent('now-confirm-confirmed');
            this.dispatchEvent(evt);
        }
    }
    _onConfirmBackgroundChange(newVal, oldVal) {
        if (newVal) {
            this.updateStyles({ '--now-confirm-dialog-confirm-button-background': newVal });
        }
    }
    _onConfirmColorChange(newVal, oldVal) {
        if (newVal) {
            this.updateStyles({ '--now-confirm-dialog-conform-button-color': newVal });
        }
    }
    _onCancelBackgroundChange(newVal, oldVal) {
        if (newVal) {
            this.updateStyles({ '--now-confirm-dialog-cancel-button-background': newVal });
        }
    }
    _onCancelColorChange(newVal, oldVal) {
        if (newVal) {
            this.updateStyles({ '--now-confirm-dialog-cancel-button-color': newVal });
        }
    }
    open(confirmCallback, cancelCallback) {
        if (this.get('targetMoveCssSelector')) {
            let elem = document.querySelector(this.get('targetMoveCssSelector'));
            if (elem) {
                elem.appendChild(this);
            }
        }
        this.$.dialog.open();
        this.set('_cancelCallback', cancelCallback);
        this.set('_confirmCallback', confirmCallback);
    }
    close() {
        this.$.dialog.close();
        if (this.get('targetMoveCssSelector')) {
            let movedDialog = document.querySelector(this.get('targetMoveCssSelector') + ' > now-confirm-dialog');
            if (movedDialog && movedDialog.parentNode) {
                movedDialog.parentNode.removeChild(movedDialog);
            }
        }
    }
    static get template() {
        return html `
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
};
NowConfirmDialog.is = 'now-confirm-dialog';
__decorate([
    property({ type: String })
], NowConfirmDialog.prototype, "dialogTitle", void 0);
__decorate([
    property({
        type: String,
        observer: '_onDialogTextChange'
    })
], NowConfirmDialog.prototype, "dialogText", void 0);
__decorate([
    property({ type: String })
], NowConfirmDialog.prototype, "confirmButtonText", void 0);
__decorate([
    property({ type: String })
], NowConfirmDialog.prototype, "cancelButtonText", void 0);
__decorate([
    property({
        type: String,
        observer: '_onConfirmBackgroundChange'
    })
], NowConfirmDialog.prototype, "confirmButtonBackground", void 0);
__decorate([
    property({
        type: String,
        observer: '_onConfirmColorChange'
    })
], NowConfirmDialog.prototype, "confirmButtonColor", void 0);
__decorate([
    property({
        type: String,
        observer: '_onCancelBackgroundChange'
    })
], NowConfirmDialog.prototype, "cancelButtonBackground", void 0);
__decorate([
    property({
        type: String,
        observer: '_onCancelColorChange'
    })
], NowConfirmDialog.prototype, "cancelButtonColor", void 0);
__decorate([
    property({
        type: Boolean,
        reflectToAttribute: true
    })
], NowConfirmDialog.prototype, "noCancelButton", void 0);
__decorate([
    property({ type: String })
], NowConfirmDialog.prototype, "targetMoveCssSelector", void 0);
__decorate([
    property({ type: Object })
], NowConfirmDialog.prototype, "_cancelCallback", void 0);
__decorate([
    property({ type: Object })
], NowConfirmDialog.prototype, "_confirmCallback", void 0);
NowConfirmDialog = NowConfirmDialog_1 = __decorate([
    customElement('now-confirm-dialog')
], NowConfirmDialog);
export { NowConfirmDialog };
//# sourceMappingURL=now-confirm-dialog.js.map