import { HostElement, EventEmitter } from '@stencil/core';
export declare class ScbAlert {
    el: HostElement;
    dismissible: boolean;
    animatable: boolean;
    type: string;
    onDismiss: (hostEl: HostElement) => void;
    show: boolean;
    fade: boolean;
    toggleVisibility: EventEmitter;
    toggleVisibilityHandler(event: any): void;
    dismiss(): void;
    componentWillLoad(): void;
    render(): JSX.Element;
    private setShowFadeState();
    private getDismissButton();
}
