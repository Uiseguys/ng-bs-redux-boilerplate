/*! Built with http://stenciljs.com */
const { h, Context } = window.index;

class BreadcrumbPage {
    constructor() {
        this.breadcrumbItems = [
            { active: false, href: '/alerts', target: 'blank', title: 'Alerts' },
            { active: false, href: '/badge', target: 'blank', title: 'Badge' },
            { active: true, href: '/breadcrumb', target: 'blank', title: 'Breadcrumbs' },
        ];
    }
    render() {
        return (h("scb-breadcrumb", { items: this.breadcrumbItems }));
    }
    static get is() { return "breadcrumb-page"; }
    static get encapsulation() { return "shadow"; }
}

class ScbBreadcrumb {
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
    static get properties() { return { "items": { "type": "Any", "mutable": true } }; }
}

export { BreadcrumbPage, ScbBreadcrumb };
