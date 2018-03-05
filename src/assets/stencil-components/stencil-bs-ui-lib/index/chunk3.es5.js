/*! Built with http://stenciljs.com */
index.loadBundle("./chunk3.js", ["exports"], function (t) { var e = window.index.h; t.CwcTag = /** @class */ (function () {
    function class_1() {
        this.text = "", this.tagType = void 0, this.classes = void 0, this.link = void 0, this.imgLink = void 0, this.closable = !1, this.removeOnClose = !0, this.onCloseData = void 0, this.rounded = !1, this.limitTo = 25;
    }
    class_1.prototype.close = function (t) { this.link && t.preventDefault(), this.tagCloseEvent.emit({ eventType: "EVENT_TAG_CLOSE", tagText: this.text, customData: this.onCloseData }), this.removeOnClose && this.element.parentElement.removeChild(this.element); };
    class_1.prototype.textWatchHandler = function (t) { this.text = t; };
    class_1.prototype.watchHandler = function (t) { this.tagType = t; };
    class_1.prototype.limit = function (t, e) { return t.length > e - 3 && (t = t.slice(0, t.length - 3), t += "..."), t; };
    class_1.prototype.getClassList = function () { var t = ""; return this.tagType ? (console.log("+tagType: ", this.tagType), t = " badge-" + this.tagType) : (console.log("-tagType: ", this.tagType), t = " badge-primary"), this.classes && (t += " " + this.classes + " "), this.rounded && (t += " badge-pill"), this.closable && (t += " closable"), this.imgLink && (t += " tag-with-image"), t; };
    class_1.prototype.render = function () {
        var _this = this;
        return this.link ? e("a", { class: "badge " + this.getClassList(), href: this.link, title: this.link }, (function () { return _this.imgLink && e("img", { src: _this.imgLink, class: "rounded-circle" }); })(), e("span", { class: "badge-text" }, this.limit(this.text, this.limitTo)), (function () { return _this.closable && e("span", { "aria-hidden": "true", class: "btn-close ", onClick: function (t) { return _this.close(t); }, title: "Close" }, "×"); })()) : e("span", { class: "badge " + this.getClassList(), title: this.text }, (function () { return _this.imgLink && e("img", { src: _this.imgLink, class: "rounded-circle" }); })(), e("span", { class: "badge-text" }, this.limit(this.text, this.limitTo)), (function () { return _this.closable && e("span", { "aria-hidden": "true", class: "btn-close ", onClick: function () { return _this.close(); }, title: "Close" }, "×"); })());
    };
    Object.defineProperty(class_1, "is", {
        get: function () { return "cwc-tag"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "properties", {
        get: function () { return { classes: { type: String, attr: "classes" }, closable: { type: Boolean, attr: "closable" }, close: { method: !0 }, element: { elementRef: !0 }, imgLink: { type: String, attr: "img-link" }, limitTo: { type: Number, attr: "limit-to" }, link: { type: String, attr: "link" }, onCloseData: { type: "Any", attr: "on-close-data" }, removeOnClose: { type: Boolean, attr: "remove-on-close" }, rounded: { type: Boolean, attr: "rounded" }, tagType: { type: "Any", attr: "tag-type", watchCallbacks: ["watchHandler"] }, text: { type: String, attr: "text", watchCallbacks: ["textWatchHandler"] } }; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "events", {
        get: function () { return [{ name: "tagCloseEvent", method: "tagCloseEvent", bubbles: !0, cancelable: !0, composed: !0 }]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return "/**style-placeholder:cwc-tag:**/"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}()); });
