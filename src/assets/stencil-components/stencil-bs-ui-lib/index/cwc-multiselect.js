/*! Built with http://stenciljs.com */
const { h } = window.index;

import { filter as filter_1 } from './chunk6.js';
import { get as get_1 } from './chunk2.js';

class CwcMultiselect {
    constructor() {
        this.minSearchLength = 1;
        this.data = [];
        this.idValue = 'multiselect-' + Date.now();
        this.placeholder = 'Search something e.g. "Alabama"';
        this.filterValue = '';
        this.optionsShown = false;
        this.focusIndex = 0;
        this.justAddedLabel = false;
        this.labels = [];
        this.results = [];
        this.filtered = [];
    }
    destroyHandler(event) {
        console.log('Received the custom event: ', event);
    }
    addLabel(label) {
        this.labels = [...this.labels, label];
        this.justAddedLabel = true;
    }
    addResult(result) {
        if (typeof result === 'string') {
            this.results = [...this.results, result];
        }
        else {
            this.results = [...this.results, result.data];
        }
    }
    removeResult(index) {
        this.results = this.results.filter((r, i) => { console.log(r); return i !== index; });
        this.multiselectOnSubmit.emit(this.results);
    }
    clearLabels() {
        this.labels = [];
    }
    removeLabel(label) {
        const index = this.labels.indexOf(label);
        this.removeResult(index);
        this.labels = this.labels.filter((l, i) => { console.log(l); return i !== index; });
    }
    multiselectOnSubmitHandler(result) {
        this.addLabel(result);
        this.filterValue = '';
        this.clearTextNodes();
        typeof this.filtered[this.focusIndex - 1] === 'string' ?
            this.addResult(this.filtered[this.focusIndex - 1]) :
            this.addResult(this.filtered[this.focusIndex - 1].data);
        this.multiselectOnSubmit.emit(this.results);
    }
    /**
     * Life cycle hooks
     */
    componentWillUpdate() {
        if (this.filterValue) {
            if (this.filterValue.length >= this.minSearchLength) {
                this.filtered = this.filter();
                if (this.filtered.length > 0) {
                    this.optionsShown = true;
                }
            }
        }
    }
    componentDidUpdate() {
        if (this.justAddedLabel) {
            this.setCaretPositionEnd();
            this.justAddedLabel = false;
        }
    }
    /**
     * Private functions
     */
    filter() {
        if (typeof this.data[0] === 'string')
            return this.filterStringArray(this.data);
        if (typeof this.data[0] === 'object') {
            return this.findInComplex(this.data, this.searchKey);
        }
    }
    filterStringArray(data) {
        return filter_1(data, value => {
            const v = typeof value === 'string'
                ? value
                : value.index;
            return v.toLowerCase().indexOf(this.filterValue.toLowerCase()) >= 0;
        });
    }
    findInComplex(data, address) {
        const temporary = data.map(value => ({
            index: get_1(value, address),
            data: value
        }));
        return this.filterStringArray(temporary);
    }
    getStringValue(val) {
        if (typeof val === 'string') {
            return val;
        }
        else {
            return get_1(val.data, this.searchKey);
        }
    }
    /**
     * Handlers
     */
    handleInputChange(e) {
        console.log(e);
        this.filterValue = e.data;
    }
    handleSelect(value, index) {
        const input = document.querySelector(`#${this.idValue} div.form-control`);
        input.value = value;
        const result = this.getStringValue(this.filtered[index]);
        this.multiselectOnSubmitHandler(result);
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
            h("div", { onInput: (e) => this.handleInputChange(e), class: "form-control", contentEditable: true },
                (() => {
                    return this.labels.map((label) => h("scb-badge", { contenteditable: "false" },
                        h("span", { contenteditable: false, class: "badge badge-secondary" },
                            " ",
                            this.getStringValue(label),
                            h("span", { "aria-hidden": "true", onClick: () => this.removeLabel(label) }, "\u00D7"))));
                })(),
                h("span", null, "\u00A0")),
            (() => {
                if (this.filtered.length > 0) {
                    return (h("div", { class: "card" }, this.filtered.map((val, i) => h("option", { class: "dropdown-item".concat((this.focusIndex == i + 1) ? ' active' : ''), onClick: (e) => this.handleSelect(e.target.value, i), onMouseEnter: () => this.handleHover(i + 1) }, typeof val == 'string' ? val : val.index))));
                }
            })()));
    }
    /**
     * Keyboard handlers
     *
     **/
    handleDownArrow() {
        if (this.focusIndex < this.filtered.length) {
            this.focusIndex = this.focusIndex + 1;
        }
    }
    handleUpArrow(ev) {
        if (this.focusIndex > 0) {
            this.focusIndex = this.focusIndex - 1;
            ev.preventDefault();
        }
    }
    handleEscape() {
        if (this.focusIndex > 0) {
            this.focusIndex = 0;
        }
        this.close();
    }
    handleEnter(ev) {
        if (this.focusIndex > 0) {
            this.handleSelect(document.querySelectorAll(`#${this.idValue} option`)[this.focusIndex - 1].textContent, this.focusIndex - 1);
            ev.preventDefault();
        }
    }
    /*
     DOM API functions
     */
    setCaretPositionEnd() {
        const input = document.querySelector(`#${this.idValue} div.form-control`);
        const range = document.createRange();
        range.selectNodeContents(input);
        range.collapse(false);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        // console.log('caret pos set end')
    }
    clearTextNodes() {
        const input = document.querySelector(`#${this.idValue} div.form-control`);
        console.log('input children: ', input.childNodes);
        for (let i = 0; i < input.childNodes.length; i++) {
            if (input.childNodes[i].nodeName === '#text') {
                input.removeChild(input.childNodes[i]);
            }
        }
    }
    static get is() { return "cwc-multiselect"; }
    static get properties() { return { "close": { "method": true }, "data": { "type": "Any", "attr": "data" }, "filterValue": { "state": true }, "focusIndex": { "state": true }, "idValue": { "type": String, "attr": "id-value" }, "justAddedLabel": { "state": true }, "labels": { "state": true }, "minSearchLength": { "type": Number, "attr": "min-search-length" }, "optionsShown": { "state": true }, "placeholder": { "type": String, "attr": "placeholder" }, "results": { "state": true }, "searchKey": { "type": String, "attr": "search-key" } }; }
    static get events() { return [{ "name": "multiselectOnSubmit", "method": "multiselectOnSubmit", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "cwc-typeahead option:hover {\n  cursor: pointer;\n}\n\n.badge {\n  margin-right: 3px;\n}\n\n.badge span {\n  margin-left: 3px;\n}"; }
}

class MultiselectPage {
    constructor() {
        this.complex = [
            {
                type: 'country',
                data: {
                    name: 'Austria',
                    capital: 'Vienna'
                }
            },
            {
                type: 'country',
                data: {
                    name: 'Australia',
                    capital: 'Canberra'
                }
            },
            {
                type: 'country',
                data: {
                    name: 'Argentina',
                    capital: 'Buenos Aires'
                }
            }
        ];
        this.searchString = 'data.name';
        this.complexResult = [];
        this.data = ['Alex', 'Alabama', 'Alaska', 'andreas', 'alexandro'];
    }
    typeaheadOnSubmit(e) {
        console.log('got results: ', e.detail);
        this.result = e.detail;
    }
    render() {
        return [
            h("h3", null, "Simple String[] data demo!"),
            h("cwc-multiselect", { data: this.data }),
            h("br", null),
            h("br", null),
            h("h3", null, "Complex Object[] demo!"),
            h("cwc-multiselect", { data: this.complex, searchKey: this.searchString, placeholder: "Search something e.g. 'Argentina'" }),
            h("br", null), h("h4", null, "result: "),
            h("pre", null, JSON.stringify(this.result, null, 2)),
            h("br", null), h("br", null), h("cwc-tag", { text: 'Holla tag' }),
            h("br", null), h("br", null), h("cwc-tag", { text: 'Holla link', imgLink: '../../assets/icon/favicon.ico', closable: true }),
            h("br", null), h("br", null), h("cwc-tag", { text: 'Holla rounded tag', rounded: true, closable: true }),
            h("br", null), h("br", null), h("cwc-tag", { text: 'Holla rounded link', imgLink: '../../assets/icon/favicon.ico' }),
            h("br", null), h("br", null), h("cwc-tag", { text: 'Holla rounded img tag', imgLink: '../../assets/icon/favicon.ico', rounded: true }),
            h("br", null), h("br", null), h("cwc-tag", { text: 'Holla rounded img link', limitTo: 10, imgLink: '../../assets/icon/favicon.ico', rounded: true, closable: true })
            // link='https://google.com'
            // <img src=" ../../assets/icon/favicon.ico" alt="" />
        ];
    }
    static get is() { return "multiselect-page"; }
    static get properties() { return { "result": { "state": true } }; }
    static get style() { return ""; }
}

export { CwcMultiselect, MultiselectPage };
