declare namespace NowElements {
    class NowConfirmDialog extends NowElements.BaseElement {
        dialogTitle: string;
        dialogText: string;
        confirmButtonText: string;
        cancelButtonText: string;
        confirmButtonBackground: string;
        confirmButtonColor: string;
        cancelButtonBackground: string;
        cancelButtonColor: string;
        noCancelButton: boolean;
        _cancelCallback: any;
        _confirmCallback: any;
        _onDialogClosed(evt: any, detail: any): void;
        _onConfirmBackgroundChange(newVal: any, oldVal: any): void;
        _onConfirmColorChange(newVal: any, oldVal: any): void;
        _onCancelBackgroundChange(newVal: any, oldVal: any): void;
        _onCancelColorChange(newVal: any, oldVal: any): void;
        open(confirmCallback: any, cancelCallback: any): void;
        close(): void;
    }
}
