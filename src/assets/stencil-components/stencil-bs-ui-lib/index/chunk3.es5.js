/*! Built with http://stenciljs.com */
index.loadBundle('./chunk3.js', ['exports'], function (exports) {
    var h = window.index.h;
    var CwcTag = /** @class */ (function () {
        function CwcTag() {
            this.text = '';
            this.tagType = undefined;
            this.classes = undefined;
            this.link = undefined;
            this.imgLink = undefined;
            this.closable = false;
            this.removeOnClose = true;
            this.onCloseData = undefined;
            this.rounded = false;
            this.limitTo = 25;
        }
        CwcTag.prototype.close = function (e) {
            if (this.link)
                e.preventDefault();
            this.tagCloseEvent.emit({
                eventType: 'EVENT_TAG_CLOSE',
                tagText: this.text,
                customData: this.onCloseData
            });
            if (this.removeOnClose)
                this.element.parentElement.removeChild(this.element);
        };
        CwcTag.prototype.textWatchHandler = function (val) {
            this.text = val;
        };
        CwcTag.prototype.watchHandler = function (val) {
            this.tagType = val;
        };
        CwcTag.prototype.limit = function (text, count) {
            if (text.length > count - 3) {
                text = text.slice(0, text.length - 3);
                text += '...';
            }
            return text;
        };
        CwcTag.prototype.getClassList = function () {
            var classes = '';
            if (!!this.tagType) {
                console.log('+tagType: ', this.tagType);
                classes = ' badge-' + this.tagType;
            }
            else {
                console.log('-tagType: ', this.tagType);
                classes = ' badge-primary';
            }
            if (this.classes)
                classes += " " + this.classes + " ";
            if (this.rounded)
                classes += ' badge-pill';
            if (this.closable)
                classes += ' closable';
            if (!!this.imgLink)
                classes += ' tag-with-image';
            return classes;
        };
        CwcTag.prototype.render = function () {
            var _this = this;
            return this.link ?
                (h("a", { class: 'badge ' + this.getClassList(), href: this.link, title: this.link }, (function () { return _this.imgLink && (h("img", { src: _this.imgLink, class: "rounded-circle" })); })(), h("span", { class: "badge-text" }, this.limit(this.text, this.limitTo)), (function () { return _this.closable &&
                    h("span", { "aria-hidden": "true", class: "btn-close ", onClick: function (e) { return _this.close(e); }, title: "Close" }, "\u00D7"); })()))
                : (h("span", { class: 'badge ' + this.getClassList(), title: this.text }, (function () { return _this.imgLink && (h("img", { src: _this.imgLink, class: "rounded-circle" })); })(), h("span", { class: "badge-text" }, this.limit(this.text, this.limitTo)), (function () { return _this.closable &&
                    h("span", { "aria-hidden": "true", class: "btn-close ", onClick: function () { return _this.close(); }, title: "Close" }, "\u00D7"); })()));
        };
        Object.defineProperty(CwcTag, "is", {
            get: function () { return "cwc-tag"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CwcTag, "properties", {
            get: function () { return { "classes": { "type": String, "attr": "classes" }, "closable": { "type": Boolean, "attr": "closable" }, "close": { "method": true }, "element": { "elementRef": true }, "imgLink": { "type": String, "attr": "img-link" }, "limitTo": { "type": Number, "attr": "limit-to" }, "link": { "type": String, "attr": "link" }, "onCloseData": { "type": "Any", "attr": "on-close-data" }, "removeOnClose": { "type": Boolean, "attr": "remove-on-close" }, "rounded": { "type": Boolean, "attr": "rounded" }, "tagType": { "type": "Any", "attr": "tag-type", "watchCallbacks": ["watchHandler"] }, "text": { "type": String, "attr": "text", "watchCallbacks": ["textWatchHandler"] } }; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CwcTag, "events", {
            get: function () { return [{ "name": "tagCloseEvent", "method": "tagCloseEvent", "bubbles": true, "cancelable": true, "composed": true }]; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CwcTag, "style", {
            get: function () { return "/**style-placeholder:cwc-tag:**/"; },
            enumerable: true,
            configurable: true
        });
        return CwcTag;
    }());
    exports.CwcTag = CwcTag;
});
