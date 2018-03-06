/*! Built with http://stenciljs.com */
index.loadBundle('fcl-image', ['exports'], function (exports) {
    var h = window.index.h;
    var FclImage = /** @class */ (function () {
        function FclImage() {
            this.isError = false;
        }
        FclImage.prototype.handleClick = function () {
            this.isError = true;
            console.log("Error image load");
            this.el.getElementsByTagName('img')[0].src = this.brokenUrl;
        };
        FclImage.prototype.render = function () {
            var _this = this;
            if (this.isError != true) {
                return (
                // <h1>Image Test</h1>
                h("img", { class: "fcl-image-custom", src: this.src, onError: function () { return _this.handleClick(); } }));
            }
            else {
                return (
                // <h1>Image Test</h1>
                h("img", { src: this.src, onError: function () { return _this.handleClick(); } }));
            }
        };
        FclImage.prototype.componentDidLoad = function () {
        };
        FclImage.prototype.componentWillUpdate = function () {
        };
        Object.defineProperty(FclImage, "is", {
            get: function () { return "fcl-image"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FclImage, "properties", {
            get: function () { return { "brokenUrl": { "type": "Any", "attr": "broken-url" }, "el": { "elementRef": true }, "height": { "type": "Any", "attr": "height" }, "src": { "type": "Any", "attr": "src" }, "width": { "type": "Any", "attr": "width" } }; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FclImage, "style", {
            get: function () { return ".fcl-image-custom {\n  width: 100;\n}"; },
            enumerable: true,
            configurable: true
        });
        return FclImage;
    }());
    exports.FclImage = FclImage;
    Object.defineProperty(exports, '__esModule', { value: true });
});
