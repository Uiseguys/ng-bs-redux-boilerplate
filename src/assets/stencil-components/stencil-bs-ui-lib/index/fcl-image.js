/*! Built with http://stenciljs.com */
const { h } = window.index;

class FclImage {
    constructor() {
        this.isError = false;
    }
    handleClick() {
        this.isError = true;
        console.log("Error image load");
        this.el.getElementsByTagName('img')[0].src = this.brokenUrl;
    }
    render() {
        if (this.isError != true) {
            return (
            // <h1>Image Test</h1>
            h("img", { class: "fcl-image-custom", src: this.src, onError: () => this.handleClick() }));
        }
        else {
            return (
            // <h1>Image Test</h1>
            h("img", { src: this.src, onError: () => this.handleClick() }));
        }
    }
    componentDidLoad() {
    }
    componentWillUpdate() {
    }
    static get is() { return "fcl-image"; }
    static get properties() { return { "brokenUrl": { "type": "Any", "attr": "broken-url" }, "el": { "elementRef": true }, "height": { "type": "Any", "attr": "height" }, "src": { "type": "Any", "attr": "src" }, "width": { "type": "Any", "attr": "width" } }; }
    static get style() { return ".fcl-image-custom {\n  width: 100;\n}"; }
}

export { FclImage };
