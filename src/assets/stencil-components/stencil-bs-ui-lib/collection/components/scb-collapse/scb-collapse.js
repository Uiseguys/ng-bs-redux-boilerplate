export class ScbCollapse {
    constructor() {
        this.collapseid = 'collpaseComponent';
        this.items = [
            {
                cardHeaderId: 'heading#1',
                cardBodyId: 'collapse#1',
                cardHeaderContent: 'Card Item #1',
                cardBodyContent: 'Card Body #1',
                showOnInit: true
            }
        ];
    }
    render() {
        return (h("div", { id: this.collapseid }, this.items.map(item => h("div", { class: "card" },
            h("div", { class: "card-header", id: item.cardHeaderId },
                h("h5", { class: "mb-0" },
                    h("button", { class: "btn btn-link", "data-toggle": "collapse", "data-target": '#' + item.cardBodyId, "aria-expanded": "true", "aria-controls": item.cardBodyId }, item.cardHeaderContent))),
            h("div", { id: item.cardBodyId, class: { 'collapse': true, 'show': item.showOnInit }, "aria-labelledby": item.cardHeaderId, "data-parent": '#' + this.collapseid },
                h("div", { class: "card-body", innerHTML: item.cardBodyContent }))))));
    }
    static get is() { return "scb-collapse"; }
    static get properties() { return { "collapseid": { "type": String, "attr": "collapseid" }, "items": { "type": "Any", "attr": "items" } }; }
}
