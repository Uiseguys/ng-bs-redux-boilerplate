// import { BootstrapThemeColor } from '../../common/bootstrap-theme-color.type';
import initMarkup from '@ui-guys/stencil-markdown';
export class CwcMarkdown {
    constructor() {
        this.marked = initMarkup();
    }
    render() {
        console.log("here", this.data);
        return (h("div", { innerHTML: this.marked(this.data) }));
    }
    static get is() { return "cwc-markdown"; }
    static get properties() { return { "data": { "type": String, "attr": "data" }, "marked": { "state": true } }; }
    static get style() { return "/**style-placeholder:cwc-markdown:**/"; }
}
