var TestApp = /** @class */ (function () {
    function TestApp() {
    }
    TestApp.prototype.render = function () {
        return (h("stencil-router", 0,
            h("ul", 0,
                h("li", 0,
                    h("stencil-route-link", { "a": { "url": "/" }, "p": { "exact": true } }, t("Exact Base Link"))),
                h("li", 0,
                    h("stencil-route-link", { "a": { "url": "/" } }, t("Base Link"))),
                h("li", 0,
                    h("stencil-route-link", { "a": { "url": "/demo" } }, t("Demo Link"))),
                h("li", 0,
                    h("stencil-route-link", { "a": { "url": "/demo2" } }, t("Demo2 Link"))),
                h("li", 0,
                    h("stencil-route-link", { "a": { "url": "/demo3" } }, t("Demo3 Link"))),
                h("li", 0,
                    h("stencil-route-link", { "a": { "url": "/demo3/page1" } }, t("Demo3 Page1 Link"))),
                h("li", 0,
                    h("stencil-route-link", { "a": { "url": "/demo3/page2" } }, t("Demo3 Page2 Link")))),
            h("stencil-route", { "a": { "url": "/" }, "p": { "exact": true, "routeRender": function (props) {
                        console.log(props);
                        return h("span", 0, t("rendering /"));
                    } } }),
            h("stencil-route", { "a": { "url": "/demo" }, "p": { "exact": true, "routeRender": function (props) {
                        console.log(props);
                        return h("span", 0, t("rendering /demo"));
                    } } }),
            h("stencil-route", { "a": { "url": "/demo2" }, "p": { "exact": true, "routeRender": function (props) {
                        console.log(props);
                        return [
                            h("span", 0, t("rendering /demo2")),
                            h("stencil-router-redirect", { "a": { "url": "/demo3" } })
                        ];
                    } } }),
            h("stencil-route", { "a": { "url": "/demo3" }, "p": { "exact": true, "routeRender": function (props) {
                        console.log(props);
                        return h("span", 0, t("rendering /demo 3"));
                    } } }),
            h("stencil-route", { "a": { "url": "/demo3", "component": 'test-page' }, "p": { "componentProps": { "pages": ['intro/index.html'] } } })));
    };
    return TestApp;
}());
export { TestApp };
