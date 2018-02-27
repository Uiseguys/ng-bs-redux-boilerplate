export class BreadcrumbPage {
    constructor() {
        this.breadcrumbItems = [
            { active: false, href: '/alerts', target: 'blank', title: 'Alerts' },
            { active: false, href: '/badge', target: 'blank', title: 'Badge' },
            { active: true, href: '/breadcrumb', target: 'blank', title: 'Breadcrumbs' },
        ];
    }
    render() {
        return (h("scb-breadcrumb", { items: this.breadcrumbItems }));
    }
    static get is() { return "breadcrumb-page"; }
    static get encapsulation() { return "shadow"; }
}
