// TODO: Move interpolation mechanics to lodash templates
/**
 * An infinite list component which
 *
 * @export
 * @class StencilComponent
 */
export class StencilComponent {
    constructor() {
        this.itemAs = 'item';
        this.bottomOffset = 20;
        this.bindToList = false;
        this.itemsData = [];
        //TODO: Change interpolation regex to double brackets pattern
        this.regExpression = new RegExp(/\[(.*?)\]/g);
    }
    loadMore() {
        this.onBottomReach.emit({});
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
        let last = document.querySelector('scb-list div:last-child');
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
    addListClasses(base = '', index, count) {
        let classString = base + ' list-item';
        if (index == 0) {
            classString += ' list-item-first';
        }
        if (index == count - 1) {
            classString += ' list-item-last';
        }
        if (index % 2 == 0) {
            classString += ' list-item-even';
        }
        if (Math.abs(index % 2) == 1) {
            classString += ' list-item-odd';
        }
        return classString;
    }
    //TODO: Refactor this
    interpolateText(vnode, obj) {
        if (vnode.vtext) {
            let matches = vnode.vtext.match(new RegExp(/\[(.*?)\]/g));
            if (matches)
                matches.map(matched => 
                //TODO: replace eval statement with object key find function
                vnode.vtext = vnode.vtext.replace(matched, eval('obj.' + matched.slice(1, -1))));
        }
        if (vnode.vattrs) {
            for (const key in vnode.vattrs) {
                if (vnode.vattrs.hasOwnProperty(key)) {
                    let matches = vnode.vattrs[key].match(new RegExp(/\[(.*?)\]/g));
                    if (matches)
                        matches.map(matched => vnode.vattrs[key] = vnode.vattrs[key].replace(matched, eval('obj.' + matched.slice(1, -1))));
                }
            }
        }
        return vnode;
    }
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
    static get is() { return "scb-list"; }
    static get properties() { return { "addClass": { "type": String, "attr": "add-class" }, "addClassEven": { "type": String, "attr": "add-class-even" }, "addClassOdd": { "type": String, "attr": "add-class-odd" }, "bindToList": { "type": Boolean, "attr": "bind-to-list" }, "bottomOffset": { "type": Number, "attr": "bottom-offset" }, "el": { "elementRef": true }, "itemAs": { "type": String, "attr": "item-as" }, "items": { "type": "Any", "watchCallbacks": ["itemsdidChangeHandler"] }, "itemsData": { "state": true }, "loadMore": { "method": true }, "template": { "type": "Any" }, "wrapperClass": { "type": String, "attr": "wrapper-class" } }; }
    static get events() { return [{ "name": "onBottomReach", "method": "onBottomReach", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:scb-list:**/"; }
}
