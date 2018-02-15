export class MultiselectPage {
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
    static get style() { return "/**style-placeholder:multiselect-page:**/"; }
}
