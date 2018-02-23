import Pikaday from 'pikaday/pikaday.js'; // disable the listener to support shadow DOM
// import * as moment from 'moment';
export class MyInput {
    getAndPostTextValue(event) {
        if (event.currentTarget.value) {
            this.for === "integer" ? this.currentValue = JSON.parse(event.currentTarget.value) : this.currentValue = event.currentTarget.value;
        }
        else {
            this.currentValue = null;
        }
        this.postValue.emit(this.element);
    }
    ;
    getContent() {
        let content = h("input", { class: "form-control", id: this.id, type: this.for === "integer" ? "number" : "text", value: this.currentValue, onInput: (event) => this.getAndPostTextValue(event) });
        if (this.format === "date") {
            content =
                h("input", { class: "form-control", id: this.id, type: this.for === "integer" ? "number" : "text", value: this.currentValue, onChange: (event) => this.getAndPostTextValue(event), onInput: (event) => this.getAndPostTextValue(event) });
        }
        return content;
    }
    ;
    componentWillLoad() {
        if (this.for === "object") {
            this.currentValue = this.value ? this.value : "";
        }
        if (this.for === "integer") {
            this.currentValue = this.value || null;
        }
        if (this.for === "string") {
            this.currentValue = this.value ? JSON.parse(this.value) : "";
        }
    }
    ;
    componentDidLoad() {
        if (this.for === "object" && this.format === "date") {
            const picker = new Pikaday({
                field: this.element.shadowRoot.querySelector("input"),
                onSelect: function (date) {
                    console.log('disabled date formatting via moment because build broke');
                    console.log(date);
                    // self.currentDate = moment(date).format('Do MMMM YYYY');
                }
            });
            picker._onClick = null; // disable the listener to support shadow DOM
        }
    }
    ;
    render() {
        const content = this.getContent();
        return (h("div", { class: "form-group" },
            h("label", null,
                this.title,
                h("br", null),
                content,
                h("br", null))));
    }
    static get is() { return "my-input"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return { "currentDate": { "state": true }, "currentValue": { "state": true }, "element": { "elementRef": true }, "for": { "type": String, "attr": "for" }, "format": { "type": "Any", "attr": "format" }, "id": { "type": String, "attr": "id" }, "title": { "type": String, "attr": "title" }, "value": { "type": "Any", "attr": "value" } }; }
    static get events() { return [{ "name": "postValue", "method": "postValue", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:my-input:**/"; }
}
