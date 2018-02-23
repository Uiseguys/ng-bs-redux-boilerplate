import { EventEmitter } from '@stencil/core';
export declare class MyCheckbox {
    currentValue: boolean;
    id: string;
    for: string;
    value: boolean;
    title: string;
    postValue: EventEmitter;
    element: HTMLElement;
    /**
     * Changing value of 'checked' attribute
     * @param event
     */
    checkWatcher(): void;
    render(): JSX.Element;
}
