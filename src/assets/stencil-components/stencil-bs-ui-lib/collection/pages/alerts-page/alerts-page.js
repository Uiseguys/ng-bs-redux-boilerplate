export class AlertsPage {
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
