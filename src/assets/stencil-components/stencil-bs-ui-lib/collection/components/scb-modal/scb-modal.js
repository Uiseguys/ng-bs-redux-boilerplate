export class ScbModal {
    constructor() {
        this.btntype = 'primary';
        this.modalTitle = 'Modal Title';
        this.modalContent = 'Modal Content';
        this.centered = true;
        this.animation = true;
        // 'large' for large modal, 'small' for small modal, '' for default modal
        this.size = '';
        // true, false or 'static'
        this.backdrop = true;
        this.keyboard = true;
        this.modalfocus = true;
        this.show = true;
    }
    openModalHandler() {
        this.onOpenModal.emit();
    }
    closeModalHandler() {
        // called when user clicks on cancel or on 'X' icon
        this.onCloseModal.emit();
    }
    render() {
        return (h("div", null,
            h("button", { class: 'btn btn-' + this.btntype, type: "button", "data-toggle": "modal", "data-target": "#modalDialog", onClick: this.openModalHandler.bind(this) }, "Open Modal"),
            h("div", { class: {
                    'modal': true,
                    'fade': this.animation,
                    'bd-example-modal-lg': this.size === 'large',
                    'bd-example-modal-sm': this.size === 'small'
                }, "data-backdrop": this.backdrop, "data-keyboard": this.keyboard, "data-focus": this.modalfocus, "data-show": this.show, id: "modalDialog", tabindex: "-1", role: "dialog", "aria-labelledby": "modalDialog", "aria-hidden": "true" },
                h("div", { class: {
                        'modal-dialog': true,
                        'modal-dialog-centered': this.centered,
                        'modal-lg': this.size === 'large',
                        'modal-sm': this.size === 'small'
                    }, role: "document" },
                    h("div", { class: "modal-content" },
                        h("div", { class: "modal-header" },
                            h("h5", { class: "modal-title", id: "exampleModalLongTitle" }, this.modalTitle),
                            h("button", { type: "button", class: "close", "data-dismiss": "modal", "aria-label": "Close", onClick: this.closeModalHandler.bind(this) },
                                h("span", { "aria-hidden": "true" }, "\u00D7"))),
                        h("div", { class: "modal-body" }, this.modalContent),
                        h("div", { class: "modal-footer" },
                            h("button", { type: "button", class: "btn btn-secondary", "data-dismiss": "modal", onClick: this.closeModalHandler.bind(this) }, "Close")))))));
    }
    static get is() { return "scb-modal"; }
    static get properties() { return { "animation": { "type": Boolean, "attr": "animation" }, "backdrop": { "type": "Any", "attr": "backdrop" }, "btntype": { "type": String, "attr": "btntype" }, "centered": { "type": Boolean, "attr": "centered" }, "el": { "elementRef": true }, "keyboard": { "type": Boolean, "attr": "keyboard" }, "modalContent": { "type": String, "attr": "modal-content" }, "modalfocus": { "type": Boolean, "attr": "modalfocus" }, "modalTitle": { "type": String, "attr": "modal-title" }, "show": { "type": Boolean, "attr": "show" }, "size": { "type": String, "attr": "size" } }; }
    static get events() { return [{ "name": "onOpenModal", "method": "onOpenModal", "bubbles": true, "cancelable": true, "composed": true }, { "name": "onCloseModal", "method": "onCloseModal", "bubbles": true, "cancelable": true, "composed": true }]; }
}
