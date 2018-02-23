import { HostElement } from '@stencil/core';
import Popper from 'popper.js';
export declare class StencilComponent {
    dropdownPlacement: any;
    triggerOverflow: boolean;
    offsetString: string;
    openState: boolean;
    el: HostElement;
    popper: Popper;
    btn: Element;
    content: Element;
    componentWillUpdate(): void;
    placementDidChangeHandler(newValue: any): void;
    overflowDidChangeHandler(newValue: any): void;
    componentDidLoad(): void;
    toggle(): void;
    close(): void;
    open(): void;
    onBlurHandler(): void;
    render(): JSX.Element;
}
