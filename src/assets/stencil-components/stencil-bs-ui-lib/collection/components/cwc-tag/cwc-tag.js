export class CwcTag {
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
    static get style() { return "/**style-placeholder:cwc-tag:**/"; }
}
