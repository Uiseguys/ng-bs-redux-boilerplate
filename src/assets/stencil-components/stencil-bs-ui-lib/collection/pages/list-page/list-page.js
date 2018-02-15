export class ListPage {
    constructor() {
        this.users = [];
    }
    customEventHandler(event) {
        this.initUsersData();
    }
    componentWillLoad() {
        this.initUsersData();
    }
    gettemplate() {
        return (h("scb-alert", { type: "primary" },
            "This is a [item.name] alert  with ",
            h("a", { href: "#[index]", class: "alert-link" }, "an example [item.complex.name]"),
            ". Index of the component: [index]. And data2 is"));
    }
    getUserTemplate() {
        return (h("div", { class: "card col-md-6 col-sm-12" },
            h("div", { class: "card-body" },
                h("div", { class: "media" },
                    h("img", { class: "d-flex mr-3 rounded", src: "[user.picture.medium]", alt: "Generic placeholder image" }),
                    h("div", { class: "media-body" },
                        h("h5", { class: "mt-0 capitalized" }, "[user.name.first] [user.name.last]"),
                        h("div", null,
                            h("span", { class: "capitalized" }, "[user.location.city], [user.location.state],"),
                            h("span", null, " [user.location.street] ")))))));
    }
    initUsersData() {
        this.getUsers().then(users => this.users = this.users.concat(users));
    }
    getUsersPage() {
        return this.users.length / 10 + 1;
    }
    getUsers() {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            let count = this.users.length == 0
                ? 20
                : 10;
            request.open('GET', `https://randomuser.me/api/?page=${this.getUsersPage()}&results=${count}&seed=abc`, true);
            request.onload = () => {
                if (request.status >= 200 && request.status < 400) {
                    let data = JSON.parse(request.responseText);
                    let users = data.results;
                    resolve(users);
                }
                else {
                    resolve(false);
                    console.error("Users endpoint can't be reached. Status: ", request.status);
                }
            };
            request.onerror = () => console.error("Users endpoint can't be reached.");
            request.send();
        });
    }
    render() {
        return (h("div", { class: "container" },
            h("h3", null,
                "Infinite list of users with data from ",
                h("a", { href: "randomuser.me" }, "randomuser.me"),
                ": "),
            h("br", null),
            h("div", { class: "row" },
                h("scb-list", { items: this.users, itemAs: 'user', template: this.getUserTemplate(), bindToList: false, wrapperClass: 'row' }))));
    }
    static get is() { return "list-page"; }
    static get properties() { return { "users": { "state": true } }; }
    static get style() { return "/**style-placeholder:list-page:**/"; }
}
