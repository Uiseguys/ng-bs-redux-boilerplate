export class StencilComponent {
    constructor() {
        this.examplePlacement = 'bottom';
        this.exampleAlignment = 'start';
        this.exampleTriggerOverflow = false;
    }
    componentDidLoad() {
        this.example = document.getElementById('example1');
        this.example.open();
    }
    formPlacementString() {
        return this.exampleAlignment ?
            `${this.examplePlacement}-${this.exampleAlignment}` :
            `${this.examplePlacement}`;
    }
    setExamplePlacement(val) {
        this.examplePlacement = val;
    }
    setExampleAlignment(val) {
        this.exampleAlignment = val;
    }
    setExampleTriggerOverflow(val) {
        this.exampleTriggerOverflow = val;
    }
    render() {
        return [
            h("br", null),
            h("br", null),
            h("br", null),
            h("br", null),
            h("br", null),
            h("br", null),
            h("div", { class: "container pt-4" },
                h("h2", { class: "mb-4" }, "Dropdown component "),
                h("div", { class: "row" },
                    h("div", { class: "col-lg-12" },
                        h("div", { class: "jumbotron pt-3" },
                            h("h3", null, "Usage "),
                            h("p", null, "To set position of the dropdown component you can pass position and align variables: "),
                            h("div", { class: "row" },
                                h("div", { class: "col-lg-8" },
                                    h("cwc-dropdown", { id: "example1", dropdownPlacement: this.formPlacementString(), triggerOverflow: this.exampleTriggerOverflow },
                                        h("div", { slot: "dropdown-trigger" },
                                            h("button", { class: "btn btn-primary ml-5 mt-2", "aria-expanded": "true", type: "button" }, "Example dropdown")),
                                        h("div", { slot: "dropdown-content" },
                                            h("div", null,
                                                h("a", { class: "dropdown-item", role: "presentation", href: "#" }, "First example item"),
                                                h("a", { class: "dropdown-item", role: "presentation", href: "#" }, "Second Item"),
                                                h("a", { class: "dropdown-item", role: "presentation", href: "#" }, "Third Item"))))),
                                h("div", { class: "col-lg-4" },
                                    h("div", { class: "dropdown" },
                                        h("button", { class: "btn btn-info dropdown-toggle ml-1 mt-2 w-75", "data-toggle": "dropdown", "aria-expanded": "false", type: "button" }, "Select position"),
                                        h("div", { class: "dropdown-menu", role: "menu" },
                                            h("a", { class: "dropdown-item", role: "presentation", onClick: () => this.setExamplePlacement('bottom') }, "Bottom "),
                                            h("a", { class: "dropdown-item", role: "presentation", onClick: () => this.setExamplePlacement('left') }, "Left "),
                                            h("a", { class: "dropdown-item", role: "presentation", onClick: () => this.setExamplePlacement('right') }, "Right "),
                                            h("a", { class: "dropdown-item", role: "presentation", onClick: () => this.setExamplePlacement('top') }, "Top "))),
                                    h("div", { class: "dropdown" },
                                        h("button", { class: "btn btn-info dropdown-toggle ml-1 mt-2 w-75", "data-toggle": "dropdown", "aria-expanded": "false", type: "button" }, "Select alignment"),
                                        h("div", { class: "dropdown-menu", role: "menu" },
                                            h("a", { class: "dropdown-item", role: "presentation", onClick: () => this.setExampleAlignment('') }, "None (centered)"),
                                            h("a", { class: "dropdown-item", role: "presentation", onClick: () => this.setExampleAlignment('start') }, "Start "),
                                            h("a", { class: "dropdown-item", role: "presentation", onClick: () => this.setExampleAlignment('end') }, "End "))),
                                    h("div", { class: "dropdown" },
                                        h("button", { class: "btn btn-info dropdown-toggle ml-1 mt-2 w-75", disabled: true, "data-toggle": "dropdown", "aria-expanded": "false", type: "button" }, "Button overflow"),
                                        h("div", { class: "dropdown-menu", role: "menu" },
                                            h("a", { class: "dropdown-item", role: "presentation", onClick: () => this.setExampleTriggerOverflow(true) }, "True"),
                                            h("a", { class: "dropdown-item", role: "presentation", onClick: () => this.setExampleTriggerOverflow(false) }, "False")))),
                                h("div", { class: "col-12" },
                                    h("pre", null,
                                        h("code", { class: "lang-tsx" },
                                            "<cwc-",
                                            h("span", { class: "hljs-built_in" }, "dropdown"),
                                            h("br", null),
                                            h("span", { class: "hljs-built_in ml-4" }, "dropdown-placement"),
                                            "=",
                                            h("span", { class: "hljs-built_in" },
                                                "'",
                                                this.formPlacementString(),
                                                "'"),
                                            " ",
                                            h("br", null),
                                            h("span", { class: "ml-4" },
                                                "buttonOverflow=",
                                                h("span", { class: "hljs-literal" },
                                                    "'",
                                                    JSON.stringify(this.exampleTriggerOverflow),
                                                    "'")),
                                            "> ",
                                            h("br", null),
                                            "</cwc-",
                                            h("span", { class: "hljs-built_in" }, "dropdown"),
                                            ">")))))))),
            h("br", null),
            h("br", null),
            h("br", null),
            h("br", null),
            h("br", null)
        ];
    }
    static get is() { return "dropdown-page"; }
    static get properties() { return { "exampleAlignment": { "state": true }, "examplePlacement": { "state": true }, "exampleTriggerOverflow": { "state": true } }; }
    static get style() { return "/**style-placeholder:dropdown-page:**/"; }
}
