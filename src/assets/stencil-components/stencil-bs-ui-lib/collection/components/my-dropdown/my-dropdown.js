export class MyDropdown {
    getSelectValues(event) {
        this.currentValue = event.currentTarget.value;
        this.postValue.emit(this.element);
    }
    ;
    render() {
        const parsedValue = this.value ? JSON.parse(this.value) : null;
        return (h("div", { class: "input-group col-3" },
            h("select", { class: "custom-select", id: this.id, value: this.currentValue, onClick: (event) => this.getSelectValues(event) }, parsedValue && parsedValue.map((value) => h("option", null, value)))));
    }
    static get is() { return "my-dropdown"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return { "currentValue": { "state": true }, "element": { "elementRef": true }, "for": { "type": String, "attr": "for" }, "id": { "type": String, "attr": "id" }, "title": { "type": String, "attr": "title" }, "value": { "type": String, "attr": "value" } }; }
    static get events() { return [{ "name": "postValue", "method": "postValue", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:my-dropdown:**/"; }
}
