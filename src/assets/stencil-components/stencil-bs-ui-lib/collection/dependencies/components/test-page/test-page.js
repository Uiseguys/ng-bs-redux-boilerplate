var TestPage = /** @class */ (function () {
    function TestPage() {
    }
    TestPage.prototype.render = function () {
        return [
            h("span", 0, t("Demo 3 Test Page"),
                h("br", 0)),
            h("stencil-route", { "a": { "url": "/demo3/page1" }, "p": { "exact": true, "routeRender": function (props) {
                        console.log(props);
                        return [
                            h("a", { "o": { "click": function (e) {
                                        e.preventDefault();
                                        props.history.push('/demo3/page2', { 'blue': 'blue' });
                                    } }, "a": { "href": "#" } }, t("History push to /demo3/page2")),
                            h("br", 0),
                            h("span", 0, t("rendering /demo3/page1"))
                        ];
                    } } }),
            h("stencil-route", { "a": { "url": "/demo3/page2" }, "p": { "exact": true, "routeRender": function (props) {
                        console.log(props);
                        return [
                            h("a", { "o": { "click": function (e) {
                                        e.preventDefault();
                                        props.history.push('/demo3/page1', { 'red': 'red' });
                                    } }, "a": { "href": "#" } }, t("History push to /demo3/page1")),
                            h("br", 0),
                            h("span", 0, t("rendering /demo3/page2"))
                        ];
                    } } })
        ];
    };
    return TestPage;
}());
export { TestPage };
