import { EventEmitter } from '@stencil/core';
export declare class CwcMultiselect {
    minSearchLength: number;
    data: any[];
    idValue: string;
    searchKey: string;
    placeholder: string;
    filterValue: string;
    optionsShown: boolean;
    focusIndex: number;
    justAddedLabel: boolean;
    labels: any[];
    results: any[];
    private filtered;
    multiselectOnSubmit: EventEmitter;
    destroyHandler(event: any): void;
    addLabel(label: any): void;
    addResult(result: any): void;
    removeResult(index: any): void;
    clearLabels(): void;
    removeLabel(label: any): void;
    multiselectOnSubmitHandler(result: any): void;
    /**
     * Life cycle hooks
     */
    componentWillUpdate(): void;
    componentDidUpdate(): void;
    /**
     * Private functions
     */
    private filter();
    private filterStringArray(data);
    private findInComplex(data, address);
    getStringValue(val: string | any): string;
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
    setCaretPositionEnd(): void;
    clearTextNodes(): void;
}
