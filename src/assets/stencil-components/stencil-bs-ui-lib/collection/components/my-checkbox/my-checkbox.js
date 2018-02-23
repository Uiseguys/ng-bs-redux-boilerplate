export class MyCheckbox {
    constructor() {
        this.currentValue = false;
    }
    /**
     * Changing value of 'checked' attribute
     * @param event
     */
    checkWatcher() {
        this.currentValue ? this.currentValue = false : this.currentValue = true;
        this.postValue.emit(this.element);
    }
    ;
    render() {
        const parsedValue = this.value ? this.value : false;
        return (h("div", { class: "form-check" },
            h("label", { class: "form-check-label" },
                this.title,
                h("br", null),
                h("input", { class: "form-check-input", id: this.id, value: `${this.currentValue}` || `${parsedValue}`, type: "checkbox", onClick: () => { this.checkWatcher(); } }),
                h("br", null),
                h("br", null))));
    }
    static get is() { return "my-checkbox"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return { "currentValue": { "state": true }, "element": { "elementRef": true }, "for": { "type": String, "attr": "for" }, "id": { "type": String, "attr": "id" }, "title": { "type": String, "attr": "title" }, "value": { "type": Boolean, "attr": "value" } }; }
    static get events() { return [{ "name": "postValue", "method": "postValue", "bubbles": true, "cancelable": true, "composed": true }]; }
}
