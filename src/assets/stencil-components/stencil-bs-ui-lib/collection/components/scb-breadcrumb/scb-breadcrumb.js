export class ScbBreadcrumb {
    constructor() {
        this.items = [];
    }
    render() {
        return (h("nav", { class: "breadcrumb" }, this.items.map(item => item.active
            ? this.getSpanBreadcrumb(item)
            : this.getAnchorBreadcrumb(item))));
    }
    getSpanBreadcrumb(item) {
        return (h("span", { class: "breadcrumb-item active" }, item.title));
    }
    getAnchorBreadcrumb(item) {
        return (h("a", { class: "breadcrumb-item", href: item.href, target: item.target }, item.title));
    }
    static get is() { return "scb-breadcrumb"; }
    static get properties() { return { "items": { "type": "Any", "attr": "items", "mutable": true } }; }
}
