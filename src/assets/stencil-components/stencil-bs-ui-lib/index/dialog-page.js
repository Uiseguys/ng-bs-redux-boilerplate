/*! Built with http://stenciljs.com */
const { h, Context } = window.index;

class DiaglogPage {
    openModalHandler() {
        console.log('openModalHandler');
    }
    closeModalHandler() {
        console.log('closeModalHandler');
    }
    render() {
        return h("scb-dialog", { title: "Info", content: "Modal Content", centered: true, animation: true, size: "", optBackdrop: true, optKeyboard: true, optFocus: true, optShow: true });
    }
    static get is() { return "dialog-page"; }
}

class ScbDialog {
    openModalHandler() {
        this.onOpenModal.emit();
    }
    closeModalHandler() {
        // called when user clicks on cancel or on 'X' icon
        this.onCloseModal.emit();
    }
    render() {
        return (h("div", null,
            h("button", { type: "button", "data-toggle": "modal", "data-target": "#modalDialog", onClick: this.openModalHandler.bind(this) }, "Open Modal"),
            h("div", { class: {
                    'modal': true,
                    'fade': this.animation,
                    'bd-example-modal-lg': this.size === 'large',
                    'bd-example-modal-sm': this.size === 'small'
                }, "data-backdrop": this.optBackdrop, "data-keyboard": this.optKeyboard, "data-focus": this.optFocus, "data-show": this.optShow, id: "modalDialog", tabindex: "-1", role: "dialog", "aria-labelledby": "modalDialog", "aria-hidden": "true" },
                h("div", { class: {
                        'modal-dialog': true,
                        'modal-dialog-centered': this.centered,
                        'modal-lg': this.size === 'large',
                        'modal-sm': this.size === 'small'
                    }, role: "document" },
                    h("div", { class: "modal-content" },
                        h("div", { class: "modal-header" },
                            h("h5", { class: "modal-title", id: "exampleModalLongTitle" }, this.title),
                            h("button", { type: "button", class: "close", "data-dismiss": "modal", "aria-label": "Close", onClick: this.closeModalHandler.bind(this) },
                                h("span", { "aria-hidden": "true" }, "\u00D7"))),
                        h("div", { class: "modal-body" }, this.content),
                        h("div", { class: "modal-footer" },
                            h("button", { type: "button", class: "btn btn-secondary", "data-dismiss": "modal", onClick: this.closeModalHandler.bind(this) }, "Close")))))));
    }
    static get is() { return "scb-dialog"; }
    static get properties() { return { "animation": { "type": Boolean, "attr": "animation" }, "centered": { "type": Boolean, "attr": "centered" }, "content": { "type": String, "attr": "content" }, "el": { "elementRef": true }, "optBackdrop": { "type": "Any", "attr": "opt-backdrop" }, "optFocus": { "type": Boolean, "attr": "opt-focus" }, "optKeyboard": { "type": Boolean, "attr": "opt-keyboard" }, "optShow": { "type": Boolean, "attr": "opt-show" }, "size": { "type": String, "attr": "size" }, "title": { "type": String, "attr": "title" } }; }
    static get events() { return [{ "name": "onOpenModal", "method": "onOpenModal", "bubbles": true, "cancelable": true, "composed": true }, { "name": "onCloseModal", "method": "onCloseModal", "bubbles": true, "cancelable": true, "composed": true }]; }
}

export { DiaglogPage as DialogPage, ScbDialog };
