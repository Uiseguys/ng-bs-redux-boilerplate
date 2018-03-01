export class StencilBootstrapDemo {
    constructor() {
        this.cards = [
            {
                cardHeaderId: 'navbarHeading',
                cardBodyId: 'navbarCollapse',
                cardHeaderContent: 'Navbar Component',
                cardBodyContent: '<navbar-page></navbar-page>',
                showOnInit: false
            },
            {
                cardHeaderId: 'collapseHeading',
                cardBodyId: 'collapseCollapse',
                cardHeaderContent: 'Collapse Component',
                cardBodyContent: '<collapse-page></collapse-page>',
                showOnInit: false
            },
            {
                cardHeaderId: 'tooltipHeading',
                cardBodyId: 'tooltipCollapse',
                cardHeaderContent: 'Tooltip Component',
                cardBodyContent: '<tooltip-page></tooltip-page>',
                showOnInit: false
            },
            {
                cardHeaderId: 'modalHeading',
                cardBodyId: 'modalCollapse',
                cardHeaderContent: 'Modal Component',
                cardBodyContent: '<modal-page></modal-page>',
                showOnInit: false
            },
            {
                cardHeaderId: 'videoHeaderId',
                cardBodyId: 'videoCollapse',
                cardHeaderContent: 'Video Component',
                cardBodyContent: '<video-player-page></video-player-page>',
                showOnInit: false
            },
            {
                cardHeaderId: 'alertHeaderId',
                cardBodyId: 'alertCollapse',
                cardHeaderContent: 'Alert Component',
                cardBodyContent: '<alerts-page></alerts-page>',
                showOnInit: false
            },
            {
                cardHeaderId: 'badgeHeaderId',
                cardBodyId: 'badgeCollapse',
                cardHeaderContent: 'Badge Component',
                cardBodyContent: '<badge-page></badge-page>',
                showOnInit: false
            },
            {
                cardHeaderId: 'breadcrumbHeaderId',
                cardBodyId: 'breadcrumbCollapse',
                cardHeaderContent: 'Breadcrumb Component',
                cardBodyContent: '<breadcrumb-page></breadcrumb-page>',
                showOnInit: false
            },
            {
                cardHeaderId: 'dropdownHeaderId',
                cardBodyId: 'dropdownCollapse',
                cardHeaderContent: 'Dropdown Component',
                cardBodyContent: '<dropdown-page></dropdown-page>',
                showOnInit: false
            },
            {
                cardHeaderId: 'fclImageHeaderId',
                cardBodyId: 'fclImageCollapse',
                cardHeaderContent: 'Fcl Image Component',
                cardBodyContent: '<fcl-image-page></fcl-image-page>',
                showOnInit: false
            },
            {
                cardHeaderId: 'formHeaderId',
                cardBodyId: 'formCollapse',
                cardHeaderContent: 'Form Component',
                cardBodyContent: '<form-page></form-page>',
                showOnInit: false
            },
            {
                cardHeaderId: 'listHeaderId',
                cardBodyId: 'listCollapse',
                cardHeaderContent: 'List Component',
                cardBodyContent: '<list-page></list-page>',
                showOnInit: false
            },
            {
                cardHeaderId: 'multiselectHeaderId',
                cardBodyId: 'multiselectCollapse',
                cardHeaderContent: 'Multiselect Component',
                cardBodyContent: '<multiselect-page></list-page>',
                showOnInit: false
            },
            {
                cardHeaderId: 'tagHeaderId',
                cardBodyId: 'tagCollapse',
                cardHeaderContent: 'Tag Component',
                cardBodyContent: '<tag-page></list-page>',
                showOnInit: false
            },
            {
                cardHeaderId: 'markdownHeaderId',
                cardBodyId: 'markdownCollapse',
                cardHeaderContent: 'Markdown Component',
                cardBodyContent: '<markdown-page></list-page>',
                showOnInit: false
            },
            {
                cardHeaderId: 'typeaHeadHeaderId',
                cardBodyId: 'typeaHeadCollapse',
                cardHeaderContent: 'Typeahead Component',
                cardBodyContent: '<typeahead-page></list-page>',
                showOnInit: false
            }
        ];
    }
    render() {
        return (h("div", { class: "container-fluid" },
            h("div", { class: "row" },
                h("div", { class: "col-12 text-center" },
                    h("h1", null, "Web Components for Bootstrap 4 Beta"),
                    h("p", null,
                        "Built with ",
                        h("a", { href: "https://stenciljs.com", target: "blank" }, "Stencil"),
                        " <3"))),
            h("div", { class: "row" },
                h("div", { class: "col-lg-12" },
                    h("scb-collapse", { collapseid: "mainCollapse", items: this.cards })))));
    }
    static get is() { return "stencil-bootstrap-demo"; }
}
