/*! Built with http://stenciljs.com */
const { h, Context } = window.index;

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

class FclImagePage {
    render() {
        return [
            h("div", null,
                h("fcl-image", { brokenUrl: "https://s3.amazonaws.com/images.seroundtable.com/invalid-url-1354629517.png", src: "https://www.w3schools.com/howto/img_fjords.jpg" }))
        ];
    }
    static get is() { return "fcl-image-page"; }
}

export { FclImage, FclImagePage };
