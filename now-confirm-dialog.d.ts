declare namespace NowElements {
    class NowConfirmDialog extends Polymer.Element {
        static readonly is: string;
        static readonly properties: {
            dialogTitle: StringConstructor;
            dialogText: {
                type: StringConstructor;
                observer: string;
            };
            confirmButtonText: {
                type: StringConstructor;
                value: string;
            };
            cancelButtonText: {
                type: StringConstructor;
                value: string;
            };
            confirmButtonBackground: {
                type: StringConstructor;
                observer: string;
            };
            confirmButtonColor: {
                type: StringConstructor;
                observer: string;
            };
            cancelButtonBackground: {
                type: StringConstructor;
                observer: string;
            };
            cancelButtonColor: {
                type: StringConstructor;
                observer: string;
            };
            noCancelButton: {
                type: BooleanConstructor;
                value: boolean;
                reflectToAttribute: boolean;
            };
            _cancelCallback: FunctionConstructor;
            _confirmCallback: FunctionConstructor;
            targetMoveCssSelector: StringConstructor;
        };
        readonly is: string;
        _closeDialogListener: any;
        connectedCallback(): void;
        disconnectedCallback(): void;
        private _onDialogTextChange(dialogText);
        private _onDialogClosed(evt);
        private _onConfirmBackgroundChange(newVal, oldVal);
        private _onConfirmColorChange(newVal, oldVal);
        private _onCancelBackgroundChange(newVal, oldVal);
        private _onCancelColorChange(newVal, oldVal);
        open(confirmCallback: any, cancelCallback: any): void;
        close(): void;
    }
}
