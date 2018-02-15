import { EventEmitter } from '@stencil/core';
export declare class MyDropdown {
    currentValue: string;
    id: string;
    for: string;
    value: string;
    title: string;
    postValue: EventEmitter;
    element: HTMLElement;
    getSelectValues(event: any): void;
    render(): JSX.Element;
}
