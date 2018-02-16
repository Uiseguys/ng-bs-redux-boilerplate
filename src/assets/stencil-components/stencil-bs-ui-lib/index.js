/*! Built with http://stenciljs.com */
(function(win, doc, appNamespace, urlNamespace, publicPath, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components) {

function init(win, doc, appNamespace, urlNamespace, publicPath, appCore, appCorePolyfilled, hydratedCssClass, components, x, y) {
    // create global namespace if it doesn't already exist
    (win[appNamespace] = win[appNamespace] || {}).components = components;
    y = components.filter(function (c) { return c[2]; }).map(function (c) { return c[0]; });
    if (y.length) {
        // auto hide components until they been fully hydrated
        // reusing the "x" and "i" variables from the args for funzies
        x = doc.createElement('style');
        x.innerHTML = y.join() + '{visibility:hidden}.' + hydratedCssClass + '{visibility:inherit}';
        x.setAttribute('data-visibility', '');
        doc.head.insertBefore(x, doc.head.firstChild);
    }
    // get this current script
    // script tag cannot use "async" attribute
    x = doc.scripts[doc.scripts.length - 1];
    if (x && x.src) {
        y = x.src.split('/').slice(0, -1);
        publicPath = (y.join('/')) + (y.length ? '/' : '') + urlNamespace + '/';
    }
    // request the core this browser needs
    // test for native support of custom elements and fetch
    // if either of those are not supported, then use the core w/ polyfills
    // also check if the page was build with ssr or not
    x = doc.createElement('script');
    x.src = publicPath + ((supportsCustomElements(win) && supportsEsModules(x) && supportsFetch(win) && supportsCssVariables(win)) ? appCore : appCorePolyfilled);
    x.setAttribute('data-path', publicPath);
    x.setAttribute('data-namespace', urlNamespace);
    doc.head.appendChild(x);
}
function supportsEsModules(scriptElm) {
    // detect static ES module support
    const staticModule = 'noModule' in scriptElm;
    if (!staticModule) {
        return false;
    }
    // detect dynamic import support
    try {
        new Function('import("")');
        return true;
    }
    catch (err) {
        return false;
    }
}
function supportsCustomElements(win) {
    return win.customElements;
}
function supportsFetch(win) {
    return win.fetch;
}
function supportsCssVariables(win) {
    return (win.CSS && win.CSS.supports && win.CSS.supports('color', 'var(--c)'));
}


init(win, doc, appNamespace, urlNamespace, publicPath, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components);

})(window, document, "index","index","/build/index/","index.core.js","es5-build-disabled.js","hydrated",[["alerts-page","alerts-page",0,[["hasAnimatableDismissibleAlert",5],["hasDismissibleAlert",5]]],["badge-page","badge-page"],["breadcrumb-page","breadcrumb-page",0,0,1],["cwc-dropdown","cwc-dropdown",1,[["close",6],["dropdownPlacement",1,1,1],["el",7],["offsetString",1,1,2],["open",6],["openState",5],["popper",5],["toggle",6],["triggerOverflow",1,1,3]]],["cwc-multiselect","cwc-multiselect",1,[["close",6],["data",1],["filterValue",5],["focusIndex",5],["idValue",1,1,2],["justAddedLabel",5],["labels",5],["minSearchLength",1,1,4],["optionsShown",5],["placeholder",1,1,2],["results",5],["searchKey",1,1,2]],0,[["destroy","destroyHandler"],["keydown.down","handleDownArrow"],["keydown.up","handleUpArrow"],["keydown.escape","handleEscape"],["keydown.enter","handleEnter"]]],["cwc-tag","cwc-tag",1,[["classes",1,1,2],["closable",1,1,3],["close",6],["element",7],["imgLink",1,1,2],["limitTo",1,1,4],["link",1,1,2],["onCloseData",1,1,1],["removeOnClose",1,1,3],["rounded",1,1,3],["tagType",1],["text",1,1,2]]],["cwc-typeahead","cwc-tag",1,[["close",6],["data",1],["filterValue",5],["focusIndex",5],["idValue",1,1,2],["minSearchLength",1,1,4],["optionsShown",5],["placeholder",1,1,2],["searchKey",1,1,2]],0,[["keydown.down","handleDownArrow"],["keydown.up","handleUpArrow"],["keydown.escape","handleEscape"],["keydown.enter","handleEnter"]]],["dropdown-page","dropdown-page",1,[["exampleAlignment",5],["examplePlacement",5],["exampleTriggerOverflow",5]]],["fcl-image","fcl-image",1,[["brokenUrl",1,1,1],["el",7],["height",1,1,1],["src",1,1,1],["width",1,1,1]]],["fcl-image-page","fcl-image"],["fcl-video-player","fcl-video-player",1,[["controls",1,1,3],["el",7],["poster",1,1,2],["toggle",5]]],["file-input-page","file-input-page"],["form-page","form-page",0,[["ajv",5],["form",5],["schema",5]],1],["list-page","list-page",1,[["users",5]],0,[["onBottomReach","customEventHandler"]]],["multiselect-page","multiselect-page",1,[["result",5]],0,[["multiselectOnSubmit","typeaheadOnSubmit"]]],["my-checkbox","my-checkbox",0,[["currentValue",5],["element",7],["for",1,1,2],["id",1,1,2],["title",1,1,2],["value",1,1,3]],1],["my-dropdown","my-dropdown",1,[["currentValue",5],["element",7],["for",1,1,2],["id",1,1,2],["title",1,1,2],["value",1,1,2]],1],["my-dynamic-form","my-dynamic-form",1,[["ajv",1,1,1],["allIds",5],["allTitles",5],["changeValueChecked",5],["changedData",5],["data",5],["el",7],["filledData",5],["form",1,1,1],["invalidMessage",5],["schema",1,1,1]],1,[["postValue","postValueHandler"]]],["my-input","my-input",1,[["currentDate",5],["currentValue",5],["element",7],["for",1,1,2],["format",1,1,1],["id",1,1,2],["title",1,1,2],["value",1,1,1]],1],["scb-alert","alerts-page",0,[["animatable",1,1,3],["dismiss",6],["dismissible",1,1,3],["el",7],["fade",5],["onDismiss",1],["show",1,1,3],["type",1,1,2]]],["scb-badge","badge-page",0,[["link",1,1,2],["pill",1,1,3],["type",1]]],["scb-breadcrumb","breadcrumb-page",0,[["items",2]]],["scb-file-input","scb-file-input",1,[["accept",1,1,2],["el",7],["element",5],["files",1],["formDataName",1,1,2],["headers",1,1,2],["maxFileSize",1,1,4],["maxFiles",1,1,4],["method",1,1,2],["noAuto",1,1,3],["nodrop",1,1,3],["target",1,1,2],["timeout",1,1,4],["type",1]],0,[["dragenter","cancelDefaultDragEnter",0,1],["dragover","cancelDefaultDragOver",0,1],["drop","onDrop",0,1]]],["scb-list","scb-list",1,[["addClass",1,1,2],["addClassEven",1,1,2],["addClassOdd",1,1,2],["bindToList",1,1,3],["bottomOffset",1,1,4],["el",7],["itemAs",1,1,2],["items",1],["itemsData",5],["loadMore",6],["template",1],["wrapperClass",1,1,2]]],["stencil-bootstrap-demo","alerts-page"],["stencil-route","stencil-route",0,[["activeRouter",3,0,0,"activeRouter"],["component",1,1,1],["componentProps",1,1,1],["exact",1,1,3],["match",5],["routeRender",1,1,1],["url",1,1,1]]],["stencil-route-link","stencil-route",0,[["activeClass",1,1,1],["activeRouter",3,0,0,"activeRouter"],["custom",1,1,3],["exact",1,1,3],["match",5],["url",1,1,1]]],["stencil-router","stencil-route",0,[["activeRouter",3,0,0,"activeRouter"],["match",5],["root",1,1,1]]],["stencil-router-redirect","stencil-route",0,[["activeRouter",3,0,0,"activeRouter"],["url",1,1,1]]],["tag-page","tag-page",1],["test-app","test-app"],["test-page","test-app",0,[["pages",1,1,1]]],["typeahead-page","typeahead-page",1,[["result",5]],0,[["typeaheadOnSubmit","typeaheadOnSubmit"]]],["video-player-page","fcl-video-player"]]);