/*! Built with http://stenciljs.com */
(function(win, doc, appNamespace, urlNamespace, publicPath, discoverPublicPath, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components) {

function init(win, doc, docScripts, appNamespace, urlNamespace, publicPath, discoverPublicPath, appCore, appCorePolyfilled, hydratedCssClass, components, x, y) {
    // create global namespace if it doesn't already exist
    (win[appNamespace] = win[appNamespace] || {}).components = components;
    y = components.filter(function (c) { return c[2]; }).map(function (c) { return c[0]; });
    if (y.length) {
        // auto hide components until they been fully hydrated
        // reusing the "x" and "i" variables from the args for funzies
        x = doc.createElement('style');
        x.innerHTML = y.join() + '{visibility:hidden}.' + hydratedCssClass + '{visibility:inherit}';
        x.setAttribute('data-styles', '');
        doc.head.insertBefore(x, doc.head.firstChild);
    }
    // get this current script
    // script tag cannot use "async" attribute
    if (discoverPublicPath) {
        x = docScripts[docScripts.length - 1];
        if (x && x.src) {
            y = x.src.split('/').slice(0, -1);
            publicPath = (y.join('/')) + (y.length ? '/' : '') + urlNamespace + '/';
        }
    }
    // request the core this browser needs
    // test for native support of custom elements and fetch
    // if either of those are not supported, then use the core w/ polyfills
    // also check if the page was build with ssr or not
    x = doc.createElement('script');
    x.src = publicPath + ((!urlContainsFlag(win) && supportsCustomElements(win) && supportsEsModules(x) && supportsFetch(win) && supportsCssVariables(win)) ? appCore : appCorePolyfilled);
    x.setAttribute('data-path', publicPath);
    x.setAttribute('data-namespace', urlNamespace);
    doc.head.appendChild(x);
}
function urlContainsFlag(win) {
    return win.location.search.indexOf('core=es5') > -1;
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


init(win, doc, doc.scripts, appNamespace, urlNamespace, publicPath, discoverPublicPath, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components);

})(window, document, "index","index","/build/index/",true,"index.core.js","index.core.pf.js","hydrated",[["alerts-page","alerts-page",0,[["hasAnimatableDismissibleAlert",5],["hasDismissibleAlert",5]]],["badge-page","alerts-page"],["breadcrumb-page","breadcrumb-page",0,0,1],["collapse-page","alerts-page"],["cwc-dropdown","alerts-page",1,[["close",6],["dropdownPlacement",1,"dropdown-placement",1],["el",7],["offsetString",1,"offset-string",2],["open",6],["openState",5],["popper",5],["toggle",6],["triggerOverflow",1,"trigger-overflow",3]]],["cwc-infinite-list-watcher","cwc-infinite-list-watcher",0,[["bindToList",1,"bind-to-list",3],["bottomOffset",1,"bottom-offset",4],["containerSelector",1,"container-selector",2],["debounce",1,1,4],["lastItemSelector",1,"last-item-selector",2],["listElement",5],["listSelector",1,"list-selector",2],["loadMore",6]]],["cwc-list","cwc-infinite-list-watcher",0,[["addClass",1,"add-class",2],["addClassEven",1,"add-class-even",2],["addClassFirst",1,"add-class-first",2],["addClassLast",1,"add-class-last",2],["addClassOdd",1,"add-class-odd",2],["el",7],["itemAs",1,"item-as",2],["items",1],["template",1,1,2],["wrapperClass",1,"wrapper-class",2]]],["cwc-markdown","alerts-page",1,[["data",1,1,2],["marked",5]]],["cwc-multiselect","alerts-page",1,[["close",6],["data",1],["filterValue",5],["focusIndex",5],["idValue",1,"id-value",2],["justAddedLabel",5],["labels",5],["minSearchLength",1,"min-search-length",4],["optionsShown",5],["placeholder",1,1,2],["results",5],["searchKey",1,"search-key",2]],0,[["destroy","destroyHandler"],["keydown.down","handleDownArrow"],["keydown.up","handleUpArrow"],["keydown.escape","handleEscape"],["keydown.enter","handleEnter"]]],["cwc-progress-bar","alerts-page",1,[["animated",1,1,3],["classes",1,1,2],["closable",1,1,3],["height",1,1,4],["progress",1,1,4],["progressBarType",1],["striped",1,1,3],["text",1,1,2]]],["cwc-tag","cwc-tag",1,[["classes",1,1,2],["closable",1,1,3],["close",6],["element",7],["imgLink",1,"img-link",2],["limitTo",1,"limit-to",4],["link",1,1,2],["onCloseData",1,"on-close-data",1],["removeOnClose",1,"remove-on-close",3],["rounded",1,1,3],["tagType",1],["text",1,1,2]]],["cwc-typeahead","cwc-infinite-list-watcher",1,[["close",6],["data",1],["dataAs",1,"data-as",2],["filterValue",5],["focusIndex",5],["idValue",1,"id-value",2],["minSearchLength",1,"min-search-length",4],["optionsShown",5],["placeholder",1,1,2],["searchKey",1,"search-key",2],["template",1]],0,[["keydown.down","handleDownArrow"],["keydown.up","handleUpArrow"],["keydown.escape","handleEscape"],["keydown.enter","handleEnter"]]],["dropdown-page","alerts-page",1,[["exampleAlignment",5],["examplePlacement",5],["exampleTriggerOverflow",5]]],["fcl-image","fcl-image",1,[["brokenUrl",1,"broken-url",1],["el",7],["height",1,1,1],["src",1,1,1],["width",1,1,1]]],["fcl-image-page","alerts-page"],["fcl-video-player","alerts-page",1,[["controls",1,1,3],["el",7],["poster",1,1,2],["theme",1,1,2],["thumbnail",1,1,1],["toggle",5]]],["file-input-page","file-input-page"],["form-page","breadcrumb-page",0,[["ajv",5],["form",5],["schema",5]],1],["list-page","alerts-page",1,[["lodashData",5],["users1",5],["users2",5]],0,[["onBottomReach","customEventHandler"]]],["markdown-page","alerts-page",1],["modal-page","alerts-page",0,0,0,[["onOpenModal","openModalHandler"],["onCloseModal","closeModalHandler"]]],["multiselect-page","alerts-page",1,[["result",5]],0,[["multiselectOnSubmit","typeaheadOnSubmit"]]],["my-checkbox","breadcrumb-page",0,[["currentValue",5],["element",7],["for",1,1,2],["id",1,1,2],["title",1,1,2],["value",1,1,3]],1],["my-dropdown","breadcrumb-page",1,[["currentValue",5],["element",7],["for",1,1,2],["id",1,1,2],["title",1,1,2],["value",1,1,2]],1],["my-dynamic-form","breadcrumb-page",1,[["ajv",1,1,1],["allIds",5],["allTitles",5],["changeValueChecked",5],["changedData",5],["data",5],["el",7],["filledData",5],["form",1,1,1],["invalidMessage",5],["schema",1,1,1]],1,[["postValue","postValueHandler"]]],["my-input","breadcrumb-page",1,[["currentDate",5],["currentValue",5],["element",7],["for",1,1,2],["format",1,1,1],["id",1,1,2],["title",1,1,2],["value",1,1,1]],1],["navbar-page","alerts-page"],["progress-bar-page","alerts-page",1],["scb-alert","alerts-page",0,[["animatable",1,1,3],["dismiss",6],["dismissible",1,1,3],["el",7],["fade",5],["onDismiss",1],["show",1,1,3],["type",1,1,2]]],["scb-badge","scb-badge",0,[["link",1,1,2],["pill",1,1,3],["type",1]]],["scb-breadcrumb","alerts-page",0,[["items",2]]],["scb-collapse","scb-collapse",0,[["collapseid",1,1,2],["items",1]]],["scb-file-input","file-input-page",1,[["accept",1,1,2],["el",7],["element",5],["files",1],["formDataName",1,"form-data-name",2],["headers",1,1,2],["maxFileSize",1,"max-file-size",4],["maxFiles",1,"max-files",4],["method",1,1,2],["noAuto",1,"no-auto",3],["nodrop",1,1,3],["target",1,1,2],["timeout",1,1,4],["type",1]],0,[["dragenter","cancelDefaultDragEnter",0,1],["dragover","cancelDefaultDragOver",0,1],["drop","onDrop",0,1]]],["scb-modal","alerts-page",0,[["animation",1,1,3],["backdrop",1,1,1],["btntype",1,1,2],["centered",1,1,3],["el",7],["keyboard",1,1,3],["modalContent",1,"modal-content",2],["modalTitle",1,"modal-title",2],["modalfocus",1,1,3],["show",1,1,3],["size",1,1,2]]],["scb-navbar","alerts-page",0,[["bgcolor",1,1,2],["el",7],["navbarcolor",1,1,2],["placement",1,1,2],["size",1,1,2]]],["scb-tooltip","alerts-page",1,[["delay",1,1,1],["el",7],["href",1,1,2],["offset",1,1,2],["placement",1,1,2],["target",1,1,2],["tooltip",5],["tooltipTitle",1,"tooltip-title",2],["trigger",1,1,2],["type",1,1,2]]],["stencil-bootstrap-demo","alerts-page"],["tag-page","alerts-page",1],["tooltip-page","alerts-page"],["typeahead-page","alerts-page",1,[["result",5]],0,[["typeaheadOnSubmit","typeaheadOnSubmit"]]],["video-player-page","alerts-page"]]);