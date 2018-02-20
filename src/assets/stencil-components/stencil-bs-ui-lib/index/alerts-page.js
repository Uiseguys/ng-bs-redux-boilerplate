/*! Built with http://stenciljs.com */
const { h, Context } = window.index;

class AlertsPage {
    constructor() {
        this.hasAnimatableDismissibleAlert = true;
        this.hasDismissibleAlert = true;
        this.alertTypes = [
            'primary',
            'secondary',
            'success',
            'danger',
            'warning',
            'info',
            'light',
            'dark',
        ];
    }
    onAnimatableAlertDismiss() {
        this.hasAnimatableDismissibleAlert = false;
    }
    onAlertDismiss() {
        this.hasDismissibleAlert = false;
    }
    render() {
        return [
            this.alertTypes.map(type => h("scb-alert", { type: type },
                "This is a ",
                type,
                " alert-check it out!")),
            h("div", null,
                h("h2", null, "Content Projection"),
                h("h4", null, "Link Color"),
                h("scb-alert", { type: "primary" },
                    "This is a primary alert with ",
                    h("a", { href: "#", class: "alert-link" }, "an example link"),
                    ". Give it a click if you like."),
                h("h4", null, "More Content"),
                h("scb-alert", { type: "success" },
                    h("h4", { class: "alert-heading" }, "Well done!"),
                    h("p", null, "Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content."),
                    h("hr", null),
                    h("p", { class: "mb-0" }, "Whenever you need to, be sure to use margin utilities to keep things nice and tidy."))),
            h("div", { id: "dismissible-alert-container" },
                h("h2", null, "Dismissable Alerts"),
                h("h4", null, "With fade transition"),
                this.hasAnimatableDismissibleAlert
                    ? this.getDismissibleAlert(true)
                    : this.getCreateAlertButton(true),
                h("h4", null, "Without fade transition"),
                this.hasDismissibleAlert
                    ? this.getDismissibleAlert(false)
                    : this.getCreateAlertButton(false)),
        ];
    }
    getDismissibleAlert(animatable) {
        const onDismiss = () => animatable
            ? this.onAnimatableAlertDismiss()
            : this.onAlertDismiss();
        return (h("scb-alert", { type: "warning", dismissible: true, onDismiss: onDismiss.bind(this), animatable: animatable },
            h("strong", null, "Holy guacamole!"),
            " You should check in on some of those fields below."));
    }
    getCreateAlertButton(animatable) {
        const onClick = () => animatable
            ? (this.hasAnimatableDismissibleAlert = true)
            : (this.hasDismissibleAlert = true);
        return (h("button", { class: "btn btn-link", onClick: onClick.bind(this) },
            "Show ",
            animatable && 'Animatable ',
            " Dismissible Alert"));
    }
    static get is() { return "alerts-page"; }
    static get properties() { return { "hasAnimatableDismissibleAlert": { "state": true }, "hasDismissibleAlert": { "state": true } }; }
}

class ScbAlert {
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
    static get properties() { return { "animatable": { "type": Boolean, "attr": "animatable", "watchCallbacks": ["componentWillLoad"] }, "dismiss": { "method": true }, "dismissible": { "type": Boolean, "attr": "dismissible" }, "el": { "elementRef": true }, "fade": { "state": true }, "onDismiss": { "type": "Any" }, "show": { "type": Boolean, "attr": "show" }, "type": { "type": String, "attr": "type" } }; }
    static get events() { return [{ "name": "toggleVisibility", "method": "toggleVisibility", "bubbles": true, "cancelable": true, "composed": true }]; }
}

class StencilBootstrapDemo {
    render() {
        return (h("div", { class: "container-fluid" },
            h("div", { class: "row" },
                h("div", { class: "col-12 text-center" },
                    h("h1", null, "Web Components for Bootstrap 4 Beta"),
                    h("p", null,
                        "Built with ",
                        h("a", { href: "https://stenciljs.com", target: "blank" }, "Stencil"),
                        " <3"))),
            h("div", { class: "row" },
                h("div", { class: "col-12 col-md-3" },
                    h("ul", null,
                        h("li", null,
                            h("stencil-route-link", { url: "/alerts", urlMatch: ['/', '/alerts'], activeClass: "active", exact: true }, "Alerts")),
                        h("li", null,
                            h("stencil-route-link", { url: "/badge", urlMatch: ['/badge'], activeClass: "active", exact: true }, "Badge")),
                        h("li", null,
                            h("stencil-route-link", { url: "/breadcrumb", urlMatch: ['/breadcrumb'], activeClass: "active", exact: true }, "Breadcrumb")),
                        h("li", null,
                            h("stencil-route-link", { url: "/video-player", urlMatch: ['/video-player'], activeClass: "active", exact: true }, "Video Player")),
                        h("li", null,
                            h("stencil-route-link", { url: "/fcl-image", urlMatch: ['/fcl-image'], activeClass: "active", exact: true }, "Fcl Image")),
                        h("li", null,
                            h("stencil-route-link", { url: "/list", urlMatch: ['/list'], activeClass: "active", exact: true }, "List")),
                        h("li", null,
                            h("stencil-route-link", { url: "/file-input", urlMatch: ['/file-input'], activeClass: "active", exact: true }, "File Input")),
                        h("li", null,
                            h("stencil-route-link", { url: "/dropdown", urlMatch: ['/dropdown'], activeClass: "active", exact: true }, "Dropdown")),
                        h("li", null,
                            h("stencil-route-link", { url: "/typeahead", urlMatch: ['/typeahead'], activeClass: "active", exact: true }, "Typeahead")),
                        h("li", null,
                            h("stencil-route-link", { url: "/multiselect", urlMatch: ['/multiselect'], activeClass: "active", exact: true }, "Multiselect")),
                        "  ",
                        h("li", null,
                            h("stencil-route-link", { url: "/tag", urlMatch: ['/tag'], activeClass: "active", exact: true }, "Tag")),
                        h("li", null,
                            h("stencil-route-link", { url: "/form", urlMatch: ['/form'], activeClass: "active", exact: true }, "Form")),
                        h("li", null,
                            h("stencil-route-link", { url: "/dialog", urlMatch: ['/dialog'], activeClass: "active", exact: true }, "Dialog")),
                        h("li", null,
                            h("stencil-route-link", { url: "/tooltip", urlMatch: ['/tooltip'], activeClass: "active", exact: true }, "Tooltip")),
                        h("li", null,
                            h("stencil-route-link", { url: "/navbar", urlMatch: ['/navbar'], activeClass: "active", exact: true }, "Navbar")))),
                h("div", { class: "col-12 col-md-9" },
                    h("stencil-router", { id: "router" },
                        h("stencil-route", { url: ['/', '/alerts'], component: "alerts-page", exact: true }),
                        h("stencil-route", { url: ['/badge'], component: "badge-page", exact: true }),
                        h("stencil-route", { url: ['/breadcrumb'], component: "breadcrumb-page", exact: true }),
                        h("stencil-route", { url: ['/video-player'], component: "video-player-page", exact: true }),
                        h("stencil-route", { url: ['/fcl-image'], component: "fcl-image-page", exact: true }),
                        h("stencil-route", { url: ['/file-input'], component: "file-input-page", exact: true }),
                        h("stencil-route", { url: ['/list'], component: "list-page", exact: true }),
                        h("stencil-route", { url: ['/dropdown'], component: "dropdown-page", exact: true }),
                        h("stencil-route", { url: ['/typeahead'], component: "typeahead-page", exact: true }),
                        h("stencil-route", { url: ['/multiselect'], component: "multiselect-page", exact: true }),
                        " ",
                        h("stencil-route", { url: ['/tag'], component: "tag-page", exact: true }),
                        h("stencil-route", { url: ['/form'], component: "form-page", exact: true }),
                        h("stencil-route", { url: ['/dialog'], component: "dialog-page", exact: true }),
                        h("stencil-route", { url: ['/tooltip'], component: "tooltip-page", exact: true }),
                        h("stencil-route", { url: ['/navbar'], component: "navbar-page", exact: true }))))));
    }
    static get is() { return "stencil-bootstrap-demo"; }
}

export { AlertsPage, ScbAlert, StencilBootstrapDemo };
