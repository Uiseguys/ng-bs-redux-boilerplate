import { HostElement } from '@stencil/core';
export declare class FclVideoPLayer {
    el: HostElement;
    poster: string;
    controls: boolean;
    autoPlay: boolean;
    toggle: boolean;
    toggleClick(): void;
    constructor();
    render(): JSX.Element;
    componentDidLoad(): void;
    componentWillUpdate(): void;
}
