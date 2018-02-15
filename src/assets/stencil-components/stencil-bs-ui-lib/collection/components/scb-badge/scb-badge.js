export class ScbBadge {
    constructor() {
        this.type = 'secondary';
        this.pill = false;
    }
    render() {
        return this.link
            ? h("a", { class: this.getClassList(), href: this.link },
                h("slot", null))
            : h("span", { class: this.getClassList() },
                h("slot", null));
    }
    getClassList() {
        return {
            badge: true,
            [`badge-${this.type}`]: true,
            'badge-pill': this.pill,
        };
    }
    static get is() { return "scb-badge"; }
    static get properties() { return { "link": { "type": String, "attr": "link" }, "pill": { "type": Boolean, "attr": "pill" }, "type": { "type": "Any" } }; }
}
