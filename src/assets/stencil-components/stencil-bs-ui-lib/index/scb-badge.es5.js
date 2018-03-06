/*! Built with http://stenciljs.com */
index.loadBundle('scb-badge', ['exports'], function (exports) {
    var h = window.index.h;
    var ScbBadge = /** @class */ (function () {
        function ScbBadge() {
            this.type = 'secondary';
            this.pill = false;
        }
        ScbBadge.prototype.render = function () {
            return this.link
                ? h("a", { class: this.getClassList(), href: this.link }, h("slot", null))
                : h("span", { class: this.getClassList() }, h("slot", null));
        };
        ScbBadge.prototype.getClassList = function () {
            return _a = {
                    badge: true
                },
                _a["badge-" + this.type] = true,
                _a['badge-pill'] = this.pill,
                _a;
            var _a;
        };
        Object.defineProperty(ScbBadge, "is", {
            get: function () { return "scb-badge"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScbBadge, "properties", {
            get: function () { return { "link": { "type": String, "attr": "link" }, "pill": { "type": Boolean, "attr": "pill" }, "type": { "type": "Any", "attr": "type" } }; },
            enumerable: true,
            configurable: true
        });
        return ScbBadge;
    }());
    exports.ScbBadge = ScbBadge;
    Object.defineProperty(exports, '__esModule', { value: true });
});
