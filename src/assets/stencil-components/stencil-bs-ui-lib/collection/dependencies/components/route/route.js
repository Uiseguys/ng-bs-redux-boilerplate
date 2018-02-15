var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import matchPath from '../../utils/match-path';
var Route = /** @class */ (function () {
    function Route() {
        this.unsubscribe = function () { return; };
        this.componentProps = {};
        this.exact = false;
        this.routeRender = null;
        this.match = null;
    }
    // Identify if the current route is a match.
    Route.prototype.computeMatch = function (pathname) {
        if (!pathname) {
            var location_1 = this.activeRouter.get('location');
            if (!location_1) {
                return null;
            }
            pathname = location_1.pathname;
        }
        return matchPath(pathname, {
            path: this.url,
            exact: this.exact,
            strict: true
        });
    };
    Route.prototype.componentWillLoad = function () {
        var _this = this;
        // subscribe the project's active router and listen
        // for changes. Recompute the match if any updates get
        // pushed
        this.unsubscribe = this.activeRouter.subscribe(function () {
            _this.match = _this.computeMatch();
        });
        this.match = this.computeMatch();
    };
    Route.prototype.componentWillUnmount = function () {
        // be sure to unsubscribe to the router so that we don't
        // get any memory leaks
        this.unsubscribe();
    };
    Route.prototype.render = function () {
        // If there is no activeRouter then do not render
        // Check if this route is in the matching URL (for example, a parent route)
        if (!this.activeRouter || !this.match) {
            // I would prefer to return null, but there is an error in stencil that requires this right now.
            return h("span", 0);
        }
        // component props defined in route
        // the history api
        // current match data including params
        var childProps = __assign({}, this.componentProps, { history: this.activeRouter.get('history'), match: this.match });
        // If there is a routerRender defined then use
        // that and pass the component and component props with it.
        if (this.routeRender) {
            return this.routeRender(__assign({}, childProps, { component: this.component }));
        }
        if (this.component) {
            var ChildComponent = this.component;
            // This is a temporary fix until we get the JSX transform working correctly with child components
            var vdomrender = h;
            return vdomrender(ChildComponent, { p: childProps });
        }
    };
    return Route;
}());
export { Route };
