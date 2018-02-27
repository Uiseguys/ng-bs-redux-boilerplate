export class ScbAlert {
    constructor() {
        this.dismissible = false;
        this.animatable = true;
        this.show = true;
    }
    toggleVisibilityHandler(event) {
        this.toggleVisibility.emit(event);
    }
    dismiss() {
        if (!this.dismissible) {
            return console.warn('This alert is not dismissible!', this.el);
        }
        /* if (!this.onDismiss) {
          return console.warn('No onDismiss callback for this alert.', this.el);
        }*/
        if (!this.animatable && this.onDismiss) {
            return this.onDismiss(this.el);
        }
        this.show = false;
        this.toggleVisibilityHandler(this.show);
        if (!this.onDismiss) {
            return;
        }
        setTimeout(() => {
            this.onDismiss(this.el);
        }, 150); // TODO Replace with configurable value?
    }
    componentWillLoad() {
        this.setShowFadeState();
    }
    render() {
        return (h("div", { class: {
                alert: true,
                [`alert-${this.type || 'info'}`]: true,
                'alert-dismissible': this.dismissible,
                show: this.animatable && this.show,
                fade: this.animatable && this.fade,
            }, role: "alert" },
            this.getDismissButton(),
            h("slot", null)));
    }
    setShowFadeState() {
        if (this.animatable) {
            this.show = true;
            this.fade = true;
        }
    }
    getDismissButton() {
        if (!this.dismissible)
            return null;
        return (h("button", { type: "button", class: "close", "aria-label": "Close", onClick: this.dismiss.bind(this) },
            h("span", { "aria-hidden": "true" }, "\u00D7")));
    }
    static get is() { return "scb-alert"; }
    static get properties() { return { "animatable": { "type": Boolean, "attr": "animatable", "watchCallbacks": ["componentWillLoad"] }, "dismiss": { "method": true }, "dismissible": { "type": Boolean, "attr": "dismissible" }, "el": { "elementRef": true }, "fade": { "state": true }, "onDismiss": { "type": "Any", "attr": "on-dismiss" }, "show": { "type": Boolean, "attr": "show" }, "type": { "type": String, "attr": "type" } }; }
    static get events() { return [{ "name": "toggleVisibility", "method": "toggleVisibility", "bubbles": true, "cancelable": true, "composed": true }]; }
}
