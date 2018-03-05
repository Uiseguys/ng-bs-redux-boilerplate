/*! Built with http://stenciljs.com */
index.loadBundle("./chunk1.js", ["exports", "./chunk2.js"], function (t, e) { var r = window.index.h; var n, o, i, a, s = "object" == typeof e.commonjsGlobal && e.commonjsGlobal && e.commonjsGlobal.Object === Object && e.commonjsGlobal, c = "object" == typeof self && self && self.Object === Object && self, u = s || c || Function("return this")(), l = u.Symbol, f = Object.prototype, h = f.hasOwnProperty, d = f.toString, p = l ? l.toStringTag : void 0, b = Object.prototype.toString, v = l ? l.toStringTag : void 0, y = function (t) { return null == t ? void 0 === t ? "[object Undefined]" : "[object Null]" : v && v in Object(t) ? function (t) { var e = h.call(t, p), r = t[p]; try {
    t[p] = void 0;
    var n = !0;
}
catch (t) { } var o = d.call(t); return n && (e ? t[p] = r : delete t[p]), o; }(t) : function (t) { return b.call(t); }(t); }, g = function (t) { var e = typeof t; return null != t && ("object" == e || "function" == e); }, _ = function (t) { if (!g(t))
    return !1; var e = y(t); return "[object Function]" == e || "[object GeneratorFunction]" == e || "[object AsyncFunction]" == e || "[object Proxy]" == e; }, m = u["__core-js_shared__"], j = (n = /[^.]+$/.exec(m && m.keys && m.keys.IE_PROTO || "")) ? "Symbol(src)_1." + n : "", w = Function.prototype.toString, O = function (t) { if (null != t) {
    try {
        return w.call(t);
    }
    catch (t) { }
    try {
        return t + "";
    }
    catch (t) { }
} return ""; }, S = /^\[object .+?Constructor\]$/, C = Function.prototype, A = Object.prototype, x = C.toString, E = A.hasOwnProperty, L = RegExp("^" + x.call(E).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), I = function (t) { return !(!g(t) || (e = t, j && j in e)) && (_(t) ? L : S).test(O(t)); var e; }, z = function (t, e) { var r = function (t, e) { return null == t ? void 0 : t[e]; }(t, e); return I(r) ? r : void 0; }, P = function () { try {
    var t = z(Object, "defineProperty");
    return t({}, "", {}), t;
}
catch (t) { } }(), M = function (t, e, r) { "__proto__" == e && P ? P(t, e, { configurable: !0, enumerable: !0, value: r, writable: !0 }) : t[e] = r; }, T = function (t, e) { return t === e || t != t && e != e; }, $ = Object.prototype.hasOwnProperty, k = function (t, e, r) { var n = t[e]; $.call(t, e) && T(n, r) && (void 0 !== r || e in t) || M(t, e, r); }, R = function (t) { return t; }, V = function (t, e, r) { switch (r.length) {
    case 0: return t.call(e);
    case 1: return t.call(e, r[0]);
    case 2: return t.call(e, r[0], r[1]);
    case 3: return t.call(e, r[0], r[1], r[2]);
} return t.apply(e, r); }, D = Math.max, F = P ? function (t, e) { return P(t, "toString", { configurable: !0, enumerable: !1, value: (r = e, function () { return r; }), writable: !0 }); var r; } : R, H = Date.now, B = (o = F, i = 0, a = 0, function () { var t = H(), e = 16 - (t - a); if (a = t, e > 0) {
    if (++i >= 800)
        return arguments[0];
}
else
    i = 0; return o.apply(void 0, arguments); }), U = function (t, e) { return B(function (t, e, r) { return e = D(void 0 === e ? t.length - 1 : e, 0), function () { for (var n = arguments, o = -1, i = D(n.length - e, 0), a = Array(i); ++o < i;)
    a[o] = n[e + o]; o = -1; for (var s = Array(e + 1); ++o < e;)
    s[o] = n[o]; return s[e] = r(a), V(t, this, s); }; }(t, e, R), t + ""); }, W = function (t) { return "number" == typeof t && t > -1 && t % 1 == 0 && t <= 9007199254740991; }, N = function (t) { return null != t && W(t.length) && !_(t); }, q = /^(?:0|[1-9]\d*)$/, G = function (t, e) { return !!(e = null == e ? 9007199254740991 : e) && ("number" == typeof t || q.test(t)) && t > -1 && t % 1 == 0 && t < e; }, K = function (t, e, r) { if (!g(r))
    return !1; var n = typeof e; return !!("number" == n ? N(r) && G(e, r.length) : "string" == n && e in r) && T(r[e], t); }, J = function (t) { return null != t && "object" == typeof t; }, Q = function (t) { return J(t) && "[object Arguments]" == y(t); }, X = Object.prototype, Y = X.hasOwnProperty, Z = X.propertyIsEnumerable, tt = Q(function () { return arguments; }()) ? Q : function (t) { return J(t) && Y.call(t, "callee") && !Z.call(t, "callee"); }, et = Array.isArray, rt = function () { return !1; }, nt = e.createCommonjsModule(function (t, e) { var r = e && !e.nodeType && e, n = r && t && !t.nodeType && t, o = n && n.exports === r ? u.Buffer : void 0, i = (o ? o.isBuffer : void 0) || rt; t.exports = i; }), ot = {}; ot["[object Float32Array]"] = ot["[object Float64Array]"] = ot["[object Int8Array]"] = ot["[object Int16Array]"] = ot["[object Int32Array]"] = ot["[object Uint8Array]"] = ot["[object Uint8ClampedArray]"] = ot["[object Uint16Array]"] = ot["[object Uint32Array]"] = !0, ot["[object Arguments]"] = ot["[object Array]"] = ot["[object ArrayBuffer]"] = ot["[object Boolean]"] = ot["[object DataView]"] = ot["[object Date]"] = ot["[object Error]"] = ot["[object Function]"] = ot["[object Map]"] = ot["[object Number]"] = ot["[object Object]"] = ot["[object RegExp]"] = ot["[object Set]"] = ot["[object String]"] = ot["[object WeakMap]"] = !1; var it, at, st = e.createCommonjsModule(function (t, e) { var r = e && !e.nodeType && e, n = r && t && !t.nodeType && t, o = n && n.exports === r && s.process, i = function () { try {
    return o && o.binding && o.binding("util");
}
catch (t) { } }(); t.exports = i; }), ct = st && st.isTypedArray, ut = ct ? function (t) { return function (e) { return t(e); }; }(ct) : function (t) { return J(t) && W(t.length) && !!ot[y(t)]; }, lt = Object.prototype.hasOwnProperty, ft = function (t, e) { var r = et(t), n = !r && tt(t), o = !r && !n && nt(t), i = !r && !n && !o && ut(t), a = r || n || o || i, s = a ? function (t, e) { for (var r = -1, n = Array(t); ++r < t;)
    n[r] = e(r); return n; }(t.length, String) : [], c = s.length; for (var u in t)
    !e && !lt.call(t, u) || a && ("length" == u || o && ("offset" == u || "parent" == u) || i && ("buffer" == u || "byteLength" == u || "byteOffset" == u) || G(u, c)) || s.push(u); return s; }, ht = Object.prototype, dt = function (t) { var e = t && t.constructor; return t === ("function" == typeof e && e.prototype || ht); }, pt = Object.prototype.hasOwnProperty, bt = function (t) { if (!g(t))
    return function (t) { var e = []; if (null != t)
        for (var r in Object(t))
            e.push(r); return e; }(t); var e = dt(t), r = []; for (var n in t)
    ("constructor" != n || !e && pt.call(t, n)) && r.push(n); return r; }, vt = (it = function (t, e, r, n) { !function (t, e, r, n) { var o = !r; r || (r = {}); for (var i = -1, a = e.length; ++i < a;) {
    var s = e[i], c = n ? n(r[s], t[s], s, r, t) : void 0;
    void 0 === c && (c = t[s]), o ? M(r, s, c) : k(r, s, c);
} }(e, function (t) { return N(t) ? ft(t, !0) : bt(t); }(e), t, n); }, U(function (t, e) { var r = -1, n = e.length, o = n > 1 ? e[n - 1] : void 0, i = n > 2 ? e[2] : void 0; for (o = it.length > 3 && "function" == typeof o ? (n--, o) : void 0, i && K(e[0], e[1], i) && (o = n < 3 ? void 0 : o, n = 1), t = Object(t); ++r < n;) {
    var a = e[r];
    a && it(t, a, r, o);
} return t; })), yt = function (t, e) { return function (r) { return t(e(r)); }; }, gt = yt(Object.getPrototypeOf, Object), _t = Function.prototype, mt = Object.prototype, jt = _t.toString, wt = mt.hasOwnProperty, Ot = jt.call(Object), St = function (t) { if (!J(t))
    return !1; var e = y(t); return "[object Error]" == e || "[object DOMException]" == e || "string" == typeof t.message && "string" == typeof t.name && !function (t) { if (!J(t) || "[object Object]" != y(t))
    return !1; var e = gt(t); if (null === e)
    return !0; var r = wt.call(e, "constructor") && e.constructor; return "function" == typeof r && r instanceof r && jt.call(r) == Ot; }(t); }, Ct = U(function (t, e) { try {
    return V(t, void 0, e);
}
catch (t) {
    return St(t) ? t : new Error(t);
} }), At = function (t, e) { for (var r = -1, n = null == t ? 0 : t.length, o = Array(n); ++r < n;)
    o[r] = e(t[r], r, t); return o; }, xt = Object.prototype, Et = xt.hasOwnProperty, Lt = function (t, e, r, n) { return void 0 === t || T(t, xt[r]) && !Et.call(n, r) ? e : t; }, It = { "\\": "\\", "'": "'", "\n": "n", "\r": "r", "\u2028": "u2028", "\u2029": "u2029" }, zt = function (t) { return "\\" + It[t]; }, Pt = yt(Object.keys, Object), Mt = Object.prototype.hasOwnProperty, Tt = function (t) { return N(t) ? ft(t) : function (t) { if (!dt(t))
    return Pt(t); var e = []; for (var r in Object(t))
    Mt.call(t, r) && "constructor" != r && e.push(r); return e; }(t); }, $t = /<%=([\s\S]+?)%>/g, kt = (at = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, function (t) { return null == at ? void 0 : at[t]; }), Rt = function (t) { return "symbol" == typeof t || J(t) && "[object Symbol]" == y(t); }, Vt = l ? l.prototype : void 0, Dt = Vt ? Vt.toString : void 0, Ft = function (t) { return null == t ? "" : function t(e) { if ("string" == typeof e)
    return e; if (et(e))
    return At(e, t) + ""; if (Rt(e))
    return Dt ? Dt.call(e) : ""; var r = e + ""; return "0" == r && 1 / e == -1 / 0 ? "-0" : r; }(t); }, Ht = /[&<>"']/g, Bt = RegExp(Ht.source), Ut = { escape: /<%-([\s\S]+?)%>/g, evaluate: /<%([\s\S]+?)%>/g, interpolate: $t, variable: "", imports: { _: { escape: function (t) { return (t = Ft(t)) && Bt.test(t) ? t.replace(Ht, kt) : t; } } } }, Wt = /\b__p \+= '';/g, Nt = /\b(__p \+=) '' \+/g, qt = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Gt = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Kt = /($^)/, Jt = /['\n\r\u2028\u2029\\]/g, Qt = function (t, e, r) { var n = Ut.imports._.templateSettings || Ut; r && K(t, e, r) && (e = void 0), t = Ft(t), e = vt({}, e, n, Lt); var o, i, a, s = vt({}, e.imports, n.imports, Lt), c = Tt(s), u = (a = s, At(c, function (t) { return a[t]; })), l = 0, f = e.interpolate || Kt, h = "__p += '", d = RegExp((e.escape || Kt).source + "|" + f.source + "|" + (f === $t ? Gt : Kt).source + "|" + (e.evaluate || Kt).source + "|$", "g"), p = "sourceURL" in e ? "//# sourceURL=" + e.sourceURL + "\n" : ""; t.replace(d, function (e, r, n, a, s, c) { return n || (n = a), h += t.slice(l, c).replace(Jt, zt), r && (o = !0, h += "' +\n__e(" + r + ") +\n'"), s && (i = !0, h += "';\n" + s + ";\n__p += '"), n && (h += "' +\n((__t = (" + n + ")) == null ? '' : __t) +\n'"), l = c + e.length, e; }), h += "';\n"; var b = e.variable; b || (h = "with (obj) {\n" + h + "\n}\n"), h = (i ? h.replace(Wt, "") : h).replace(Nt, "$1").replace(qt, "$1;"), h = "function(" + (b || "obj") + ") {\n" + (b ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (o ? ", __e = _.escape" : "") + (i ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + h + "return __p\n}"; var v = Ct(function () { return Function(c, p + "return " + h).apply(void 0, u); }); if (v.source = h, St(v))
    throw v; return v; }, Xt = function (t, e) { for (var r = -1, n = null == t ? 0 : t.length, o = 0, i = []; ++r < n;) {
    var a = t[r];
    e(a, r, t) && (i[o++] = a);
} return i; }, Yt = function (t, e, r) { for (var n = -1, o = Object(t), i = r(t), a = i.length; a--;) {
    var s = i[++n];
    if (!1 === e(o[s], s, o))
        break;
} return t; }, Zt = function (t, e) { if (null == t)
    return t; if (!N(t))
    return function (t, e) { return t && Yt(t, e, Tt); }(t, e); for (var r = t.length, n = -1, o = Object(t); ++n < r && !1 !== e(o[n], n, o);)
    ; return t; }, te = function (t, e) { for (var r = t.length; r--;)
    if (T(t[r][0], e))
        return r; return -1; }, ee = Array.prototype.splice; function re(t) { var e = -1, r = null == t ? 0 : t.length; for (this.clear(); ++e < r;) {
    var n = t[e];
    this.set(n[0], n[1]);
} } re.prototype.clear = function () { this.__data__ = [], this.size = 0; }, re.prototype.delete = function (t) { var e = this.__data__, r = te(e, t); return !(r < 0 || (r == e.length - 1 ? e.pop() : ee.call(e, r, 1), --this.size, 0)); }, re.prototype.get = function (t) { var e = this.__data__, r = te(e, t); return r < 0 ? void 0 : e[r][1]; }, re.prototype.has = function (t) { return te(this.__data__, t) > -1; }, re.prototype.set = function (t, e) { var r = this.__data__, n = te(r, t); return n < 0 ? (++this.size, r.push([t, e])) : r[n][1] = e, this; }; var ne = re, oe = z(u, "Map"), ie = z(Object, "create"), ae = Object.prototype.hasOwnProperty, se = Object.prototype.hasOwnProperty; function ce(t) { var e = -1, r = null == t ? 0 : t.length; for (this.clear(); ++e < r;) {
    var n = t[e];
    this.set(n[0], n[1]);
} } ce.prototype.clear = function () { this.__data__ = ie ? ie(null) : {}, this.size = 0; }, ce.prototype.delete = function (t) { var e = this.has(t) && delete this.__data__[t]; return this.size -= e ? 1 : 0, e; }, ce.prototype.get = function (t) { var e = this.__data__; if (ie) {
    var r = e[t];
    return "__lodash_hash_undefined__" === r ? void 0 : r;
} return ae.call(e, t) ? e[t] : void 0; }, ce.prototype.has = function (t) { var e = this.__data__; return ie ? void 0 !== e[t] : se.call(e, t); }, ce.prototype.set = function (t, e) { var r = this.__data__; return this.size += this.has(t) ? 0 : 1, r[t] = ie && void 0 === e ? "__lodash_hash_undefined__" : e, this; }; var ue = ce, le = function (t, e) { var r, n, o = t.__data__; return ("string" == (n = typeof (r = e)) || "number" == n || "symbol" == n || "boolean" == n ? "__proto__" !== r : null === r) ? o["string" == typeof e ? "string" : "hash"] : o.map; }; function fe(t) { var e = -1, r = null == t ? 0 : t.length; for (this.clear(); ++e < r;) {
    var n = t[e];
    this.set(n[0], n[1]);
} } fe.prototype.clear = function () { this.size = 0, this.__data__ = { hash: new ue, map: new (oe || ne), string: new ue }; }, fe.prototype.delete = function (t) { var e = le(this, t).delete(t); return this.size -= e ? 1 : 0, e; }, fe.prototype.get = function (t) { return le(this, t).get(t); }, fe.prototype.has = function (t) { return le(this, t).has(t); }, fe.prototype.set = function (t, e) { var r = le(this, t), n = r.size; return r.set(t, e), this.size += r.size == n ? 0 : 1, this; }; var he = fe; function de(t) { var e = this.__data__ = new ne(t); this.size = e.size; } de.prototype.clear = function () { this.__data__ = new ne, this.size = 0; }, de.prototype.delete = function (t) { var e = this.__data__, r = e.delete(t); return this.size = e.size, r; }, de.prototype.get = function (t) { return this.__data__.get(t); }, de.prototype.has = function (t) { return this.__data__.has(t); }, de.prototype.set = function (t, e) { var r = this.__data__; if (r instanceof ne) {
    var n = r.__data__;
    if (!oe || n.length < 199)
        return n.push([t, e]), this.size = ++r.size, this;
    r = this.__data__ = new he(n);
} return r.set(t, e), this.size = r.size, this; }; var pe = de; function be(t) { var e = -1, r = null == t ? 0 : t.length; for (this.__data__ = new he; ++e < r;)
    this.add(t[e]); } be.prototype.add = be.prototype.push = function (t) { return this.__data__.set(t, "__lodash_hash_undefined__"), this; }, be.prototype.has = function (t) { return this.__data__.has(t); }; var ve = be, ye = function (t, e) { for (var r = -1, n = null == t ? 0 : t.length; ++r < n;)
    if (e(t[r], r, t))
        return !0; return !1; }, ge = function (t, e, r, n, o, i) { var a = 1 & r, s = t.length, c = e.length; if (s != c && !(a && c > s))
    return !1; var u = i.get(t); if (u && i.get(e))
    return u == e; var l = -1, f = !0, h = 2 & r ? new ve : void 0; for (i.set(t, e), i.set(e, t); ++l < s;) {
    var d = t[l], p = e[l];
    if (n)
        var b = a ? n(p, d, l, e, t, i) : n(d, p, l, t, e, i);
    if (void 0 !== b) {
        if (b)
            continue;
        f = !1;
        break;
    }
    if (h) {
        if (!ye(e, function (t, e) { if (a = e, !h.has(a) && (d === t || o(d, t, r, n, i)))
            return h.push(e); var a; })) {
            f = !1;
            break;
        }
    }
    else if (d !== p && !o(d, p, r, n, i)) {
        f = !1;
        break;
    }
} return i.delete(t), i.delete(e), f; }, _e = u.Uint8Array, me = function (t) { var e = -1, r = Array(t.size); return t.forEach(function (t, n) { r[++e] = [n, t]; }), r; }, je = function (t) { var e = -1, r = Array(t.size); return t.forEach(function (t) { r[++e] = t; }), r; }, we = l ? l.prototype : void 0, Oe = we ? we.valueOf : void 0, Se = Object.prototype.propertyIsEnumerable, Ce = Object.getOwnPropertySymbols, Ae = Ce ? function (t) { return null == t ? [] : (t = Object(t), Xt(Ce(t), function (e) { return Se.call(t, e); })); } : function () { return []; }, xe = function (t) { return function (t, e, r) { var n = e(t); return et(t) ? n : function (t, e) { for (var r = -1, n = e.length, o = t.length; ++r < n;)
    t[o + r] = e[r]; return t; }(n, r(t)); }(t, Tt, Ae); }, Ee = Object.prototype.hasOwnProperty, Le = z(u, "DataView"), Ie = z(u, "Promise"), ze = z(u, "Set"), Pe = z(u, "WeakMap"), Me = O(Le), Te = O(oe), $e = O(Ie), ke = O(ze), Re = O(Pe), Ve = y; (Le && "[object DataView]" != Ve(new Le(new ArrayBuffer(1))) || oe && "[object Map]" != Ve(new oe) || Ie && "[object Promise]" != Ve(Ie.resolve()) || ze && "[object Set]" != Ve(new ze) || Pe && "[object WeakMap]" != Ve(new Pe)) && (Ve = function (t) { var e = y(t), r = "[object Object]" == e ? t.constructor : void 0, n = r ? O(r) : ""; if (n)
    switch (n) {
        case Me: return "[object DataView]";
        case Te: return "[object Map]";
        case $e: return "[object Promise]";
        case ke: return "[object Set]";
        case Re: return "[object WeakMap]";
    } return e; }); var De = Ve, Fe = Object.prototype.hasOwnProperty, He = function (t, e, r, n, o, i) { var a = et(t), s = et(e), c = a ? "[object Array]" : De(t), u = s ? "[object Array]" : De(e), l = "[object Object]" == (c = "[object Arguments]" == c ? "[object Object]" : c), f = "[object Object]" == (u = "[object Arguments]" == u ? "[object Object]" : u), h = c == u; if (h && nt(t)) {
    if (!nt(e))
        return !1;
    a = !0, l = !1;
} if (h && !l)
    return i || (i = new pe), a || ut(t) ? ge(t, e, r, n, o, i) : function (t, e, r, n, o, i, a) { switch (r) {
        case "[object DataView]":
            if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
                return !1;
            t = t.buffer, e = e.buffer;
        case "[object ArrayBuffer]": return !(t.byteLength != e.byteLength || !i(new _e(t), new _e(e)));
        case "[object Boolean]":
        case "[object Date]":
        case "[object Number]": return T(+t, +e);
        case "[object Error]": return t.name == e.name && t.message == e.message;
        case "[object RegExp]":
        case "[object String]": return t == e + "";
        case "[object Map]": var s = me;
        case "[object Set]":
            var c = 1 & n;
            if (s || (s = je), t.size != e.size && !c)
                return !1;
            var u = a.get(t);
            if (u)
                return u == e;
            n |= 2, a.set(t, e);
            var l = ge(s(t), s(e), n, o, i, a);
            return a.delete(t), l;
        case "[object Symbol]": if (Oe)
            return Oe.call(t) == Oe.call(e);
    } return !1; }(t, e, c, r, n, o, i); if (!(1 & r)) {
    var d = l && Fe.call(t, "__wrapped__"), p = f && Fe.call(e, "__wrapped__");
    if (d || p) {
        var b = d ? t.value() : t, v = p ? e.value() : e;
        return i || (i = new pe), o(b, v, r, n, i);
    }
} return !!h && (i || (i = new pe), function (t, e, r, n, o, i) { var a = 1 & r, s = xe(t), c = s.length; if (c != xe(e).length && !a)
    return !1; for (var u = c; u--;) {
    var l = s[u];
    if (!(a ? l in e : Ee.call(e, l)))
        return !1;
} var f = i.get(t); if (f && i.get(e))
    return f == e; var h = !0; i.set(t, e), i.set(e, t); for (var d = a; ++u < c;) {
    var p = t[l = s[u]], b = e[l];
    if (n)
        var v = a ? n(b, p, l, e, t, i) : n(p, b, l, t, e, i);
    if (!(void 0 === v ? p === b || o(p, b, r, n, i) : v)) {
        h = !1;
        break;
    }
    d || (d = "constructor" == l);
} if (h && !d) {
    var y = t.constructor, g = e.constructor;
    y != g && "constructor" in t && "constructor" in e && !("function" == typeof y && y instanceof y && "function" == typeof g && g instanceof g) && (h = !1);
} return i.delete(t), i.delete(e), h; }(t, e, r, n, o, i)); }, Be = function t(e, r, n, o, i) { return e === r || (null == e || null == r || !J(e) && !J(r) ? e != e && r != r : He(e, r, n, o, t, i)); }, Ue = function (t) { return t == t && !g(t); }, We = function (t, e) { return function (r) { return null != r && r[t] === e && (void 0 !== e || t in Object(r)); }; }, Ne = function (t) { var e = function (t) { for (var e = Tt(t), r = e.length; r--;) {
    var n = e[r], o = t[n];
    e[r] = [n, o, Ue(o)];
} return e; }(t); return 1 == e.length && e[0][2] ? We(e[0][0], e[0][1]) : function (r) { return r === t || function (t, e, r, n) { var o = r.length, i = o, a = !n; if (null == t)
    return !i; for (t = Object(t); o--;) {
    var s = r[o];
    if (a && s[2] ? s[1] !== t[s[0]] : !(s[0] in t))
        return !1;
} for (; ++o < i;) {
    var c = (s = r[o])[0], u = t[c], l = s[1];
    if (a && s[2]) {
        if (void 0 === u && !(c in t))
            return !1;
    }
    else {
        var f = new pe;
        if (n)
            var h = n(u, l, c, t, e, f);
        if (!(void 0 === h ? Be(l, u, 3, n, f) : h))
            return !1;
    }
} return !0; }(r, t, e); }; }, qe = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Ge = /^\w*$/, Ke = function (t, e) { if (et(t))
    return !1; var r = typeof t; return !("number" != r && "symbol" != r && "boolean" != r && null != t && !Rt(t)) || Ge.test(t) || !qe.test(t) || null != e && t in Object(e); }, Je = "Expected a function"; function Qe(t, e) { if ("function" != typeof t || null != e && "function" != typeof e)
    throw new TypeError(Je); var r = function () { var n = arguments, o = e ? e.apply(this, n) : n[0], i = r.cache; if (i.has(o))
    return i.get(o); var a = t.apply(this, n); return r.cache = i.set(o, a) || i, a; }; return r.cache = new (Qe.Cache || he), r; } Qe.Cache = he; var Xe, Ye, Ze = /^\./, tr = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, er = /\\(\\)?/g, rr = (Xe = Qe(function (t) { var e = []; return Ze.test(t) && e.push(""), t.replace(tr, function (t, r, n, o) { e.push(n ? o.replace(er, "$1") : r || t); }), e; }, function (t) { return 500 === Ye.size && Ye.clear(), t; }), Ye = Xe.cache, Xe), nr = function (t, e) { return et(t) ? t : Ke(t, e) ? [t] : rr(Ft(t)); }, or = function (t) { if ("string" == typeof t || Rt(t))
    return t; var e = t + ""; return "0" == e && 1 / t == -1 / 0 ? "-0" : e; }, ir = function (t, e) { for (var r = 0, n = (e = nr(e, t)).length; null != t && r < n;)
    t = t[or(e[r++])]; return r && r == n ? t : void 0; }, ar = function (t, e, r) { var n = null == t ? void 0 : ir(t, e); return void 0 === n ? r : n; }, sr = function (t, e) { return null != t && e in Object(t); }, cr = function (t, e) { return null != t && function (t, e, r) { for (var n = -1, o = (e = nr(e, t)).length, i = !1; ++n < o;) {
    var a = or(e[n]);
    if (!(i = null != t && r(t, a)))
        break;
    t = t[a];
} return i || ++n != o ? i : !!(o = null == t ? 0 : t.length) && W(o) && G(a, o) && (et(t) || tt(t)); }(t, e, sr); }, ur = function (t) { return Ke(t) ? (e = or(t), function (t) { return null == t ? void 0 : t[e]; }) : function (t) { return function (e) { return ir(e, t); }; }(t); var e; }, lr = function (t) { return "function" == typeof t ? t : null == t ? R : "object" == typeof t ? et(t) ? (e = t[0], r = t[1], Ke(e) && Ue(r) ? We(or(e), r) : function (t) { var n = ar(t, e); return void 0 === n && n === r ? cr(t, e) : Be(r, n, 3); }) : Ne(t) : ur(t); var e, r; }, fr = function (t, e) { return (et(t) ? Xt : function (t, e) { var r = []; return Zt(t, function (t, n, o) { e(t, n, o) && r.push(t); }), r; })(t, lr(e)); }; t.CwcInfiniteListWatcher = /** @class */ (function () {
    function class_1() {
        this.listSelector = "", this.containerSelector = "", this.bindToList = !1, this.bottomOffset = 100, this.debounce = 300, this.debounceStatus = !1;
    }
    class_1.prototype.loadMore = function () { this.debounceStatus || (this.startDebounce(), this.onBottomReach.emit(this.listElement.id && this.listElement.id)); };
    class_1.prototype.startDebounce = function () {
        var _this = this;
        this.debounceStatus = !0, setTimeout(function () { return _this.debounceStatus = !1; }, this.debounce);
    };
    class_1.prototype.componentWillLoad = function () { console.log("WATCHER: provided selector: ", this.listSelector), this.listElement = document.querySelector(this.listSelector), console.log("WATCHER: element: ", this.listElement), this.bindToList ? this.listElement.addEventListener("scroll", this.listScrollHandler.bind(this)) : document.addEventListener("scroll", this.windowScrollHandler.bind(this)); };
    class_1.prototype.listScrollHandler = function () { this.listElement.scrollTop + this.listElement.clientHeight >= this.listElement.scrollHeight - this.bottomOffset && this.loadMore(); };
    class_1.prototype.windowScrollHandler = function () { document.querySelector("#" + this.listElement.id + " .list-item-last").getBoundingClientRect().bottom - this.bottomOffset <= window.innerHeight && this.loadMore(); };
    class_1.prototype.render = function () { return r("p", null, "Hi I'm infinite-list-watcher !;D"); };
    Object.defineProperty(class_1, "is", {
        get: function () { return "cwc-infinite-list-watcher"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "properties", {
        get: function () { return { bindToList: { type: Boolean, attr: "bind-to-list" }, bottomOffset: { type: Number, attr: "bottom-offset" }, containerSelector: { type: String, attr: "container-selector" }, debounce: { type: Number, attr: "debounce" }, listElement: { state: !0 }, listSelector: { type: String, attr: "list-selector" }, loadMore: { method: !0 } }; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "events", {
        get: function () { return [{ name: "onBottomReach", method: "onBottomReach", bubbles: !0, cancelable: !0, composed: !0 }]; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}()), t.CwcList = /** @class */ (function () {
    function class_2() {
        this.itemAs = "item", this.template = "", this.addClass = "", this.addClassFirst = "", this.addClassLast = "", this.addClassEven = "", this.addClassOdd = "", this.wrapperClass = "", this.regex = /\[\[+(.*?) ?\]\]+/g;
    }
    class_2.prototype.addListClasses = function (t, e, r) {
        if (t === void 0) { t = ""; }
        var n = t + " list-item".concat(this.addClass && " " + this.addClass);
        return 0 == e && (n += " list-item-first".concat(this.addClassFirst && " " + this.addClassFirst)), e == r - 1 && (n += " list-item-last".concat(this.addClassLast && " " + this.addClassLast)), e % 2 == 0 && (n += " list-item-even".concat(this.addClassEven && " " + this.addClassEven)), 1 == Math.abs(e % 2) && (n += " list-item-odd".concat(this.addClassOdd && " " + this.addClassOdd)), console.log("returning:  " + n + " "), n + " ";
    };
    class_2.prototype.insert = function (t, e, r) { return t.substr(0, e) + r + t.substr(e); };
    class_2.prototype.insertClassList = function (t, e) { var r = t.indexOf(">"), n = t.indexOf('class="'); return -1 !== n && n < r ? this.insert(t, t.indexOf('"', n + 7), this.addListClasses("", e, this.items.length)) : this.insert(t, r, this.addListClasses("", e, this.items.length)); };
    class_2.prototype.render = function () {
        var _this = this;
        var t = Qt(this.template), e = "";
        return this.items.map(function (r, n) {
            var o = t((_a = {}, _a[_this.itemAs] = r, _a));
            o = _this.insertClassList(o, n), e += o;
            var _a;
        }), r("div", { id: this.el.id, class: "item-list-wrapper " + this.wrapperClass, innerHTML: e });
    };
    Object.defineProperty(class_2, "is", {
        get: function () { return "cwc-list"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_2, "properties", {
        get: function () { return { addClass: { type: String, attr: "add-class" }, addClassEven: { type: String, attr: "add-class-even" }, addClassFirst: { type: String, attr: "add-class-first" }, addClassLast: { type: String, attr: "add-class-last" }, addClassOdd: { type: String, attr: "add-class-odd" }, el: { elementRef: !0 }, itemAs: { type: String, attr: "item-as" }, items: { type: "Any", attr: "items" }, template: { type: String, attr: "template" }, wrapperClass: { type: String, attr: "wrapper-class" } }; },
        enumerable: true,
        configurable: true
    });
    return class_2;
}()), t.CwcTypeahead = /** @class */ (function () {
    function class_3() {
        this.minSearchLength = 1, this.data = [], this.idValue = "typeahead-" + Date.now(), this.placeholder = 'Search something e.g. "Alabama"', this.filterValue = "", this.optionsShown = !1, this.focusIndex = 0, this.filtered = [];
    }
    class_3.prototype.typeaheadOnSubmitHandler = function (t) { this.typeaheadOnSubmit.emit(t); };
    class_3.prototype.componentWillUpdate = function () { this.filterValue.length >= this.minSearchLength && (this.filtered = this.filter(), this.filtered.length > 0 && (this.optionsShown = !0)); };
    class_3.prototype.filter = function () { return "string" == typeof this.data[0] ? this.filterStringArray(this.data) : "object" == typeof this.data[0] ? this.findInComplex(this.data, this.searchKey) : void 0; };
    class_3.prototype.filterStringArray = function (t) {
        var _this = this;
        return fr(t, function (t) { return ("string" == typeof t ? t : t.index).toLowerCase().indexOf(_this.filterValue.toLowerCase()) >= 0; });
    };
    class_3.prototype.findInComplex = function (t, e) { var r = []; return r = t.map(function (t) { return ({ index: ar(t, e), data: t }); }), this.filterStringArray(r); };
    class_3.prototype.handleInputChange = function (t) { this.filterValue = t.target.value; };
    class_3.prototype.handleSelect = function (t, e) { var r = document.querySelector("#" + this.idValue + " input"), n = "string" == typeof this.filtered[e] ? this.filtered[e] : this.filtered[e].data; r.value = t, this.typeaheadOnSubmitHandler(n), this.close(); };
    class_3.prototype.handleHover = function (t) { this.focusIndex = t; };
    class_3.prototype.close = function () { this.focusIndex = 0, this.filterValue = "", this.filtered = []; };
    class_3.prototype.render = function () {
        var _this = this;
        return r("div", { id: this.idValue }, r("input", { onInput: function (t) { return _this.handleInputChange(t); }, type: "text", class: "form-control", placeholder: this.placeholder }), this.filtered.length > 0 ? r("div", { class: "card" }, this.filtered.map(function (t, e) { return r("option", { class: "dropdown-item".concat(_this.focusIndex == e + 1 ? " active" : ""), onClick: function (t) { return _this.handleSelect(t.target.value, e); }, onMouseEnter: function () { return _this.handleHover(e + 1); } }, "string" == typeof t ? t : t.index); })) : function () { });
    };
    class_3.prototype.handleDownArrow = function (t) { console.log(t), this.focusIndex < this.filtered.length && (this.focusIndex = this.focusIndex + 1); };
    class_3.prototype.handleUpArrow = function (t) { this.focusIndex > 0 && (this.focusIndex = this.focusIndex - 1, t.preventDefault()); };
    class_3.prototype.handleEscape = function (t) { console.log(t), this.focusIndex > 0 && (this.focusIndex = 0), this.close(); };
    class_3.prototype.handleEnter = function (t) { console.log(t), this.focusIndex > 0 && this.handleSelect(document.querySelectorAll("#" + this.idValue + " option")[this.focusIndex - 1].textContent, this.focusIndex - 1); };
    Object.defineProperty(class_3, "is", {
        get: function () { return "cwc-typeahead"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_3, "properties", {
        get: function () { return { close: { method: !0 }, data: { type: "Any", attr: "data" }, filterValue: { state: !0 }, focusIndex: { state: !0 }, idValue: { type: String, attr: "id-value" }, minSearchLength: { type: Number, attr: "min-search-length" }, optionsShown: { state: !0 }, placeholder: { type: String, attr: "placeholder" }, searchKey: { type: String, attr: "search-key" } }; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_3, "events", {
        get: function () { return [{ name: "typeaheadOnSubmit", method: "typeaheadOnSubmit", bubbles: !0, cancelable: !0, composed: !0 }]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_3, "style", {
        get: function () { return "/**style-placeholder:cwc-typeahead:**/"; },
        enumerable: true,
        configurable: true
    });
    return class_3;
}()), t.filter = fr, t.get = ar; });
