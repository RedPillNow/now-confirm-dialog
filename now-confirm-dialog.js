var NowElements;
(function (NowElements) {
    class NowConfirmDialog extends NowElements.BaseElement {
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
        _onDialogTextChange(dialogText) {
            if (dialogText.indexOf('\n') > -1) {
                this.$.dialogText.classList.toggle('preText', true);
            }
            else {
                this.$.dialogText.classList.toggle('preText', false);
            }
        }
        connectedCallback() {
            super.connectedCallback();
            this.$.dialog.addEventListener('iron-overlay-closed', this._onDialogClosed.bind(this));
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
                if (movedDialog) {
                    movedDialog.parentNode.removeChild(movedDialog);
                }
            }
        }
    }
    NowElements.NowConfirmDialog = NowConfirmDialog;
})(NowElements || (NowElements = {}));
customElements.define(NowElements.NowConfirmDialog.is, NowElements.NowConfirmDialog);

//# sourceMappingURL=now-confirm-dialog.js.map
