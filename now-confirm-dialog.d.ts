import { PolymerElement } from '@polymer/polymer/polymer-element';
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
export declare class NowConfirmDialog extends PolymerElement {
    static is: string;
    readonly is: string;
    dialogTitle: string;
    dialogText: string;
    confirmButtonText: string;
    cancelButtonText: string;
    confirmButtonBackground: string;
    confirmButtonColor: string;
    cancelButtonBackground: string;
    cancelButtonColor: string;
    noCancelButton: boolean;
    targetMoveCssSelector: string;
    _cancelCallback: any;
    _confirmCallback: any;
    private _closeDialogListener;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _onDialogTextChange;
    private _onDialogClosed;
    private _onConfirmBackgroundChange;
    private _onConfirmColorChange;
    private _onCancelBackgroundChange;
    private _onCancelColorChange;
    open(confirmCallback: any, cancelCallback: any): void;
    close(): void;
    static readonly template: HTMLTemplateElement;
}
