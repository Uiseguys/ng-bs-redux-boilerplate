import { EventEmitter } from '@stencil/core';
export declare class CwcTypeahead {
    minSearchLength: number;
    data: any[];
    idValue: string;
    searchKey: string;
    placeholder: string;
    filterValue: string;
    optionsShown: boolean;
    focusIndex: number;
    private filtered;
    typeaheadOnSubmit: EventEmitter;
    typeaheadOnSubmitHandler(result: any): void;
    /**
     * Life cycle hooks
     */
    componentWillUpdate(): void;
    /**
     * Private functions
     */
    private filter();
    private filterStringArray(data);
    private findInComplex(data, address);
    /**
     * Handlers
     */
    handleInputChange(e: any): void;
    handleSelect(value: any, index: any): void;
    handleHover(i: number): void;
    /**
     * Public methods
     */
    close(): void;
    render(): JSX.Element;
    /**
     * Keyboard handlers
     *
     **/
    handleDownArrow(ev: any): void;
    handleUpArrow(ev: any): void;
    handleEscape(ev: any): void;
    handleEnter(ev: any): void;
}
