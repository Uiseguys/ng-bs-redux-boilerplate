/*! Built with http://stenciljs.com */
index.loadBundle('scb-collapse', ['exports'], function (exports) {
    var h = window.index.h;
    var ScbCollapse = /** @class */ (function () {
        function ScbCollapse() {
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
        ScbCollapse.prototype.render = function () {
            var _this = this;
            return (h("div", { id: this.collapseid }, this.items.map(function (item) { return h("div", { class: "card" }, h("div", { class: "card-header", id: item.cardHeaderId }, h("h5", { class: "mb-0" }, h("button", { class: "btn btn-link", "data-toggle": "collapse", "data-target": '#' + item.cardBodyId, "aria-expanded": "true", "aria-controls": item.cardBodyId }, item.cardHeaderContent))), h("div", { id: item.cardBodyId, class: { 'collapse': true, 'show': item.showOnInit }, "aria-labelledby": item.cardHeaderId, "data-parent": '#' + _this.collapseid }, h("div", { class: "card-body", innerHTML: item.cardBodyContent }))); })));
        };
        Object.defineProperty(ScbCollapse, "is", {
            get: function () { return "scb-collapse"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScbCollapse, "properties", {
            get: function () { return { "collapseid": { "type": String, "attr": "collapseid" }, "items": { "type": "Any", "attr": "items" } }; },
            enumerable: true,
            configurable: true
        });
        return ScbCollapse;
    }());
    exports.ScbCollapse = ScbCollapse;
    Object.defineProperty(exports, '__esModule', { value: true });
});
