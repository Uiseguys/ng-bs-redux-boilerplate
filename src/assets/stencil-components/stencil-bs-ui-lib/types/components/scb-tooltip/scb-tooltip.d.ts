import { HostElement } from '@stencil/core';
import Tooltip from 'tooltip.js';
export declare class ScbTooltip {
    btn: Element;
    el: HostElement;
    type: string;
    href: string;
    target: string;
    tooltipTitle: string;
    placement: string;
    delay: any;
    trigger: string;
    offset: string;
    tooltip: Tooltip;
    componentDidLoad(): void;
    render(): JSX.Element;
}
