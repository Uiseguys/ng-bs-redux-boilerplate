export class CwcProgressBar {
    constructor() {
        this.text = '';
        this.progressBarType = undefined;
        this.classes = undefined;
        this.closable = false;
        this.striped = false;
        this.animated = false;
        this.height = 20;
        this.progress = 0;
    }
    textWatchHandler(val) {
        this.text = val;
    }
    progressWatchHandler(val) {
        this.progress = val;
    }
    watchHandler(val) {
        this.progressBarType = val;
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
        if (!!this.progressBarType) {
            classes = ' bg-' + this.progressBarType;
        }
        else {
            classes = ' bg-primary';
        }
        if (this.striped) {
            classes += ` progress-bar-striped `;
        }
        if (this.animated) {
            classes += ` progress-bar-animated `;
        }
        if (this.classes) {
            classes += ` ${this.classes} `;
        }
        if (this.closable) {
            classes += ' closable';
        }
        return classes;
    }
    render() {
        return (h("div", null,
            h("div", { class: "progress", style: { height: this.height + 'px' } },
                h("div", { class: "progress-bar" + this.getClassList(), role: "progressbar", style: { width: this.progress + '%' } }, this.limit(this.text, this.height)))));
    }
    static get is() { return "cwc-progress-bar"; }
    static get properties() { return { "animated": { "type": Boolean, "attr": "animated" }, "classes": { "type": String, "attr": "classes" }, "closable": { "type": Boolean, "attr": "closable" }, "height": { "type": Number, "attr": "height" }, "progress": { "type": Number, "attr": "progress", "watchCallbacks": ["progressWatchHandler"] }, "progressBarType": { "type": "Any", "attr": "progress-bar-type", "watchCallbacks": ["watchHandler"] }, "striped": { "type": Boolean, "attr": "striped" }, "text": { "type": String, "attr": "text", "watchCallbacks": ["textWatchHandler"] } }; }
    static get style() { return "/**style-placeholder:cwc-progress-bar:**/"; }
}
