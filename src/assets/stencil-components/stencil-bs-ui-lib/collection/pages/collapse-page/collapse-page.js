export class CollapsePage {
    constructor() {
        this.cards = [
            {
                cardHeaderId: 'heading#1',
                cardBodyId: 'collapse#1',
                cardHeaderContent: 'Card Item #1',
                cardBodyContent: 'Card Body #1',
                showOnInit: true
            },
            {
                cardHeaderId: 'heading#2',
                cardBodyId: 'collapse#2',
                cardHeaderContent: 'Card Item #2',
                cardBodyContent: 'Card Body #2',
                showOnInit: false
            },
            {
                cardHeaderId: 'heading#3',
                cardBodyId: 'collapse#3',
                cardHeaderContent: 'Card Item #3',
                cardBodyContent: 'Card Body #3',
                showOnInit: false
            }
        ];
    }
    render() {
        return (h("div", { class: "container pt-4" },
            h("h2", { class: "mb-4" }, "Collapse component "),
            h("div", { class: "row" },
                h("div", { class: "col-lg-12" },
                    h("div", { class: "jumbotron pt-3" },
                        h("div", { class: "row" },
                            h("div", { class: "col-lg-4" },
                                h("div", { class: "row" },
                                    h("div", { class: "col-lg-12" },
                                        h("h3", null, "Usage "),
                                        h("div", null,
                                            h("scb-collapse", { collapseid: "collpaseComponent", items: this.cards })))),
                                h("br", null),
                                h("div", { class: "row" },
                                    h("div", { class: "col-lg-12" },
                                        h("pre", null,
                                            h("code", { class: "lang-tsx" },
                                                h("span", null, "<scb-collapse"),
                                                h("br", null),
                                                h("span", { class: "hljs-built_in ml-4" }, "collapseid=\"collpaseComponent\""),
                                                h("br", null),
                                                h("span", { class: "hljs-built_in ml-4" }, "items=[Objects]"),
                                                h("span", null, ">"),
                                                h("br", null),
                                                h("span", null, "</scb-collapse>")))))),
                            h("div", { class: "col-lg-8" },
                                h("table", { class: "table" },
                                    h("thead", null,
                                        h("tr", null,
                                            h("th", null, "Param"),
                                            h("th", null, "Type"),
                                            h("th", null, "Default"),
                                            h("th", null, "Description"))),
                                    h("tbody", null,
                                        h("tr", null,
                                            h("td", null, "collapseid"),
                                            h("td", null, "String"),
                                            h("td", null, "'collpaseComponent'"),
                                            h("td", null, "Unique identifier for a collapse component.")),
                                        h("tr", null,
                                            h("td", null, "items"),
                                            h("td", null, "Array[Objects]"),
                                            h("td", null,
                                                h("pre", null,
                                                    h("code", { class: "lang-tsx" },
                                                        "[{",
                                                        h("br", null),
                                                        "cardHeaderId: 'heading#1',",
                                                        h("br", null),
                                                        "cardBodyId: 'collapse#1',",
                                                        h("br", null),
                                                        "cardHeaderContent: 'Card Item #1',",
                                                        h("br", null),
                                                        "cardBodyContent: 'Card Body #1',",
                                                        h("br", null),
                                                        "showOnInit: true",
                                                        h("br", null),
                                                        "}]"))),
                                            h("td", null, "You create cards by creating objects with the given parameters. 'cardHeaderId' and 'cardBodyId' must be unique for each object and between themselves in an object. Set the collapsible element to be open by default using the 'showOnInit'. You can also insert HTML into the 'cardBodyContent' attribute, e.g.('<h1>Hello World!</h1>').")))))))))));
    }
    static get is() { return "collapse-page"; }
}
