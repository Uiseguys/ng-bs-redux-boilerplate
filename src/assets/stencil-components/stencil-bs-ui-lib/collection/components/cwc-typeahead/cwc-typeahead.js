import filter from 'lodash/filter';
import get from 'lodash/get';
export class CwcTypeahead {
    constructor() {
        this.minSearchLength = 1;
        this.data = [];
        this.idValue = 'typeahead-' + Date.now();
        this.placeholder = 'Search something e.g. "Alabama"';
        this.filterValue = '';
        this.optionsShown = false;
        this.focusIndex = 0;
        this.filtered = [];
    }
    typeaheadOnSubmitHandler(result) {
        this.typeaheadOnSubmit.emit(result);
    }
    /**
     * Life cycle hooks
     */
    componentWillUpdate() {
        if (this.filterValue.length >= this.minSearchLength) {
            this.filtered = this.filter();
            if (this.filtered.length > 0)
                this.optionsShown = true;
        }
    }
    /**
     * Private functions
     */
    filter() {
        if (typeof this.data[0] == 'string')
            return this.filterStringArray(this.data);
        if (typeof this.data[0] == 'object') {
            return this.findInComplex(this.data, this.searchKey);
        }
    }
    filterStringArray(data) {
        return filter(data, value => {
            let v = typeof value == 'string'
                ? value
                : value.index;
            return v.toLowerCase().indexOf(this.filterValue.toLowerCase()) >= 0;
        });
    }
    findInComplex(data, address) {
        let temporary = [];
        temporary = data.map(value => ({
            index: get(value, address),
            data: value
        }));
        return this.filterStringArray(temporary);
    }
    /**
     * Handlers
     */
    handleInputChange(e) {
        this.filterValue = e.target.value;
    }
    handleSelect(value, index) {
        let input = document.querySelector(`#${this.idValue} input`);
        let result = typeof this.filtered[index] == 'string' ?
            this.filtered[index] :
            this.filtered[index].data;
        input.value = value;
        this.typeaheadOnSubmitHandler(result);
        this.close();
    }
    handleHover(i) {
        this.focusIndex = i;
    }
    /**
     * Public methods
     */
    close() {
        this.focusIndex = 0;
        this.filterValue = '';
        this.filtered = [];
    }
    render() {
        return (h("div", { id: this.idValue },
            h("input", { onInput: (e) => this.handleInputChange(e), type: "text", class: "form-control", placeholder: this.placeholder }),
            (this.filtered.length > 0) ? (h("div", { class: "card" }, this.filtered.map((val, i) => h("option", { class: "dropdown-item".concat((this.focusIndex == i + 1) ? ' active' : ''), onClick: (e) => this.handleSelect(e.target.value, i), onMouseEnter: () => this.handleHover(i + 1) }, typeof val == 'string' ? val : val.index)))) : (() => { })));
    }
    /**
     * Keyboard handlers
     *
     **/
    handleDownArrow(ev) {
        console.log(ev);
        if (this.focusIndex < this.filtered.length)
            this.focusIndex = this.focusIndex + 1;
    }
    handleUpArrow(ev) {
        if (this.focusIndex > 0) {
            this.focusIndex = this.focusIndex - 1;
            ev.preventDefault();
        }
    }
    handleEscape(ev) {
        console.log(ev);
        if (this.focusIndex > 0) {
            this.focusIndex = 0;
        }
        this.close();
    }
    handleEnter(ev) {
        console.log(ev);
        if (this.focusIndex > 0) {
            this.handleSelect(document.querySelectorAll(`#${this.idValue} option`)[this.focusIndex - 1].textContent, this.focusIndex - 1);
        }
    }
    static get is() { return "cwc-typeahead"; }
    static get properties() { return { "close": { "method": true }, "data": { "type": "Any", "attr": "data" }, "filterValue": { "state": true }, "focusIndex": { "state": true }, "idValue": { "type": String, "attr": "id-value" }, "minSearchLength": { "type": Number, "attr": "min-search-length" }, "optionsShown": { "state": true }, "placeholder": { "type": String, "attr": "placeholder" }, "searchKey": { "type": String, "attr": "search-key" } }; }
    static get events() { return [{ "name": "typeaheadOnSubmit", "method": "typeaheadOnSubmit", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "/**style-placeholder:cwc-typeahead:**/"; }
}
