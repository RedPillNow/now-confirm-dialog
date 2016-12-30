var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NowElements;
(function (NowElements) {
    var NowConfirmDialog = (function (_super) {
        __extends(NowConfirmDialog, _super);
        function NowConfirmDialog() {
            _super.apply(this, arguments);
        }
        NowConfirmDialog.prototype._onDialogClosed = function (evt, detail) {
            if (!detail.confirmed) {
                if (this._cancelCallback) {
                    this._cancelCallback.call(this);
                }
                this.fire('dig-confirm-canceled');
            }
            else if (detail.confirmed) {
                if (this._confirmCallback) {
                    this._confirmCallback.call(this);
                }
                this.fire('dig-confirm-confirmed');
            }
        };
        NowConfirmDialog.prototype._onConfirmBackgroundChange = function (newVal, oldVal) {
            if (newVal) {
                this.customStyle['--now-confirm-dialog-confirm-button-background'] = newVal;
                this.updateStyles();
            }
        };
        NowConfirmDialog.prototype._onConfirmColorChange = function (newVal, oldVal) {
            if (newVal) {
                this.customStyle['--now-confirm-dialog-conform-button-color'] = newVal;
                this.updateStyles();
            }
        };
        NowConfirmDialog.prototype._onCancelBackgroundChange = function (newVal, oldVal) {
            if (newVal) {
                this.customStyle['--now-confirm-dialog-cancel-button-background'] = newVal;
                this.updateStyles();
            }
        };
        NowConfirmDialog.prototype._onCancelColorChange = function (newVal, oldVal) {
            if (newVal) {
                this.customStyle['--now-confirm-dialog-cancel-button-color'] = newVal;
                this.updateStyles();
            }
        };
        NowConfirmDialog.prototype.open = function (confirmCallback, cancelCallback) {
            this.$.dialog.open();
            if (cancelCallback) {
                this._cancelCallback = cancelCallback;
            }
            if (confirmCallback) {
                this._confirmCallback = confirmCallback;
            }
        };
        NowConfirmDialog.prototype.close = function () {
            this.$.dialog.close();
        };
        __decorate([
            property({
                type: String
            })
        ], NowConfirmDialog.prototype, "dialogTitle", void 0);
        __decorate([
            property({
                type: String
            })
        ], NowConfirmDialog.prototype, "dialogText", void 0);
        __decorate([
            property({
                type: String,
                value: 'OK'
            })
        ], NowConfirmDialog.prototype, "confirmButtonText", void 0);
        __decorate([
            property({
                type: String,
                value: 'Cancel'
            })
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
                value: false,
                reflectToAttribute: true
            })
        ], NowConfirmDialog.prototype, "noCancelButton", void 0);
        __decorate([
            property({
                type: Function
            })
        ], NowConfirmDialog.prototype, "_cancelCallback", void 0);
        __decorate([
            property({
                type: Function
            })
        ], NowConfirmDialog.prototype, "_confirmCallback", void 0);
        __decorate([
            listen('dialog.iron-overlay-closed')
        ], NowConfirmDialog.prototype, "_onDialogClosed", null);
        NowConfirmDialog = __decorate([
            component('now-confirm-dialog')
        ], NowConfirmDialog);
        return NowConfirmDialog;
    }(NowElements.BaseElement));
    NowElements.NowConfirmDialog = NowConfirmDialog;
})(NowElements || (NowElements = {}));
NowElements.NowConfirmDialog.register();

//# sourceMappingURL=now-confirm-dialog.js.map
