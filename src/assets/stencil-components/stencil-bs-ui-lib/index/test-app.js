/*! Built with http://stenciljs.com */
const { h, Context } = window.index;

var TestApp = (function () {
    function TestApp() {
    }
    TestApp.prototype.render = function () {
        return (h("stencil-router", null, h("ul", null, h("li", null, h("stencil-route-link", { "url": "/", "exact": true }, "Exact Base Link")), h("li", null, h("stencil-route-link", { "url": "/" }, "Base Link")), h("li", null, h("stencil-route-link", { "url": "/demo" }, "Demo Link")), h("li", null, h("stencil-route-link", { "url": "/demo2" }, "Demo2 Link")), h("li", null, h("stencil-route-link", { "url": "/demo3" }, "Demo3 Link")), h("li", null, h("stencil-route-link", { "url": "/demo3/page1" }, "Demo3 Page1 Link")), h("li", null, h("stencil-route-link", { "url": "/demo3/page2" }, "Demo3 Page2 Link"))), h("stencil-route", { "url": "/", "exact": true, "routeRender": function (props) {
                console.log(props);
                return h("span", null, "rendering /");
            } }), h("stencil-route", { "url": "/demo", "exact": true, "routeRender": function (props) {
                console.log(props);
                return h("span", null, "rendering /demo");
            } }), h("stencil-route", { "url": "/demo2", "exact": true, "routeRender": function (props) {
                console.log(props);
                return [
                    h("span", null, "rendering /demo2"),
                    h("stencil-router-redirect", { "url": "/demo3" })
                ];
            } }), h("stencil-route", { "url": "/demo3", "exact": true, "routeRender": function (props) {
                console.log(props);
                return h("span", null, "rendering /demo 3");
            } }), h("stencil-route", { "url": "/demo3", "component": "test-page", "componentProps": { "pages": ["intro/index.html"] } })));
    };
    return TestApp;
}());
TestApp.is = "test-app";

var TestPage = (function () {
    function TestPage() {
    }
    TestPage.prototype.render = function () {
        return [
            h("span", null, "Demo 3 Test Page", h("br", null)),
            h("stencil-route", { "url": "/demo3/page1", "exact": true, "routeRender": function (props) {
                    console.log(props);
                    return [
                        h("a", { "onclick": function (e) {
                                e.preventDefault();
                                props.history.push("/demo3/page2", { "blue": "blue" });
                            }, "href": "#" }, "History push to /demo3/page2"),
                        h("br", null),
                        h("span", null, "rendering /demo3/page1")
                    ];
                } }),
            h("stencil-route", { "url": "/demo3/page2", "exact": true, "routeRender": function (props) {
                    console.log(props);
                    return [
                        h("a", { "onclick": function (e) {
                                e.preventDefault();
                                props.history.push("/demo3/page1", { "red": "red" });
                            }, "href": "#" }, "History push to /demo3/page1"),
                        h("br", null),
                        h("span", null, "rendering /demo3/page2")
                    ];
                } })
        ];
    };
    return TestPage;
}());
TestPage.is = "test-page";
TestPage.properties = { "pages": { "type": "Any", "attr": "pages" } };

export { TestApp, TestPage };
