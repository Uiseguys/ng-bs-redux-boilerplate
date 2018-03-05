import { HostElement } from '@stencil/core';
export declare class FclVideoPLayer {
    el: HostElement;
    poster: string;
    theme: string;
    thumbnail: any;
    controls: boolean;
    autoPlay: boolean;
    toggle: boolean;
    toggleClick(): void;
    constructor();
    getClassList(): string;
    render(): JSX.Element;
    componentDidLoad(): void;
    componentWillUpdate(): void;
}
