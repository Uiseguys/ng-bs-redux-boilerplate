import { EventEmitter } from '@stencil/core';
import { VirtualNode, ListDataItem } from './cwc-list-interfaces';
/**
 * An infinite list component which
 *
 * @export
 * @class CwcList
 */
export declare class CwcList {
    items: object[];
    itemAs: string;
    template: VirtualNode;
    addClass?: string;
    addClassFirst?: string;
    addClassLast?: string;
    addClassEven?: string;
    addClassOdd?: string;
    wrapperClass: string;
    bottomOffset?: number;
    debounce: number;
    debounceStatus: boolean;
    bindToList: boolean;
    itemsData: ListDataItem[];
    el: HTMLElement;
    onBottomReach: EventEmitter;
    regex: RegExp;
    /**
     * Method to dispatch HTMLCustomEvent
     * {@link https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events}
     * If cwc-list has id, this id will be dispatched as event.detail
     *
     * @memberof StencilComponent
     */
    loadMore(): void;
    startDebounce(): void;
    componentWillLoad(): void;
    listScrollHandler(): void;
    windowScrollHandler(): void;
    itemsdidChangeHandler(): void;
    private initItemsData();
    /**
     * Adds custom class for every first, last, even and odd node
     *
     * @private
     * @param {string} [base='']
     * @param {number} index
     * @param {number} count
     * @returns {string}
     * @memberof StencilComponent
     */
    private addListClasses(base, index, count);
    /**
     * Interpolates virtual node's text content and attributes
     *
     * @private
     * @param {VirtualNode} vnode
     * @param {*} obj
     * @returns {VirtualNode}
     * @memberof StencilComponent
     */
    private interpolateText(vnode, obj);
    /**
     * Iterate current virtual node and it's children and invoke
     * interpolation function if there's text content or attributes
     *
     * @private
     * @param {VirtualNode} vnode
     * @param {object} obj
     * @returns {VirtualNode}
     * @memberof StencilComponent
     */
    private iterateChildVNodes(vnode, obj);
    render(): JSX.Element;
}
