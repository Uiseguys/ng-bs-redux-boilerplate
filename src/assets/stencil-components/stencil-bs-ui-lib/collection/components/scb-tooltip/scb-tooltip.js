import Tooltip from 'tooltip.js';
export class ScbTooltip {
    constructor() {
        this.type = 'span';
        this.href = '#';
        this.target = '_blank';
        this.tooltipTitle = '';
        this.placement = 'top';
        this.delay = 0;
        this.trigger = 'hover';
        this.offset = '';
    }
    componentDidLoad() {
        const template = '<div class="tooltip show" ' +
            'role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>';
        this.btn = this.el.children[0];
        this.tooltip = new Tooltip(this.btn, {
            title: this.tooltipTitle,
            placement: this.placement,
            delay: this.delay,
            trigger: this.trigger,
            offset: this.offset,
            template: template
        });
    }
    render() {
        if (this.type === 'link') {
            return (h("a", { href: this.href, target: this.target },
                h("slot", { name: "btn-content" })));
        }
        else if (this.type === 'button') {
            return (h("button", { type: "button", class: "btn btn-secondary" },
                h("slot", { name: "btn-content" })));
        }
        else {
            return (h("span", null,
                h("slot", { name: "btn-content" })));
        }
    }
    static get is() { return "scb-tooltip"; }
    static get properties() { return { "delay": { "type": "Any", "attr": "delay" }, "el": { "elementRef": true }, "href": { "type": String, "attr": "href" }, "offset": { "type": String, "attr": "offset" }, "placement": { "type": String, "attr": "placement" }, "target": { "type": String, "attr": "target" }, "tooltip": { "state": true }, "tooltipTitle": { "type": String, "attr": "tooltip-title" }, "trigger": { "type": String, "attr": "trigger" }, "type": { "type": String, "attr": "type" } }; }
    static get style() { return "/**style-placeholder:scb-tooltip:**/"; }
}
