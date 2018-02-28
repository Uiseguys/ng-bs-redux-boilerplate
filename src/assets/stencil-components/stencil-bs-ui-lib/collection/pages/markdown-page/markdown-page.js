export class MarkdownPage {
    constructor() {
        this.markdownContent = "### Holla link";
        this.markdownContent1 = "# Header1" +
            " \n This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.5." +
            "\n ## Header 2" +
            "\n Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io)." +
            "\n ## Running end-to-end tests" +
            "\n Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/)." +
            "\n ### Bug Fixes" +
            "\n * **common:** more detailed info about error" +
            "\n `fix(common): more detailed info about error`";
    }
    render() {
        return [
            h("div", { class: "container mb-5" },
                h("h1", { class: "display-4 " }, "Markdown component"),
                h("h3", null, "API"),
                h("h4", { class: "my-3" }, "Props"),
                h("table", null,
                    h("thead", null,
                        h("tr", null,
                            h("th", null, "Prop"),
                            h("th", null, "PropType"),
                            h("th", null, "Required?"),
                            h("th", null, "defaultValue"),
                            h("th", null, "Description"))),
                    h("tbody", null,
                        h("tr", null,
                            h("td", null,
                                h("code", null, "data")),
                            h("td", null,
                                h("code", null, "string")),
                            h("td", null, "yes"),
                            h("td", null,
                                h("code", null, "''")),
                            h("td", null, "String to render as markdown content to valid HTML .")))),
                h("h4", { class: "mt-3" }, "Basic usage"),
                h("code", { class: "mb-3 d-block p-3" }, "<cwc-markdown data='Holla link' />"),
                h("cwc-markdown", { data: this.markdownContent }),
                h("cwc-markdown", { data: this.markdownContent1 }))
        ];
    }
    static get is() { return "markdown-page"; }
    static get style() { return "/**style-placeholder:markdown-page:**/"; }
}
