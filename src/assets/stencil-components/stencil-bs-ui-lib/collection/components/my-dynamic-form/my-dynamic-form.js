export class MyDynamicForm {
    constructor() {
        // @Event() validateData: EventEmitter;
        this.allTitles = {};
        this.allIds = [];
        this.invalidMessage = null;
        this.changeValueChecked = false;
        this.mapping = {}; // properties of the JSON schema
    }
    postValueHandler(CustomEvent) {
        this.changeValueChecked = true;
        let fieldId = CustomEvent.detail._values.id.match(/\w+$/)[0];
        let fieldValue = CustomEvent.detail._values.currentValue === false ? null : CustomEvent.detail._values.currentValue;
        let currentFormData = this.data;
        currentFormData = this.fillData(fieldId, fieldValue, currentFormData);
        let clearedFormData = Object.assign({}, currentFormData);
        this.changedData = this.deletePropsWithoutData(clearedFormData);
    }
    ;
    /**
     * Functions for filling data object
     */
    fillData(fieldId, fieldValue, currentFormData) {
        Object.keys(currentFormData).map((key) => {
            if (key === fieldId) {
                if (Array.isArray(currentFormData[key])) {
                    currentFormData[key] = [];
                    currentFormData[key][0] = fieldValue;
                }
                else {
                    if (this.schema.properties[key] && this.schema.properties[key].format && this.schema.properties[key].format === "date") {
                        currentFormData[key].dateValue = fieldValue;
                    }
                    else {
                        currentFormData[key] = fieldValue;
                    }
                }
                return currentFormData;
            }
            if ((typeof (currentFormData[key]) === "object") && (!Array.isArray(currentFormData[key])) && (currentFormData[key]) !== null) {
                currentFormData[key] = this.fillData(fieldId, fieldValue, currentFormData[key]);
            }
        });
        return currentFormData;
    }
    ;
    /**
     * Functions for deleting properties which have value "null"
     */
    deletePropsWithoutData(clearedFormData) {
        let formData = Object.assign({}, clearedFormData);
        Object.keys(formData).map((key) => {
            if (formData[key] === null || formData[key] === false) {
                delete formData[key];
                return formData;
            }
            if ((typeof (formData[key]) === "object") && (!Array.isArray(formData[key]))) {
                formData[key] = this.deletePropsWithoutData(formData[key]);
            }
        });
        return formData;
    }
    ;
    /**
     * Call functions for validate of all form fields
     */
    validateForm() {
        let validate = this.ajv.compile(this.schema);
        let dataValidate;
        if (!this.changeValueChecked) {
            // ajv.validate is not working with nested objects, so we have to make a flat clean clone to validate it,
            // otherwise we should not use nested objects as it is working correctly without them
            let flattedForm = this.deletePropsWithoutData(this.form);
            dataValidate = validate(this.flatDataObject(flattedForm));
        }
        else {
            dataValidate = validate(this.flatDataObject(this.changedData));
        }
        dataValidate ? this.invalidMessage = null : this.invalidMessage = this.updateValidationMessage(validate);
    }
    ;
    /**
     * Function for flatting data object for validation
     */
    flatDataObject(data) {
        function flat(res, key, val, pre = '') {
            let prefix = [pre, key].filter(v => v).join('.').match(/\w+$/);
            return (typeof val === 'object' && (!Array.isArray(val)))
                ? Object.keys(val).reduce((prev, curr) => flat(prev, curr, val[curr], prefix), res)
                : Object.assign(res, { [prefix]: val });
        }
        return Object.keys(data).reduce((prev, curr) => flat(prev, curr, data[curr]), {});
    }
    updateValidationMessage(validate) {
        let unchangedMessage = this.ajv.errorsText(validate.errors).replace(/\,?\w*\.?\w*\./g, "").split(" ");
        Object.keys(this.allTitles).map((title) => {
            for (let el in unchangedMessage) {
                if (unchangedMessage[el] === title) {
                    unchangedMessage[el] = this.allTitles[title];
                }
            }
        });
        return unchangedMessage.toString().replace(/\,(?!\,)/g, " ");
    }
    ;
    /**
     * Getting fields based on properties in JSON-schema
     */
    createField(schemaProps, prop, schemaPropKey) {
        let { type } = schemaProps[prop];
        let Tag = this.mapping[type];
        let title = schemaProps[prop].title;
        let id = schemaProps[prop].$id;
        let elementType = schemaProps[prop].type;
        let elementFormat = schemaProps[prop].format || null;
        this.allTitles[prop] = title;
        if (!title) {
            schemaProps[prop].items ? title = schemaProps[prop].items.title : title = 'Unnamed field';
            this.allTitles[prop] = title;
        }
        if (schemaProps[prop].format === "date") {
            return h(Tag, { id: id, format: elementFormat, for: elementType, value: this.form[prop].dateValue || "", title: title });
        }
        return h(Tag, { id: id, format: elementFormat, for: elementType, value: (this.form[prop] || this.form[prop] === false) ? JSON.stringify(this.form[prop]) : this.form[schemaPropKey][prop], title: title }) || null;
    }
    ;
    createForm(schemaProps, schemaPropKey) {
        return Object.keys(schemaProps).map((prop) => {
            if (schemaProps[prop].hasOwnProperty("properties")) {
                schemaPropKey = prop;
                return this.createForm(schemaProps[prop].properties, schemaPropKey);
            }
            else {
                return this.createField(schemaProps, prop, schemaPropKey);
            }
        });
    }
    ;
    render() {
        /**
         * Creating form fields and saving it to the let form
         */
        let message = null;
        let schemaProps = this.schema.properties;
        let form = this.createForm(schemaProps, null);
        if (this.invalidMessage) {
            message =
                h("div", null,
                    h("span", null, this.invalidMessage));
        }
        return (h("div", null,
            h("div", null,
                form,
                message,
                " ",
                h("br", null)),
            h("br", null),
            h("input", { class: "btn", type: "submit", value: "Validate", onClick: () => this.validateForm() })));
    }
    componentWillLoad() {
        this.data = Object.assign({}, this.form);
        for (let i = 0; i < this.el.children.length; i++) {
            let child = this.el.children[i];
            let mapKey = child['for'];
            this.mapping[mapKey] = child['localName'];
        }
    }
    static get is() { return "my-dynamic-form"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return { "ajv": { "type": "Any", "attr": "ajv" }, "allIds": { "state": true }, "allTitles": { "state": true }, "changedData": { "state": true }, "changeValueChecked": { "state": true }, "data": { "state": true }, "el": { "elementRef": true }, "filledData": { "state": true }, "form": { "type": "Any", "attr": "form" }, "invalidMessage": { "state": true }, "schema": { "type": "Any", "attr": "schema" } }; }
    static get style() { return "/**style-placeholder:my-dynamic-form:**/"; }
}
