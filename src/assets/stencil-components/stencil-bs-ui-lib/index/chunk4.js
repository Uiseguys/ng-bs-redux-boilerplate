/*! Built with http://stenciljs.com */
const { h } = window.index;

import { get as get_1 } from './chunk2.js';

/**
 * An infinite list component which
 *
 * @export
 * @class CwcList
 */
class CwcList {
    constructor() {
        this.itemAs = 'item';
        this.addClass = '';
        this.addClassFirst = '';
        this.addClassLast = '';
        this.addClassEven = '';
        this.addClassOdd = '';
        this.bottomOffset = 100;
        this.debounce = 300;
        this.debounceStatus = false;
        this.bindToList = false;
        this.itemsData = [];
        this.regex = /\[\[+(.*?) ?\]\]+/g;
    }
    /**
     * Method to dispatch HTMLCustomEvent
     * {@link https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events}
     * If cwc-list has id, this id will be dispatched as event.detail
     *
     * @memberof StencilComponent
     */
    loadMore() {
        if (!this.debounceStatus) {
            this.startDebounce();
            this.onBottomReach.emit(this.el.id && this.el.id);
        }
    }
    startDebounce() {
        this.debounceStatus = true;
        setTimeout(() => this.debounceStatus = false, this.debounce);
    }
    componentWillLoad() {
        this.initItemsData();
        this.bindToList ?
            this.el.addEventListener('scroll', this.listScrollHandler.bind(this))
            : document.addEventListener('scroll', this.windowScrollHandler.bind(this));
    }
    listScrollHandler() {
        if (this.el.scrollTop + this.el.clientHeight >= this.el.scrollHeight - this.bottomOffset)
            this.loadMore();
    }
    windowScrollHandler() {
        let last = document.querySelector(`#${this.el.id} .list-item-last`);
        if (last.getBoundingClientRect().bottom - this.bottomOffset <= window.innerHeight)
            this.loadMore();
    }
    itemsdidChangeHandler() {
        this.itemsData.length = 0;
        this.initItemsData();
    }
    initItemsData() {
        this.items.map((value, index) => {
            let newItemData = {
                index: index,
                itemAs: this.itemAs
            };
            newItemData[this.itemAs] = value;
            this.itemsData = [...this.itemsData, newItemData];
        });
        return this.itemsData;
    }
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
    addListClasses(base = '', index, count) {
        let classString = base + ' list-item'.concat(this.addClass && ' ' + this.addClass);
        if (index == 0) {
            classString += ' list-item-first'.concat(this.addClassFirst && ' ' + this.addClassFirst);
        }
        if (index == count - 1) {
            classString += ' list-item-last'.concat(this.addClassLast && ' ' + this.addClassLast);
        }
        if (index % 2 == 0) {
            classString += ' list-item-even'.concat(this.addClassEven && ' ' + this.addClassEven);
        }
        if (Math.abs(index % 2) == 1) {
            classString += ' list-item-odd'.concat(this.addClassOdd && ' ' + this.addClassOdd);
        }
        return classString;
    }
    /**
     * Interpolates virtual node's text content and attributes
     *
     * @private
     * @param {VirtualNode} vnode
     * @param {*} obj
     * @returns {VirtualNode}
     * @memberof StencilComponent
     */
    interpolateText(vnode, obj) {
        if (vnode.vtext) {
            let matches = vnode.vtext.match(this.regex);
            if (matches) {
                matches.map(matched => vnode.vtext = vnode.vtext.replace(matched, get_1(obj, matched.slice(2, -2), matched)));
            }
        }
        if (vnode.vattrs) {
            for (const key in vnode.vattrs) {
                if (vnode.vattrs.hasOwnProperty(key)) {
                    let matches = vnode.vattrs[key].match(this.regex);
                    if (matches)
                        matches.map(matched => vnode.vattrs[key] = vnode.vattrs[key].replace(matched, get_1(obj, matched.slice(1, -1), matched)));
                }
            }
        }
        return vnode;
    }
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
    iterateChildVNodes(vnode, obj) {
        if (vnode.vtext)
            vnode = this.interpolateText(vnode, obj);
        if (vnode.vattrs)
            vnode = this.interpolateText(vnode, obj);
        if (vnode.vchildren) {
            for (var i = 0; i < vnode.vchildren.length; i++) {
                vnode.vchildren[i] = this.iterateChildVNodes(vnode.vchildren[i], obj);
            }
        }
        return vnode;
    }
    render() {
        const list = this.itemsData.map(val => {
            let cloned = JSON.parse(JSON.stringify(this.template)), interpolated = this.iterateChildVNodes(cloned, val);
            interpolated.vattrs.class = this.addListClasses(interpolated.vattrs.class, val.index, this.itemsData.length);
            return (interpolated);
        });
        return (h("div", { class: "item-list-wrapper " + this.wrapperClass }, list));
    }
    static get is() { return "cwc-list"; }
    static get properties() { return { "addClass": { "type": String, "attr": "add-class" }, "addClassEven": { "type": String, "attr": "add-class-even" }, "addClassFirst": { "type": String, "attr": "add-class-first" }, "addClassLast": { "type": String, "attr": "add-class-last" }, "addClassOdd": { "type": String, "attr": "add-class-odd" }, "bindToList": { "type": Boolean, "attr": "bind-to-list" }, "bottomOffset": { "type": Number, "attr": "bottom-offset" }, "debounce": { "type": Number, "attr": "debounce" }, "el": { "elementRef": true }, "itemAs": { "type": String, "attr": "item-as" }, "items": { "type": "Any", "attr": "items", "watchCallbacks": ["itemsdidChangeHandler"] }, "itemsData": { "state": true }, "loadMore": { "method": true }, "template": { "type": "Any", "attr": "template" }, "wrapperClass": { "type": String, "attr": "wrapper-class" } }; }
    static get events() { return [{ "name": "onBottomReach", "method": "onBottomReach", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:cwc-list:**/"; }
}

export { CwcList };
