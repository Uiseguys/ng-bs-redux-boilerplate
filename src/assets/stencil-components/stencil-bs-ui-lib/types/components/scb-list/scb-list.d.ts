import { EventEmitter } from '@stencil/core';
import { VirtualNode, ListDataItem } from './scb-list-interfaces';
/**
 * An infinite list component which
 *
 * @export
 * @class StencilComponent
 */
export declare class StencilComponent {
    items: object[];
    itemAs: string;
    template: VirtualNode;
    addClass?: string;
    addClassEven?: string;
    addClassOdd?: string;
    wrapperClass: string;
    bottomOffset?: number;
    bindToList: boolean;
    itemsData: ListDataItem[];
    el: HTMLElement;
    onBottomReach: EventEmitter;
    regExpression: RegExp;
    loadMore(): void;
    componentWillLoad(): void;
    listScrollHandler(): void;
    windowScrollHandler(): void;
    itemsdidChangeHandler(): void;
    private initItemsData();
    private addListClasses(base, index, count);
    private interpolateText(vnode, obj);
    private iterateChildVNodes(vnode, obj);
    render(): JSX.Element;
}
