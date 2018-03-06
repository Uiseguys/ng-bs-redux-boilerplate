/*! Built with http://stenciljs.com */
index.loadBundle('./chunk2.js', ['exports'], function (exports) {
    var h = window.index.h;
    var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
    function commonjsRequire() {
        throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
    }
    function createCommonjsModule(fn, module) {
        return module = { exports: {} }, fn(module, module.exports), module.exports;
    }
    exports.commonjsGlobal = commonjsGlobal;
    exports.commonjsRequire = commonjsRequire;
    exports.createCommonjsModule = createCommonjsModule;
});
