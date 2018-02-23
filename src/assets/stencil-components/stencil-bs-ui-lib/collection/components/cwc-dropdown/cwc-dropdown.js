import Popper from 'popper.js';
export class StencilComponent {
    constructor() {
        this.dropdownPlacement = 'top-start';
        this.triggerOverflow = true;
        this.offsetString = '';
        this.openState = true;
    }
    componentWillUpdate() {
        this.popper.scheduleUpdate();
    }
    placementDidChangeHandler(newValue) {
        this.popper.options.placement = newValue;
    }
    overflowDidChangeHandler(newValue) {
        this.popper.options.modifiers.offset.offset = newValue ?
            '-10%r, -110%' :
            '';
    }
    componentDidLoad() {
        this.btn = this.el.children[0].children[0].children[0].children[0];
        this.content = this.el.children[0].children[1];
        this.popper = new Popper(this.btn, this.content, {
            placement: this.dropdownPlacement,
            removeOnDestroy: true,
            modifiers: {
                offset: {
                    offset: this.triggerOverflow ?
                        '-10%r, -110%' : ''
                }
            }
        });
        this.btn.addEventListener('click', () => this.toggle());
        this.close();
    }
    toggle() {
        this.openState
            ? this.close()
            : this.open();
    }
    close() {
        this.openState = false;
    }
    open() {
        this.openState = true;
        this.btn.addEventListener('blur', () => this.onBlurHandler(), true);
    }
    onBlurHandler() {
        this.close();
    }
    render() {
        return (h("div", { class: "dropup" },
            h("div", { class: "trigger" },
                h("slot", { name: "dropdown-trigger" })),
            h("div", { class: 'content dropdown-menu ' +
                    (this.openState ? 'show' : ''), onClick: () => this.toggle() },
                h("slot", { name: "dropdown-content" }))));
    }
    static get is() { return "cwc-dropdown"; }
    static get properties() { return { "close": { "method": true }, "dropdownPlacement": { "type": "Any", "attr": "dropdown-placement", "watchCallbacks": ["placementDidChangeHandler"] }, "el": { "elementRef": true }, "offsetString": { "type": String, "attr": "offset-string" }, "open": { "method": true }, "openState": { "state": true }, "popper": { "state": true }, "toggle": { "method": true }, "triggerOverflow": { "type": Boolean, "attr": "trigger-overflow", "watchCallbacks": ["overflowDidChangeHandler"] } }; }
    static get style() { return "/**style-placeholder:cwc-dropdown:**/"; }
}
