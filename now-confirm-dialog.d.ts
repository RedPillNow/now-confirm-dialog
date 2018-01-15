declare namespace NowElements {
    class NowConfirmDialog extends NowElements.BaseElement {
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
        private _onDialogTextChange(dialogText);
        connectedCallback(): void;
        _onDialogClosed(evt: CustomEvent): void;
        _onConfirmBackgroundChange(newVal: any, oldVal: any): void;
        _onConfirmColorChange(newVal: any, oldVal: any): void;
        _onCancelBackgroundChange(newVal: any, oldVal: any): void;
        _onCancelColorChange(newVal: any, oldVal: any): void;
        open(confirmCallback: any, cancelCallback: any): void;
        close(): void;
    }
}
