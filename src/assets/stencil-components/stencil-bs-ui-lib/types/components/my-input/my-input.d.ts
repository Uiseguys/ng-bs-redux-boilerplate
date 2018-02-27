import { EventEmitter } from '@stencil/core';
export declare class MyInput {
    currentValue: string;
    currentDate: any;
    id: string;
    for: string;
    value: any;
    title: string;
    format: any;
    postValue: EventEmitter;
    element: HTMLElement;
    getAndPostTextValue(event: any): void;
    getContent(): JSX.Element;
    componentWillLoad(): void;
    componentDidLoad(): void;
    render(): JSX.Element;
}
