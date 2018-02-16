/*! Built with http://stenciljs.com */
const { h, Context } = window.index;

class BadgePage {
    constructor() {
        this.badgeTypes = [
            'primary',
            'secondary',
            'success',
            'danger',
            'warning',
            'info',
            'light',
            'dark',
        ];
    }
    render() {
        return [
            h("div", null,
                h("h1", null,
                    "Example Heading ",
                    h("scb-badge", null, "New")),
                h("h2", null,
                    "Example Heading ",
                    h("scb-badge", null, "New")),
                h("h3", null,
                    "Example Heading ",
                    h("scb-badge", null, "New")),
                h("h4", null,
                    "Example Heading ",
                    h("scb-badge", null, "New")),
                h("h5", null,
                    "Example Heading ",
                    h("scb-badge", null, "New")),
                h("h6", null,
                    "Example Heading ",
                    h("scb-badge", null, "New"))),
            h("button", { class: "btn" },
                "Notifications ",
                h("scb-badge", null, "4")),
            h("div", null,
                h("h1", null, "Contextual Variations"),
                this.badgeTypes.map(type => [
                    h("scb-badge", { type: type }, type.charAt(0).toUpperCase() + type.slice(1)),
                    ' ',
                ])),
            h("div", null,
                h("h1", null, "Pill Badges"),
                this.badgeTypes.map(type => [
                    h("scb-badge", { type: type, pill: true }, type.charAt(0).toUpperCase() + type.slice(1)),
                    ' ',
                ])),
            h("div", null,
                h("h1", null, "Links"),
                this.badgeTypes.map(type => [
                    h("scb-badge", { type: type, link: "#" }, type.charAt(0).toUpperCase() + type.slice(1)),
                    ' ',
                ])),
        ];
    }
    static get is() { return "badge-page"; }
}

class ScbBadge {
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

export { BadgePage, ScbBadge };
