/*! Built with http://stenciljs.com */
const { h, Context } = window.index;

class CwcTag {
    constructor() {
        this.text = '';
        this.tagType = undefined;
        this.classes = undefined;
        this.link = undefined;
        this.imgLink = undefined;
        this.closable = false;
        this.rounded = false;
        this.limitTo = 25;
    }
    close(e) {
        if (this.link)
            e.preventDefault();
        this.element.parentElement.removeChild(this.element);
    }
    textWatchHandler(val) {
        this.text = val;
    }
    watchHandler(val) {
        console.log('new tagType is: ', val);
        this.tagType = val;
    }
    limit(text, count) {
        if (text.length > count - 3) {
            text = text.slice(0, text.length - 3);
            text += '...';
        }
        return text;
    }
    getClassList() {
        let classes = '';
        if (!!this.tagType) {
            console.log('+tagType: ', this.tagType);
            classes = ' badge-' + this.tagType;
        }
        else {
            console.log('-tagType: ', this.tagType);
            classes = ' badge-primary';
        }
        console.log('inited ' + classes);
        if (this.classes)
            classes += ` ${this.classes} `;
        if (this.rounded)
            classes += ' badge-pill';
        if (this.closable)
            classes += ' closable';
        if (!!this.imgLink)
            classes += ' tag-with-image';
        return classes;
    }
    render() {
        return this.link ?
            (h("a", { class: 'badge ' + this.getClassList(), href: this.link, title: this.link },
                (() => this.imgLink && (h("img", { src: this.imgLink, class: "rounded-circle" })))(),
                h("span", { class: "badge-text" }, this.limit(this.text, this.limitTo)),
                (() => this.closable &&
                    h("span", { "aria-hidden": "true", class: "btn-close ", onClick: (e) => this.close(e), title: "Close" }, "\u00D7"))()))
            : (h("span", { class: 'badge ' + this.getClassList(), title: this.text },
                (() => this.imgLink && (h("img", { src: this.imgLink, class: "rounded-circle" })))(),
                h("span", { class: "badge-text" }, this.limit(this.text, this.limitTo)),
                (() => this.closable &&
                    h("span", { "aria-hidden": "true", class: "btn-close ", onClick: () => this.close(), title: "Close" }, "\u00D7"))()));
    }
    static get is() { return "cwc-tag"; }
    static get properties() { return { "classes": { "type": String, "attr": "classes" }, "closable": { "type": Boolean, "attr": "closable" }, "close": { "method": true }, "element": { "elementRef": true }, "imgLink": { "type": String, "attr": "img-link" }, "limitTo": { "type": Number, "attr": "limit-to" }, "link": { "type": String, "attr": "link" }, "rounded": { "type": Boolean, "attr": "rounded" }, "tagType": { "type": "Any", "watchCallbacks": ["watchHandler"] }, "text": { "type": String, "attr": "text", "watchCallbacks": ["textWatchHandler"] } }; }
    static get style() { return ".badge-pill.tag-with-image {\n  padding-left: 3px;\n}\n\n.btn-close:hover {\n  color: white;\n  cursor: pointer;\n}\n\nimg.rounded-circle {\n  max-width: 20px;\n  max-height: 20px;\n  padding: 1px 1px;\n  margin-right: 4px;\n}\n\nspan.btn-close {\n  margin: 7px 2px 3px 6px;\n  vertical-align: middle;\n}\n\nspan.badge-text {\n  vertical-align: middle;\n  margin-right: 3px;\n}"; }
}

export { CwcTag };
