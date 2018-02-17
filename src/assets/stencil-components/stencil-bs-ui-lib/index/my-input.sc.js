/*! Built with http://stenciljs.com */
const { h, Context } = window.index;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var hookCallback;

function hooks () {
    return hookCallback.apply(null, arguments);
}

// This is done to register the method called with moment()
// without creating circular dependencies.
function setHookCallback (callback) {
    hookCallback = callback;
}

function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
}

function isObject(input) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return input != null && Object.prototype.toString.call(input) === '[object Object]';
}

function isObjectEmpty(obj) {
    if (Object.getOwnPropertyNames) {
        return (Object.getOwnPropertyNames(obj).length === 0);
    } else {
        var k;
        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                return false;
            }
        }
        return true;
    }
}

function isUndefined(input) {
    return input === void 0;
}

function isNumber(input) {
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
}

function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
}

function map(arr, fn) {
    var res = [], i;
    for (i = 0; i < arr.length; ++i) {
        res.push(fn(arr[i], i));
    }
    return res;
}

function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
}

function extend(a, b) {
    for (var i in b) {
        if (hasOwnProp(b, i)) {
            a[i] = b[i];
        }
    }

    if (hasOwnProp(b, 'toString')) {
        a.toString = b.toString;
    }

    if (hasOwnProp(b, 'valueOf')) {
        a.valueOf = b.valueOf;
    }

    return a;
}

function createUTC (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, true).utc();
}

function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
        empty           : false,
        unusedTokens    : [],
        unusedInput     : [],
        overflow        : -2,
        charsLeftOver   : 0,
        nullInput       : false,
        invalidMonth    : null,
        invalidFormat   : false,
        userInvalidated : false,
        iso             : false,
        parsedDateParts : [],
        meridiem        : null,
        rfc2822         : false,
        weekdayMismatch : false
    };
}

function getParsingFlags(m) {
    if (m._pf == null) {
        m._pf = defaultParsingFlags();
    }
    return m._pf;
}

var some;
if (Array.prototype.some) {
    some = Array.prototype.some;
} else {
    some = function (fun) {
        var t = Object(this);
        var len = t.length >>> 0;

        for (var i = 0; i < len; i++) {
            if (i in t && fun.call(this, t[i], i, t)) {
                return true;
            }
        }

        return false;
    };
}

function isValid(m) {
    if (m._isValid == null) {
        var flags = getParsingFlags(m);
        var parsedParts = some.call(flags.parsedDateParts, function (i) {
            return i != null;
        });
        var isNowValid = !isNaN(m._d.getTime()) &&
            flags.overflow < 0 &&
            !flags.empty &&
            !flags.invalidMonth &&
            !flags.invalidWeekday &&
            !flags.weekdayMismatch &&
            !flags.nullInput &&
            !flags.invalidFormat &&
            !flags.userInvalidated &&
            (!flags.meridiem || (flags.meridiem && parsedParts));

        if (m._strict) {
            isNowValid = isNowValid &&
                flags.charsLeftOver === 0 &&
                flags.unusedTokens.length === 0 &&
                flags.bigHour === undefined;
        }

        if (Object.isFrozen == null || !Object.isFrozen(m)) {
            m._isValid = isNowValid;
        }
        else {
            return isNowValid;
        }
    }
    return m._isValid;
}

function createInvalid (flags) {
    var m = createUTC(NaN);
    if (flags != null) {
        extend(getParsingFlags(m), flags);
    }
    else {
        getParsingFlags(m).userInvalidated = true;
    }

    return m;
}

// Plugins that add properties should also add the key here (null value),
// so we can properly clone ourselves.
var momentProperties = hooks.momentProperties = [];

function copyConfig(to, from) {
    var i, prop, val;

    if (!isUndefined(from._isAMomentObject)) {
        to._isAMomentObject = from._isAMomentObject;
    }
    if (!isUndefined(from._i)) {
        to._i = from._i;
    }
    if (!isUndefined(from._f)) {
        to._f = from._f;
    }
    if (!isUndefined(from._l)) {
        to._l = from._l;
    }
    if (!isUndefined(from._strict)) {
        to._strict = from._strict;
    }
    if (!isUndefined(from._tzm)) {
        to._tzm = from._tzm;
    }
    if (!isUndefined(from._isUTC)) {
        to._isUTC = from._isUTC;
    }
    if (!isUndefined(from._offset)) {
        to._offset = from._offset;
    }
    if (!isUndefined(from._pf)) {
        to._pf = getParsingFlags(from);
    }
    if (!isUndefined(from._locale)) {
        to._locale = from._locale;
    }

    if (momentProperties.length > 0) {
        for (i = 0; i < momentProperties.length; i++) {
            prop = momentProperties[i];
            val = from[prop];
            if (!isUndefined(val)) {
                to[prop] = val;
            }
        }
    }

    return to;
}

var updateInProgress = false;

// Moment prototype object
function Moment(config) {
    copyConfig(this, config);
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);
    if (!this.isValid()) {
        this._d = new Date(NaN);
    }
    // Prevent infinite loop in case updateOffset creates new moment
    // objects.
    if (updateInProgress === false) {
        updateInProgress = true;
        hooks.updateOffset(this);
        updateInProgress = false;
    }
}

function isMoment (obj) {
    return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
}

function absFloor (number) {
    if (number < 0) {
        // -0 -> 0
        return Math.ceil(number) || 0;
    } else {
        return Math.floor(number);
    }
}

function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
        value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        value = absFloor(coercedNumber);
    }

    return value;
}

// compare two arrays, return the number of differences
function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length),
        lengthDiff = Math.abs(array1.length - array2.length),
        diffs = 0,
        i;
    for (i = 0; i < len; i++) {
        if ((dontConvert && array1[i] !== array2[i]) ||
            (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
            diffs++;
        }
    }
    return diffs + lengthDiff;
}

function warn(msg) {
    if (hooks.suppressDeprecationWarnings === false &&
            (typeof console !==  'undefined') && console.warn) {
        console.warn('Deprecation warning: ' + msg);
    }
}

function deprecate(msg, fn) {
    var firstTime = true;

    return extend(function () {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(null, msg);
        }
        if (firstTime) {
            var args = [];
            var arg;
            for (var i = 0; i < arguments.length; i++) {
                arg = '';
                if (typeof arguments[i] === 'object') {
                    arg += '\n[' + i + '] ';
                    for (var key in arguments[0]) {
                        arg += key + ': ' + arguments[0][key] + ', ';
                    }
                    arg = arg.slice(0, -2); // Remove trailing comma and space
                } else {
                    arg = arguments[i];
                }
                args.push(arg);
            }
            warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
            firstTime = false;
        }
        return fn.apply(this, arguments);
    }, fn);
}

var deprecations = {};

function deprecateSimple(name, msg) {
    if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(name, msg);
    }
    if (!deprecations[name]) {
        warn(msg);
        deprecations[name] = true;
    }
}

hooks.suppressDeprecationWarnings = false;
hooks.deprecationHandler = null;

function isFunction(input) {
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
}

function set (config) {
    var prop, i;
    for (i in config) {
        prop = config[i];
        if (isFunction(prop)) {
            this[i] = prop;
        } else {
            this['_' + i] = prop;
        }
    }
    this._config = config;
    // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
    // TODO: Remove "ordinalParse" fallback in next major release.
    this._dayOfMonthOrdinalParseLenient = new RegExp(
        (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
            '|' + (/\d{1,2}/).source);
}

function mergeConfigs(parentConfig, childConfig) {
    var res = extend({}, parentConfig), prop;
    for (prop in childConfig) {
        if (hasOwnProp(childConfig, prop)) {
            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                res[prop] = {};
                extend(res[prop], parentConfig[prop]);
                extend(res[prop], childConfig[prop]);
            } else if (childConfig[prop] != null) {
                res[prop] = childConfig[prop];
            } else {
                delete res[prop];
            }
        }
    }
    for (prop in parentConfig) {
        if (hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])) {
            // make sure changes to properties don't modify parent config
            res[prop] = extend({}, res[prop]);
        }
    }
    return res;
}

function Locale(config) {
    if (config != null) {
        this.set(config);
    }
}

var keys;

if (Object.keys) {
    keys = Object.keys;
} else {
    keys = function (obj) {
        var i, res = [];
        for (i in obj) {
            if (hasOwnProp(obj, i)) {
                res.push(i);
            }
        }
        return res;
    };
}

var defaultCalendar = {
    sameDay : '[Today at] LT',
    nextDay : '[Tomorrow at] LT',
    nextWeek : 'dddd [at] LT',
    lastDay : '[Yesterday at] LT',
    lastWeek : '[Last] dddd [at] LT',
    sameElse : 'L'
};

function calendar (key, mom, now) {
    var output = this._calendar[key] || this._calendar['sameElse'];
    return isFunction(output) ? output.call(mom, now) : output;
}

var defaultLongDateFormat = {
    LTS  : 'h:mm:ss A',
    LT   : 'h:mm A',
    L    : 'MM/DD/YYYY',
    LL   : 'MMMM D, YYYY',
    LLL  : 'MMMM D, YYYY h:mm A',
    LLLL : 'dddd, MMMM D, YYYY h:mm A'
};

function longDateFormat (key) {
    var format = this._longDateFormat[key],
        formatUpper = this._longDateFormat[key.toUpperCase()];

    if (format || !formatUpper) {
        return format;
    }

    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
        return val.slice(1);
    });

    return this._longDateFormat[key];
}

var defaultInvalidDate = 'Invalid date';

function invalidDate () {
    return this._invalidDate;
}

var defaultOrdinal = '%d';
var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

function ordinal (number) {
    return this._ordinal.replace('%d', number);
}

var defaultRelativeTime = {
    future : 'in %s',
    past   : '%s ago',
    s  : 'a few seconds',
    ss : '%d seconds',
    m  : 'a minute',
    mm : '%d minutes',
    h  : 'an hour',
    hh : '%d hours',
    d  : 'a day',
    dd : '%d days',
    M  : 'a month',
    MM : '%d months',
    y  : 'a year',
    yy : '%d years'
};

function relativeTime (number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return (isFunction(output)) ?
        output(number, withoutSuffix, string, isFuture) :
        output.replace(/%d/i, number);
}

function pastFuture (diff, output) {
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
}

var aliases = {};

function addUnitAlias (unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
}

function normalizeUnits(units) {
    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
}

function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
        normalizedProp,
        prop;

    for (prop in inputObject) {
        if (hasOwnProp(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop];
            }
        }
    }

    return normalizedInput;
}

var priorities = {};

function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
}

function getPrioritizedUnits(unitsObj) {
    var units = [];
    for (var u in unitsObj) {
        units.push({unit: u, priority: priorities[u]});
    }
    units.sort(function (a, b) {
        return a.priority - b.priority;
    });
    return units;
}

function zeroFill(number, targetLength, forceSign) {
    var absNumber = '' + Math.abs(number),
        zerosToFill = targetLength - absNumber.length,
        sign = number >= 0;
    return (sign ? (forceSign ? '+' : '') : '-') +
        Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}

var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

var formatFunctions = {};

var formatTokenFunctions = {};

// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }
function addFormatToken (token, padded, ordinal, callback) {
    var func = callback;
    if (typeof callback === 'string') {
        func = function () {
            return this[callback]();
        };
    }
    if (token) {
        formatTokenFunctions[token] = func;
    }
    if (padded) {
        formatTokenFunctions[padded[0]] = function () {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
        };
    }
    if (ordinal) {
        formatTokenFunctions[ordinal] = function () {
            return this.localeData().ordinal(func.apply(this, arguments), token);
        };
    }
}

function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|\]$/g, '');
    }
    return input.replace(/\\/g, '');
}

function makeFormatFunction(format) {
    var array = format.match(formattingTokens), i, length;

    for (i = 0, length = array.length; i < length; i++) {
        if (formatTokenFunctions[array[i]]) {
            array[i] = formatTokenFunctions[array[i]];
        } else {
            array[i] = removeFormattingTokens(array[i]);
        }
    }

    return function (mom) {
        var output = '', i;
        for (i = 0; i < length; i++) {
            output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
        }
        return output;
    };
}

// format date using native date object
function formatMoment(m, format) {
    if (!m.isValid()) {
        return m.localeData().invalidDate();
    }

    format = expandFormat(format, m.localeData());
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

    return formatFunctions[format](m);
}

function expandFormat(format, locale) {
    var i = 5;

    function replaceLongDateFormatTokens(input) {
        return locale.longDateFormat(input) || input;
    }

    localFormattingTokens.lastIndex = 0;
    while (i >= 0 && localFormattingTokens.test(format)) {
        format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
        localFormattingTokens.lastIndex = 0;
        i -= 1;
    }

    return format;
}

var match1         = /\d/;            //       0 - 9
var match2         = /\d\d/;          //      00 - 99
var match3         = /\d{3}/;         //     000 - 999
var match4         = /\d{4}/;         //    0000 - 9999
var match6         = /[+-]?\d{6}/;    // -999999 - 999999
var match1to2      = /\d\d?/;         //       0 - 99
var match3to4      = /\d\d\d\d?/;     //     999 - 9999
var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
var match1to3      = /\d{1,3}/;       //       0 - 999
var match1to4      = /\d{1,4}/;       //       0 - 9999
var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

var matchUnsigned  = /\d+/;           //       0 - inf
var matchSigned    = /[+-]?\d+/;      //    -inf - inf

var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

// any word (or two) characters or numbers including two/three word month in arabic.
// includes scottish gaelic two word and hyphenated months
var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;


var regexes = {};

function addRegexToken (token, regex, strictRegex) {
    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
        return (isStrict && strictRegex) ? strictRegex : regex;
    };
}

function getParseRegexForToken (token, config) {
    if (!hasOwnProp(regexes, token)) {
        return new RegExp(unescapeFormat(token));
    }

    return regexes[token](config._strict, config._locale);
}

// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function unescapeFormat(s) {
    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;
    }));
}

function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

var tokens = {};

function addParseToken (token, callback) {
    var i, func = callback;
    if (typeof token === 'string') {
        token = [token];
    }
    if (isNumber(callback)) {
        func = function (input, array) {
            array[callback] = toInt(input);
        };
    }
    for (i = 0; i < token.length; i++) {
        tokens[token[i]] = func;
    }
}

function addWeekParseToken (token, callback) {
    addParseToken(token, function (input, array, config, token) {
        config._w = config._w || {};
        callback(input, config._w, config, token);
    });
}

function addTimeToArrayFromToken(token, input, config) {
    if (input != null && hasOwnProp(tokens, token)) {
        tokens[token](input, config._a, config, token);
    }
}

var YEAR = 0;
var MONTH = 1;
var DATE = 2;
var HOUR = 3;
var MINUTE = 4;
var SECOND = 5;
var MILLISECOND = 6;
var WEEK = 7;
var WEEKDAY = 8;

// FORMATTING

addFormatToken('Y', 0, 0, function () {
    var y = this.year();
    return y <= 9999 ? '' + y : '+' + y;
});

addFormatToken(0, ['YY', 2], 0, function () {
    return this.year() % 100;
});

addFormatToken(0, ['YYYY',   4],       0, 'year');
addFormatToken(0, ['YYYYY',  5],       0, 'year');
addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

// ALIASES

addUnitAlias('year', 'y');

// PRIORITIES

addUnitPriority('year', 1);

// PARSING

addRegexToken('Y',      matchSigned);
addRegexToken('YY',     match1to2, match2);
addRegexToken('YYYY',   match1to4, match4);
addRegexToken('YYYYY',  match1to6, match6);
addRegexToken('YYYYYY', match1to6, match6);

addParseToken(['YYYYY', 'YYYYYY'], YEAR);
addParseToken('YYYY', function (input, array) {
    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
});
addParseToken('YY', function (input, array) {
    array[YEAR] = hooks.parseTwoDigitYear(input);
});
addParseToken('Y', function (input, array) {
    array[YEAR] = parseInt(input, 10);
});

// HELPERS

function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// HOOKS

hooks.parseTwoDigitYear = function (input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
};

// MOMENTS

var getSetYear = makeGetSet('FullYear', true);

function getIsLeapYear () {
    return isLeapYear(this.year());
}

function makeGetSet (unit, keepTime) {
    return function (value) {
        if (value != null) {
            set$1(this, unit, value);
            hooks.updateOffset(this, keepTime);
            return this;
        } else {
            return get(this, unit);
        }
    };
}

function get (mom, unit) {
    return mom.isValid() ?
        mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
}

function set$1 (mom, unit, value) {
    if (mom.isValid() && !isNaN(value)) {
        if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
        }
        else {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }
}

// MOMENTS

function stringGet (units) {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
        return this[units]();
    }
    return this;
}


function stringSet (units, value) {
    if (typeof units === 'object') {
        units = normalizeObjectUnits(units);
        var prioritized = getPrioritizedUnits(units);
        for (var i = 0; i < prioritized.length; i++) {
            this[prioritized[i].unit](units[prioritized[i].unit]);
        }
    } else {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units](value);
        }
    }
    return this;
}

function mod(n, x) {
    return ((n % x) + x) % x;
}

var indexOf;

if (Array.prototype.indexOf) {
    indexOf = Array.prototype.indexOf;
} else {
    indexOf = function (o) {
        // I know
        var i;
        for (i = 0; i < this.length; ++i) {
            if (this[i] === o) {
                return i;
            }
        }
        return -1;
    };
}

function daysInMonth(year, month) {
    if (isNaN(year) || isNaN(month)) {
        return NaN;
    }
    var modMonth = mod(month, 12);
    year += (month - modMonth) / 12;
    return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
}

// FORMATTING

addFormatToken('M', ['MM', 2], 'Mo', function () {
    return this.month() + 1;
});

addFormatToken('MMM', 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
});

addFormatToken('MMMM', 0, 0, function (format) {
    return this.localeData().months(this, format);
});

// ALIASES

addUnitAlias('month', 'M');

// PRIORITY

addUnitPriority('month', 8);

// PARSING

addRegexToken('M',    match1to2);
addRegexToken('MM',   match1to2, match2);
addRegexToken('MMM',  function (isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
});
addRegexToken('MMMM', function (isStrict, locale) {
    return locale.monthsRegex(isStrict);
});

addParseToken(['M', 'MM'], function (input, array) {
    array[MONTH] = toInt(input) - 1;
});

addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
    var month = config._locale.monthsParse(input, token, config._strict);
    // if we didn't find a month name, mark the date as invalid.
    if (month != null) {
        array[MONTH] = month;
    } else {
        getParsingFlags(config).invalidMonth = input;
    }
});

// LOCALES

var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
function localeMonths (m, format) {
    if (!m) {
        return isArray(this._months) ? this._months :
            this._months['standalone'];
    }
    return isArray(this._months) ? this._months[m.month()] :
        this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
}

var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
function localeMonthsShort (m, format) {
    if (!m) {
        return isArray(this._monthsShort) ? this._monthsShort :
            this._monthsShort['standalone'];
    }
    return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
        this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
}

function handleStrictParse(monthName, format, strict) {
    var i, ii, mom, llc = monthName.toLocaleLowerCase();
    if (!this._monthsParse) {
        // this is not used
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
        for (i = 0; i < 12; ++i) {
            mom = createUTC([2000, i]);
            this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
            this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'MMM') {
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'MMM') {
            ii = indexOf.call(this._shortMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._longMonthsParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._longMonthsParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._shortMonthsParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeMonthsParse (monthName, format, strict) {
    var i, mom, regex;

    if (this._monthsParseExact) {
        return handleStrictParse.call(this, monthName, format, strict);
    }

    if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
    }

    // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        if (strict && !this._longMonthsParse[i]) {
            this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
            this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
        }
        if (!strict && !this._monthsParse[i]) {
            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
            this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
            return i;
        } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
            return i;
        } else if (!strict && this._monthsParse[i].test(monthName)) {
            return i;
        }
    }
}

// MOMENTS

function setMonth (mom, value) {
    var dayOfMonth;

    if (!mom.isValid()) {
        // No op
        return mom;
    }

    if (typeof value === 'string') {
        if (/^\d+$/.test(value)) {
            value = toInt(value);
        } else {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (!isNumber(value)) {
                return mom;
            }
        }
    }

    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
    return mom;
}

function getSetMonth (value) {
    if (value != null) {
        setMonth(this, value);
        hooks.updateOffset(this, true);
        return this;
    } else {
        return get(this, 'Month');
    }
}

function getDaysInMonth () {
    return daysInMonth(this.year(), this.month());
}

var defaultMonthsShortRegex = matchWord;
function monthsShortRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsShortStrictRegex;
        } else {
            return this._monthsShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsShortRegex')) {
            this._monthsShortRegex = defaultMonthsShortRegex;
        }
        return this._monthsShortStrictRegex && isStrict ?
            this._monthsShortStrictRegex : this._monthsShortRegex;
    }
}

var defaultMonthsRegex = matchWord;
function monthsRegex (isStrict) {
    if (this._monthsParseExact) {
        if (!hasOwnProp(this, '_monthsRegex')) {
            computeMonthsParse.call(this);
        }
        if (isStrict) {
            return this._monthsStrictRegex;
        } else {
            return this._monthsRegex;
        }
    } else {
        if (!hasOwnProp(this, '_monthsRegex')) {
            this._monthsRegex = defaultMonthsRegex;
        }
        return this._monthsStrictRegex && isStrict ?
            this._monthsStrictRegex : this._monthsRegex;
    }
}

function computeMonthsParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom;
    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        shortPieces.push(this.monthsShort(mom, ''));
        longPieces.push(this.months(mom, ''));
        mixedPieces.push(this.months(mom, ''));
        mixedPieces.push(this.monthsShort(mom, ''));
    }
    // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 12; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
    }
    for (i = 0; i < 24; i++) {
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
}

function createDate (y, m, d, h, M, s, ms) {
    // can't just apply() to create a date:
    // https://stackoverflow.com/q/181348
    var date = new Date(y, m, d, h, M, s, ms);

    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
        date.setFullYear(y);
    }
    return date;
}

function createUTCDate (y) {
    var date = new Date(Date.UTC.apply(null, arguments));

    // the Date.UTC function remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
    }
    return date;
}

// start-of-first-week - start-of-year
function firstWeekOffset(year, dow, doy) {
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
        fwd = 7 + dow - doy,
        // first-week day local weekday -- which local weekday is fwd
        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

    return -fwdlw + fwd - 1;
}

// https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7,
        weekOffset = firstWeekOffset(year, dow, doy),
        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
        resYear, resDayOfYear;

    if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = daysInYear(resYear) + dayOfYear;
    } else if (dayOfYear > daysInYear(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - daysInYear(year);
    } else {
        resYear = year;
        resDayOfYear = dayOfYear;
    }

    return {
        year: resYear,
        dayOfYear: resDayOfYear
    };
}

function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
        resWeek, resYear;

    if (week < 1) {
        resYear = mom.year() - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
        resWeek = week - weeksInYear(mom.year(), dow, doy);
        resYear = mom.year() + 1;
    } else {
        resYear = mom.year();
        resWeek = week;
    }

    return {
        week: resWeek,
        year: resYear
    };
}

function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy),
        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}

// FORMATTING

addFormatToken('w', ['ww', 2], 'wo', 'week');
addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

// ALIASES

addUnitAlias('week', 'w');
addUnitAlias('isoWeek', 'W');

// PRIORITIES

addUnitPriority('week', 5);
addUnitPriority('isoWeek', 5);

// PARSING

addRegexToken('w',  match1to2);
addRegexToken('ww', match1to2, match2);
addRegexToken('W',  match1to2);
addRegexToken('WW', match1to2, match2);

addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
    week[token.substr(0, 1)] = toInt(input);
});

// HELPERS

// LOCALES

function localeWeek (mom) {
    return weekOfYear(mom, this._week.dow, this._week.doy).week;
}

var defaultLocaleWeek = {
    dow : 0, // Sunday is the first day of the week.
    doy : 6  // The week that contains Jan 1st is the first week of the year.
};

function localeFirstDayOfWeek () {
    return this._week.dow;
}

function localeFirstDayOfYear () {
    return this._week.doy;
}

// MOMENTS

function getSetWeek (input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, 'd');
}

function getSetISOWeek (input) {
    var week = weekOfYear(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, 'd');
}

// FORMATTING

addFormatToken('d', 0, 'do', 'day');

addFormatToken('dd', 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
});

addFormatToken('ddd', 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
});

addFormatToken('dddd', 0, 0, function (format) {
    return this.localeData().weekdays(this, format);
});

addFormatToken('e', 0, 0, 'weekday');
addFormatToken('E', 0, 0, 'isoWeekday');

// ALIASES

addUnitAlias('day', 'd');
addUnitAlias('weekday', 'e');
addUnitAlias('isoWeekday', 'E');

// PRIORITY
addUnitPriority('day', 11);
addUnitPriority('weekday', 11);
addUnitPriority('isoWeekday', 11);

// PARSING

addRegexToken('d',    match1to2);
addRegexToken('e',    match1to2);
addRegexToken('E',    match1to2);
addRegexToken('dd',   function (isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
});
addRegexToken('ddd',   function (isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
});
addRegexToken('dddd',   function (isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
});

addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict);
    // if we didn't get a weekday name, mark the date as invalid
    if (weekday != null) {
        week.d = weekday;
    } else {
        getParsingFlags(config).invalidWeekday = input;
    }
});

addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
    week[token] = toInt(input);
});

// HELPERS

function parseWeekday(input, locale) {
    if (typeof input !== 'string') {
        return input;
    }

    if (!isNaN(input)) {
        return parseInt(input, 10);
    }

    input = locale.weekdaysParse(input);
    if (typeof input === 'number') {
        return input;
    }

    return null;
}

function parseIsoWeekday(input, locale) {
    if (typeof input === 'string') {
        return locale.weekdaysParse(input) % 7 || 7;
    }
    return isNaN(input) ? null : input;
}

// LOCALES

var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
function localeWeekdays (m, format) {
    if (!m) {
        return isArray(this._weekdays) ? this._weekdays :
            this._weekdays['standalone'];
    }
    return isArray(this._weekdays) ? this._weekdays[m.day()] :
        this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
}

var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
function localeWeekdaysShort (m) {
    return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
}

var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
function localeWeekdaysMin (m) {
    return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
}

function handleStrictParse$1(weekdayName, format, strict) {
    var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._minWeekdaysParse = [];

        for (i = 0; i < 7; ++i) {
            mom = createUTC([2000, 1]).day(i);
            this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
            this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
        }
    }

    if (strict) {
        if (format === 'dddd') {
            ii = indexOf.call(this._weekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    } else {
        if (format === 'dddd') {
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else if (format === 'ddd') {
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._minWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        } else {
            ii = indexOf.call(this._minWeekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._weekdaysParse, llc);
            if (ii !== -1) {
                return ii;
            }
            ii = indexOf.call(this._shortWeekdaysParse, llc);
            return ii !== -1 ? ii : null;
        }
    }
}

function localeWeekdaysParse (weekdayName, format, strict) {
    var i, mom, regex;

    if (this._weekdaysParseExact) {
        return handleStrictParse$1.call(this, weekdayName, format, strict);
    }

    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._minWeekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._fullWeekdaysParse = [];
    }

    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already

        mom = createUTC([2000, 1]).day(i);
        if (strict && !this._fullWeekdaysParse[i]) {
            this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
            this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
            this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
        }
        if (!this._weekdaysParse[i]) {
            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
        }
        // test the regex
        if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
            return i;
        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
            return i;
        }
    }
}

// MOMENTS

function getSetDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    if (input != null) {
        input = parseWeekday(input, this.localeData());
        return this.add(input - day, 'd');
    } else {
        return day;
    }
}

function getSetLocaleDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, 'd');
}

function getSetISODayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }

    // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.

    if (input != null) {
        var weekday = parseIsoWeekday(input, this.localeData());
        return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
        return this.day() || 7;
    }
}

var defaultWeekdaysRegex = matchWord;
function weekdaysRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysStrictRegex;
        } else {
            return this._weekdaysRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            this._weekdaysRegex = defaultWeekdaysRegex;
        }
        return this._weekdaysStrictRegex && isStrict ?
            this._weekdaysStrictRegex : this._weekdaysRegex;
    }
}

var defaultWeekdaysShortRegex = matchWord;
function weekdaysShortRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysShortStrictRegex;
        } else {
            return this._weekdaysShortRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysShortRegex')) {
            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
        }
        return this._weekdaysShortStrictRegex && isStrict ?
            this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
}

var defaultWeekdaysMinRegex = matchWord;
function weekdaysMinRegex (isStrict) {
    if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, '_weekdaysRegex')) {
            computeWeekdaysParse.call(this);
        }
        if (isStrict) {
            return this._weekdaysMinStrictRegex;
        } else {
            return this._weekdaysMinRegex;
        }
    } else {
        if (!hasOwnProp(this, '_weekdaysMinRegex')) {
            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
        }
        return this._weekdaysMinStrictRegex && isStrict ?
            this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
}


function computeWeekdaysParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom, minp, shortp, longp;
    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, 1]).day(i);
        minp = this.weekdaysMin(mom, '');
        shortp = this.weekdaysShort(mom, '');
        longp = this.weekdays(mom, '');
        minPieces.push(minp);
        shortPieces.push(shortp);
        longPieces.push(longp);
        mixedPieces.push(minp);
        mixedPieces.push(shortp);
        mixedPieces.push(longp);
    }
    // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.
    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 7; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;

    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
}

// FORMATTING

function hFormat() {
    return this.hours() % 12 || 12;
}

function kFormat() {
    return this.hours() || 24;
}

addFormatToken('H', ['HH', 2], 0, 'hour');
addFormatToken('h', ['hh', 2], 0, hFormat);
addFormatToken('k', ['kk', 2], 0, kFormat);

addFormatToken('hmm', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
});

addFormatToken('hmmss', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

addFormatToken('Hmm', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2);
});

addFormatToken('Hmmss', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
});

function meridiem (token, lowercase) {
    addFormatToken(token, 0, 0, function () {
        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
    });
}

meridiem('a', true);
meridiem('A', false);

// ALIASES

addUnitAlias('hour', 'h');

// PRIORITY
addUnitPriority('hour', 13);

// PARSING

function matchMeridiem (isStrict, locale) {
    return locale._meridiemParse;
}

addRegexToken('a',  matchMeridiem);
addRegexToken('A',  matchMeridiem);
addRegexToken('H',  match1to2);
addRegexToken('h',  match1to2);
addRegexToken('k',  match1to2);
addRegexToken('HH', match1to2, match2);
addRegexToken('hh', match1to2, match2);
addRegexToken('kk', match1to2, match2);

addRegexToken('hmm', match3to4);
addRegexToken('hmmss', match5to6);
addRegexToken('Hmm', match3to4);
addRegexToken('Hmmss', match5to6);

addParseToken(['H', 'HH'], HOUR);
addParseToken(['k', 'kk'], function (input, array, config) {
    var kInput = toInt(input);
    array[HOUR] = kInput === 24 ? 0 : kInput;
});
addParseToken(['a', 'A'], function (input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
});
addParseToken(['h', 'hh'], function (input, array, config) {
    array[HOUR] = toInt(input);
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config).bigHour = true;
});
addParseToken('hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config).bigHour = true;
});
addParseToken('Hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
});
addParseToken('Hmmss', function (input, array, config) {
    var pos1 = input.length - 4;
    var pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
});

// LOCALES

function localeIsPM (input) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return ((input + '').toLowerCase().charAt(0) === 'p');
}

var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
function localeMeridiem (hours, minutes, isLower) {
    if (hours > 11) {
        return isLower ? 'pm' : 'PM';
    } else {
        return isLower ? 'am' : 'AM';
    }
}


// MOMENTS

// Setting the hour should keep the time, because the user explicitly
// specified which hour he wants. So trying to maintain the same hour (in
// a new timezone) makes sense. Adding/subtracting hours does not follow
// this rule.
var getSetHour = makeGetSet('Hours', true);

// months
// week
// weekdays
// meridiem
var baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
    relativeTime: defaultRelativeTime,

    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,

    week: defaultLocaleWeek,

    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,

    meridiemParse: defaultLocaleMeridiemParse
};

// internal storage for locale config files
var locales = {};
var localeFamilies = {};
var globalLocale;

function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
}

// pick the locale from the array
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
function chooseLocale(names) {
    var i = 0, j, next, locale, split;

    while (i < names.length) {
        split = normalizeLocale(names[i]).split('-');
        j = split.length;
        next = normalizeLocale(names[i + 1]);
        next = next ? next.split('-') : null;
        while (j > 0) {
            locale = loadLocale(split.slice(0, j).join('-'));
            if (locale) {
                return locale;
            }
            if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                //the next array item is better than a shallower substring of this one
                break;
            }
            j--;
        }
        i++;
    }
    return null;
}

function loadLocale(name) {
    var oldLocale = null;
    // TODO: Find a better way to register and load all the locales in Node
    if (!locales[name] && (typeof module !== 'undefined') &&
            module && module.exports) {
        try {
            oldLocale = globalLocale._abbr;
            var aliasedRequire = require;
            aliasedRequire('./locale/' + name);
            getSetGlobalLocale(oldLocale);
        } catch (e) {}
    }
    return locales[name];
}

// This function will load locale and then set the global locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
function getSetGlobalLocale (key, values) {
    var data;
    if (key) {
        if (isUndefined(values)) {
            data = getLocale(key);
        }
        else {
            data = defineLocale(key, values);
        }

        if (data) {
            // moment.duration._locale = moment._locale = data;
            globalLocale = data;
        }
    }

    return globalLocale._abbr;
}

function defineLocale (name, config) {
    if (config !== null) {
        var parentConfig = baseConfig;
        config.abbr = name;
        if (locales[name] != null) {
            deprecateSimple('defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                    'an existing locale. moment.defineLocale(localeName, ' +
                    'config) should only be used for creating a new locale ' +
                    'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
            parentConfig = locales[name]._config;
        } else if (config.parentLocale != null) {
            if (locales[config.parentLocale] != null) {
                parentConfig = locales[config.parentLocale]._config;
            } else {
                if (!localeFamilies[config.parentLocale]) {
                    localeFamilies[config.parentLocale] = [];
                }
                localeFamilies[config.parentLocale].push({
                    name: name,
                    config: config
                });
                return null;
            }
        }
        locales[name] = new Locale(mergeConfigs(parentConfig, config));

        if (localeFamilies[name]) {
            localeFamilies[name].forEach(function (x) {
                defineLocale(x.name, x.config);
            });
        }

        // backwards compat for now: also set the locale
        // make sure we set the locale AFTER all child locales have been
        // created, so we won't end up with the child locale set.
        getSetGlobalLocale(name);


        return locales[name];
    } else {
        // useful for testing
        delete locales[name];
        return null;
    }
}

function updateLocale(name, config) {
    if (config != null) {
        var locale, tmpLocale, parentConfig = baseConfig;
        // MERGE
        tmpLocale = loadLocale(name);
        if (tmpLocale != null) {
            parentConfig = tmpLocale._config;
        }
        config = mergeConfigs(parentConfig, config);
        locale = new Locale(config);
        locale.parentLocale = locales[name];
        locales[name] = locale;

        // backwards compat for now: also set the locale
        getSetGlobalLocale(name);
    } else {
        // pass null for config to unupdate, useful for tests
        if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
            } else if (locales[name] != null) {
                delete locales[name];
            }
        }
    }
    return locales[name];
}

// returns locale data
function getLocale (key) {
    var locale;

    if (key && key._locale && key._locale._abbr) {
        key = key._locale._abbr;
    }

    if (!key) {
        return globalLocale;
    }

    if (!isArray(key)) {
        //short-circuit everything else
        locale = loadLocale(key);
        if (locale) {
            return locale;
        }
        key = [key];
    }

    return chooseLocale(key);
}

function listLocales() {
    return keys(locales);
}

function checkOverflow (m) {
    var overflow;
    var a = m._a;

    if (a && getParsingFlags(m).overflow === -2) {
        overflow =
            a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
            a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
            a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
            a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
            a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
            a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
            -1;

        if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
            overflow = DATE;
        }
        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
            overflow = WEEK;
        }
        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
            overflow = WEEKDAY;
        }

        getParsingFlags(m).overflow = overflow;
    }

    return m;
}

// Pick the first defined of two or three arguments.
function defaults(a, b, c) {
    if (a != null) {
        return a;
    }
    if (b != null) {
        return b;
    }
    return c;
}

function currentDateArray(config) {
    // hooks is actually the exported moment object
    var nowValue = new Date(hooks.now());
    if (config._useUTC) {
        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
    }
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}

// convert an array to a date.
// the array should mirror the parameters below
// note: all values past the year are optional and will default to the lowest possible value.
// [year, month, day , hour, minute, second, millisecond]
function configFromArray (config) {
    var i, date, input = [], currentDate, expectedWeekday, yearToUse;

    if (config._d) {
        return;
    }

    currentDate = currentDateArray(config);

    //compute day of the year from weeks and weekdays
    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
        dayOfYearFromWeekInfo(config);
    }

    //if the day of the year is set, figure out what it is
    if (config._dayOfYear != null) {
        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

        if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
            getParsingFlags(config)._overflowDayOfYear = true;
        }

        date = createUTCDate(yearToUse, 0, config._dayOfYear);
        config._a[MONTH] = date.getUTCMonth();
        config._a[DATE] = date.getUTCDate();
    }

    // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything
    for (i = 0; i < 3 && config._a[i] == null; ++i) {
        config._a[i] = input[i] = currentDate[i];
    }

    // Zero out whatever was not defaulted, including time
    for (; i < 7; i++) {
        config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
    }

    // Check for 24:00:00.000
    if (config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0) {
        config._nextDay = true;
        config._a[HOUR] = 0;
    }

    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
    expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();

    // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.
    if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }

    if (config._nextDay) {
        config._a[HOUR] = 24;
    }

    // check for mismatching day of week
    if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
        getParsingFlags(config).weekdayMismatch = true;
    }
}

function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

    w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;

        // TODO: We need to take the current isoWeekYear, but that depends on
        // how we interpret now (local, utc, fixed offset). So create
        // a now version of current config (take local/utc/offset flags, and
        // create now).
        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
        week = defaults(w.W, 1);
        weekday = defaults(w.E, 1);
        if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
        }
    } else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;

        var curWeek = weekOfYear(createLocal(), dow, doy);

        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

        // Default to current week.
        week = defaults(w.w, curWeek.week);

        if (w.d != null) {
            // weekday -- low day numbers are considered next week
            weekday = w.d;
            if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
            }
        } else if (w.e != null) {
            // local weekday -- counting starts from begining of week
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
            }
        } else {
            // default to begining of week
            weekday = dow;
        }
    }
    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
        getParsingFlags(config)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
        getParsingFlags(config)._overflowWeekday = true;
    } else {
        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }
}

// iso 8601 regex
// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

var isoDates = [
    ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
    ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
    ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
    ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
    ['YYYY-DDD', /\d{4}-\d{3}/],
    ['YYYY-MM', /\d{4}-\d\d/, false],
    ['YYYYYYMMDD', /[+-]\d{10}/],
    ['YYYYMMDD', /\d{8}/],
    // YYYYMM is NOT allowed by the standard
    ['GGGG[W]WWE', /\d{4}W\d{3}/],
    ['GGGG[W]WW', /\d{4}W\d{2}/, false],
    ['YYYYDDD', /\d{7}/]
];

// iso time formats and regexes
var isoTimes = [
    ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
    ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
    ['HH:mm:ss', /\d\d:\d\d:\d\d/],
    ['HH:mm', /\d\d:\d\d/],
    ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
    ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
    ['HHmmss', /\d\d\d\d\d\d/],
    ['HHmm', /\d\d\d\d/],
    ['HH', /\d\d/]
];

var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

// date from iso format
function configFromISO(config) {
    var i, l,
        string = config._i,
        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
        allowTime, dateFormat, timeFormat, tzFormat;

    if (match) {
        getParsingFlags(config).iso = true;

        for (i = 0, l = isoDates.length; i < l; i++) {
            if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
            }
        }
        if (dateFormat == null) {
            config._isValid = false;
            return;
        }
        if (match[3]) {
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(match[3])) {
                    // match[2] should be 'T' or space
                    timeFormat = (match[2] || ' ') + isoTimes[i][0];
                    break;
                }
            }
            if (timeFormat == null) {
                config._isValid = false;
                return;
            }
        }
        if (!allowTime && timeFormat != null) {
            config._isValid = false;
            return;
        }
        if (match[4]) {
            if (tzRegex.exec(match[4])) {
                tzFormat = 'Z';
            } else {
                config._isValid = false;
                return;
            }
        }
        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
        configFromStringAndFormat(config);
    } else {
        config._isValid = false;
    }
}

// RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
    var result = [
        untruncateYear(yearStr),
        defaultLocaleMonthsShort.indexOf(monthStr),
        parseInt(dayStr, 10),
        parseInt(hourStr, 10),
        parseInt(minuteStr, 10)
    ];

    if (secondStr) {
        result.push(parseInt(secondStr, 10));
    }

    return result;
}

function untruncateYear(yearStr) {
    var year = parseInt(yearStr, 10);
    if (year <= 49) {
        return 2000 + year;
    } else if (year <= 999) {
        return 1900 + year;
    }
    return year;
}

function preprocessRFC2822(s) {
    // Remove comments and folding whitespace and replace multiple-spaces with a single space
    return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').trim();
}

function checkWeekday(weekdayStr, parsedInput, config) {
    if (weekdayStr) {
        // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
        var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
            weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
        if (weekdayProvided !== weekdayActual) {
            getParsingFlags(config).weekdayMismatch = true;
            config._isValid = false;
            return false;
        }
    }
    return true;
}

var obsOffsets = {
    UT: 0,
    GMT: 0,
    EDT: -4 * 60,
    EST: -5 * 60,
    CDT: -5 * 60,
    CST: -6 * 60,
    MDT: -6 * 60,
    MST: -7 * 60,
    PDT: -7 * 60,
    PST: -8 * 60
};

function calculateOffset(obsOffset, militaryOffset, numOffset) {
    if (obsOffset) {
        return obsOffsets[obsOffset];
    } else if (militaryOffset) {
        // the only allowed military tz is Z
        return 0;
    } else {
        var hm = parseInt(numOffset, 10);
        var m = hm % 100, h = (hm - m) / 100;
        return h * 60 + m;
    }
}

// date and time from ref 2822 format
function configFromRFC2822(config) {
    var match = rfc2822.exec(preprocessRFC2822(config._i));
    if (match) {
        var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
        if (!checkWeekday(match[1], parsedArray, config)) {
            return;
        }

        config._a = parsedArray;
        config._tzm = calculateOffset(match[8], match[9], match[10]);

        config._d = createUTCDate.apply(null, config._a);
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

        getParsingFlags(config).rfc2822 = true;
    } else {
        config._isValid = false;
    }
}

// date from iso format or fallback
function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);

    if (matched !== null) {
        config._d = new Date(+matched[1]);
        return;
    }

    configFromISO(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    configFromRFC2822(config);
    if (config._isValid === false) {
        delete config._isValid;
    } else {
        return;
    }

    // Final attempt, use Input Fallback
    hooks.createFromInputFallback(config);
}

hooks.createFromInputFallback = deprecate(
    'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
    'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
    'discouraged and will be removed in an upcoming major release. Please refer to ' +
    'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
    function (config) {
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
    }
);

// constant that refers to the ISO standard
hooks.ISO_8601 = function () {};

// constant that refers to the RFC 2822 form
hooks.RFC_2822 = function () {};

// date from string and format string
function configFromStringAndFormat(config) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (config._f === hooks.ISO_8601) {
        configFromISO(config);
        return;
    }
    if (config._f === hooks.RFC_2822) {
        configFromRFC2822(config);
        return;
    }
    config._a = [];
    getParsingFlags(config).empty = true;

    // This array is used to make a Date, either with `new Date` or `Date.UTC`
    var string = '' + config._i,
        i, parsedInput, tokens, token, skipped,
        stringLength = string.length,
        totalParsedInputLength = 0;

    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

    for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
        // console.log('token', token, 'parsedInput', parsedInput,
        //         'regex', getParseRegexForToken(token, config));
        if (parsedInput) {
            skipped = string.substr(0, string.indexOf(parsedInput));
            if (skipped.length > 0) {
                getParsingFlags(config).unusedInput.push(skipped);
            }
            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            totalParsedInputLength += parsedInput.length;
        }
        // don't parse if it's not a known token
        if (formatTokenFunctions[token]) {
            if (parsedInput) {
                getParsingFlags(config).empty = false;
            }
            else {
                getParsingFlags(config).unusedTokens.push(token);
            }
            addTimeToArrayFromToken(token, parsedInput, config);
        }
        else if (config._strict && !parsedInput) {
            getParsingFlags(config).unusedTokens.push(token);
        }
    }

    // add remaining unparsed input length to the string
    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
    if (string.length > 0) {
        getParsingFlags(config).unusedInput.push(string);
    }

    // clear _12h flag if hour is <= 12
    if (config._a[HOUR] <= 12 &&
        getParsingFlags(config).bigHour === true &&
        config._a[HOUR] > 0) {
        getParsingFlags(config).bigHour = undefined;
    }

    getParsingFlags(config).parsedDateParts = config._a.slice(0);
    getParsingFlags(config).meridiem = config._meridiem;
    // handle meridiem
    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

    configFromArray(config);
    checkOverflow(config);
}


function meridiemFixWrap (locale, hour, meridiem) {
    var isPm;

    if (meridiem == null) {
        // nothing to do
        return hour;
    }
    if (locale.meridiemHour != null) {
        return locale.meridiemHour(hour, meridiem);
    } else if (locale.isPM != null) {
        // Fallback
        isPm = locale.isPM(meridiem);
        if (isPm && hour < 12) {
            hour += 12;
        }
        if (!isPm && hour === 12) {
            hour = 0;
        }
        return hour;
    } else {
        // this is not supposed to happen
        return hour;
    }
}

// date from string and array of format strings
function configFromStringAndArray(config) {
    var tempConfig,
        bestMoment,

        scoreToBeat,
        i,
        currentScore;

    if (config._f.length === 0) {
        getParsingFlags(config).invalidFormat = true;
        config._d = new Date(NaN);
        return;
    }

    for (i = 0; i < config._f.length; i++) {
        currentScore = 0;
        tempConfig = copyConfig({}, config);
        if (config._useUTC != null) {
            tempConfig._useUTC = config._useUTC;
        }
        tempConfig._f = config._f[i];
        configFromStringAndFormat(tempConfig);

        if (!isValid(tempConfig)) {
            continue;
        }

        // if there is any input that was not parsed add a penalty for that format
        currentScore += getParsingFlags(tempConfig).charsLeftOver;

        //or tokens
        currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

        getParsingFlags(tempConfig).score = currentScore;

        if (scoreToBeat == null || currentScore < scoreToBeat) {
            scoreToBeat = currentScore;
            bestMoment = tempConfig;
        }
    }

    extend(config, bestMoment || tempConfig);
}

function configFromObject(config) {
    if (config._d) {
        return;
    }

    var i = normalizeObjectUnits(config._i);
    config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
        return obj && parseInt(obj, 10);
    });

    configFromArray(config);
}

function createFromConfig (config) {
    var res = new Moment(checkOverflow(prepareConfig(config)));
    if (res._nextDay) {
        // Adding is smart enough around DST
        res.add(1, 'd');
        res._nextDay = undefined;
    }

    return res;
}

function prepareConfig (config) {
    var input = config._i,
        format = config._f;

    config._locale = config._locale || getLocale(config._l);

    if (input === null || (format === undefined && input === '')) {
        return createInvalid({nullInput: true});
    }

    if (typeof input === 'string') {
        config._i = input = config._locale.preparse(input);
    }

    if (isMoment(input)) {
        return new Moment(checkOverflow(input));
    } else if (isDate(input)) {
        config._d = input;
    } else if (isArray(format)) {
        configFromStringAndArray(config);
    } else if (format) {
        configFromStringAndFormat(config);
    }  else {
        configFromInput(config);
    }

    if (!isValid(config)) {
        config._d = null;
    }

    return config;
}

function configFromInput(config) {
    var input = config._i;
    if (isUndefined(input)) {
        config._d = new Date(hooks.now());
    } else if (isDate(input)) {
        config._d = new Date(input.valueOf());
    } else if (typeof input === 'string') {
        configFromString(config);
    } else if (isArray(input)) {
        config._a = map(input.slice(0), function (obj) {
            return parseInt(obj, 10);
        });
        configFromArray(config);
    } else if (isObject(input)) {
        configFromObject(config);
    } else if (isNumber(input)) {
        // from milliseconds
        config._d = new Date(input);
    } else {
        hooks.createFromInputFallback(config);
    }
}

function createLocalOrUTC (input, format, locale, strict, isUTC) {
    var c = {};

    if (locale === true || locale === false) {
        strict = locale;
        locale = undefined;
    }

    if ((isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)) {
        input = undefined;
    }
    // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423
    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;

    return createFromConfig(c);
}

function createLocal (input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, false);
}

var prototypeMin = deprecate(
    'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other < this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

var prototypeMax = deprecate(
    'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
    function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
        } else {
            return createInvalid();
        }
    }
);

// Pick a moment m from moments so that m[fn](other) is true for all
// other. This relies on the function fn to be transitive.
//
// moments should either be an array of moment objects or an array, whose
// first element is an array of moment objects.
function pickBy(fn, moments) {
    var res, i;
    if (moments.length === 1 && isArray(moments[0])) {
        moments = moments[0];
    }
    if (!moments.length) {
        return createLocal();
    }
    res = moments[0];
    for (i = 1; i < moments.length; ++i) {
        if (!moments[i].isValid() || moments[i][fn](res)) {
            res = moments[i];
        }
    }
    return res;
}

// TODO: Use [].sort instead?
function min () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isBefore', args);
}

function max () {
    var args = [].slice.call(arguments, 0);

    return pickBy('isAfter', args);
}

var now = function () {
    return Date.now ? Date.now() : +(new Date());
};

var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

function isDurationValid(m) {
    for (var key in m) {
        if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
            return false;
        }
    }

    var unitHasDecimal = false;
    for (var i = 0; i < ordering.length; ++i) {
        if (m[ordering[i]]) {
            if (unitHasDecimal) {
                return false; // only allow non-integers for smallest unit
            }
            if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                unitHasDecimal = true;
            }
        }
    }

    return true;
}

function isValid$1() {
    return this._isValid;
}

function createInvalid$1() {
    return createDuration(NaN);
}

function Duration (duration) {
    var normalizedInput = normalizeObjectUnits(duration),
        years = normalizedInput.year || 0,
        quarters = normalizedInput.quarter || 0,
        months = normalizedInput.month || 0,
        weeks = normalizedInput.week || 0,
        days = normalizedInput.day || 0,
        hours = normalizedInput.hour || 0,
        minutes = normalizedInput.minute || 0,
        seconds = normalizedInput.second || 0,
        milliseconds = normalizedInput.millisecond || 0;

    this._isValid = isDurationValid(normalizedInput);

    // representation for dateAddRemove
    this._milliseconds = +milliseconds +
        seconds * 1e3 + // 1000
        minutes * 6e4 + // 1000 * 60
        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately
    this._days = +days +
        weeks * 7;
    // It is impossible to translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.
    this._months = +months +
        quarters * 3 +
        years * 12;

    this._data = {};

    this._locale = getLocale();

    this._bubble();
}

function isDuration (obj) {
    return obj instanceof Duration;
}

function absRound (number) {
    if (number < 0) {
        return Math.round(-1 * number) * -1;
    } else {
        return Math.round(number);
    }
}

// FORMATTING

function offset (token, separator) {
    addFormatToken(token, 0, 0, function () {
        var offset = this.utcOffset();
        var sign = '+';
        if (offset < 0) {
            offset = -offset;
            sign = '-';
        }
        return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
    });
}

offset('Z', ':');
offset('ZZ', '');

// PARSING

addRegexToken('Z',  matchShortOffset);
addRegexToken('ZZ', matchShortOffset);
addParseToken(['Z', 'ZZ'], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);
});

// HELPERS

// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
var chunkOffset = /([\+\-]|\d\d)/gi;

function offsetFromString(matcher, string) {
    var matches = (string || '').match(matcher);

    if (matches === null) {
        return null;
    }

    var chunk   = matches[matches.length - 1] || [];
    var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
    var minutes = +(parts[1] * 60) + toInt(parts[2]);

    return minutes === 0 ?
      0 :
      parts[0] === '+' ? minutes : -minutes;
}

// Return a moment from input, that is local/utc/zone equivalent to model.
function cloneWithOffset(input, model) {
    var res, diff;
    if (model._isUTC) {
        res = model.clone();
        diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
        // Use low-level api, because this fn is low-level api.
        res._d.setTime(res._d.valueOf() + diff);
        hooks.updateOffset(res, false);
        return res;
    } else {
        return createLocal(input).local();
    }
}

function getDateOffset (m) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
}

// HOOKS

// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
hooks.updateOffset = function () {};

// MOMENTS

// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
function getSetOffset (input, keepLocalTime, keepMinutes) {
    var offset = this._offset || 0,
        localAdjust;
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    if (input != null) {
        if (typeof input === 'string') {
            input = offsetFromString(matchShortOffset, input);
            if (input === null) {
                return this;
            }
        } else if (Math.abs(input) < 16 && !keepMinutes) {
            input = input * 60;
        }
        if (!this._isUTC && keepLocalTime) {
            localAdjust = getDateOffset(this);
        }
        this._offset = input;
        this._isUTC = true;
        if (localAdjust != null) {
            this.add(localAdjust, 'm');
        }
        if (offset !== input) {
            if (!keepLocalTime || this._changeInProgress) {
                addSubtract(this, createDuration(input - offset, 'm'), 1, false);
            } else if (!this._changeInProgress) {
                this._changeInProgress = true;
                hooks.updateOffset(this, true);
                this._changeInProgress = null;
            }
        }
        return this;
    } else {
        return this._isUTC ? offset : getDateOffset(this);
    }
}

function getSetZone (input, keepLocalTime) {
    if (input != null) {
        if (typeof input !== 'string') {
            input = -input;
        }

        this.utcOffset(input, keepLocalTime);

        return this;
    } else {
        return -this.utcOffset();
    }
}

function setOffsetToUTC (keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
}

function setOffsetToLocal (keepLocalTime) {
    if (this._isUTC) {
        this.utcOffset(0, keepLocalTime);
        this._isUTC = false;

        if (keepLocalTime) {
            this.subtract(getDateOffset(this), 'm');
        }
    }
    return this;
}

function setOffsetToParsedOffset () {
    if (this._tzm != null) {
        this.utcOffset(this._tzm, false, true);
    } else if (typeof this._i === 'string') {
        var tZone = offsetFromString(matchOffset, this._i);
        if (tZone != null) {
            this.utcOffset(tZone);
        }
        else {
            this.utcOffset(0, true);
        }
    }
    return this;
}

function hasAlignedHourOffset (input) {
    if (!this.isValid()) {
        return false;
    }
    input = input ? createLocal(input).utcOffset() : 0;

    return (this.utcOffset() - input) % 60 === 0;
}

function isDaylightSavingTime () {
    return (
        this.utcOffset() > this.clone().month(0).utcOffset() ||
        this.utcOffset() > this.clone().month(5).utcOffset()
    );
}

function isDaylightSavingTimeShifted () {
    if (!isUndefined(this._isDSTShifted)) {
        return this._isDSTShifted;
    }

    var c = {};

    copyConfig(c, this);
    c = prepareConfig(c);

    if (c._a) {
        var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
        this._isDSTShifted = this.isValid() &&
            compareArrays(c._a, other.toArray()) > 0;
    } else {
        this._isDSTShifted = false;
    }

    return this._isDSTShifted;
}

function isLocal () {
    return this.isValid() ? !this._isUTC : false;
}

function isUtcOffset () {
    return this.isValid() ? this._isUTC : false;
}

function isUtc () {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
}

// ASP.NET json date format regex
var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
// and further modified to allow for strings containing both week and day
var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

function createDuration (input, key) {
    var duration = input,
        // matching against regexp is expensive, do it on demand
        match = null,
        sign,
        ret,
        diffRes;

    if (isDuration(input)) {
        duration = {
            ms : input._milliseconds,
            d  : input._days,
            M  : input._months
        };
    } else if (isNumber(input)) {
        duration = {};
        if (key) {
            duration[key] = input;
        } else {
            duration.milliseconds = input;
        }
    } else if (!!(match = aspNetRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : 1;
        duration = {
            y  : 0,
            d  : toInt(match[DATE])                         * sign,
            h  : toInt(match[HOUR])                         * sign,
            m  : toInt(match[MINUTE])                       * sign,
            s  : toInt(match[SECOND])                       * sign,
            ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
        };
    } else if (!!(match = isoRegex.exec(input))) {
        sign = (match[1] === '-') ? -1 : (match[1] === '+') ? 1 : 1;
        duration = {
            y : parseIso(match[2], sign),
            M : parseIso(match[3], sign),
            w : parseIso(match[4], sign),
            d : parseIso(match[5], sign),
            h : parseIso(match[6], sign),
            m : parseIso(match[7], sign),
            s : parseIso(match[8], sign)
        };
    } else if (duration == null) {// checks for null or undefined
        duration = {};
    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
        diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

        duration = {};
        duration.ms = diffRes.milliseconds;
        duration.M = diffRes.months;
    }

    ret = new Duration(duration);

    if (isDuration(input) && hasOwnProp(input, '_locale')) {
        ret._locale = input._locale;
    }

    return ret;
}

createDuration.fn = Duration.prototype;
createDuration.invalid = createInvalid$1;

function parseIso (inp, sign) {
    // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    var res = inp && parseFloat(inp.replace(',', '.'));
    // apply sign while we're at it
    return (isNaN(res) ? 0 : res) * sign;
}

function positiveMomentsDifference(base, other) {
    var res = {milliseconds: 0, months: 0};

    res.months = other.month() - base.month() +
        (other.year() - base.year()) * 12;
    if (base.clone().add(res.months, 'M').isAfter(other)) {
        --res.months;
    }

    res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

    return res;
}

function momentsDifference(base, other) {
    var res;
    if (!(base.isValid() && other.isValid())) {
        return {milliseconds: 0, months: 0};
    }

    other = cloneWithOffset(other, base);
    if (base.isBefore(other)) {
        res = positiveMomentsDifference(base, other);
    } else {
        res = positiveMomentsDifference(other, base);
        res.milliseconds = -res.milliseconds;
        res.months = -res.months;
    }

    return res;
}

// TODO: remove 'name' arg after deprecation is removed
function createAdder(direction, name) {
    return function (val, period) {
        var dur, tmp;
        //invert the arguments, but complain about it
        if (period !== null && !isNaN(+period)) {
            deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
            'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
            tmp = val; val = period; period = tmp;
        }

        val = typeof val === 'string' ? +val : val;
        dur = createDuration(val, period);
        addSubtract(this, dur, direction);
        return this;
    };
}

function addSubtract (mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
        days = absRound(duration._days),
        months = absRound(duration._months);

    if (!mom.isValid()) {
        // No op
        return;
    }

    updateOffset = updateOffset == null ? true : updateOffset;

    if (months) {
        setMonth(mom, get(mom, 'Month') + months * isAdding);
    }
    if (days) {
        set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
    }
    if (milliseconds) {
        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }
    if (updateOffset) {
        hooks.updateOffset(mom, days || months);
    }
}

var add      = createAdder(1, 'add');
var subtract = createAdder(-1, 'subtract');

function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, 'days', true);
    return diff < -6 ? 'sameElse' :
            diff < -1 ? 'lastWeek' :
            diff < 0 ? 'lastDay' :
            diff < 1 ? 'sameDay' :
            diff < 2 ? 'nextDay' :
            diff < 7 ? 'nextWeek' : 'sameElse';
}

function calendar$1 (time, formats) {
    // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.
    var now = time || createLocal(),
        sod = cloneWithOffset(now, this).startOf('day'),
        format = hooks.calendarFormat(this, sod) || 'sameElse';

    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
}

function clone () {
    return new Moment(this);
}

function isAfter (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() > localInput.valueOf();
    } else {
        return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
}

function isBefore (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() < localInput.valueOf();
    } else {
        return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
}

function isBetween (from, to, units, inclusivity) {
    inclusivity = inclusivity || '()';
    return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
        (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
}

function isSame (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input),
        inputMs;
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(units || 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() === localInput.valueOf();
    } else {
        inputMs = localInput.valueOf();
        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
}

function isSameOrAfter (input, units) {
    return this.isSame(input, units) || this.isAfter(input,units);
}

function isSameOrBefore (input, units) {
    return this.isSame(input, units) || this.isBefore(input,units);
}

function diff (input, units, asFloat) {
    var that,
        zoneDelta,
        delta, output;

    if (!this.isValid()) {
        return NaN;
    }

    that = cloneWithOffset(input, this);

    if (!that.isValid()) {
        return NaN;
    }

    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

    units = normalizeUnits(units);

    switch (units) {
        case 'year': output = monthDiff(this, that) / 12; break;
        case 'month': output = monthDiff(this, that); break;
        case 'quarter': output = monthDiff(this, that) / 3; break;
        case 'second': output = (this - that) / 1e3; break; // 1000
        case 'minute': output = (this - that) / 6e4; break; // 1000 * 60
        case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60
        case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst
        case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst
        default: output = this - that;
    }

    return asFloat ? output : absFloor(output);
}

function monthDiff (a, b) {
    // difference in months
    var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
        // b is in (anchor - 1 month, anchor + 1 month)
        anchor = a.clone().add(wholeMonthDiff, 'months'),
        anchor2, adjust;

    if (b - anchor < 0) {
        anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor - anchor2);
    } else {
        anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
        // linear across the month
        adjust = (b - anchor) / (anchor2 - anchor);
    }

    //check for negative zero, return zero if negative zero
    return -(wholeMonthDiff + adjust) || 0;
}

hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

function toString () {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
}

function toISOString(keepOffset) {
    if (!this.isValid()) {
        return null;
    }
    var utc = keepOffset !== true;
    var m = utc ? this.clone().utc() : this;
    if (m.year() < 0 || m.year() > 9999) {
        return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }
    if (isFunction(Date.prototype.toISOString)) {
        // native implementation is ~50x faster, use it when we can
        if (utc) {
            return this.toDate().toISOString();
        } else {
            return new Date(this._d.valueOf()).toISOString().replace('Z', formatMoment(m, 'Z'));
        }
    }
    return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
}

/**
 * Return a human readable representation of a moment that can
 * also be evaluated to get a new moment which is the same
 *
 * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
 */
function inspect () {
    if (!this.isValid()) {
        return 'moment.invalid(/* ' + this._i + ' */)';
    }
    var func = 'moment';
    var zone = '';
    if (!this.isLocal()) {
        func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
        zone = 'Z';
    }
    var prefix = '[' + func + '("]';
    var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
    var datetime = '-MM-DD[T]HH:mm:ss.SSS';
    var suffix = zone + '[")]';

    return this.format(prefix + year + datetime + suffix);
}

function format (inputString) {
    if (!inputString) {
        inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
    }
    var output = formatMoment(this, inputString);
    return this.localeData().postformat(output);
}

function from (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function fromNow (withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
}

function to (time, withoutSuffix) {
    if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
             createLocal(time).isValid())) {
        return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}

function toNow (withoutSuffix) {
    return this.to(createLocal(), withoutSuffix);
}

// If passed a locale key, it will set the locale for this
// instance.  Otherwise, it will return the locale configuration
// variables for this instance.
function locale (key) {
    var newLocaleData;

    if (key === undefined) {
        return this._locale._abbr;
    } else {
        newLocaleData = getLocale(key);
        if (newLocaleData != null) {
            this._locale = newLocaleData;
        }
        return this;
    }
}

var lang = deprecate(
    'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
    function (key) {
        if (key === undefined) {
            return this.localeData();
        } else {
            return this.locale(key);
        }
    }
);

function localeData () {
    return this._locale;
}

function startOf (units) {
    units = normalizeUnits(units);
    // the following switch intentionally omits break keywords
    // to utilize falling through the cases.
    switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
        case 'date':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
    }

    // weeks are a special case
    if (units === 'week') {
        this.weekday(0);
    }
    if (units === 'isoWeek') {
        this.isoWeekday(1);
    }

    // quarters are also special
    if (units === 'quarter') {
        this.month(Math.floor(this.month() / 3) * 3);
    }

    return this;
}

function endOf (units) {
    units = normalizeUnits(units);
    if (units === undefined || units === 'millisecond') {
        return this;
    }

    // 'date' is an alias for 'day', so it should be considered as such.
    if (units === 'date') {
        units = 'day';
    }

    return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
}

function valueOf () {
    return this._d.valueOf() - ((this._offset || 0) * 60000);
}

function unix () {
    return Math.floor(this.valueOf() / 1000);
}

function toDate () {
    return new Date(this.valueOf());
}

function toArray () {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
}

function toObject () {
    var m = this;
    return {
        years: m.year(),
        months: m.month(),
        date: m.date(),
        hours: m.hours(),
        minutes: m.minutes(),
        seconds: m.seconds(),
        milliseconds: m.milliseconds()
    };
}

function toJSON () {
    // new Date(NaN).toJSON() === null
    return this.isValid() ? this.toISOString() : null;
}

function isValid$2 () {
    return isValid(this);
}

function parsingFlags () {
    return extend({}, getParsingFlags(this));
}

function invalidAt () {
    return getParsingFlags(this).overflow;
}

function creationData() {
    return {
        input: this._i,
        format: this._f,
        locale: this._locale,
        isUTC: this._isUTC,
        strict: this._strict
    };
}

// FORMATTING

addFormatToken(0, ['gg', 2], 0, function () {
    return this.weekYear() % 100;
});

addFormatToken(0, ['GG', 2], 0, function () {
    return this.isoWeekYear() % 100;
});

function addWeekYearFormatToken (token, getter) {
    addFormatToken(0, [token, token.length], 0, getter);
}

addWeekYearFormatToken('gggg',     'weekYear');
addWeekYearFormatToken('ggggg',    'weekYear');
addWeekYearFormatToken('GGGG',  'isoWeekYear');
addWeekYearFormatToken('GGGGG', 'isoWeekYear');

// ALIASES

addUnitAlias('weekYear', 'gg');
addUnitAlias('isoWeekYear', 'GG');

// PRIORITY

addUnitPriority('weekYear', 1);
addUnitPriority('isoWeekYear', 1);


// PARSING

addRegexToken('G',      matchSigned);
addRegexToken('g',      matchSigned);
addRegexToken('GG',     match1to2, match2);
addRegexToken('gg',     match1to2, match2);
addRegexToken('GGGG',   match1to4, match4);
addRegexToken('gggg',   match1to4, match4);
addRegexToken('GGGGG',  match1to6, match6);
addRegexToken('ggggg',  match1to6, match6);

addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
    week[token.substr(0, 2)] = toInt(input);
});

addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
    week[token] = hooks.parseTwoDigitYear(input);
});

// MOMENTS

function getSetWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy);
}

function getSetISOWeekYear (input) {
    return getSetWeekYearHelper.call(this,
            input, this.isoWeek(), this.isoWeekday(), 1, 4);
}

function getISOWeeksInYear () {
    return weeksInYear(this.year(), 1, 4);
}

function getWeeksInYear () {
    var weekInfo = this.localeData()._week;
    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
}

function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;
    if (input == null) {
        return weekOfYear(this, dow, doy).year;
    } else {
        weeksTarget = weeksInYear(input, dow, doy);
        if (week > weeksTarget) {
            week = weeksTarget;
        }
        return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
}

function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this;
}

// FORMATTING

addFormatToken('Q', 0, 'Qo', 'quarter');

// ALIASES

addUnitAlias('quarter', 'Q');

// PRIORITY

addUnitPriority('quarter', 7);

// PARSING

addRegexToken('Q', match1);
addParseToken('Q', function (input, array) {
    array[MONTH] = (toInt(input) - 1) * 3;
});

// MOMENTS

function getSetQuarter (input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}

// FORMATTING

addFormatToken('D', ['DD', 2], 'Do', 'date');

// ALIASES

addUnitAlias('date', 'D');

// PRIOROITY
addUnitPriority('date', 9);

// PARSING

addRegexToken('D',  match1to2);
addRegexToken('DD', match1to2, match2);
addRegexToken('Do', function (isStrict, locale) {
    // TODO: Remove "ordinalParse" fallback in next major release.
    return isStrict ?
      (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
      locale._dayOfMonthOrdinalParseLenient;
});

addParseToken(['D', 'DD'], DATE);
addParseToken('Do', function (input, array) {
    array[DATE] = toInt(input.match(match1to2)[0]);
});

// MOMENTS

var getSetDayOfMonth = makeGetSet('Date', true);

// FORMATTING

addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

// ALIASES

addUnitAlias('dayOfYear', 'DDD');

// PRIORITY
addUnitPriority('dayOfYear', 4);

// PARSING

addRegexToken('DDD',  match1to3);
addRegexToken('DDDD', match3);
addParseToken(['DDD', 'DDDD'], function (input, array, config) {
    config._dayOfYear = toInt(input);
});

// HELPERS

// MOMENTS

function getSetDayOfYear (input) {
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
}

// FORMATTING

addFormatToken('m', ['mm', 2], 0, 'minute');

// ALIASES

addUnitAlias('minute', 'm');

// PRIORITY

addUnitPriority('minute', 14);

// PARSING

addRegexToken('m',  match1to2);
addRegexToken('mm', match1to2, match2);
addParseToken(['m', 'mm'], MINUTE);

// MOMENTS

var getSetMinute = makeGetSet('Minutes', false);

// FORMATTING

addFormatToken('s', ['ss', 2], 0, 'second');

// ALIASES

addUnitAlias('second', 's');

// PRIORITY

addUnitPriority('second', 15);

// PARSING

addRegexToken('s',  match1to2);
addRegexToken('ss', match1to2, match2);
addParseToken(['s', 'ss'], SECOND);

// MOMENTS

var getSetSecond = makeGetSet('Seconds', false);

// FORMATTING

addFormatToken('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
});

addFormatToken(0, ['SS', 2], 0, function () {
    return ~~(this.millisecond() / 10);
});

addFormatToken(0, ['SSS', 3], 0, 'millisecond');
addFormatToken(0, ['SSSS', 4], 0, function () {
    return this.millisecond() * 10;
});
addFormatToken(0, ['SSSSS', 5], 0, function () {
    return this.millisecond() * 100;
});
addFormatToken(0, ['SSSSSS', 6], 0, function () {
    return this.millisecond() * 1000;
});
addFormatToken(0, ['SSSSSSS', 7], 0, function () {
    return this.millisecond() * 10000;
});
addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
    return this.millisecond() * 100000;
});
addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
    return this.millisecond() * 1000000;
});


// ALIASES

addUnitAlias('millisecond', 'ms');

// PRIORITY

addUnitPriority('millisecond', 16);

// PARSING

addRegexToken('S',    match1to3, match1);
addRegexToken('SS',   match1to3, match2);
addRegexToken('SSS',  match1to3, match3);

var token;
for (token = 'SSSS'; token.length <= 9; token += 'S') {
    addRegexToken(token, matchUnsigned);
}

function parseMs(input, array) {
    array[MILLISECOND] = toInt(('0.' + input) * 1000);
}

for (token = 'S'; token.length <= 9; token += 'S') {
    addParseToken(token, parseMs);
}
// MOMENTS

var getSetMillisecond = makeGetSet('Milliseconds', false);

// FORMATTING

addFormatToken('z',  0, 0, 'zoneAbbr');
addFormatToken('zz', 0, 0, 'zoneName');

// MOMENTS

function getZoneAbbr () {
    return this._isUTC ? 'UTC' : '';
}

function getZoneName () {
    return this._isUTC ? 'Coordinated Universal Time' : '';
}

var proto = Moment.prototype;

proto.add               = add;
proto.calendar          = calendar$1;
proto.clone             = clone;
proto.diff              = diff;
proto.endOf             = endOf;
proto.format            = format;
proto.from              = from;
proto.fromNow           = fromNow;
proto.to                = to;
proto.toNow             = toNow;
proto.get               = stringGet;
proto.invalidAt         = invalidAt;
proto.isAfter           = isAfter;
proto.isBefore          = isBefore;
proto.isBetween         = isBetween;
proto.isSame            = isSame;
proto.isSameOrAfter     = isSameOrAfter;
proto.isSameOrBefore    = isSameOrBefore;
proto.isValid           = isValid$2;
proto.lang              = lang;
proto.locale            = locale;
proto.localeData        = localeData;
proto.max               = prototypeMax;
proto.min               = prototypeMin;
proto.parsingFlags      = parsingFlags;
proto.set               = stringSet;
proto.startOf           = startOf;
proto.subtract          = subtract;
proto.toArray           = toArray;
proto.toObject          = toObject;
proto.toDate            = toDate;
proto.toISOString       = toISOString;
proto.inspect           = inspect;
proto.toJSON            = toJSON;
proto.toString          = toString;
proto.unix              = unix;
proto.valueOf           = valueOf;
proto.creationData      = creationData;

// Year
proto.year       = getSetYear;
proto.isLeapYear = getIsLeapYear;

// Week Year
proto.weekYear    = getSetWeekYear;
proto.isoWeekYear = getSetISOWeekYear;

// Quarter
proto.quarter = proto.quarters = getSetQuarter;

// Month
proto.month       = getSetMonth;
proto.daysInMonth = getDaysInMonth;

// Week
proto.week           = proto.weeks        = getSetWeek;
proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
proto.weeksInYear    = getWeeksInYear;
proto.isoWeeksInYear = getISOWeeksInYear;

// Day
proto.date       = getSetDayOfMonth;
proto.day        = proto.days             = getSetDayOfWeek;
proto.weekday    = getSetLocaleDayOfWeek;
proto.isoWeekday = getSetISODayOfWeek;
proto.dayOfYear  = getSetDayOfYear;

// Hour
proto.hour = proto.hours = getSetHour;

// Minute
proto.minute = proto.minutes = getSetMinute;

// Second
proto.second = proto.seconds = getSetSecond;

// Millisecond
proto.millisecond = proto.milliseconds = getSetMillisecond;

// Offset
proto.utcOffset            = getSetOffset;
proto.utc                  = setOffsetToUTC;
proto.local                = setOffsetToLocal;
proto.parseZone            = setOffsetToParsedOffset;
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST                = isDaylightSavingTime;
proto.isLocal              = isLocal;
proto.isUtcOffset          = isUtcOffset;
proto.isUtc                = isUtc;
proto.isUTC                = isUtc;

// Timezone
proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;

// Deprecations
proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

function createUnix (input) {
    return createLocal(input * 1000);
}

function createInZone () {
    return createLocal.apply(null, arguments).parseZone();
}

function preParsePostFormat (string) {
    return string;
}

var proto$1 = Locale.prototype;

proto$1.calendar        = calendar;
proto$1.longDateFormat  = longDateFormat;
proto$1.invalidDate     = invalidDate;
proto$1.ordinal         = ordinal;
proto$1.preparse        = preParsePostFormat;
proto$1.postformat      = preParsePostFormat;
proto$1.relativeTime    = relativeTime;
proto$1.pastFuture      = pastFuture;
proto$1.set             = set;

// Month
proto$1.months            =        localeMonths;
proto$1.monthsShort       =        localeMonthsShort;
proto$1.monthsParse       =        localeMonthsParse;
proto$1.monthsRegex       = monthsRegex;
proto$1.monthsShortRegex  = monthsShortRegex;

// Week
proto$1.week = localeWeek;
proto$1.firstDayOfYear = localeFirstDayOfYear;
proto$1.firstDayOfWeek = localeFirstDayOfWeek;

// Day of Week
proto$1.weekdays       =        localeWeekdays;
proto$1.weekdaysMin    =        localeWeekdaysMin;
proto$1.weekdaysShort  =        localeWeekdaysShort;
proto$1.weekdaysParse  =        localeWeekdaysParse;

proto$1.weekdaysRegex       =        weekdaysRegex;
proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

// Hours
proto$1.isPM = localeIsPM;
proto$1.meridiem = localeMeridiem;

function get$1 (format, index, field, setter) {
    var locale = getLocale();
    var utc = createUTC().set(setter, index);
    return locale[field](utc, format);
}

function listMonthsImpl (format, index, field) {
    if (isNumber(format)) {
        index = format;
        format = undefined;
    }

    format = format || '';

    if (index != null) {
        return get$1(format, index, field, 'month');
    }

    var i;
    var out = [];
    for (i = 0; i < 12; i++) {
        out[i] = get$1(format, i, field, 'month');
    }
    return out;
}

// ()
// (5)
// (fmt, 5)
// (fmt)
// (true)
// (true, 5)
// (true, fmt, 5)
// (true, fmt)
function listWeekdaysImpl (localeSorted, format, index, field) {
    if (typeof localeSorted === 'boolean') {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    } else {
        format = localeSorted;
        index = format;
        localeSorted = false;

        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';
    }

    var locale = getLocale(),
        shift = localeSorted ? locale._week.dow : 0;

    if (index != null) {
        return get$1(format, (index + shift) % 7, field, 'day');
    }

    var i;
    var out = [];
    for (i = 0; i < 7; i++) {
        out[i] = get$1(format, (i + shift) % 7, field, 'day');
    }
    return out;
}

function listMonths (format, index) {
    return listMonthsImpl(format, index, 'months');
}

function listMonthsShort (format, index) {
    return listMonthsImpl(format, index, 'monthsShort');
}

function listWeekdays (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
}

function listWeekdaysShort (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
}

function listWeekdaysMin (localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
}

getSetGlobalLocale('en', {
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (toInt(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    }
});

// Side effect imports
hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

var mathAbs = Math.abs;

function abs () {
    var data           = this._data;

    this._milliseconds = mathAbs(this._milliseconds);
    this._days         = mathAbs(this._days);
    this._months       = mathAbs(this._months);

    data.milliseconds  = mathAbs(data.milliseconds);
    data.seconds       = mathAbs(data.seconds);
    data.minutes       = mathAbs(data.minutes);
    data.hours         = mathAbs(data.hours);
    data.months        = mathAbs(data.months);
    data.years         = mathAbs(data.years);

    return this;
}

function addSubtract$1 (duration, input, value, direction) {
    var other = createDuration(input, value);

    duration._milliseconds += direction * other._milliseconds;
    duration._days         += direction * other._days;
    duration._months       += direction * other._months;

    return duration._bubble();
}

// supports only 2.0-style add(1, 's') or add(duration)
function add$1 (input, value) {
    return addSubtract$1(this, input, value, 1);
}

// supports only 2.0-style subtract(1, 's') or subtract(duration)
function subtract$1 (input, value) {
    return addSubtract$1(this, input, value, -1);
}

function absCeil (number) {
    if (number < 0) {
        return Math.floor(number);
    } else {
        return Math.ceil(number);
    }
}

function bubble () {
    var milliseconds = this._milliseconds;
    var days         = this._days;
    var months       = this._months;
    var data         = this._data;
    var seconds, minutes, hours, years, monthsFromDays;

    // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166
    if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
            (milliseconds <= 0 && days <= 0 && months <= 0))) {
        milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
        days = 0;
        months = 0;
    }

    // The following code bubbles up values, see the tests for
    // examples of what that means.
    data.milliseconds = milliseconds % 1000;

    seconds           = absFloor(milliseconds / 1000);
    data.seconds      = seconds % 60;

    minutes           = absFloor(seconds / 60);
    data.minutes      = minutes % 60;

    hours             = absFloor(minutes / 60);
    data.hours        = hours % 24;

    days += absFloor(hours / 24);

    // convert days to months
    monthsFromDays = absFloor(daysToMonths(days));
    months += monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays));

    // 12 months -> 1 year
    years = absFloor(months / 12);
    months %= 12;

    data.days   = days;
    data.months = months;
    data.years  = years;

    return this;
}

function daysToMonths (days) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return days * 4800 / 146097;
}

function monthsToDays (months) {
    // the reverse of daysToMonths
    return months * 146097 / 4800;
}

function as (units) {
    if (!this.isValid()) {
        return NaN;
    }
    var days;
    var months;
    var milliseconds = this._milliseconds;

    units = normalizeUnits(units);

    if (units === 'month' || units === 'year') {
        days   = this._days   + milliseconds / 864e5;
        months = this._months + daysToMonths(days);
        return units === 'month' ? months : months / 12;
    } else {
        // handle milliseconds separately because of floating point math errors (issue #1867)
        days = this._days + Math.round(monthsToDays(this._months));
        switch (units) {
            case 'week'   : return days / 7     + milliseconds / 6048e5;
            case 'day'    : return days         + milliseconds / 864e5;
            case 'hour'   : return days * 24    + milliseconds / 36e5;
            case 'minute' : return days * 1440  + milliseconds / 6e4;
            case 'second' : return days * 86400 + milliseconds / 1000;
            // Math.floor prevents floating point math errors here
            case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
            default: throw new Error('Unknown unit ' + units);
        }
    }
}

// TODO: Use this.as('ms')?
function valueOf$1 () {
    if (!this.isValid()) {
        return NaN;
    }
    return (
        this._milliseconds +
        this._days * 864e5 +
        (this._months % 12) * 2592e6 +
        toInt(this._months / 12) * 31536e6
    );
}

function makeAs (alias) {
    return function () {
        return this.as(alias);
    };
}

var asMilliseconds = makeAs('ms');
var asSeconds      = makeAs('s');
var asMinutes      = makeAs('m');
var asHours        = makeAs('h');
var asDays         = makeAs('d');
var asWeeks        = makeAs('w');
var asMonths       = makeAs('M');
var asYears        = makeAs('y');

function clone$1 () {
    return createDuration(this);
}

function get$2 (units) {
    units = normalizeUnits(units);
    return this.isValid() ? this[units + 's']() : NaN;
}

function makeGetter(name) {
    return function () {
        return this.isValid() ? this._data[name] : NaN;
    };
}

var milliseconds = makeGetter('milliseconds');
var seconds      = makeGetter('seconds');
var minutes      = makeGetter('minutes');
var hours        = makeGetter('hours');
var days         = makeGetter('days');
var months       = makeGetter('months');
var years        = makeGetter('years');

function weeks () {
    return absFloor(this.days() / 7);
}

var round = Math.round;
var thresholds = {
    ss: 44,         // a few seconds to seconds
    s : 45,         // seconds to minute
    m : 45,         // minutes to hour
    h : 22,         // hours to day
    d : 26,         // days to month
    M : 11          // months to year
};

// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}

function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
    var duration = createDuration(posNegDuration).abs();
    var seconds  = round(duration.as('s'));
    var minutes  = round(duration.as('m'));
    var hours    = round(duration.as('h'));
    var days     = round(duration.as('d'));
    var months   = round(duration.as('M'));
    var years    = round(duration.as('y'));

    var a = seconds <= thresholds.ss && ['s', seconds]  ||
            seconds < thresholds.s   && ['ss', seconds] ||
            minutes <= 1             && ['m']           ||
            minutes < thresholds.m   && ['mm', minutes] ||
            hours   <= 1             && ['h']           ||
            hours   < thresholds.h   && ['hh', hours]   ||
            days    <= 1             && ['d']           ||
            days    < thresholds.d   && ['dd', days]    ||
            months  <= 1             && ['M']           ||
            months  < thresholds.M   && ['MM', months]  ||
            years   <= 1             && ['y']           || ['yy', years];

    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
}

// This function allows you to set the rounding function for relative time strings
function getSetRelativeTimeRounding (roundingFunction) {
    if (roundingFunction === undefined) {
        return round;
    }
    if (typeof(roundingFunction) === 'function') {
        round = roundingFunction;
        return true;
    }
    return false;
}

// This function allows you to set a threshold for relative time strings
function getSetRelativeTimeThreshold (threshold, limit) {
    if (thresholds[threshold] === undefined) {
        return false;
    }
    if (limit === undefined) {
        return thresholds[threshold];
    }
    thresholds[threshold] = limit;
    if (threshold === 's') {
        thresholds.ss = limit - 1;
    }
    return true;
}

function humanize (withSuffix) {
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var locale = this.localeData();
    var output = relativeTime$1(this, !withSuffix, locale);

    if (withSuffix) {
        output = locale.pastFuture(+this, output);
    }

    return locale.postformat(output);
}

var abs$1 = Math.abs;

function sign(x) {
    return ((x > 0) - (x < 0)) || +x;
}

function toISOString$1() {
    // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    if (!this.isValid()) {
        return this.localeData().invalidDate();
    }

    var seconds = abs$1(this._milliseconds) / 1000;
    var days         = abs$1(this._days);
    var months       = abs$1(this._months);
    var minutes, hours, years;

    // 3600 seconds -> 60 minutes -> 1 hour
    minutes           = absFloor(seconds / 60);
    hours             = absFloor(minutes / 60);
    seconds %= 60;
    minutes %= 60;

    // 12 months -> 1 year
    years  = absFloor(months / 12);
    months %= 12;


    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
    var Y = years;
    var M = months;
    var D = days;
    var h = hours;
    var m = minutes;
    var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
    var total = this.asSeconds();

    if (!total) {
        // this is the same as C#'s (Noda) and python (isodate)...
        // but not other JS (goog.date)
        return 'P0D';
    }

    var totalSign = total < 0 ? '-' : '';
    var ymSign = sign(this._months) !== sign(total) ? '-' : '';
    var daysSign = sign(this._days) !== sign(total) ? '-' : '';
    var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

    return totalSign + 'P' +
        (Y ? ymSign + Y + 'Y' : '') +
        (M ? ymSign + M + 'M' : '') +
        (D ? daysSign + D + 'D' : '') +
        ((h || m || s) ? 'T' : '') +
        (h ? hmsSign + h + 'H' : '') +
        (m ? hmsSign + m + 'M' : '') +
        (s ? hmsSign + s + 'S' : '');
}

var proto$2 = Duration.prototype;

proto$2.isValid        = isValid$1;
proto$2.abs            = abs;
proto$2.add            = add$1;
proto$2.subtract       = subtract$1;
proto$2.as             = as;
proto$2.asMilliseconds = asMilliseconds;
proto$2.asSeconds      = asSeconds;
proto$2.asMinutes      = asMinutes;
proto$2.asHours        = asHours;
proto$2.asDays         = asDays;
proto$2.asWeeks        = asWeeks;
proto$2.asMonths       = asMonths;
proto$2.asYears        = asYears;
proto$2.valueOf        = valueOf$1;
proto$2._bubble        = bubble;
proto$2.clone          = clone$1;
proto$2.get            = get$2;
proto$2.milliseconds   = milliseconds;
proto$2.seconds        = seconds;
proto$2.minutes        = minutes;
proto$2.hours          = hours;
proto$2.days           = days;
proto$2.weeks          = weeks;
proto$2.months         = months;
proto$2.years          = years;
proto$2.humanize       = humanize;
proto$2.toISOString    = toISOString$1;
proto$2.toString       = toISOString$1;
proto$2.toJSON         = toISOString$1;
proto$2.locale         = locale;
proto$2.localeData     = localeData;

// Deprecations
proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
proto$2.lang = lang;

// Side effect imports

// FORMATTING

addFormatToken('X', 0, 0, 'unix');
addFormatToken('x', 0, 0, 'valueOf');

// PARSING

addRegexToken('x', matchSigned);
addRegexToken('X', matchTimestamp);
addParseToken('X', function (input, array, config) {
    config._d = new Date(parseFloat(input, 10) * 1000);
});
addParseToken('x', function (input, array, config) {
    config._d = new Date(toInt(input));
});

// Side effect imports

//! moment.js
//! version : 2.20.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

hooks.version = '2.20.1';

setHookCallback(createLocal);

hooks.fn                    = proto;
hooks.min                   = min;
hooks.max                   = max;
hooks.now                   = now;
hooks.utc                   = createUTC;
hooks.unix                  = createUnix;
hooks.months                = listMonths;
hooks.isDate                = isDate;
hooks.locale                = getSetGlobalLocale;
hooks.invalid               = createInvalid;
hooks.duration              = createDuration;
hooks.isMoment              = isMoment;
hooks.weekdays              = listWeekdays;
hooks.parseZone             = createInZone;
hooks.localeData            = getLocale;
hooks.isDuration            = isDuration;
hooks.monthsShort           = listMonthsShort;
hooks.weekdaysMin           = listWeekdaysMin;
hooks.defineLocale          = defineLocale;
hooks.updateLocale          = updateLocale;
hooks.locales               = listLocales;
hooks.weekdaysShort         = listWeekdaysShort;
hooks.normalizeUnits        = normalizeUnits;
hooks.relativeTimeRounding  = getSetRelativeTimeRounding;
hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
hooks.calendarFormat        = getCalendarFormat;
hooks.prototype             = proto;

// currently HTML5 input type only supports 24-hour formats
hooks.HTML5_FMT = {
    DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',             // <input type="datetime-local" />
    DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',  // <input type="datetime-local" step="1" />
    DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',   // <input type="datetime-local" step="0.001" />
    DATE: 'YYYY-MM-DD',                             // <input type="date" />
    TIME: 'HH:mm',                                  // <input type="time" />
    TIME_SECONDS: 'HH:mm:ss',                       // <input type="time" step="1" />
    TIME_MS: 'HH:mm:ss.SSS',                        // <input type="time" step="0.001" />
    WEEK: 'YYYY-[W]WW',                             // <input type="week" />
    MONTH: 'YYYY-MM'                                // <input type="month" />
};




var moment$2 = Object.freeze({
	default: hooks
});

var require$$0 = ( moment$2 && hooks ) || moment$2;

var pikaday = createCommonjsModule(function (module, exports) {
/*!
 * Pikaday
 *
 * Copyright © 2014 David Bushell | BSD & MIT license | https://github.com/dbushell/Pikaday
 */

(function (root, factory)
{
    var moment;
    {
        // CommonJS module
        // Load moment.js as an optional dependency
        try { moment = require$$0; } catch (e) {}
        module.exports = factory(moment);
    }
}(commonjsGlobal, function (moment)
{
    var hasMoment = typeof moment === 'function',

    hasEventListeners = !!window.addEventListener,

    document = window.document,

    sto = window.setTimeout,

    addEvent = function(el, e, callback, capture)
    {
        if (hasEventListeners) {
            el.addEventListener(e, callback, !!capture);
        } else {
            el.attachEvent('on' + e, callback);
        }
    },

    removeEvent = function(el, e, callback, capture)
    {
        if (hasEventListeners) {
            el.removeEventListener(e, callback, !!capture);
        } else {
            el.detachEvent('on' + e, callback);
        }
    },

    trim = function(str)
    {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');
    },

    hasClass = function(el, cn)
    {
        return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
    },

    addClass = function(el, cn)
    {
        if (!hasClass(el, cn)) {
            el.className = (el.className === '') ? cn : el.className + ' ' + cn;
        }
    },

    removeClass = function(el, cn)
    {
        el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
    },

    isArray = function(obj)
    {
        return (/Array/).test(Object.prototype.toString.call(obj));
    },

    isDate = function(obj)
    {
        return (/Date/).test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime());
    },

    isWeekend = function(date)
    {
        var day = date.getDay();
        return day === 0 || day === 6;
    },

    isLeapYear = function(year)
    {
        // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    },

    getDaysInMonth = function(year, month)
    {
        return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    },

    setToStartOfDay = function(date)
    {
        if (isDate(date)) date.setHours(0,0,0,0);
    },

    compareDates = function(a,b)
    {
        // weak date comparison (use setToStartOfDay(date) to ensure correct result)
        return a.getTime() === b.getTime();
    },

    extend = function(to, from, overwrite)
    {
        var prop, hasProp;
        for (prop in from) {
            hasProp = to[prop] !== undefined;
            if (hasProp && typeof from[prop] === 'object' && from[prop] !== null && from[prop].nodeName === undefined) {
                if (isDate(from[prop])) {
                    if (overwrite) {
                        to[prop] = new Date(from[prop].getTime());
                    }
                }
                else if (isArray(from[prop])) {
                    if (overwrite) {
                        to[prop] = from[prop].slice(0);
                    }
                } else {
                    to[prop] = extend({}, from[prop], overwrite);
                }
            } else if (overwrite || !hasProp) {
                to[prop] = from[prop];
            }
        }
        return to;
    },

    fireEvent = function(el, eventName, data)
    {
        var ev;

        if (document.createEvent) {
            ev = document.createEvent('HTMLEvents');
            ev.initEvent(eventName, true, false);
            ev = extend(ev, data);
            el.dispatchEvent(ev);
        } else if (document.createEventObject) {
            ev = document.createEventObject();
            ev = extend(ev, data);
            el.fireEvent('on' + eventName, ev);
        }
    },

    adjustCalendar = function(calendar) {
        if (calendar.month < 0) {
            calendar.year -= Math.ceil(Math.abs(calendar.month)/12);
            calendar.month += 12;
        }
        if (calendar.month > 11) {
            calendar.year += Math.floor(Math.abs(calendar.month)/12);
            calendar.month -= 12;
        }
        return calendar;
    },

    /**
     * defaults and localisation
     */
    defaults = {

        // bind the picker to a form field
        field: null,

        // automatically show/hide the picker on `field` focus (default `true` if `field` is set)
        bound: undefined,

        // position of the datepicker, relative to the field (default to bottom & left)
        // ('bottom' & 'left' keywords are not used, 'top' & 'right' are modifier on the bottom/left position)
        position: 'bottom left',

        // automatically fit in the viewport even if it means repositioning from the position option
        reposition: true,

        // the default output format for `.toString()` and `field` value
        format: 'YYYY-MM-DD',

        // the toString function which gets passed a current date object and format
        // and returns a string
        toString: null,

        // used to create date object from current input string
        parse: null,

        // the initial date to view when first opened
        defaultDate: null,

        // make the `defaultDate` the initial selected value
        setDefaultDate: false,

        // first day of week (0: Sunday, 1: Monday etc)
        firstDay: 0,

        // the default flag for moment's strict date parsing
        formatStrict: false,

        // the minimum/earliest date that can be selected
        minDate: null,
        // the maximum/latest date that can be selected
        maxDate: null,

        // number of years either side, or array of upper/lower range
        yearRange: 10,

        // show week numbers at head of row
        showWeekNumber: false,

        // Week picker mode
        pickWholeWeek: false,

        // used internally (don't config outside)
        minYear: 0,
        maxYear: 9999,
        minMonth: undefined,
        maxMonth: undefined,

        startRange: null,
        endRange: null,

        isRTL: false,

        // Additional text to append to the year in the calendar title
        yearSuffix: '',

        // Render the month after year in the calendar title
        showMonthAfterYear: false,

        // Render days of the calendar grid that fall in the next or previous month
        showDaysInNextAndPreviousMonths: false,

        // Allows user to select days that fall in the next or previous month
        enableSelectionDaysInNextAndPreviousMonths: false,

        // how many months are visible
        numberOfMonths: 1,

        // when numberOfMonths is used, this will help you to choose where the main calendar will be (default `left`, can be set to `right`)
        // only used for the first display or when a selected date is not visible
        mainCalendar: 'left',

        // Specify a DOM element to render the calendar in
        container: undefined,

        // Blur field when date is selected
        blurFieldOnSelect : true,

        // internationalization
        i18n: {
            previousMonth : 'Previous Month',
            nextMonth     : 'Next Month',
            months        : ['January','February','March','April','May','June','July','August','September','October','November','December'],
            weekdays      : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
            weekdaysShort : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
        },

        // Theme Classname
        theme: null,

        // events array
        events: [],

        // callback function
        onSelect: null,
        onOpen: null,
        onClose: null,
        onDraw: null,

        // Enable keyboard input
        keyboardInput: true
    },


    /**
     * templating functions to abstract HTML rendering
     */
    renderDayName = function(opts, day, abbr)
    {
        day += opts.firstDay;
        while (day >= 7) {
            day -= 7;
        }
        return abbr ? opts.i18n.weekdaysShort[day] : opts.i18n.weekdays[day];
    },

    renderDay = function(opts)
    {
        var arr = [];
        var ariaSelected = 'false';
        if (opts.isEmpty) {
            if (opts.showDaysInNextAndPreviousMonths) {
                arr.push('is-outside-current-month');

                if(!opts.enableSelectionDaysInNextAndPreviousMonths) {
                    arr.push('is-selection-disabled');
                }

            } else {
                return '<td class="is-empty"></td>';
            }
        }
        if (opts.isDisabled) {
            arr.push('is-disabled');
        }
        if (opts.isToday) {
            arr.push('is-today');
        }
        if (opts.isSelected) {
            arr.push('is-selected');
            ariaSelected = 'true';
        }
        if (opts.hasEvent) {
            arr.push('has-event');
        }
        if (opts.isInRange) {
            arr.push('is-inrange');
        }
        if (opts.isStartRange) {
            arr.push('is-startrange');
        }
        if (opts.isEndRange) {
            arr.push('is-endrange');
        }
        return '<td data-day="' + opts.day + '" class="' + arr.join(' ') + '" aria-selected="' + ariaSelected + '">' +
                 '<button class="pika-button pika-day" type="button" ' +
                    'data-pika-year="' + opts.year + '" data-pika-month="' + opts.month + '" data-pika-day="' + opts.day + '">' +
                        opts.day +
                 '</button>' +
               '</td>';
    },

    renderWeek = function (d, m, y) {
        // Lifted from http://javascript.about.com/library/blweekyear.htm, lightly modified.
        var onejan = new Date(y, 0, 1),
            weekNum = Math.ceil((((new Date(y, m, d) - onejan) / 86400000) + onejan.getDay()+1)/7);
        return '<td class="pika-week">' + weekNum + '</td>';
    },

    renderRow = function(days, isRTL, pickWholeWeek, isRowSelected)
    {
        return '<tr class="pika-row' + (pickWholeWeek ? ' pick-whole-week' : '') + (isRowSelected ? ' is-selected' : '') + '">' + (isRTL ? days.reverse() : days).join('') + '</tr>';
    },

    renderBody = function(rows)
    {
        return '<tbody>' + rows.join('') + '</tbody>';
    },

    renderHead = function(opts)
    {
        var i, arr = [];
        if (opts.showWeekNumber) {
            arr.push('<th></th>');
        }
        for (i = 0; i < 7; i++) {
            arr.push('<th scope="col"><abbr title="' + renderDayName(opts, i) + '">' + renderDayName(opts, i, true) + '</abbr></th>');
        }
        return '<thead><tr>' + (opts.isRTL ? arr.reverse() : arr).join('') + '</tr></thead>';
    },

    renderTitle = function(instance, c, year, month, refYear, randId)
    {
        var i, j, arr,
            opts = instance._o,
            isMinYear = year === opts.minYear,
            isMaxYear = year === opts.maxYear,
            html = '<div id="' + randId + '" class="pika-title" role="heading" aria-live="assertive">',
            monthHtml,
            yearHtml,
            prev = true,
            next = true;

        for (arr = [], i = 0; i < 12; i++) {
            arr.push('<option value="' + (year === refYear ? i - c : 12 + i - c) + '"' +
                (i === month ? ' selected="selected"': '') +
                ((isMinYear && i < opts.minMonth) || (isMaxYear && i > opts.maxMonth) ? 'disabled="disabled"' : '') + '>' +
                opts.i18n.months[i] + '</option>');
        }

        monthHtml = '<div class="pika-label">' + opts.i18n.months[month] + '<select class="pika-select pika-select-month" tabindex="-1">' + arr.join('') + '</select></div>';

        if (isArray(opts.yearRange)) {
            i = opts.yearRange[0];
            j = opts.yearRange[1] + 1;
        } else {
            i = year - opts.yearRange;
            j = 1 + year + opts.yearRange;
        }

        for (arr = []; i < j && i <= opts.maxYear; i++) {
            if (i >= opts.minYear) {
                arr.push('<option value="' + i + '"' + (i === year ? ' selected="selected"': '') + '>' + (i) + '</option>');
            }
        }
        yearHtml = '<div class="pika-label">' + year + opts.yearSuffix + '<select class="pika-select pika-select-year" tabindex="-1">' + arr.join('') + '</select></div>';

        if (opts.showMonthAfterYear) {
            html += yearHtml + monthHtml;
        } else {
            html += monthHtml + yearHtml;
        }

        if (isMinYear && (month === 0 || opts.minMonth >= month)) {
            prev = false;
        }

        if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
            next = false;
        }

        if (c === 0) {
            html += '<button class="pika-prev' + (prev ? '' : ' is-disabled') + '" type="button">' + opts.i18n.previousMonth + '</button>';
        }
        if (c === (instance._o.numberOfMonths - 1) ) {
            html += '<button class="pika-next' + (next ? '' : ' is-disabled') + '" type="button">' + opts.i18n.nextMonth + '</button>';
        }

        return html += '</div>';
    },

    renderTable = function(opts, data, randId)
    {
        return '<table cellpadding="0" cellspacing="0" class="pika-table" role="grid" aria-labelledby="' + randId + '">' + renderHead(opts) + renderBody(data) + '</table>';
    },


    /**
     * Pikaday constructor
     */
    Pikaday = function(options)
    {
        var self = this,
            opts = self.config(options);

        self._onMouseDown = function(e)
        {
            if (!self._v) {
                return;
            }
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (!target) {
                return;
            }

            if (!hasClass(target, 'is-disabled')) {
                if (hasClass(target, 'pika-button') && !hasClass(target, 'is-empty') && !hasClass(target.parentNode, 'is-disabled')) {
                    self.setDate(new Date(target.getAttribute('data-pika-year'), target.getAttribute('data-pika-month'), target.getAttribute('data-pika-day')));
                    if (opts.bound) {
                        sto(function() {
                            self.hide();
                            if (opts.blurFieldOnSelect && opts.field) {
                                opts.field.blur();
                            }
                        }, 100);
                    }
                }
                else if (hasClass(target, 'pika-prev')) {
                    self.prevMonth();
                }
                else if (hasClass(target, 'pika-next')) {
                    self.nextMonth();
                }
            }
            if (!hasClass(target, 'pika-select')) {
                // if this is touch event prevent mouse events emulation
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                    return false;
                }
            } else {
                self._c = true;
            }
        };

        self._onChange = function(e)
        {
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (!target) {
                return;
            }
            if (hasClass(target, 'pika-select-month')) {
                self.gotoMonth(target.value);
            }
            else if (hasClass(target, 'pika-select-year')) {
                self.gotoYear(target.value);
            }
        };

        self._onKeyChange = function(e)
        {
            e = e || window.event;

            if (self.isVisible()) {

                switch(e.keyCode){
                    case 13:
                    case 27:
                        if (opts.field) {
                            opts.field.blur();
                        }
                        break;
                    case 37:
                        e.preventDefault();
                        self.adjustDate('subtract', 1);
                        break;
                    case 38:
                        self.adjustDate('subtract', 7);
                        break;
                    case 39:
                        self.adjustDate('add', 1);
                        break;
                    case 40:
                        self.adjustDate('add', 7);
                        break;
                }
            }
        };

        self._onInputChange = function(e)
        {
            var date;

            if (e.firedBy === self) {
                return;
            }
            if (opts.parse) {
                date = opts.parse(opts.field.value, opts.format);
            } else if (hasMoment) {
                date = moment(opts.field.value, opts.format, opts.formatStrict);
                date = (date && date.isValid()) ? date.toDate() : null;
            }
            else {
                date = new Date(Date.parse(opts.field.value));
            }
            if (isDate(date)) {
              self.setDate(date);
            }
            if (!self._v) {
                self.show();
            }
        };

        self._onInputFocus = function()
        {
            self.show();
        };

        self._onInputClick = function()
        {
            self.show();
        };

        self._onInputBlur = function()
        {
            // IE allows pika div to gain focus; catch blur the input field
            var pEl = document.activeElement;
            do {
                if (hasClass(pEl, 'pika-single')) {
                    return;
                }
            }
            while ((pEl = pEl.parentNode));

            if (!self._c) {
                self._b = sto(function() {
                    self.hide();
                }, 50);
            }
            self._c = false;
        };

        self._onClick = function(e)
        {
            e = e || window.event;
            var target = e.target || e.srcElement,
                pEl = target;
            if (!target) {
                return;
            }
            if (!hasEventListeners && hasClass(target, 'pika-select')) {
                if (!target.onchange) {
                    target.setAttribute('onchange', 'return;');
                    addEvent(target, 'change', self._onChange);
                }
            }
            do {
                if (hasClass(pEl, 'pika-single') || pEl === opts.trigger) {
                    return;
                }
            }
            while ((pEl = pEl.parentNode));
            if (self._v && target !== opts.trigger && pEl !== opts.trigger) {
                self.hide();
            }
        };

        self.el = document.createElement('div');
        self.el.className = 'pika-single' + (opts.isRTL ? ' is-rtl' : '') + (opts.theme ? ' ' + opts.theme : '');

        addEvent(self.el, 'mousedown', self._onMouseDown, true);
        addEvent(self.el, 'touchend', self._onMouseDown, true);
        addEvent(self.el, 'change', self._onChange);

        if (opts.keyboardInput) {
            addEvent(document, 'keydown', self._onKeyChange);
        }

        if (opts.field) {
            if (opts.container) {
                opts.container.appendChild(self.el);
            } else if (opts.bound) {
                document.body.appendChild(self.el);
            } else {
                opts.field.parentNode.insertBefore(self.el, opts.field.nextSibling);
            }
            addEvent(opts.field, 'change', self._onInputChange);

            if (!opts.defaultDate) {
                if (hasMoment && opts.field.value) {
                    opts.defaultDate = moment(opts.field.value, opts.format).toDate();
                } else {
                    opts.defaultDate = new Date(Date.parse(opts.field.value));
                }
                opts.setDefaultDate = true;
            }
        }

        var defDate = opts.defaultDate;

        if (isDate(defDate)) {
            if (opts.setDefaultDate) {
                self.setDate(defDate, true);
            } else {
                self.gotoDate(defDate);
            }
        } else {
            self.gotoDate(new Date());
        }

        if (opts.bound) {
            this.hide();
            self.el.className += ' is-bound';
            addEvent(opts.trigger, 'click', self._onInputClick);
            addEvent(opts.trigger, 'focus', self._onInputFocus);
            addEvent(opts.trigger, 'blur', self._onInputBlur);
        } else {
            this.show();
        }
    };


    /**
     * public Pikaday API
     */
    Pikaday.prototype = {


        /**
         * configure functionality
         */
        config: function(options)
        {
            if (!this._o) {
                this._o = extend({}, defaults, true);
            }

            var opts = extend(this._o, options, true);

            opts.isRTL = !!opts.isRTL;

            opts.field = (opts.field && opts.field.nodeName) ? opts.field : null;

            opts.theme = (typeof opts.theme) === 'string' && opts.theme ? opts.theme : null;

            opts.bound = !!(opts.bound !== undefined ? opts.field && opts.bound : opts.field);

            opts.trigger = (opts.trigger && opts.trigger.nodeName) ? opts.trigger : opts.field;

            opts.disableWeekends = !!opts.disableWeekends;

            opts.disableDayFn = (typeof opts.disableDayFn) === 'function' ? opts.disableDayFn : null;

            var nom = parseInt(opts.numberOfMonths, 10) || 1;
            opts.numberOfMonths = nom > 4 ? 4 : nom;

            if (!isDate(opts.minDate)) {
                opts.minDate = false;
            }
            if (!isDate(opts.maxDate)) {
                opts.maxDate = false;
            }
            if ((opts.minDate && opts.maxDate) && opts.maxDate < opts.minDate) {
                opts.maxDate = opts.minDate = false;
            }
            if (opts.minDate) {
                this.setMinDate(opts.minDate);
            }
            if (opts.maxDate) {
                this.setMaxDate(opts.maxDate);
            }

            if (isArray(opts.yearRange)) {
                var fallback = new Date().getFullYear() - 10;
                opts.yearRange[0] = parseInt(opts.yearRange[0], 10) || fallback;
                opts.yearRange[1] = parseInt(opts.yearRange[1], 10) || fallback;
            } else {
                opts.yearRange = Math.abs(parseInt(opts.yearRange, 10)) || defaults.yearRange;
                if (opts.yearRange > 100) {
                    opts.yearRange = 100;
                }
            }

            return opts;
        },

        /**
         * return a formatted string of the current selection (using Moment.js if available)
         */
        toString: function(format)
        {
            format = format || this._o.format;
            if (!isDate(this._d)) {
                return '';
            }
            if (this._o.toString) {
              return this._o.toString(this._d, format);
            }
            if (hasMoment) {
              return moment(this._d).format(format);
            }
            return this._d.toDateString();
        },

        /**
         * return a Moment.js object of the current selection (if available)
         */
        getMoment: function()
        {
            return hasMoment ? moment(this._d) : null;
        },

        /**
         * set the current selection from a Moment.js object (if available)
         */
        setMoment: function(date, preventOnSelect)
        {
            if (hasMoment && moment.isMoment(date)) {
                this.setDate(date.toDate(), preventOnSelect);
            }
        },

        /**
         * return a Date object of the current selection
         */
        getDate: function()
        {
            return isDate(this._d) ? new Date(this._d.getTime()) : null;
        },

        /**
         * set the current selection
         */
        setDate: function(date, preventOnSelect)
        {
            if (!date) {
                this._d = null;

                if (this._o.field) {
                    this._o.field.value = '';
                    fireEvent(this._o.field, 'change', { firedBy: this });
                }

                return this.draw();
            }
            if (typeof date === 'string') {
                date = new Date(Date.parse(date));
            }
            if (!isDate(date)) {
                return;
            }

            var min = this._o.minDate,
                max = this._o.maxDate;

            if (isDate(min) && date < min) {
                date = min;
            } else if (isDate(max) && date > max) {
                date = max;
            }

            this._d = new Date(date.getTime());
            setToStartOfDay(this._d);
            this.gotoDate(this._d);

            if (this._o.field) {
                this._o.field.value = this.toString();
                fireEvent(this._o.field, 'change', { firedBy: this });
            }
            if (!preventOnSelect && typeof this._o.onSelect === 'function') {
                this._o.onSelect.call(this, this.getDate());
            }
        },

        /**
         * change view to a specific date
         */
        gotoDate: function(date)
        {
            var newCalendar = true;

            if (!isDate(date)) {
                return;
            }

            if (this.calendars) {
                var firstVisibleDate = new Date(this.calendars[0].year, this.calendars[0].month, 1),
                    lastVisibleDate = new Date(this.calendars[this.calendars.length-1].year, this.calendars[this.calendars.length-1].month, 1),
                    visibleDate = date.getTime();
                // get the end of the month
                lastVisibleDate.setMonth(lastVisibleDate.getMonth()+1);
                lastVisibleDate.setDate(lastVisibleDate.getDate()-1);
                newCalendar = (visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate);
            }

            if (newCalendar) {
                this.calendars = [{
                    month: date.getMonth(),
                    year: date.getFullYear()
                }];
                if (this._o.mainCalendar === 'right') {
                    this.calendars[0].month += 1 - this._o.numberOfMonths;
                }
            }

            this.adjustCalendars();
        },

        adjustDate: function(sign, days) {

            var day = this.getDate() || new Date();
            var difference = parseInt(days)*24*60*60*1000;

            var newDay;

            if (sign === 'add') {
                newDay = new Date(day.valueOf() + difference);
            } else if (sign === 'subtract') {
                newDay = new Date(day.valueOf() - difference);
            }

            this.setDate(newDay);
        },

        adjustCalendars: function() {
            this.calendars[0] = adjustCalendar(this.calendars[0]);
            for (var c = 1; c < this._o.numberOfMonths; c++) {
                this.calendars[c] = adjustCalendar({
                    month: this.calendars[0].month + c,
                    year: this.calendars[0].year
                });
            }
            this.draw();
        },

        gotoToday: function()
        {
            this.gotoDate(new Date());
        },

        /**
         * change view to a specific month (zero-index, e.g. 0: January)
         */
        gotoMonth: function(month)
        {
            if (!isNaN(month)) {
                this.calendars[0].month = parseInt(month, 10);
                this.adjustCalendars();
            }
        },

        nextMonth: function()
        {
            this.calendars[0].month++;
            this.adjustCalendars();
        },

        prevMonth: function()
        {
            this.calendars[0].month--;
            this.adjustCalendars();
        },

        /**
         * change view to a specific full year (e.g. "2012")
         */
        gotoYear: function(year)
        {
            if (!isNaN(year)) {
                this.calendars[0].year = parseInt(year, 10);
                this.adjustCalendars();
            }
        },

        /**
         * change the minDate
         */
        setMinDate: function(value)
        {
            if(value instanceof Date) {
                setToStartOfDay(value);
                this._o.minDate = value;
                this._o.minYear  = value.getFullYear();
                this._o.minMonth = value.getMonth();
            } else {
                this._o.minDate = defaults.minDate;
                this._o.minYear  = defaults.minYear;
                this._o.minMonth = defaults.minMonth;
                this._o.startRange = defaults.startRange;
            }

            this.draw();
        },

        /**
         * change the maxDate
         */
        setMaxDate: function(value)
        {
            if(value instanceof Date) {
                setToStartOfDay(value);
                this._o.maxDate = value;
                this._o.maxYear = value.getFullYear();
                this._o.maxMonth = value.getMonth();
            } else {
                this._o.maxDate = defaults.maxDate;
                this._o.maxYear = defaults.maxYear;
                this._o.maxMonth = defaults.maxMonth;
                this._o.endRange = defaults.endRange;
            }

            this.draw();
        },

        setStartRange: function(value)
        {
            this._o.startRange = value;
        },

        setEndRange: function(value)
        {
            this._o.endRange = value;
        },

        /**
         * refresh the HTML
         */
        draw: function(force)
        {
            if (!this._v && !force) {
                return;
            }
            var opts = this._o,
                minYear = opts.minYear,
                maxYear = opts.maxYear,
                minMonth = opts.minMonth,
                maxMonth = opts.maxMonth,
                html = '',
                randId;

            if (this._y <= minYear) {
                this._y = minYear;
                if (!isNaN(minMonth) && this._m < minMonth) {
                    this._m = minMonth;
                }
            }
            if (this._y >= maxYear) {
                this._y = maxYear;
                if (!isNaN(maxMonth) && this._m > maxMonth) {
                    this._m = maxMonth;
                }
            }

            randId = 'pika-title-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 2);

            for (var c = 0; c < opts.numberOfMonths; c++) {
                html += '<div class="pika-lendar">' + renderTitle(this, c, this.calendars[c].year, this.calendars[c].month, this.calendars[0].year, randId) + this.render(this.calendars[c].year, this.calendars[c].month, randId) + '</div>';
            }

            this.el.innerHTML = html;

            if (opts.bound) {
                if(opts.field.type !== 'hidden') {
                    sto(function() {
                        opts.trigger.focus();
                    }, 1);
                }
            }

            if (typeof this._o.onDraw === 'function') {
                this._o.onDraw(this);
            }

            if (opts.bound) {
                // let the screen reader user know to use arrow keys
                opts.field.setAttribute('aria-label', 'Use the arrow keys to pick a date');
            }
        },

        adjustPosition: function()
        {
            var field, pEl, width, height, viewportWidth, viewportHeight, scrollTop, left, top, clientRect;

            if (this._o.container) return;

            this.el.style.position = 'absolute';

            field = this._o.trigger;
            pEl = field;
            width = this.el.offsetWidth;
            height = this.el.offsetHeight;
            viewportWidth = window.innerWidth || document.documentElement.clientWidth;
            viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

            if (typeof field.getBoundingClientRect === 'function') {
                clientRect = field.getBoundingClientRect();
                left = clientRect.left + window.pageXOffset;
                top = clientRect.bottom + window.pageYOffset;
            } else {
                left = pEl.offsetLeft;
                top  = pEl.offsetTop + pEl.offsetHeight;
                while((pEl = pEl.offsetParent)) {
                    left += pEl.offsetLeft;
                    top  += pEl.offsetTop;
                }
            }

            // default position is bottom & left
            if ((this._o.reposition && left + width > viewportWidth) ||
                (
                    this._o.position.indexOf('right') > -1 &&
                    left - width + field.offsetWidth > 0
                )
            ) {
                left = left - width + field.offsetWidth;
            }
            if ((this._o.reposition && top + height > viewportHeight + scrollTop) ||
                (
                    this._o.position.indexOf('top') > -1 &&
                    top - height - field.offsetHeight > 0
                )
            ) {
                top = top - height - field.offsetHeight;
            }

            this.el.style.left = left + 'px';
            this.el.style.top = top + 'px';
        },

        /**
         * render HTML for a particular month
         */
        render: function(year, month, randId)
        {
            var opts   = this._o,
                now    = new Date(),
                days   = getDaysInMonth(year, month),
                before = new Date(year, month, 1).getDay(),
                data   = [],
                row    = [];
            setToStartOfDay(now);
            if (opts.firstDay > 0) {
                before -= opts.firstDay;
                if (before < 0) {
                    before += 7;
                }
            }
            var previousMonth = month === 0 ? 11 : month - 1,
                nextMonth = month === 11 ? 0 : month + 1,
                yearOfPreviousMonth = month === 0 ? year - 1 : year,
                yearOfNextMonth = month === 11 ? year + 1 : year,
                daysInPreviousMonth = getDaysInMonth(yearOfPreviousMonth, previousMonth);
            var cells = days + before,
                after = cells;
            while(after > 7) {
                after -= 7;
            }
            cells += 7 - after;
            var isWeekSelected = false;
            for (var i = 0, r = 0; i < cells; i++)
            {
                var day = new Date(year, month, 1 + (i - before)),
                    isSelected = isDate(this._d) ? compareDates(day, this._d) : false,
                    isToday = compareDates(day, now),
                    hasEvent = opts.events.indexOf(day.toDateString()) !== -1 ? true : false,
                    isEmpty = i < before || i >= (days + before),
                    dayNumber = 1 + (i - before),
                    monthNumber = month,
                    yearNumber = year,
                    isStartRange = opts.startRange && compareDates(opts.startRange, day),
                    isEndRange = opts.endRange && compareDates(opts.endRange, day),
                    isInRange = opts.startRange && opts.endRange && opts.startRange < day && day < opts.endRange,
                    isDisabled = (opts.minDate && day < opts.minDate) ||
                                 (opts.maxDate && day > opts.maxDate) ||
                                 (opts.disableWeekends && isWeekend(day)) ||
                                 (opts.disableDayFn && opts.disableDayFn(day));

                if (isEmpty) {
                    if (i < before) {
                        dayNumber = daysInPreviousMonth + dayNumber;
                        monthNumber = previousMonth;
                        yearNumber = yearOfPreviousMonth;
                    } else {
                        dayNumber = dayNumber - days;
                        monthNumber = nextMonth;
                        yearNumber = yearOfNextMonth;
                    }
                }

                var dayConfig = {
                        day: dayNumber,
                        month: monthNumber,
                        year: yearNumber,
                        hasEvent: hasEvent,
                        isSelected: isSelected,
                        isToday: isToday,
                        isDisabled: isDisabled,
                        isEmpty: isEmpty,
                        isStartRange: isStartRange,
                        isEndRange: isEndRange,
                        isInRange: isInRange,
                        showDaysInNextAndPreviousMonths: opts.showDaysInNextAndPreviousMonths,
                        enableSelectionDaysInNextAndPreviousMonths: opts.enableSelectionDaysInNextAndPreviousMonths
                    };

                if (opts.pickWholeWeek && isSelected) {
                    isWeekSelected = true;
                }

                row.push(renderDay(dayConfig));

                if (++r === 7) {
                    if (opts.showWeekNumber) {
                        row.unshift(renderWeek(i - before, month, year));
                    }
                    data.push(renderRow(row, opts.isRTL, opts.pickWholeWeek, isWeekSelected));
                    row = [];
                    r = 0;
                    isWeekSelected = false;
                }
            }
            return renderTable(opts, data, randId);
        },

        isVisible: function()
        {
            return this._v;
        },

        show: function()
        {
            if (!this.isVisible()) {
                this._v = true;
                this.draw();
                removeClass(this.el, 'is-hidden');
                if (this._o.bound) {
                    addEvent(document, 'click', this._onClick);
                    this.adjustPosition();
                }
                if (typeof this._o.onOpen === 'function') {
                    this._o.onOpen.call(this);
                }
            }
        },

        hide: function()
        {
            var v = this._v;
            if (v !== false) {
                if (this._o.bound) {
                    removeEvent(document, 'click', this._onClick);
                }
                this.el.style.position = 'static'; // reset
                this.el.style.left = 'auto';
                this.el.style.top = 'auto';
                addClass(this.el, 'is-hidden');
                this._v = false;
                if (v !== undefined && typeof this._o.onClose === 'function') {
                    this._o.onClose.call(this);
                }
            }
        },

        /**
         * GAME OVER
         */
        destroy: function()
        {
            var opts = this._o;

            this.hide();
            removeEvent(this.el, 'mousedown', this._onMouseDown, true);
            removeEvent(this.el, 'touchend', this._onMouseDown, true);
            removeEvent(this.el, 'change', this._onChange);
            if (opts.keyboardInput) {
                removeEvent(document, 'keydown', this._onKeyChange);
            }
            if (opts.field) {
                removeEvent(opts.field, 'change', this._onInputChange);
                if (opts.bound) {
                    removeEvent(opts.trigger, 'click', this._onInputClick);
                    removeEvent(opts.trigger, 'focus', this._onInputFocus);
                    removeEvent(opts.trigger, 'blur', this._onInputBlur);
                }
            }
            if (this.el.parentNode) {
                this.el.parentNode.removeChild(this.el);
            }
        }

    };

    return Pikaday;
}));
});

class MyInput {
    getAndPostTextValue(event) {
        if (event.currentTarget.value) {
            this.for === "integer" ? this.currentValue = JSON.parse(event.currentTarget.value) : this.currentValue = event.currentTarget.value;
        }
        else {
            this.currentValue = null;
        }
        this.postValue.emit(this.element);
    }
    ;
    getContent() {
        let content = h("input", { class: "form-control", id: this.id, type: this.for === "integer" ? "number" : "text", value: this.currentValue, onInput: (event) => this.getAndPostTextValue(event) });
        if (this.format === "date") {
            content =
                h("input", { class: "form-control", id: this.id, type: this.for === "integer" ? "number" : "text", value: this.currentValue, onChange: (event) => this.getAndPostTextValue(event), onInput: (event) => this.getAndPostTextValue(event) });
        }
        return content;
    }
    ;
    componentWillLoad() {
        if (this.for === "object") {
            this.currentValue = this.value ? this.value : "";
        }
        if (this.for === "integer") {
            this.currentValue = this.value || null;
        }
        if (this.for === "string") {
            this.currentValue = this.value ? JSON.parse(this.value) : "";
        }
    }
    ;
    componentDidLoad() {
        let self = this;
        if (this.for === "object" && this.format === "date") {
            const picker = new pikaday({
                field: this.element.shadowRoot.querySelector("input"),
                onSelect: function (date) {
                    self.currentDate = moment(date).format('Do MMMM YYYY');
                }
            });
            picker._onClick = null; // disable the listener to support shadow DOM
        }
    }
    ;
    render() {
        let content = this.getContent();
        return (h("div", { class: "form-group" },
            h("label", null,
                this.title,
                h("br", null),
                content,
                h("br", null))));
    }
    static get is() { return "my-input"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return { "currentDate": { "state": true }, "currentValue": { "state": true }, "element": { "elementRef": true }, "for": { "type": String, "attr": "for" }, "format": { "type": "Any", "attr": "format" }, "id": { "type": String, "attr": "id" }, "title": { "type": String, "attr": "title" }, "value": { "type": "Any", "attr": "value" } }; }
    static get events() { return [{ "name": "postValue", "method": "postValue", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return "[data-my-input]:root {\n  --blue: #007bff;\n  --indigo: #6610f2;\n  --purple: #6f42c1;\n  --pink: #e83e8c;\n  --red: #dc3545;\n  --orange: #fd7e14;\n  --yellow: #ffc107;\n  --green: #28a745;\n  --teal: #20c997;\n  --cyan: #17a2b8;\n  --white: #fff;\n  --gray: #6c757d;\n  --gray-dark: #343a40;\n  --primary: #007bff;\n  --secondary: #6c757d;\n  --success: #28a745;\n  --info: #17a2b8;\n  --warning: #ffc107;\n  --danger: #dc3545;\n  --light: #f8f9fa;\n  --dark: #343a40;\n  --breakpoint-xs: 0;\n  --breakpoint-sm: 576px;\n  --breakpoint-md: 768px;\n  --breakpoint-lg: 992px;\n  --breakpoint-xl: 1200px;\n  --font-family-sans-serif: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n}\n\n*[data-my-input], *[data-my-input]::before, *[data-my-input]::after {\n  box-sizing: border-box;\n}\n\nhtml[data-my-input] {\n  font-family: sans-serif;\n  line-height: 1.15;\n  -webkit-text-size-adjust: 100%;\n  -ms-text-size-adjust: 100%;\n  -ms-overflow-style: scrollbar;\n  -webkit-tap-highlight-color: transparent;\n}\n\n\@-ms-viewport {\n  width: device-width;\n}\n\narticle[data-my-input], aside[data-my-input], dialog[data-my-input], figcaption[data-my-input], figure[data-my-input], footer[data-my-input], header[data-my-input], hgroup[data-my-input], main[data-my-input], nav[data-my-input], section[data-my-input] {\n  display: block;\n}\n\nbody[data-my-input] {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #212529;\n  text-align: left;\n  background-color: #fff;\n}\n\n[tabindex=\"-1\"][data-my-input]:focus {\n  outline: 0 !important;\n}\n\nhr[data-my-input] {\n  box-sizing: content-box;\n  height: 0;\n  overflow: visible;\n}\n\nh1[data-my-input], h2[data-my-input], h3[data-my-input], h4[data-my-input], h5[data-my-input], h6[data-my-input] {\n  margin-top: 0;\n  margin-bottom: 0.5rem;\n}\n\np[data-my-input] {\n  margin-top: 0;\n  margin-bottom: 1rem;\n}\n\nabbr[title][data-my-input], abbr[data-original-title][data-my-input] {\n  text-decoration: underline;\n  -webkit-text-decoration: underline dotted;\n  text-decoration: underline dotted;\n  cursor: help;\n  border-bottom: 0;\n}\n\naddress[data-my-input] {\n  margin-bottom: 1rem;\n  font-style: normal;\n  line-height: inherit;\n}\n\nol[data-my-input], ul[data-my-input], dl[data-my-input] {\n  margin-top: 0;\n  margin-bottom: 1rem;\n}\n\nol[data-my-input]   ol[data-my-input], ul[data-my-input]   ul[data-my-input], ol[data-my-input]   ul[data-my-input], ul[data-my-input]   ol[data-my-input] {\n  margin-bottom: 0;\n}\n\ndt[data-my-input] {\n  font-weight: 700;\n}\n\ndd[data-my-input] {\n  margin-bottom: .5rem;\n  margin-left: 0;\n}\n\nblockquote[data-my-input] {\n  margin: 0 0 1rem;\n}\n\ndfn[data-my-input] {\n  font-style: italic;\n}\n\nb[data-my-input], strong[data-my-input] {\n  font-weight: bolder;\n}\n\nsmall[data-my-input] {\n  font-size: 80%;\n}\n\nsub[data-my-input], sup[data-my-input] {\n  position: relative;\n  font-size: 75%;\n  line-height: 0;\n  vertical-align: baseline;\n}\n\nsub[data-my-input] {\n  bottom: -.25em;\n}\n\nsup[data-my-input] {\n  top: -.5em;\n}\n\na[data-my-input] {\n  color: #007bff;\n  text-decoration: none;\n  background-color: transparent;\n  -webkit-text-decoration-skip: objects;\n}\n\na[data-my-input]:hover {\n  color: #0056b3;\n  text-decoration: underline;\n}\n\na[data-my-input]:not([href]):not([tabindex]) {\n  color: inherit;\n  text-decoration: none;\n}\n\na[data-my-input]:not([href]):not([tabindex]):hover, a[data-my-input]:not([href]):not([tabindex]):focus {\n  color: inherit;\n  text-decoration: none;\n}\n\na[data-my-input]:not([href]):not([tabindex]):focus {\n  outline: 0;\n}\n\npre[data-my-input], code[data-my-input], kbd[data-my-input], samp[data-my-input] {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\npre[data-my-input] {\n  margin-top: 0;\n  margin-bottom: 1rem;\n  overflow: auto;\n  -ms-overflow-style: scrollbar;\n}\n\nfigure[data-my-input] {\n  margin: 0 0 1rem;\n}\n\nimg[data-my-input] {\n  vertical-align: middle;\n  border-style: none;\n}\n\nsvg[data-my-input]:not(:root) {\n  overflow: hidden;\n}\n\ntable[data-my-input] {\n  border-collapse: collapse;\n}\n\ncaption[data-my-input] {\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n  color: #6c757d;\n  text-align: left;\n  caption-side: bottom;\n}\n\nth[data-my-input] {\n  text-align: inherit;\n}\n\nlabel[data-my-input] {\n  display: inline-block;\n  margin-bottom: .5rem;\n}\n\nbutton[data-my-input] {\n  border-radius: 0;\n}\n\nbutton[data-my-input]:focus {\n  outline: 1px dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n}\n\ninput[data-my-input], button[data-my-input], select[data-my-input], optgroup[data-my-input], textarea[data-my-input] {\n  margin: 0;\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit;\n}\n\nbutton[data-my-input], input[data-my-input] {\n  overflow: visible;\n}\n\nbutton[data-my-input], select[data-my-input] {\n  text-transform: none;\n}\n\nbutton[data-my-input], html[data-my-input]   [type=\"button\"][data-my-input], [type=\"reset\"][data-my-input], [type=\"submit\"][data-my-input] {\n  -webkit-appearance: button;\n}\n\nbutton[data-my-input]::-moz-focus-inner, [type=\"button\"][data-my-input]::-moz-focus-inner, [type=\"reset\"][data-my-input]::-moz-focus-inner, [type=\"submit\"][data-my-input]::-moz-focus-inner {\n  padding: 0;\n  border-style: none;\n}\n\ninput[type=\"radio\"][data-my-input], input[type=\"checkbox\"][data-my-input] {\n  box-sizing: border-box;\n  padding: 0;\n}\n\ninput[type=\"date\"][data-my-input], input[type=\"time\"][data-my-input], input[type=\"datetime-local\"][data-my-input], input[type=\"month\"][data-my-input] {\n  -webkit-appearance: listbox;\n}\n\ntextarea[data-my-input] {\n  overflow: auto;\n  resize: vertical;\n}\n\nfieldset[data-my-input] {\n  min-width: 0;\n  padding: 0;\n  margin: 0;\n  border: 0;\n}\n\nlegend[data-my-input] {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  padding: 0;\n  margin-bottom: .5rem;\n  font-size: 1.5rem;\n  line-height: inherit;\n  color: inherit;\n  white-space: normal;\n}\n\nprogress[data-my-input] {\n  vertical-align: baseline;\n}\n\n[type=\"number\"][data-my-input]::-webkit-inner-spin-button, [type=\"number\"][data-my-input]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n[type=\"search\"][data-my-input] {\n  outline-offset: -2px;\n  -webkit-appearance: none;\n}\n\n[type=\"search\"][data-my-input]::-webkit-search-cancel-button, [type=\"search\"][data-my-input]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n[data-my-input]::-webkit-file-upload-button {\n  font: inherit;\n  -webkit-appearance: button;\n}\n\noutput[data-my-input] {\n  display: inline-block;\n}\n\nsummary[data-my-input] {\n  display: list-item;\n  cursor: pointer;\n}\n\ntemplate[data-my-input] {\n  display: none;\n}\n\n[hidden][data-my-input] {\n  display: none !important;\n}\n\nh1[data-my-input], h2[data-my-input], h3[data-my-input], h4[data-my-input], h5[data-my-input], h6[data-my-input], .h1[data-my-input], .h2[data-my-input], .h3[data-my-input], .h4[data-my-input], .h5[data-my-input], .h6[data-my-input] {\n  margin-bottom: 0.5rem;\n  font-family: inherit;\n  font-weight: 500;\n  line-height: 1.2;\n  color: inherit;\n}\n\nh1[data-my-input], .h1[data-my-input] {\n  font-size: 2.5rem;\n}\n\nh2[data-my-input], .h2[data-my-input] {\n  font-size: 2rem;\n}\n\nh3[data-my-input], .h3[data-my-input] {\n  font-size: 1.75rem;\n}\n\nh4[data-my-input], .h4[data-my-input] {\n  font-size: 1.5rem;\n}\n\nh5[data-my-input], .h5[data-my-input] {\n  font-size: 1.25rem;\n}\n\nh6[data-my-input], .h6[data-my-input] {\n  font-size: 1rem;\n}\n\n.lead[data-my-input] {\n  font-size: 1.25rem;\n  font-weight: 300;\n}\n\n.display-1[data-my-input] {\n  font-size: 6rem;\n  font-weight: 300;\n  line-height: 1.2;\n}\n\n.display-2[data-my-input] {\n  font-size: 5.5rem;\n  font-weight: 300;\n  line-height: 1.2;\n}\n\n.display-3[data-my-input] {\n  font-size: 4.5rem;\n  font-weight: 300;\n  line-height: 1.2;\n}\n\n.display-4[data-my-input] {\n  font-size: 3.5rem;\n  font-weight: 300;\n  line-height: 1.2;\n}\n\nhr[data-my-input] {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  border: 0;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n}\n\nsmall[data-my-input], .small[data-my-input] {\n  font-size: 80%;\n  font-weight: 400;\n}\n\nmark[data-my-input], .mark[data-my-input] {\n  padding: 0.2em;\n  background-color: #fcf8e3;\n}\n\n.list-unstyled[data-my-input] {\n  padding-left: 0;\n  list-style: none;\n}\n\n.list-inline[data-my-input] {\n  padding-left: 0;\n  list-style: none;\n}\n\n.list-inline-item[data-my-input] {\n  display: inline-block;\n}\n\n.list-inline-item[data-my-input]:not(:last-child) {\n  margin-right: 0.5rem;\n}\n\n.initialism[data-my-input] {\n  font-size: 90%;\n  text-transform: uppercase;\n}\n\n.blockquote[data-my-input] {\n  margin-bottom: 1rem;\n  font-size: 1.25rem;\n}\n\n.blockquote-footer[data-my-input] {\n  display: block;\n  font-size: 80%;\n  color: #6c757d;\n}\n\n.blockquote-footer[data-my-input]::before {\n  content: \"\\2014 \\00A0\";\n}\n\n.img-fluid[data-my-input] {\n  max-width: 100%;\n  height: auto;\n}\n\n.img-thumbnail[data-my-input] {\n  padding: 0.25rem;\n  background-color: #fff;\n  border: 1px solid #dee2e6;\n  border-radius: 0.25rem;\n  max-width: 100%;\n  height: auto;\n}\n\n.figure[data-my-input] {\n  display: inline-block;\n}\n\n.figure-img[data-my-input] {\n  margin-bottom: 0.5rem;\n  line-height: 1;\n}\n\n.figure-caption[data-my-input] {\n  font-size: 90%;\n  color: #6c757d;\n}\n\ncode[data-my-input], kbd[data-my-input], pre[data-my-input], samp[data-my-input] {\n  font-family: SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n}\n\ncode[data-my-input] {\n  font-size: 87.5%;\n  color: #e83e8c;\n  word-break: break-word;\n}\n\na[data-my-input]    > code[data-my-input] {\n  color: inherit;\n}\n\nkbd[data-my-input] {\n  padding: 0.2rem 0.4rem;\n  font-size: 87.5%;\n  color: #fff;\n  background-color: #212529;\n  border-radius: 0.2rem;\n}\n\nkbd[data-my-input]   kbd[data-my-input] {\n  padding: 0;\n  font-size: 100%;\n  font-weight: 700;\n}\n\npre[data-my-input] {\n  display: block;\n  font-size: 87.5%;\n  color: #212529;\n}\n\npre[data-my-input]   code[data-my-input] {\n  font-size: inherit;\n  color: inherit;\n  word-break: normal;\n}\n\n.pre-scrollable[data-my-input] {\n  max-height: 340px;\n  overflow-y: scroll;\n}\n\n.container[data-my-input] {\n  width: 100%;\n  padding-right: 15px;\n  padding-left: 15px;\n  margin-right: auto;\n  margin-left: auto;\n}\n\n\@media (min-width: 576px) {\n  .container[data-my-input] {\n    max-width: 540px;\n  }\n}\n\n\@media (min-width: 768px) {\n  .container[data-my-input] {\n    max-width: 720px;\n  }\n}\n\n\@media (min-width: 992px) {\n  .container[data-my-input] {\n    max-width: 960px;\n  }\n}\n\n\@media (min-width: 1200px) {\n  .container[data-my-input] {\n    max-width: 1140px;\n  }\n}\n\n.container-fluid[data-my-input] {\n  width: 100%;\n  padding-right: 15px;\n  padding-left: 15px;\n  margin-right: auto;\n  margin-left: auto;\n}\n\n.row[data-my-input] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  margin-right: -15px;\n  margin-left: -15px;\n}\n\n.no-gutters[data-my-input] {\n  margin-right: 0;\n  margin-left: 0;\n}\n\n.no-gutters[data-my-input]    > .col[data-my-input], .no-gutters[data-my-input]    > [class*=\"col-\"][data-my-input] {\n  padding-right: 0;\n  padding-left: 0;\n}\n\n.col-1[data-my-input], .col-2[data-my-input], .col-3[data-my-input], .col-4[data-my-input], .col-5[data-my-input], .col-6[data-my-input], .col-7[data-my-input], .col-8[data-my-input], .col-9[data-my-input], .col-10[data-my-input], .col-11[data-my-input], .col-12[data-my-input], .col[data-my-input], .col-auto[data-my-input], .col-sm-1[data-my-input], .col-sm-2[data-my-input], .col-sm-3[data-my-input], .col-sm-4[data-my-input], .col-sm-5[data-my-input], .col-sm-6[data-my-input], .col-sm-7[data-my-input], .col-sm-8[data-my-input], .col-sm-9[data-my-input], .col-sm-10[data-my-input], .col-sm-11[data-my-input], .col-sm-12[data-my-input], .col-sm[data-my-input], .col-sm-auto[data-my-input], .col-md-1[data-my-input], .col-md-2[data-my-input], .col-md-3[data-my-input], .col-md-4[data-my-input], .col-md-5[data-my-input], .col-md-6[data-my-input], .col-md-7[data-my-input], .col-md-8[data-my-input], .col-md-9[data-my-input], .col-md-10[data-my-input], .col-md-11[data-my-input], .col-md-12[data-my-input], .col-md[data-my-input], .col-md-auto[data-my-input], .col-lg-1[data-my-input], .col-lg-2[data-my-input], .col-lg-3[data-my-input], .col-lg-4[data-my-input], .col-lg-5[data-my-input], .col-lg-6[data-my-input], .col-lg-7[data-my-input], .col-lg-8[data-my-input], .col-lg-9[data-my-input], .col-lg-10[data-my-input], .col-lg-11[data-my-input], .col-lg-12[data-my-input], .col-lg[data-my-input], .col-lg-auto[data-my-input], .col-xl-1[data-my-input], .col-xl-2[data-my-input], .col-xl-3[data-my-input], .col-xl-4[data-my-input], .col-xl-5[data-my-input], .col-xl-6[data-my-input], .col-xl-7[data-my-input], .col-xl-8[data-my-input], .col-xl-9[data-my-input], .col-xl-10[data-my-input], .col-xl-11[data-my-input], .col-xl-12[data-my-input], .col-xl[data-my-input], .col-xl-auto[data-my-input] {\n  position: relative;\n  width: 100%;\n  min-height: 1px;\n  padding-right: 15px;\n  padding-left: 15px;\n}\n\n.col[data-my-input] {\n  -ms-flex-preferred-size: 0;\n  flex-basis: 0;\n  -webkit-box-flex: 1;\n  -ms-flex-positive: 1;\n  flex-grow: 1;\n  max-width: 100%;\n}\n\n.col-auto[data-my-input] {\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 auto;\n  flex: 0 0 auto;\n  width: auto;\n  max-width: none;\n}\n\n.col-1[data-my-input] {\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 8.333333%;\n  flex: 0 0 8.333333%;\n  max-width: 8.333333%;\n}\n\n.col-2[data-my-input] {\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 16.666667%;\n  flex: 0 0 16.666667%;\n  max-width: 16.666667%;\n}\n\n.col-3[data-my-input] {\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 25%;\n  flex: 0 0 25%;\n  max-width: 25%;\n}\n\n.col-4[data-my-input] {\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 33.333333%;\n  flex: 0 0 33.333333%;\n  max-width: 33.333333%;\n}\n\n.col-5[data-my-input] {\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 41.666667%;\n  flex: 0 0 41.666667%;\n  max-width: 41.666667%;\n}\n\n.col-6[data-my-input] {\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 50%;\n  flex: 0 0 50%;\n  max-width: 50%;\n}\n\n.col-7[data-my-input] {\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 58.333333%;\n  flex: 0 0 58.333333%;\n  max-width: 58.333333%;\n}\n\n.col-8[data-my-input] {\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 66.666667%;\n  flex: 0 0 66.666667%;\n  max-width: 66.666667%;\n}\n\n.col-9[data-my-input] {\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 75%;\n  flex: 0 0 75%;\n  max-width: 75%;\n}\n\n.col-10[data-my-input] {\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 83.333333%;\n  flex: 0 0 83.333333%;\n  max-width: 83.333333%;\n}\n\n.col-11[data-my-input] {\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 91.666667%;\n  flex: 0 0 91.666667%;\n  max-width: 91.666667%;\n}\n\n.col-12[data-my-input] {\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 100%;\n  flex: 0 0 100%;\n  max-width: 100%;\n}\n\n.order-first[data-my-input] {\n  -webkit-box-ordinal-group: 0;\n  -ms-flex-order: -1;\n  order: -1;\n}\n\n.order-last[data-my-input] {\n  -webkit-box-ordinal-group: 14;\n  -ms-flex-order: 13;\n  order: 13;\n}\n\n.order-0[data-my-input] {\n  -webkit-box-ordinal-group: 1;\n  -ms-flex-order: 0;\n  order: 0;\n}\n\n.order-1[data-my-input] {\n  -webkit-box-ordinal-group: 2;\n  -ms-flex-order: 1;\n  order: 1;\n}\n\n.order-2[data-my-input] {\n  -webkit-box-ordinal-group: 3;\n  -ms-flex-order: 2;\n  order: 2;\n}\n\n.order-3[data-my-input] {\n  -webkit-box-ordinal-group: 4;\n  -ms-flex-order: 3;\n  order: 3;\n}\n\n.order-4[data-my-input] {\n  -webkit-box-ordinal-group: 5;\n  -ms-flex-order: 4;\n  order: 4;\n}\n\n.order-5[data-my-input] {\n  -webkit-box-ordinal-group: 6;\n  -ms-flex-order: 5;\n  order: 5;\n}\n\n.order-6[data-my-input] {\n  -webkit-box-ordinal-group: 7;\n  -ms-flex-order: 6;\n  order: 6;\n}\n\n.order-7[data-my-input] {\n  -webkit-box-ordinal-group: 8;\n  -ms-flex-order: 7;\n  order: 7;\n}\n\n.order-8[data-my-input] {\n  -webkit-box-ordinal-group: 9;\n  -ms-flex-order: 8;\n  order: 8;\n}\n\n.order-9[data-my-input] {\n  -webkit-box-ordinal-group: 10;\n  -ms-flex-order: 9;\n  order: 9;\n}\n\n.order-10[data-my-input] {\n  -webkit-box-ordinal-group: 11;\n  -ms-flex-order: 10;\n  order: 10;\n}\n\n.order-11[data-my-input] {\n  -webkit-box-ordinal-group: 12;\n  -ms-flex-order: 11;\n  order: 11;\n}\n\n.order-12[data-my-input] {\n  -webkit-box-ordinal-group: 13;\n  -ms-flex-order: 12;\n  order: 12;\n}\n\n.offset-1[data-my-input] {\n  margin-left: 8.333333%;\n}\n\n.offset-2[data-my-input] {\n  margin-left: 16.666667%;\n}\n\n.offset-3[data-my-input] {\n  margin-left: 25%;\n}\n\n.offset-4[data-my-input] {\n  margin-left: 33.333333%;\n}\n\n.offset-5[data-my-input] {\n  margin-left: 41.666667%;\n}\n\n.offset-6[data-my-input] {\n  margin-left: 50%;\n}\n\n.offset-7[data-my-input] {\n  margin-left: 58.333333%;\n}\n\n.offset-8[data-my-input] {\n  margin-left: 66.666667%;\n}\n\n.offset-9[data-my-input] {\n  margin-left: 75%;\n}\n\n.offset-10[data-my-input] {\n  margin-left: 83.333333%;\n}\n\n.offset-11[data-my-input] {\n  margin-left: 91.666667%;\n}\n\n\@media (min-width: 576px) {\n  .col-sm[data-my-input] {\n    -ms-flex-preferred-size: 0;\n    flex-basis: 0;\n    -webkit-box-flex: 1;\n    -ms-flex-positive: 1;\n    flex-grow: 1;\n    max-width: 100%;\n  }\n  .col-sm-auto[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n    width: auto;\n    max-width: none;\n  }\n  .col-sm-1[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 8.333333%;\n    flex: 0 0 8.333333%;\n    max-width: 8.333333%;\n  }\n  .col-sm-2[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 16.666667%;\n    flex: 0 0 16.666667%;\n    max-width: 16.666667%;\n  }\n  .col-sm-3[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 25%;\n    flex: 0 0 25%;\n    max-width: 25%;\n  }\n  .col-sm-4[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 33.333333%;\n    flex: 0 0 33.333333%;\n    max-width: 33.333333%;\n  }\n  .col-sm-5[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 41.666667%;\n    flex: 0 0 41.666667%;\n    max-width: 41.666667%;\n  }\n  .col-sm-6[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 50%;\n    flex: 0 0 50%;\n    max-width: 50%;\n  }\n  .col-sm-7[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 58.333333%;\n    flex: 0 0 58.333333%;\n    max-width: 58.333333%;\n  }\n  .col-sm-8[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 66.666667%;\n    flex: 0 0 66.666667%;\n    max-width: 66.666667%;\n  }\n  .col-sm-9[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 75%;\n    flex: 0 0 75%;\n    max-width: 75%;\n  }\n  .col-sm-10[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 83.333333%;\n    flex: 0 0 83.333333%;\n    max-width: 83.333333%;\n  }\n  .col-sm-11[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 91.666667%;\n    flex: 0 0 91.666667%;\n    max-width: 91.666667%;\n  }\n  .col-sm-12[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 100%;\n    flex: 0 0 100%;\n    max-width: 100%;\n  }\n  .order-sm-first[data-my-input] {\n    -webkit-box-ordinal-group: 0;\n    -ms-flex-order: -1;\n    order: -1;\n  }\n  .order-sm-last[data-my-input] {\n    -webkit-box-ordinal-group: 14;\n    -ms-flex-order: 13;\n    order: 13;\n  }\n  .order-sm-0[data-my-input] {\n    -webkit-box-ordinal-group: 1;\n    -ms-flex-order: 0;\n    order: 0;\n  }\n  .order-sm-1[data-my-input] {\n    -webkit-box-ordinal-group: 2;\n    -ms-flex-order: 1;\n    order: 1;\n  }\n  .order-sm-2[data-my-input] {\n    -webkit-box-ordinal-group: 3;\n    -ms-flex-order: 2;\n    order: 2;\n  }\n  .order-sm-3[data-my-input] {\n    -webkit-box-ordinal-group: 4;\n    -ms-flex-order: 3;\n    order: 3;\n  }\n  .order-sm-4[data-my-input] {\n    -webkit-box-ordinal-group: 5;\n    -ms-flex-order: 4;\n    order: 4;\n  }\n  .order-sm-5[data-my-input] {\n    -webkit-box-ordinal-group: 6;\n    -ms-flex-order: 5;\n    order: 5;\n  }\n  .order-sm-6[data-my-input] {\n    -webkit-box-ordinal-group: 7;\n    -ms-flex-order: 6;\n    order: 6;\n  }\n  .order-sm-7[data-my-input] {\n    -webkit-box-ordinal-group: 8;\n    -ms-flex-order: 7;\n    order: 7;\n  }\n  .order-sm-8[data-my-input] {\n    -webkit-box-ordinal-group: 9;\n    -ms-flex-order: 8;\n    order: 8;\n  }\n  .order-sm-9[data-my-input] {\n    -webkit-box-ordinal-group: 10;\n    -ms-flex-order: 9;\n    order: 9;\n  }\n  .order-sm-10[data-my-input] {\n    -webkit-box-ordinal-group: 11;\n    -ms-flex-order: 10;\n    order: 10;\n  }\n  .order-sm-11[data-my-input] {\n    -webkit-box-ordinal-group: 12;\n    -ms-flex-order: 11;\n    order: 11;\n  }\n  .order-sm-12[data-my-input] {\n    -webkit-box-ordinal-group: 13;\n    -ms-flex-order: 12;\n    order: 12;\n  }\n  .offset-sm-0[data-my-input] {\n    margin-left: 0;\n  }\n  .offset-sm-1[data-my-input] {\n    margin-left: 8.333333%;\n  }\n  .offset-sm-2[data-my-input] {\n    margin-left: 16.666667%;\n  }\n  .offset-sm-3[data-my-input] {\n    margin-left: 25%;\n  }\n  .offset-sm-4[data-my-input] {\n    margin-left: 33.333333%;\n  }\n  .offset-sm-5[data-my-input] {\n    margin-left: 41.666667%;\n  }\n  .offset-sm-6[data-my-input] {\n    margin-left: 50%;\n  }\n  .offset-sm-7[data-my-input] {\n    margin-left: 58.333333%;\n  }\n  .offset-sm-8[data-my-input] {\n    margin-left: 66.666667%;\n  }\n  .offset-sm-9[data-my-input] {\n    margin-left: 75%;\n  }\n  .offset-sm-10[data-my-input] {\n    margin-left: 83.333333%;\n  }\n  .offset-sm-11[data-my-input] {\n    margin-left: 91.666667%;\n  }\n}\n\n\@media (min-width: 768px) {\n  .col-md[data-my-input] {\n    -ms-flex-preferred-size: 0;\n    flex-basis: 0;\n    -webkit-box-flex: 1;\n    -ms-flex-positive: 1;\n    flex-grow: 1;\n    max-width: 100%;\n  }\n  .col-md-auto[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n    width: auto;\n    max-width: none;\n  }\n  .col-md-1[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 8.333333%;\n    flex: 0 0 8.333333%;\n    max-width: 8.333333%;\n  }\n  .col-md-2[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 16.666667%;\n    flex: 0 0 16.666667%;\n    max-width: 16.666667%;\n  }\n  .col-md-3[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 25%;\n    flex: 0 0 25%;\n    max-width: 25%;\n  }\n  .col-md-4[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 33.333333%;\n    flex: 0 0 33.333333%;\n    max-width: 33.333333%;\n  }\n  .col-md-5[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 41.666667%;\n    flex: 0 0 41.666667%;\n    max-width: 41.666667%;\n  }\n  .col-md-6[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 50%;\n    flex: 0 0 50%;\n    max-width: 50%;\n  }\n  .col-md-7[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 58.333333%;\n    flex: 0 0 58.333333%;\n    max-width: 58.333333%;\n  }\n  .col-md-8[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 66.666667%;\n    flex: 0 0 66.666667%;\n    max-width: 66.666667%;\n  }\n  .col-md-9[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 75%;\n    flex: 0 0 75%;\n    max-width: 75%;\n  }\n  .col-md-10[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 83.333333%;\n    flex: 0 0 83.333333%;\n    max-width: 83.333333%;\n  }\n  .col-md-11[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 91.666667%;\n    flex: 0 0 91.666667%;\n    max-width: 91.666667%;\n  }\n  .col-md-12[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 100%;\n    flex: 0 0 100%;\n    max-width: 100%;\n  }\n  .order-md-first[data-my-input] {\n    -webkit-box-ordinal-group: 0;\n    -ms-flex-order: -1;\n    order: -1;\n  }\n  .order-md-last[data-my-input] {\n    -webkit-box-ordinal-group: 14;\n    -ms-flex-order: 13;\n    order: 13;\n  }\n  .order-md-0[data-my-input] {\n    -webkit-box-ordinal-group: 1;\n    -ms-flex-order: 0;\n    order: 0;\n  }\n  .order-md-1[data-my-input] {\n    -webkit-box-ordinal-group: 2;\n    -ms-flex-order: 1;\n    order: 1;\n  }\n  .order-md-2[data-my-input] {\n    -webkit-box-ordinal-group: 3;\n    -ms-flex-order: 2;\n    order: 2;\n  }\n  .order-md-3[data-my-input] {\n    -webkit-box-ordinal-group: 4;\n    -ms-flex-order: 3;\n    order: 3;\n  }\n  .order-md-4[data-my-input] {\n    -webkit-box-ordinal-group: 5;\n    -ms-flex-order: 4;\n    order: 4;\n  }\n  .order-md-5[data-my-input] {\n    -webkit-box-ordinal-group: 6;\n    -ms-flex-order: 5;\n    order: 5;\n  }\n  .order-md-6[data-my-input] {\n    -webkit-box-ordinal-group: 7;\n    -ms-flex-order: 6;\n    order: 6;\n  }\n  .order-md-7[data-my-input] {\n    -webkit-box-ordinal-group: 8;\n    -ms-flex-order: 7;\n    order: 7;\n  }\n  .order-md-8[data-my-input] {\n    -webkit-box-ordinal-group: 9;\n    -ms-flex-order: 8;\n    order: 8;\n  }\n  .order-md-9[data-my-input] {\n    -webkit-box-ordinal-group: 10;\n    -ms-flex-order: 9;\n    order: 9;\n  }\n  .order-md-10[data-my-input] {\n    -webkit-box-ordinal-group: 11;\n    -ms-flex-order: 10;\n    order: 10;\n  }\n  .order-md-11[data-my-input] {\n    -webkit-box-ordinal-group: 12;\n    -ms-flex-order: 11;\n    order: 11;\n  }\n  .order-md-12[data-my-input] {\n    -webkit-box-ordinal-group: 13;\n    -ms-flex-order: 12;\n    order: 12;\n  }\n  .offset-md-0[data-my-input] {\n    margin-left: 0;\n  }\n  .offset-md-1[data-my-input] {\n    margin-left: 8.333333%;\n  }\n  .offset-md-2[data-my-input] {\n    margin-left: 16.666667%;\n  }\n  .offset-md-3[data-my-input] {\n    margin-left: 25%;\n  }\n  .offset-md-4[data-my-input] {\n    margin-left: 33.333333%;\n  }\n  .offset-md-5[data-my-input] {\n    margin-left: 41.666667%;\n  }\n  .offset-md-6[data-my-input] {\n    margin-left: 50%;\n  }\n  .offset-md-7[data-my-input] {\n    margin-left: 58.333333%;\n  }\n  .offset-md-8[data-my-input] {\n    margin-left: 66.666667%;\n  }\n  .offset-md-9[data-my-input] {\n    margin-left: 75%;\n  }\n  .offset-md-10[data-my-input] {\n    margin-left: 83.333333%;\n  }\n  .offset-md-11[data-my-input] {\n    margin-left: 91.666667%;\n  }\n}\n\n\@media (min-width: 992px) {\n  .col-lg[data-my-input] {\n    -ms-flex-preferred-size: 0;\n    flex-basis: 0;\n    -webkit-box-flex: 1;\n    -ms-flex-positive: 1;\n    flex-grow: 1;\n    max-width: 100%;\n  }\n  .col-lg-auto[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n    width: auto;\n    max-width: none;\n  }\n  .col-lg-1[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 8.333333%;\n    flex: 0 0 8.333333%;\n    max-width: 8.333333%;\n  }\n  .col-lg-2[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 16.666667%;\n    flex: 0 0 16.666667%;\n    max-width: 16.666667%;\n  }\n  .col-lg-3[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 25%;\n    flex: 0 0 25%;\n    max-width: 25%;\n  }\n  .col-lg-4[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 33.333333%;\n    flex: 0 0 33.333333%;\n    max-width: 33.333333%;\n  }\n  .col-lg-5[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 41.666667%;\n    flex: 0 0 41.666667%;\n    max-width: 41.666667%;\n  }\n  .col-lg-6[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 50%;\n    flex: 0 0 50%;\n    max-width: 50%;\n  }\n  .col-lg-7[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 58.333333%;\n    flex: 0 0 58.333333%;\n    max-width: 58.333333%;\n  }\n  .col-lg-8[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 66.666667%;\n    flex: 0 0 66.666667%;\n    max-width: 66.666667%;\n  }\n  .col-lg-9[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 75%;\n    flex: 0 0 75%;\n    max-width: 75%;\n  }\n  .col-lg-10[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 83.333333%;\n    flex: 0 0 83.333333%;\n    max-width: 83.333333%;\n  }\n  .col-lg-11[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 91.666667%;\n    flex: 0 0 91.666667%;\n    max-width: 91.666667%;\n  }\n  .col-lg-12[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 100%;\n    flex: 0 0 100%;\n    max-width: 100%;\n  }\n  .order-lg-first[data-my-input] {\n    -webkit-box-ordinal-group: 0;\n    -ms-flex-order: -1;\n    order: -1;\n  }\n  .order-lg-last[data-my-input] {\n    -webkit-box-ordinal-group: 14;\n    -ms-flex-order: 13;\n    order: 13;\n  }\n  .order-lg-0[data-my-input] {\n    -webkit-box-ordinal-group: 1;\n    -ms-flex-order: 0;\n    order: 0;\n  }\n  .order-lg-1[data-my-input] {\n    -webkit-box-ordinal-group: 2;\n    -ms-flex-order: 1;\n    order: 1;\n  }\n  .order-lg-2[data-my-input] {\n    -webkit-box-ordinal-group: 3;\n    -ms-flex-order: 2;\n    order: 2;\n  }\n  .order-lg-3[data-my-input] {\n    -webkit-box-ordinal-group: 4;\n    -ms-flex-order: 3;\n    order: 3;\n  }\n  .order-lg-4[data-my-input] {\n    -webkit-box-ordinal-group: 5;\n    -ms-flex-order: 4;\n    order: 4;\n  }\n  .order-lg-5[data-my-input] {\n    -webkit-box-ordinal-group: 6;\n    -ms-flex-order: 5;\n    order: 5;\n  }\n  .order-lg-6[data-my-input] {\n    -webkit-box-ordinal-group: 7;\n    -ms-flex-order: 6;\n    order: 6;\n  }\n  .order-lg-7[data-my-input] {\n    -webkit-box-ordinal-group: 8;\n    -ms-flex-order: 7;\n    order: 7;\n  }\n  .order-lg-8[data-my-input] {\n    -webkit-box-ordinal-group: 9;\n    -ms-flex-order: 8;\n    order: 8;\n  }\n  .order-lg-9[data-my-input] {\n    -webkit-box-ordinal-group: 10;\n    -ms-flex-order: 9;\n    order: 9;\n  }\n  .order-lg-10[data-my-input] {\n    -webkit-box-ordinal-group: 11;\n    -ms-flex-order: 10;\n    order: 10;\n  }\n  .order-lg-11[data-my-input] {\n    -webkit-box-ordinal-group: 12;\n    -ms-flex-order: 11;\n    order: 11;\n  }\n  .order-lg-12[data-my-input] {\n    -webkit-box-ordinal-group: 13;\n    -ms-flex-order: 12;\n    order: 12;\n  }\n  .offset-lg-0[data-my-input] {\n    margin-left: 0;\n  }\n  .offset-lg-1[data-my-input] {\n    margin-left: 8.333333%;\n  }\n  .offset-lg-2[data-my-input] {\n    margin-left: 16.666667%;\n  }\n  .offset-lg-3[data-my-input] {\n    margin-left: 25%;\n  }\n  .offset-lg-4[data-my-input] {\n    margin-left: 33.333333%;\n  }\n  .offset-lg-5[data-my-input] {\n    margin-left: 41.666667%;\n  }\n  .offset-lg-6[data-my-input] {\n    margin-left: 50%;\n  }\n  .offset-lg-7[data-my-input] {\n    margin-left: 58.333333%;\n  }\n  .offset-lg-8[data-my-input] {\n    margin-left: 66.666667%;\n  }\n  .offset-lg-9[data-my-input] {\n    margin-left: 75%;\n  }\n  .offset-lg-10[data-my-input] {\n    margin-left: 83.333333%;\n  }\n  .offset-lg-11[data-my-input] {\n    margin-left: 91.666667%;\n  }\n}\n\n\@media (min-width: 1200px) {\n  .col-xl[data-my-input] {\n    -ms-flex-preferred-size: 0;\n    flex-basis: 0;\n    -webkit-box-flex: 1;\n    -ms-flex-positive: 1;\n    flex-grow: 1;\n    max-width: 100%;\n  }\n  .col-xl-auto[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n    width: auto;\n    max-width: none;\n  }\n  .col-xl-1[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 8.333333%;\n    flex: 0 0 8.333333%;\n    max-width: 8.333333%;\n  }\n  .col-xl-2[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 16.666667%;\n    flex: 0 0 16.666667%;\n    max-width: 16.666667%;\n  }\n  .col-xl-3[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 25%;\n    flex: 0 0 25%;\n    max-width: 25%;\n  }\n  .col-xl-4[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 33.333333%;\n    flex: 0 0 33.333333%;\n    max-width: 33.333333%;\n  }\n  .col-xl-5[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 41.666667%;\n    flex: 0 0 41.666667%;\n    max-width: 41.666667%;\n  }\n  .col-xl-6[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 50%;\n    flex: 0 0 50%;\n    max-width: 50%;\n  }\n  .col-xl-7[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 58.333333%;\n    flex: 0 0 58.333333%;\n    max-width: 58.333333%;\n  }\n  .col-xl-8[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 66.666667%;\n    flex: 0 0 66.666667%;\n    max-width: 66.666667%;\n  }\n  .col-xl-9[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 75%;\n    flex: 0 0 75%;\n    max-width: 75%;\n  }\n  .col-xl-10[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 83.333333%;\n    flex: 0 0 83.333333%;\n    max-width: 83.333333%;\n  }\n  .col-xl-11[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 91.666667%;\n    flex: 0 0 91.666667%;\n    max-width: 91.666667%;\n  }\n  .col-xl-12[data-my-input] {\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 100%;\n    flex: 0 0 100%;\n    max-width: 100%;\n  }\n  .order-xl-first[data-my-input] {\n    -webkit-box-ordinal-group: 0;\n    -ms-flex-order: -1;\n    order: -1;\n  }\n  .order-xl-last[data-my-input] {\n    -webkit-box-ordinal-group: 14;\n    -ms-flex-order: 13;\n    order: 13;\n  }\n  .order-xl-0[data-my-input] {\n    -webkit-box-ordinal-group: 1;\n    -ms-flex-order: 0;\n    order: 0;\n  }\n  .order-xl-1[data-my-input] {\n    -webkit-box-ordinal-group: 2;\n    -ms-flex-order: 1;\n    order: 1;\n  }\n  .order-xl-2[data-my-input] {\n    -webkit-box-ordinal-group: 3;\n    -ms-flex-order: 2;\n    order: 2;\n  }\n  .order-xl-3[data-my-input] {\n    -webkit-box-ordinal-group: 4;\n    -ms-flex-order: 3;\n    order: 3;\n  }\n  .order-xl-4[data-my-input] {\n    -webkit-box-ordinal-group: 5;\n    -ms-flex-order: 4;\n    order: 4;\n  }\n  .order-xl-5[data-my-input] {\n    -webkit-box-ordinal-group: 6;\n    -ms-flex-order: 5;\n    order: 5;\n  }\n  .order-xl-6[data-my-input] {\n    -webkit-box-ordinal-group: 7;\n    -ms-flex-order: 6;\n    order: 6;\n  }\n  .order-xl-7[data-my-input] {\n    -webkit-box-ordinal-group: 8;\n    -ms-flex-order: 7;\n    order: 7;\n  }\n  .order-xl-8[data-my-input] {\n    -webkit-box-ordinal-group: 9;\n    -ms-flex-order: 8;\n    order: 8;\n  }\n  .order-xl-9[data-my-input] {\n    -webkit-box-ordinal-group: 10;\n    -ms-flex-order: 9;\n    order: 9;\n  }\n  .order-xl-10[data-my-input] {\n    -webkit-box-ordinal-group: 11;\n    -ms-flex-order: 10;\n    order: 10;\n  }\n  .order-xl-11[data-my-input] {\n    -webkit-box-ordinal-group: 12;\n    -ms-flex-order: 11;\n    order: 11;\n  }\n  .order-xl-12[data-my-input] {\n    -webkit-box-ordinal-group: 13;\n    -ms-flex-order: 12;\n    order: 12;\n  }\n  .offset-xl-0[data-my-input] {\n    margin-left: 0;\n  }\n  .offset-xl-1[data-my-input] {\n    margin-left: 8.333333%;\n  }\n  .offset-xl-2[data-my-input] {\n    margin-left: 16.666667%;\n  }\n  .offset-xl-3[data-my-input] {\n    margin-left: 25%;\n  }\n  .offset-xl-4[data-my-input] {\n    margin-left: 33.333333%;\n  }\n  .offset-xl-5[data-my-input] {\n    margin-left: 41.666667%;\n  }\n  .offset-xl-6[data-my-input] {\n    margin-left: 50%;\n  }\n  .offset-xl-7[data-my-input] {\n    margin-left: 58.333333%;\n  }\n  .offset-xl-8[data-my-input] {\n    margin-left: 66.666667%;\n  }\n  .offset-xl-9[data-my-input] {\n    margin-left: 75%;\n  }\n  .offset-xl-10[data-my-input] {\n    margin-left: 83.333333%;\n  }\n  .offset-xl-11[data-my-input] {\n    margin-left: 91.666667%;\n  }\n}\n\n.table[data-my-input] {\n  width: 100%;\n  max-width: 100%;\n  margin-bottom: 1rem;\n  background-color: transparent;\n}\n\n.table[data-my-input]   th[data-my-input], .table[data-my-input]   td[data-my-input] {\n  padding: 0.75rem;\n  vertical-align: top;\n  border-top: 1px solid #dee2e6;\n}\n\n.table[data-my-input]   thead[data-my-input]   th[data-my-input] {\n  vertical-align: bottom;\n  border-bottom: 2px solid #dee2e6;\n}\n\n.table[data-my-input]   tbody[data-my-input]    + tbody[data-my-input] {\n  border-top: 2px solid #dee2e6;\n}\n\n.table[data-my-input]   .table[data-my-input] {\n  background-color: #fff;\n}\n\n.table-sm[data-my-input]   th[data-my-input], .table-sm[data-my-input]   td[data-my-input] {\n  padding: 0.3rem;\n}\n\n.table-bordered[data-my-input] {\n  border: 1px solid #dee2e6;\n}\n\n.table-bordered[data-my-input]   th[data-my-input], .table-bordered[data-my-input]   td[data-my-input] {\n  border: 1px solid #dee2e6;\n}\n\n.table-bordered[data-my-input]   thead[data-my-input]   th[data-my-input], .table-bordered[data-my-input]   thead[data-my-input]   td[data-my-input] {\n  border-bottom-width: 2px;\n}\n\n.table-striped[data-my-input]   tbody[data-my-input]   tr[data-my-input]:nth-of-type(odd) {\n  background-color: rgba(0, 0, 0, 0.05);\n}\n\n.table-hover[data-my-input]   tbody[data-my-input]   tr[data-my-input]:hover {\n  background-color: rgba(0, 0, 0, 0.075);\n}\n\n.table-primary[data-my-input], .table-primary[data-my-input]    > th[data-my-input], .table-primary[data-my-input]    > td[data-my-input] {\n  background-color: #b8daff;\n}\n\n.table-hover[data-my-input]   .table-primary[data-my-input]:hover {\n  background-color: #9fcdff;\n}\n\n.table-hover[data-my-input]   .table-primary[data-my-input]:hover    > td[data-my-input], .table-hover[data-my-input]   .table-primary[data-my-input]:hover    > th[data-my-input] {\n  background-color: #9fcdff;\n}\n\n.table-secondary[data-my-input], .table-secondary[data-my-input]    > th[data-my-input], .table-secondary[data-my-input]    > td[data-my-input] {\n  background-color: #d6d8db;\n}\n\n.table-hover[data-my-input]   .table-secondary[data-my-input]:hover {\n  background-color: #c8cbcf;\n}\n\n.table-hover[data-my-input]   .table-secondary[data-my-input]:hover    > td[data-my-input], .table-hover[data-my-input]   .table-secondary[data-my-input]:hover    > th[data-my-input] {\n  background-color: #c8cbcf;\n}\n\n.table-success[data-my-input], .table-success[data-my-input]    > th[data-my-input], .table-success[data-my-input]    > td[data-my-input] {\n  background-color: #c3e6cb;\n}\n\n.table-hover[data-my-input]   .table-success[data-my-input]:hover {\n  background-color: #b1dfbb;\n}\n\n.table-hover[data-my-input]   .table-success[data-my-input]:hover    > td[data-my-input], .table-hover[data-my-input]   .table-success[data-my-input]:hover    > th[data-my-input] {\n  background-color: #b1dfbb;\n}\n\n.table-info[data-my-input], .table-info[data-my-input]    > th[data-my-input], .table-info[data-my-input]    > td[data-my-input] {\n  background-color: #bee5eb;\n}\n\n.table-hover[data-my-input]   .table-info[data-my-input]:hover {\n  background-color: #abdde5;\n}\n\n.table-hover[data-my-input]   .table-info[data-my-input]:hover    > td[data-my-input], .table-hover[data-my-input]   .table-info[data-my-input]:hover    > th[data-my-input] {\n  background-color: #abdde5;\n}\n\n.table-warning[data-my-input], .table-warning[data-my-input]    > th[data-my-input], .table-warning[data-my-input]    > td[data-my-input] {\n  background-color: #ffeeba;\n}\n\n.table-hover[data-my-input]   .table-warning[data-my-input]:hover {\n  background-color: #ffe8a1;\n}\n\n.table-hover[data-my-input]   .table-warning[data-my-input]:hover    > td[data-my-input], .table-hover[data-my-input]   .table-warning[data-my-input]:hover    > th[data-my-input] {\n  background-color: #ffe8a1;\n}\n\n.table-danger[data-my-input], .table-danger[data-my-input]    > th[data-my-input], .table-danger[data-my-input]    > td[data-my-input] {\n  background-color: #f5c6cb;\n}\n\n.table-hover[data-my-input]   .table-danger[data-my-input]:hover {\n  background-color: #f1b0b7;\n}\n\n.table-hover[data-my-input]   .table-danger[data-my-input]:hover    > td[data-my-input], .table-hover[data-my-input]   .table-danger[data-my-input]:hover    > th[data-my-input] {\n  background-color: #f1b0b7;\n}\n\n.table-light[data-my-input], .table-light[data-my-input]    > th[data-my-input], .table-light[data-my-input]    > td[data-my-input] {\n  background-color: #fdfdfe;\n}\n\n.table-hover[data-my-input]   .table-light[data-my-input]:hover {\n  background-color: #ececf6;\n}\n\n.table-hover[data-my-input]   .table-light[data-my-input]:hover    > td[data-my-input], .table-hover[data-my-input]   .table-light[data-my-input]:hover    > th[data-my-input] {\n  background-color: #ececf6;\n}\n\n.table-dark[data-my-input], .table-dark[data-my-input]    > th[data-my-input], .table-dark[data-my-input]    > td[data-my-input] {\n  background-color: #c6c8ca;\n}\n\n.table-hover[data-my-input]   .table-dark[data-my-input]:hover {\n  background-color: #b9bbbe;\n}\n\n.table-hover[data-my-input]   .table-dark[data-my-input]:hover    > td[data-my-input], .table-hover[data-my-input]   .table-dark[data-my-input]:hover    > th[data-my-input] {\n  background-color: #b9bbbe;\n}\n\n.table-active[data-my-input], .table-active[data-my-input]    > th[data-my-input], .table-active[data-my-input]    > td[data-my-input] {\n  background-color: rgba(0, 0, 0, 0.075);\n}\n\n.table-hover[data-my-input]   .table-active[data-my-input]:hover {\n  background-color: rgba(0, 0, 0, 0.075);\n}\n\n.table-hover[data-my-input]   .table-active[data-my-input]:hover    > td[data-my-input], .table-hover[data-my-input]   .table-active[data-my-input]:hover    > th[data-my-input] {\n  background-color: rgba(0, 0, 0, 0.075);\n}\n\n.table[data-my-input]   .thead-dark[data-my-input]   th[data-my-input] {\n  color: #fff;\n  background-color: #212529;\n  border-color: #32383e;\n}\n\n.table[data-my-input]   .thead-light[data-my-input]   th[data-my-input] {\n  color: #495057;\n  background-color: #e9ecef;\n  border-color: #dee2e6;\n}\n\n.table-dark[data-my-input] {\n  color: #fff;\n  background-color: #212529;\n}\n\n.table-dark[data-my-input]   th[data-my-input], .table-dark[data-my-input]   td[data-my-input], .table-dark[data-my-input]   thead[data-my-input]   th[data-my-input] {\n  border-color: #32383e;\n}\n\n.table-dark.table-bordered[data-my-input] {\n  border: 0;\n}\n\n.table-dark.table-striped[data-my-input]   tbody[data-my-input]   tr[data-my-input]:nth-of-type(odd) {\n  background-color: rgba(255, 255, 255, 0.05);\n}\n\n.table-dark.table-hover[data-my-input]   tbody[data-my-input]   tr[data-my-input]:hover {\n  background-color: rgba(255, 255, 255, 0.075);\n}\n\n\@media (max-width: 575.98px) {\n  .table-responsive-sm[data-my-input] {\n    display: block;\n    width: 100%;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n    -ms-overflow-style: -ms-autohiding-scrollbar;\n  }\n  .table-responsive-sm[data-my-input]    > .table-bordered[data-my-input] {\n    border: 0;\n  }\n}\n\n\@media (max-width: 767.98px) {\n  .table-responsive-md[data-my-input] {\n    display: block;\n    width: 100%;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n    -ms-overflow-style: -ms-autohiding-scrollbar;\n  }\n  .table-responsive-md[data-my-input]    > .table-bordered[data-my-input] {\n    border: 0;\n  }\n}\n\n\@media (max-width: 991.98px) {\n  .table-responsive-lg[data-my-input] {\n    display: block;\n    width: 100%;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n    -ms-overflow-style: -ms-autohiding-scrollbar;\n  }\n  .table-responsive-lg[data-my-input]    > .table-bordered[data-my-input] {\n    border: 0;\n  }\n}\n\n\@media (max-width: 1199.98px) {\n  .table-responsive-xl[data-my-input] {\n    display: block;\n    width: 100%;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n    -ms-overflow-style: -ms-autohiding-scrollbar;\n  }\n  .table-responsive-xl[data-my-input]    > .table-bordered[data-my-input] {\n    border: 0;\n  }\n}\n\n.table-responsive[data-my-input] {\n  display: block;\n  width: 100%;\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n  -ms-overflow-style: -ms-autohiding-scrollbar;\n}\n\n.table-responsive[data-my-input]    > .table-bordered[data-my-input] {\n  border: 0;\n}\n\n.form-control[data-my-input] {\n  display: block;\n  width: 100%;\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  color: #495057;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n\n.form-control[data-my-input]::-ms-expand {\n  background-color: transparent;\n  border: 0;\n}\n\n.form-control[data-my-input]:focus {\n  color: #495057;\n  background-color: #fff;\n  border-color: #80bdff;\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n\n.form-control[data-my-input]::-webkit-input-placeholder {\n  color: #6c757d;\n  opacity: 1;\n}\n\n.form-control[data-my-input]::-moz-placeholder {\n  color: #6c757d;\n  opacity: 1;\n}\n\n.form-control[data-my-input]:-ms-input-placeholder {\n  color: #6c757d;\n  opacity: 1;\n}\n\n.form-control[data-my-input]::-ms-input-placeholder {\n  color: #6c757d;\n  opacity: 1;\n}\n\n.form-control[data-my-input]::placeholder {\n  color: #6c757d;\n  opacity: 1;\n}\n\n.form-control[data-my-input]:disabled, .form-control[readonly][data-my-input] {\n  background-color: #e9ecef;\n  opacity: 1;\n}\n\nselect.form-control[data-my-input]:not([size]):not([multiple]) {\n  height: calc(2.25rem + 2px);\n}\n\nselect.form-control[data-my-input]:focus::-ms-value {\n  color: #495057;\n  background-color: #fff;\n}\n\n.form-control-file[data-my-input], .form-control-range[data-my-input] {\n  display: block;\n  width: 100%;\n}\n\n.col-form-label[data-my-input] {\n  padding-top: calc(0.375rem + 1px);\n  padding-bottom: calc(0.375rem + 1px);\n  margin-bottom: 0;\n  font-size: inherit;\n  line-height: 1.5;\n}\n\n.col-form-label-lg[data-my-input] {\n  padding-top: calc(0.5rem + 1px);\n  padding-bottom: calc(0.5rem + 1px);\n  font-size: 1.25rem;\n  line-height: 1.5;\n}\n\n.col-form-label-sm[data-my-input] {\n  padding-top: calc(0.25rem + 1px);\n  padding-bottom: calc(0.25rem + 1px);\n  font-size: 0.875rem;\n  line-height: 1.5;\n}\n\n.form-control-plaintext[data-my-input] {\n  display: block;\n  width: 100%;\n  padding-top: 0.375rem;\n  padding-bottom: 0.375rem;\n  margin-bottom: 0;\n  line-height: 1.5;\n  background-color: transparent;\n  border: solid transparent;\n  border-width: 1px 0;\n}\n\n.form-control-plaintext.form-control-sm[data-my-input], .input-group-sm[data-my-input]    > .form-control-plaintext.form-control[data-my-input], .input-group-sm[data-my-input]    > .input-group-prepend[data-my-input]    > .form-control-plaintext.input-group-text[data-my-input], .input-group-sm[data-my-input]    > .input-group-append[data-my-input]    > .form-control-plaintext.input-group-text[data-my-input], .input-group-sm[data-my-input]    > .input-group-prepend[data-my-input]    > .form-control-plaintext.btn[data-my-input], .input-group-sm[data-my-input]    > .input-group-append[data-my-input]    > .form-control-plaintext.btn[data-my-input], .form-control-plaintext.form-control-lg[data-my-input], .input-group-lg[data-my-input]    > .form-control-plaintext.form-control[data-my-input], .input-group-lg[data-my-input]    > .input-group-prepend[data-my-input]    > .form-control-plaintext.input-group-text[data-my-input], .input-group-lg[data-my-input]    > .input-group-append[data-my-input]    > .form-control-plaintext.input-group-text[data-my-input], .input-group-lg[data-my-input]    > .input-group-prepend[data-my-input]    > .form-control-plaintext.btn[data-my-input], .input-group-lg[data-my-input]    > .input-group-append[data-my-input]    > .form-control-plaintext.btn[data-my-input] {\n  padding-right: 0;\n  padding-left: 0;\n}\n\n.form-control-sm[data-my-input], .input-group-sm[data-my-input]    > .form-control[data-my-input], .input-group-sm[data-my-input]    > .input-group-prepend[data-my-input]    > .input-group-text[data-my-input], .input-group-sm[data-my-input]    > .input-group-append[data-my-input]    > .input-group-text[data-my-input], .input-group-sm[data-my-input]    > .input-group-prepend[data-my-input]    > .btn[data-my-input], .input-group-sm[data-my-input]    > .input-group-append[data-my-input]    > .btn[data-my-input] {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  border-radius: 0.2rem;\n}\n\nselect.form-control-sm[data-my-input]:not([size]):not([multiple]), .input-group-sm[data-my-input]    > select.form-control[data-my-input]:not([size]):not([multiple]), .input-group-sm[data-my-input]    > .input-group-prepend[data-my-input]    > select.input-group-text[data-my-input]:not([size]):not([multiple]), .input-group-sm[data-my-input]    > .input-group-append[data-my-input]    > select.input-group-text[data-my-input]:not([size]):not([multiple]), .input-group-sm[data-my-input]    > .input-group-prepend[data-my-input]    > select.btn[data-my-input]:not([size]):not([multiple]), .input-group-sm[data-my-input]    > .input-group-append[data-my-input]    > select.btn[data-my-input]:not([size]):not([multiple]) {\n  height: calc(1.8125rem + 2px);\n}\n\n.form-control-lg[data-my-input], .input-group-lg[data-my-input]    > .form-control[data-my-input], .input-group-lg[data-my-input]    > .input-group-prepend[data-my-input]    > .input-group-text[data-my-input], .input-group-lg[data-my-input]    > .input-group-append[data-my-input]    > .input-group-text[data-my-input], .input-group-lg[data-my-input]    > .input-group-prepend[data-my-input]    > .btn[data-my-input], .input-group-lg[data-my-input]    > .input-group-append[data-my-input]    > .btn[data-my-input] {\n  padding: 0.5rem 1rem;\n  font-size: 1.25rem;\n  line-height: 1.5;\n  border-radius: 0.3rem;\n}\n\nselect.form-control-lg[data-my-input]:not([size]):not([multiple]), .input-group-lg[data-my-input]    > select.form-control[data-my-input]:not([size]):not([multiple]), .input-group-lg[data-my-input]    > .input-group-prepend[data-my-input]    > select.input-group-text[data-my-input]:not([size]):not([multiple]), .input-group-lg[data-my-input]    > .input-group-append[data-my-input]    > select.input-group-text[data-my-input]:not([size]):not([multiple]), .input-group-lg[data-my-input]    > .input-group-prepend[data-my-input]    > select.btn[data-my-input]:not([size]):not([multiple]), .input-group-lg[data-my-input]    > .input-group-append[data-my-input]    > select.btn[data-my-input]:not([size]):not([multiple]) {\n  height: calc(2.875rem + 2px);\n}\n\n.form-group[data-my-input] {\n  margin-bottom: 1rem;\n}\n\n.form-text[data-my-input] {\n  display: block;\n  margin-top: 0.25rem;\n}\n\n.form-row[data-my-input] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  margin-right: -5px;\n  margin-left: -5px;\n}\n\n.form-row[data-my-input]    > .col[data-my-input], .form-row[data-my-input]    > [class*=\"col-\"][data-my-input] {\n  padding-right: 5px;\n  padding-left: 5px;\n}\n\n.form-check[data-my-input] {\n  position: relative;\n  display: block;\n  padding-left: 1.25rem;\n}\n\n.form-check-input[data-my-input] {\n  position: absolute;\n  margin-top: 0.3rem;\n  margin-left: -1.25rem;\n}\n\n.form-check-input[data-my-input]:disabled    ~ .form-check-label[data-my-input] {\n  color: #6c757d;\n}\n\n.form-check-label[data-my-input] {\n  margin-bottom: 0;\n}\n\n.form-check-inline[data-my-input] {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  padding-left: 0;\n  margin-right: 0.75rem;\n}\n\n.form-check-inline[data-my-input]   .form-check-input[data-my-input] {\n  position: static;\n  margin-top: 0;\n  margin-right: 0.3125rem;\n  margin-left: 0;\n}\n\n.valid-feedback[data-my-input] {\n  display: none;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 80%;\n  color: #28a745;\n}\n\n.valid-tooltip[data-my-input] {\n  position: absolute;\n  top: 100%;\n  z-index: 5;\n  display: none;\n  max-width: 100%;\n  padding: .5rem;\n  margin-top: .1rem;\n  font-size: .875rem;\n  line-height: 1;\n  color: #fff;\n  background-color: rgba(40, 167, 69, 0.8);\n  border-radius: .2rem;\n}\n\n.was-validated[data-my-input]   .form-control[data-my-input]:valid, .form-control.is-valid[data-my-input], .was-validated\n.custom-select[data-my-input]:valid, .custom-select.is-valid[data-my-input] {\n  border-color: #28a745;\n}\n\n.was-validated[data-my-input]   .form-control[data-my-input]:valid:focus, .form-control.is-valid[data-my-input]:focus, .was-validated\n.custom-select[data-my-input]:valid:focus, .custom-select.is-valid[data-my-input]:focus {\n  border-color: #28a745;\n  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);\n}\n\n.was-validated[data-my-input]   .form-control[data-my-input]:valid    ~ .valid-feedback[data-my-input], .was-validated[data-my-input]   .form-control[data-my-input]:valid    ~ .valid-tooltip[data-my-input], .form-control.is-valid[data-my-input]    ~ .valid-feedback[data-my-input], .form-control.is-valid[data-my-input]    ~ .valid-tooltip[data-my-input], .was-validated\n.custom-select[data-my-input]:valid    ~ .valid-feedback[data-my-input], .was-validated\n.custom-select[data-my-input]:valid    ~ .valid-tooltip[data-my-input], .custom-select.is-valid[data-my-input]    ~ .valid-feedback[data-my-input], .custom-select.is-valid[data-my-input]    ~ .valid-tooltip[data-my-input] {\n  display: block;\n}\n\n.was-validated[data-my-input]   .form-check-input[data-my-input]:valid    ~ .form-check-label[data-my-input], .form-check-input.is-valid[data-my-input]    ~ .form-check-label[data-my-input] {\n  color: #28a745;\n}\n\n.was-validated[data-my-input]   .form-check-input[data-my-input]:valid    ~ .valid-feedback[data-my-input], .was-validated[data-my-input]   .form-check-input[data-my-input]:valid    ~ .valid-tooltip[data-my-input], .form-check-input.is-valid[data-my-input]    ~ .valid-feedback[data-my-input], .form-check-input.is-valid[data-my-input]    ~ .valid-tooltip[data-my-input] {\n  display: block;\n}\n\n.was-validated[data-my-input]   .custom-control-input[data-my-input]:valid    ~ .custom-control-label[data-my-input], .custom-control-input.is-valid[data-my-input]    ~ .custom-control-label[data-my-input] {\n  color: #28a745;\n}\n\n.was-validated[data-my-input]   .custom-control-input[data-my-input]:valid    ~ .custom-control-label[data-my-input]::before, .custom-control-input.is-valid[data-my-input]    ~ .custom-control-label[data-my-input]::before {\n  background-color: #71dd8a;\n}\n\n.was-validated[data-my-input]   .custom-control-input[data-my-input]:valid    ~ .valid-feedback[data-my-input], .was-validated[data-my-input]   .custom-control-input[data-my-input]:valid    ~ .valid-tooltip[data-my-input], .custom-control-input.is-valid[data-my-input]    ~ .valid-feedback[data-my-input], .custom-control-input.is-valid[data-my-input]    ~ .valid-tooltip[data-my-input] {\n  display: block;\n}\n\n.was-validated[data-my-input]   .custom-control-input[data-my-input]:valid:checked    ~ .custom-control-label[data-my-input]::before, .custom-control-input.is-valid[data-my-input]:checked    ~ .custom-control-label[data-my-input]::before {\n  background-color: #34ce57;\n}\n\n.was-validated[data-my-input]   .custom-control-input[data-my-input]:valid:focus    ~ .custom-control-label[data-my-input]::before, .custom-control-input.is-valid[data-my-input]:focus    ~ .custom-control-label[data-my-input]::before {\n  box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(40, 167, 69, 0.25);\n}\n\n.was-validated[data-my-input]   .custom-file-input[data-my-input]:valid    ~ .custom-file-label[data-my-input], .custom-file-input.is-valid[data-my-input]    ~ .custom-file-label[data-my-input] {\n  border-color: #28a745;\n}\n\n.was-validated[data-my-input]   .custom-file-input[data-my-input]:valid    ~ .custom-file-label[data-my-input]::before, .custom-file-input.is-valid[data-my-input]    ~ .custom-file-label[data-my-input]::before {\n  border-color: inherit;\n}\n\n.was-validated[data-my-input]   .custom-file-input[data-my-input]:valid    ~ .valid-feedback[data-my-input], .was-validated[data-my-input]   .custom-file-input[data-my-input]:valid    ~ .valid-tooltip[data-my-input], .custom-file-input.is-valid[data-my-input]    ~ .valid-feedback[data-my-input], .custom-file-input.is-valid[data-my-input]    ~ .valid-tooltip[data-my-input] {\n  display: block;\n}\n\n.was-validated[data-my-input]   .custom-file-input[data-my-input]:valid:focus    ~ .custom-file-label[data-my-input], .custom-file-input.is-valid[data-my-input]:focus    ~ .custom-file-label[data-my-input] {\n  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);\n}\n\n.invalid-feedback[data-my-input] {\n  display: none;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 80%;\n  color: #dc3545;\n}\n\n.invalid-tooltip[data-my-input] {\n  position: absolute;\n  top: 100%;\n  z-index: 5;\n  display: none;\n  max-width: 100%;\n  padding: .5rem;\n  margin-top: .1rem;\n  font-size: .875rem;\n  line-height: 1;\n  color: #fff;\n  background-color: rgba(220, 53, 69, 0.8);\n  border-radius: .2rem;\n}\n\n.was-validated[data-my-input]   .form-control[data-my-input]:invalid, .form-control.is-invalid[data-my-input], .was-validated\n.custom-select[data-my-input]:invalid, .custom-select.is-invalid[data-my-input] {\n  border-color: #dc3545;\n}\n\n.was-validated[data-my-input]   .form-control[data-my-input]:invalid:focus, .form-control.is-invalid[data-my-input]:focus, .was-validated\n.custom-select[data-my-input]:invalid:focus, .custom-select.is-invalid[data-my-input]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n\n.was-validated[data-my-input]   .form-control[data-my-input]:invalid    ~ .invalid-feedback[data-my-input], .was-validated[data-my-input]   .form-control[data-my-input]:invalid    ~ .invalid-tooltip[data-my-input], .form-control.is-invalid[data-my-input]    ~ .invalid-feedback[data-my-input], .form-control.is-invalid[data-my-input]    ~ .invalid-tooltip[data-my-input], .was-validated\n.custom-select[data-my-input]:invalid    ~ .invalid-feedback[data-my-input], .was-validated\n.custom-select[data-my-input]:invalid    ~ .invalid-tooltip[data-my-input], .custom-select.is-invalid[data-my-input]    ~ .invalid-feedback[data-my-input], .custom-select.is-invalid[data-my-input]    ~ .invalid-tooltip[data-my-input] {\n  display: block;\n}\n\n.was-validated[data-my-input]   .form-check-input[data-my-input]:invalid    ~ .form-check-label[data-my-input], .form-check-input.is-invalid[data-my-input]    ~ .form-check-label[data-my-input] {\n  color: #dc3545;\n}\n\n.was-validated[data-my-input]   .form-check-input[data-my-input]:invalid    ~ .invalid-feedback[data-my-input], .was-validated[data-my-input]   .form-check-input[data-my-input]:invalid    ~ .invalid-tooltip[data-my-input], .form-check-input.is-invalid[data-my-input]    ~ .invalid-feedback[data-my-input], .form-check-input.is-invalid[data-my-input]    ~ .invalid-tooltip[data-my-input] {\n  display: block;\n}\n\n.was-validated[data-my-input]   .custom-control-input[data-my-input]:invalid    ~ .custom-control-label[data-my-input], .custom-control-input.is-invalid[data-my-input]    ~ .custom-control-label[data-my-input] {\n  color: #dc3545;\n}\n\n.was-validated[data-my-input]   .custom-control-input[data-my-input]:invalid    ~ .custom-control-label[data-my-input]::before, .custom-control-input.is-invalid[data-my-input]    ~ .custom-control-label[data-my-input]::before {\n  background-color: #efa2a9;\n}\n\n.was-validated[data-my-input]   .custom-control-input[data-my-input]:invalid    ~ .invalid-feedback[data-my-input], .was-validated[data-my-input]   .custom-control-input[data-my-input]:invalid    ~ .invalid-tooltip[data-my-input], .custom-control-input.is-invalid[data-my-input]    ~ .invalid-feedback[data-my-input], .custom-control-input.is-invalid[data-my-input]    ~ .invalid-tooltip[data-my-input] {\n  display: block;\n}\n\n.was-validated[data-my-input]   .custom-control-input[data-my-input]:invalid:checked    ~ .custom-control-label[data-my-input]::before, .custom-control-input.is-invalid[data-my-input]:checked    ~ .custom-control-label[data-my-input]::before {\n  background-color: #e4606d;\n}\n\n.was-validated[data-my-input]   .custom-control-input[data-my-input]:invalid:focus    ~ .custom-control-label[data-my-input]::before, .custom-control-input.is-invalid[data-my-input]:focus    ~ .custom-control-label[data-my-input]::before {\n  box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n\n.was-validated[data-my-input]   .custom-file-input[data-my-input]:invalid    ~ .custom-file-label[data-my-input], .custom-file-input.is-invalid[data-my-input]    ~ .custom-file-label[data-my-input] {\n  border-color: #dc3545;\n}\n\n.was-validated[data-my-input]   .custom-file-input[data-my-input]:invalid    ~ .custom-file-label[data-my-input]::before, .custom-file-input.is-invalid[data-my-input]    ~ .custom-file-label[data-my-input]::before {\n  border-color: inherit;\n}\n\n.was-validated[data-my-input]   .custom-file-input[data-my-input]:invalid    ~ .invalid-feedback[data-my-input], .was-validated[data-my-input]   .custom-file-input[data-my-input]:invalid    ~ .invalid-tooltip[data-my-input], .custom-file-input.is-invalid[data-my-input]    ~ .invalid-feedback[data-my-input], .custom-file-input.is-invalid[data-my-input]    ~ .invalid-tooltip[data-my-input] {\n  display: block;\n}\n\n.was-validated[data-my-input]   .custom-file-input[data-my-input]:invalid:focus    ~ .custom-file-label[data-my-input], .custom-file-input.is-invalid[data-my-input]:focus    ~ .custom-file-label[data-my-input] {\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n\n.form-inline[data-my-input] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -ms-flex-flow: row wrap;\n  flex-flow: row wrap;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n}\n\n.form-inline[data-my-input]   .form-check[data-my-input] {\n  width: 100%;\n}\n\n\@media (min-width: 576px) {\n  .form-inline[data-my-input]   label[data-my-input] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -webkit-box-pack: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    margin-bottom: 0;\n  }\n  .form-inline[data-my-input]   .form-group[data-my-input] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 auto;\n    flex: 0 0 auto;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -ms-flex-flow: row wrap;\n    flex-flow: row wrap;\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center;\n    margin-bottom: 0;\n  }\n  .form-inline[data-my-input]   .form-control[data-my-input] {\n    display: inline-block;\n    width: auto;\n    vertical-align: middle;\n  }\n  .form-inline[data-my-input]   .form-control-plaintext[data-my-input] {\n    display: inline-block;\n  }\n  .form-inline[data-my-input]   .input-group[data-my-input] {\n    width: auto;\n  }\n  .form-inline[data-my-input]   .form-check[data-my-input] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -webkit-box-pack: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    width: auto;\n    padding-left: 0;\n  }\n  .form-inline[data-my-input]   .form-check-input[data-my-input] {\n    position: relative;\n    margin-top: 0;\n    margin-right: 0.25rem;\n    margin-left: 0;\n  }\n  .form-inline[data-my-input]   .custom-control[data-my-input] {\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -webkit-box-pack: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n  }\n  .form-inline[data-my-input]   .custom-control-label[data-my-input] {\n    margin-bottom: 0;\n  }\n}\n\n.btn[data-my-input] {\n  display: inline-block;\n  font-weight: 400;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  border: 1px solid transparent;\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  border-radius: 0.25rem;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n\n.btn[data-my-input]:hover, .btn[data-my-input]:focus {\n  text-decoration: none;\n}\n\n.btn[data-my-input]:focus, .btn.focus[data-my-input] {\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n\n.btn.disabled[data-my-input], .btn[data-my-input]:disabled {\n  opacity: 0.65;\n}\n\n.btn[data-my-input]:not(:disabled):not(.disabled) {\n  cursor: pointer;\n}\n\n.btn[data-my-input]:not(:disabled):not(.disabled):active, .btn[data-my-input]:not(:disabled):not(.disabled).active {\n  background-image: none;\n}\n\na.btn.disabled[data-my-input], fieldset[data-my-input]:disabled   a.btn[data-my-input] {\n  pointer-events: none;\n}\n\n.btn-primary[data-my-input] {\n  color: #fff;\n  background-color: #007bff;\n  border-color: #007bff;\n}\n\n.btn-primary[data-my-input]:hover {\n  color: #fff;\n  background-color: #0069d9;\n  border-color: #0062cc;\n}\n\n.btn-primary[data-my-input]:focus, .btn-primary.focus[data-my-input] {\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);\n}\n\n.btn-primary.disabled[data-my-input], .btn-primary[data-my-input]:disabled {\n  color: #fff;\n  background-color: #007bff;\n  border-color: #007bff;\n}\n\n.btn-primary[data-my-input]:not(:disabled):not(.disabled):active, .btn-primary[data-my-input]:not(:disabled):not(.disabled).active, .show[data-my-input]    > .btn-primary.dropdown-toggle[data-my-input] {\n  color: #fff;\n  background-color: #0062cc;\n  border-color: #005cbf;\n}\n\n.btn-primary[data-my-input]:not(:disabled):not(.disabled):active:focus, .btn-primary[data-my-input]:not(:disabled):not(.disabled).active:focus, .show[data-my-input]    > .btn-primary.dropdown-toggle[data-my-input]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);\n}\n\n.btn-secondary[data-my-input] {\n  color: #fff;\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n\n.btn-secondary[data-my-input]:hover {\n  color: #fff;\n  background-color: #5a6268;\n  border-color: #545b62;\n}\n\n.btn-secondary[data-my-input]:focus, .btn-secondary.focus[data-my-input] {\n  box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5);\n}\n\n.btn-secondary.disabled[data-my-input], .btn-secondary[data-my-input]:disabled {\n  color: #fff;\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n\n.btn-secondary[data-my-input]:not(:disabled):not(.disabled):active, .btn-secondary[data-my-input]:not(:disabled):not(.disabled).active, .show[data-my-input]    > .btn-secondary.dropdown-toggle[data-my-input] {\n  color: #fff;\n  background-color: #545b62;\n  border-color: #4e555b;\n}\n\n.btn-secondary[data-my-input]:not(:disabled):not(.disabled):active:focus, .btn-secondary[data-my-input]:not(:disabled):not(.disabled).active:focus, .show[data-my-input]    > .btn-secondary.dropdown-toggle[data-my-input]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5);\n}\n\n.btn-success[data-my-input] {\n  color: #fff;\n  background-color: #28a745;\n  border-color: #28a745;\n}\n\n.btn-success[data-my-input]:hover {\n  color: #fff;\n  background-color: #218838;\n  border-color: #1e7e34;\n}\n\n.btn-success[data-my-input]:focus, .btn-success.focus[data-my-input] {\n  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5);\n}\n\n.btn-success.disabled[data-my-input], .btn-success[data-my-input]:disabled {\n  color: #fff;\n  background-color: #28a745;\n  border-color: #28a745;\n}\n\n.btn-success[data-my-input]:not(:disabled):not(.disabled):active, .btn-success[data-my-input]:not(:disabled):not(.disabled).active, .show[data-my-input]    > .btn-success.dropdown-toggle[data-my-input] {\n  color: #fff;\n  background-color: #1e7e34;\n  border-color: #1c7430;\n}\n\n.btn-success[data-my-input]:not(:disabled):not(.disabled):active:focus, .btn-success[data-my-input]:not(:disabled):not(.disabled).active:focus, .show[data-my-input]    > .btn-success.dropdown-toggle[data-my-input]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5);\n}\n\n.btn-info[data-my-input] {\n  color: #fff;\n  background-color: #17a2b8;\n  border-color: #17a2b8;\n}\n\n.btn-info[data-my-input]:hover {\n  color: #fff;\n  background-color: #138496;\n  border-color: #117a8b;\n}\n\n.btn-info[data-my-input]:focus, .btn-info.focus[data-my-input] {\n  box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5);\n}\n\n.btn-info.disabled[data-my-input], .btn-info[data-my-input]:disabled {\n  color: #fff;\n  background-color: #17a2b8;\n  border-color: #17a2b8;\n}\n\n.btn-info[data-my-input]:not(:disabled):not(.disabled):active, .btn-info[data-my-input]:not(:disabled):not(.disabled).active, .show[data-my-input]    > .btn-info.dropdown-toggle[data-my-input] {\n  color: #fff;\n  background-color: #117a8b;\n  border-color: #10707f;\n}\n\n.btn-info[data-my-input]:not(:disabled):not(.disabled):active:focus, .btn-info[data-my-input]:not(:disabled):not(.disabled).active:focus, .show[data-my-input]    > .btn-info.dropdown-toggle[data-my-input]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5);\n}\n\n.btn-warning[data-my-input] {\n  color: #212529;\n  background-color: #ffc107;\n  border-color: #ffc107;\n}\n\n.btn-warning[data-my-input]:hover {\n  color: #212529;\n  background-color: #e0a800;\n  border-color: #d39e00;\n}\n\n.btn-warning[data-my-input]:focus, .btn-warning.focus[data-my-input] {\n  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5);\n}\n\n.btn-warning.disabled[data-my-input], .btn-warning[data-my-input]:disabled {\n  color: #212529;\n  background-color: #ffc107;\n  border-color: #ffc107;\n}\n\n.btn-warning[data-my-input]:not(:disabled):not(.disabled):active, .btn-warning[data-my-input]:not(:disabled):not(.disabled).active, .show[data-my-input]    > .btn-warning.dropdown-toggle[data-my-input] {\n  color: #212529;\n  background-color: #d39e00;\n  border-color: #c69500;\n}\n\n.btn-warning[data-my-input]:not(:disabled):not(.disabled):active:focus, .btn-warning[data-my-input]:not(:disabled):not(.disabled).active:focus, .show[data-my-input]    > .btn-warning.dropdown-toggle[data-my-input]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5);\n}\n\n.btn-danger[data-my-input] {\n  color: #fff;\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n\n.btn-danger[data-my-input]:hover {\n  color: #fff;\n  background-color: #c82333;\n  border-color: #bd2130;\n}\n\n.btn-danger[data-my-input]:focus, .btn-danger.focus[data-my-input] {\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5);\n}\n\n.btn-danger.disabled[data-my-input], .btn-danger[data-my-input]:disabled {\n  color: #fff;\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n\n.btn-danger[data-my-input]:not(:disabled):not(.disabled):active, .btn-danger[data-my-input]:not(:disabled):not(.disabled).active, .show[data-my-input]    > .btn-danger.dropdown-toggle[data-my-input] {\n  color: #fff;\n  background-color: #bd2130;\n  border-color: #b21f2d;\n}\n\n.btn-danger[data-my-input]:not(:disabled):not(.disabled):active:focus, .btn-danger[data-my-input]:not(:disabled):not(.disabled).active:focus, .show[data-my-input]    > .btn-danger.dropdown-toggle[data-my-input]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5);\n}\n\n.btn-light[data-my-input] {\n  color: #212529;\n  background-color: #f8f9fa;\n  border-color: #f8f9fa;\n}\n\n.btn-light[data-my-input]:hover {\n  color: #212529;\n  background-color: #e2e6ea;\n  border-color: #dae0e5;\n}\n\n.btn-light[data-my-input]:focus, .btn-light.focus[data-my-input] {\n  box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5);\n}\n\n.btn-light.disabled[data-my-input], .btn-light[data-my-input]:disabled {\n  color: #212529;\n  background-color: #f8f9fa;\n  border-color: #f8f9fa;\n}\n\n.btn-light[data-my-input]:not(:disabled):not(.disabled):active, .btn-light[data-my-input]:not(:disabled):not(.disabled).active, .show[data-my-input]    > .btn-light.dropdown-toggle[data-my-input] {\n  color: #212529;\n  background-color: #dae0e5;\n  border-color: #d3d9df;\n}\n\n.btn-light[data-my-input]:not(:disabled):not(.disabled):active:focus, .btn-light[data-my-input]:not(:disabled):not(.disabled).active:focus, .show[data-my-input]    > .btn-light.dropdown-toggle[data-my-input]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5);\n}\n\n.btn-dark[data-my-input] {\n  color: #fff;\n  background-color: #343a40;\n  border-color: #343a40;\n}\n\n.btn-dark[data-my-input]:hover {\n  color: #fff;\n  background-color: #23272b;\n  border-color: #1d2124;\n}\n\n.btn-dark[data-my-input]:focus, .btn-dark.focus[data-my-input] {\n  box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5);\n}\n\n.btn-dark.disabled[data-my-input], .btn-dark[data-my-input]:disabled {\n  color: #fff;\n  background-color: #343a40;\n  border-color: #343a40;\n}\n\n.btn-dark[data-my-input]:not(:disabled):not(.disabled):active, .btn-dark[data-my-input]:not(:disabled):not(.disabled).active, .show[data-my-input]    > .btn-dark.dropdown-toggle[data-my-input] {\n  color: #fff;\n  background-color: #1d2124;\n  border-color: #171a1d;\n}\n\n.btn-dark[data-my-input]:not(:disabled):not(.disabled):active:focus, .btn-dark[data-my-input]:not(:disabled):not(.disabled).active:focus, .show[data-my-input]    > .btn-dark.dropdown-toggle[data-my-input]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5);\n}\n\n.btn-outline-primary[data-my-input] {\n  color: #007bff;\n  background-color: transparent;\n  background-image: none;\n  border-color: #007bff;\n}\n\n.btn-outline-primary[data-my-input]:hover {\n  color: #fff;\n  background-color: #007bff;\n  border-color: #007bff;\n}\n\n.btn-outline-primary[data-my-input]:focus, .btn-outline-primary.focus[data-my-input] {\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);\n}\n\n.btn-outline-primary.disabled[data-my-input], .btn-outline-primary[data-my-input]:disabled {\n  color: #007bff;\n  background-color: transparent;\n}\n\n.btn-outline-primary[data-my-input]:not(:disabled):not(.disabled):active, .btn-outline-primary[data-my-input]:not(:disabled):not(.disabled).active, .show[data-my-input]    > .btn-outline-primary.dropdown-toggle[data-my-input] {\n  color: #fff;\n  background-color: #007bff;\n  border-color: #007bff;\n}\n\n.btn-outline-primary[data-my-input]:not(:disabled):not(.disabled):active:focus, .btn-outline-primary[data-my-input]:not(:disabled):not(.disabled).active:focus, .show[data-my-input]    > .btn-outline-primary.dropdown-toggle[data-my-input]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);\n}\n\n.btn-outline-secondary[data-my-input] {\n  color: #6c757d;\n  background-color: transparent;\n  background-image: none;\n  border-color: #6c757d;\n}\n\n.btn-outline-secondary[data-my-input]:hover {\n  color: #fff;\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n\n.btn-outline-secondary[data-my-input]:focus, .btn-outline-secondary.focus[data-my-input] {\n  box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5);\n}\n\n.btn-outline-secondary.disabled[data-my-input], .btn-outline-secondary[data-my-input]:disabled {\n  color: #6c757d;\n  background-color: transparent;\n}\n\n.btn-outline-secondary[data-my-input]:not(:disabled):not(.disabled):active, .btn-outline-secondary[data-my-input]:not(:disabled):not(.disabled).active, .show[data-my-input]    > .btn-outline-secondary.dropdown-toggle[data-my-input] {\n  color: #fff;\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n\n.btn-outline-secondary[data-my-input]:not(:disabled):not(.disabled):active:focus, .btn-outline-secondary[data-my-input]:not(:disabled):not(.disabled).active:focus, .show[data-my-input]    > .btn-outline-secondary.dropdown-toggle[data-my-input]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5);\n}\n\n.btn-outline-success[data-my-input] {\n  color: #28a745;\n  background-color: transparent;\n  background-image: none;\n  border-color: #28a745;\n}\n\n.btn-outline-success[data-my-input]:hover {\n  color: #fff;\n  background-color: #28a745;\n  border-color: #28a745;\n}\n\n.btn-outline-success[data-my-input]:focus, .btn-outline-success.focus[data-my-input] {\n  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5);\n}\n\n.btn-outline-success.disabled[data-my-input], .btn-outline-success[data-my-input]:disabled {\n  color: #28a745;\n  background-color: transparent;\n}\n\n.btn-outline-success[data-my-input]:not(:disabled):not(.disabled):active, .btn-outline-success[data-my-input]:not(:disabled):not(.disabled).active, .show[data-my-input]    > .btn-outline-success.dropdown-toggle[data-my-input] {\n  color: #fff;\n  background-color: #28a745;\n  border-color: #28a745;\n}\n\n.btn-outline-success[data-my-input]:not(:disabled):not(.disabled):active:focus, .btn-outline-success[data-my-input]:not(:disabled):not(.disabled).active:focus, .show[data-my-input]    > .btn-outline-success.dropdown-toggle[data-my-input]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5);\n}\n\n.btn-outline-info[data-my-input] {\n  color: #17a2b8;\n  background-color: transparent;\n  background-image: none;\n  border-color: #17a2b8;\n}\n\n.btn-outline-info[data-my-input]:hover {\n  color: #fff;\n  background-color: #17a2b8;\n  border-color: #17a2b8;\n}\n\n.btn-outline-info[data-my-input]:focus, .btn-outline-info.focus[data-my-input] {\n  box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5);\n}\n\n.btn-outline-info.disabled[data-my-input], .btn-outline-info[data-my-input]:disabled {\n  color: #17a2b8;\n  background-color: transparent;\n}\n\n.btn-outline-info[data-my-input]:not(:disabled):not(.disabled):active, .btn-outline-info[data-my-input]:not(:disabled):not(.disabled).active, .show[data-my-input]    > .btn-outline-info.dropdown-toggle[data-my-input] {\n  color: #fff;\n  background-color: #17a2b8;\n  border-color: #17a2b8;\n}\n\n.btn-outline-info[data-my-input]:not(:disabled):not(.disabled):active:focus, .btn-outline-info[data-my-input]:not(:disabled):not(.disabled).active:focus, .show[data-my-input]    > .btn-outline-info.dropdown-toggle[data-my-input]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5);\n}\n\n.btn-outline-warning[data-my-input] {\n  color: #ffc107;\n  background-color: transparent;\n  background-image: none;\n  border-color: #ffc107;\n}\n\n.btn-outline-warning[data-my-input]:hover {\n  color: #212529;\n  background-color: #ffc107;\n  border-color: #ffc107;\n}\n\n.btn-outline-warning[data-my-input]:focus, .btn-outline-warning.focus[data-my-input] {\n  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5);\n}\n\n.btn-outline-warning.disabled[data-my-input], .btn-outline-warning[data-my-input]:disabled {\n  color: #ffc107;\n  background-color: transparent;\n}\n\n.btn-outline-warning[data-my-input]:not(:disabled):not(.disabled):active, .btn-outline-warning[data-my-input]:not(:disabled):not(.disabled).active, .show[data-my-input]    > .btn-outline-warning.dropdown-toggle[data-my-input] {\n  color: #212529;\n  background-color: #ffc107;\n  border-color: #ffc107;\n}\n\n.btn-outline-warning[data-my-input]:not(:disabled):not(.disabled):active:focus, .btn-outline-warning[data-my-input]:not(:disabled):not(.disabled).active:focus, .show[data-my-input]    > .btn-outline-warning.dropdown-toggle[data-my-input]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5);\n}\n\n.btn-outline-danger[data-my-input] {\n  color: #dc3545;\n  background-color: transparent;\n  background-image: none;\n  border-color: #dc3545;\n}\n\n.btn-outline-danger[data-my-input]:hover {\n  color: #fff;\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n\n.btn-outline-danger[data-my-input]:focus, .btn-outline-danger.focus[data-my-input] {\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5);\n}\n\n.btn-outline-danger.disabled[data-my-input], .btn-outline-danger[data-my-input]:disabled {\n  color: #dc3545;\n  background-color: transparent;\n}\n\n.btn-outline-danger[data-my-input]:not(:disabled):not(.disabled):active, .btn-outline-danger[data-my-input]:not(:disabled):not(.disabled).active, .show[data-my-input]    > .btn-outline-danger.dropdown-toggle[data-my-input] {\n  color: #fff;\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n\n.btn-outline-danger[data-my-input]:not(:disabled):not(.disabled):active:focus, .btn-outline-danger[data-my-input]:not(:disabled):not(.disabled).active:focus, .show[data-my-input]    > .btn-outline-danger.dropdown-toggle[data-my-input]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5);\n}\n\n.btn-outline-light[data-my-input] {\n  color: #f8f9fa;\n  background-color: transparent;\n  background-image: none;\n  border-color: #f8f9fa;\n}\n\n.btn-outline-light[data-my-input]:hover {\n  color: #212529;\n  background-color: #f8f9fa;\n  border-color: #f8f9fa;\n}\n\n.btn-outline-light[data-my-input]:focus, .btn-outline-light.focus[data-my-input] {\n  box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5);\n}\n\n.btn-outline-light.disabled[data-my-input], .btn-outline-light[data-my-input]:disabled {\n  color: #f8f9fa;\n  background-color: transparent;\n}\n\n.btn-outline-light[data-my-input]:not(:disabled):not(.disabled):active, .btn-outline-light[data-my-input]:not(:disabled):not(.disabled).active, .show[data-my-input]    > .btn-outline-light.dropdown-toggle[data-my-input] {\n  color: #212529;\n  background-color: #f8f9fa;\n  border-color: #f8f9fa;\n}\n\n.btn-outline-light[data-my-input]:not(:disabled):not(.disabled):active:focus, .btn-outline-light[data-my-input]:not(:disabled):not(.disabled).active:focus, .show[data-my-input]    > .btn-outline-light.dropdown-toggle[data-my-input]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5);\n}\n\n.btn-outline-dark[data-my-input] {\n  color: #343a40;\n  background-color: transparent;\n  background-image: none;\n  border-color: #343a40;\n}\n\n.btn-outline-dark[data-my-input]:hover {\n  color: #fff;\n  background-color: #343a40;\n  border-color: #343a40;\n}\n\n.btn-outline-dark[data-my-input]:focus, .btn-outline-dark.focus[data-my-input] {\n  box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5);\n}\n\n.btn-outline-dark.disabled[data-my-input], .btn-outline-dark[data-my-input]:disabled {\n  color: #343a40;\n  background-color: transparent;\n}\n\n.btn-outline-dark[data-my-input]:not(:disabled):not(.disabled):active, .btn-outline-dark[data-my-input]:not(:disabled):not(.disabled).active, .show[data-my-input]    > .btn-outline-dark.dropdown-toggle[data-my-input] {\n  color: #fff;\n  background-color: #343a40;\n  border-color: #343a40;\n}\n\n.btn-outline-dark[data-my-input]:not(:disabled):not(.disabled):active:focus, .btn-outline-dark[data-my-input]:not(:disabled):not(.disabled).active:focus, .show[data-my-input]    > .btn-outline-dark.dropdown-toggle[data-my-input]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5);\n}\n\n.btn-link[data-my-input] {\n  font-weight: 400;\n  color: #007bff;\n  background-color: transparent;\n}\n\n.btn-link[data-my-input]:hover {\n  color: #0056b3;\n  text-decoration: underline;\n  background-color: transparent;\n  border-color: transparent;\n}\n\n.btn-link[data-my-input]:focus, .btn-link.focus[data-my-input] {\n  text-decoration: underline;\n  border-color: transparent;\n  box-shadow: none;\n}\n\n.btn-link[data-my-input]:disabled, .btn-link.disabled[data-my-input] {\n  color: #6c757d;\n}\n\n.btn-lg[data-my-input], .btn-group-lg[data-my-input]    > .btn[data-my-input] {\n  padding: 0.5rem 1rem;\n  font-size: 1.25rem;\n  line-height: 1.5;\n  border-radius: 0.3rem;\n}\n\n.btn-sm[data-my-input], .btn-group-sm[data-my-input]    > .btn[data-my-input] {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  border-radius: 0.2rem;\n}\n\n.btn-block[data-my-input] {\n  display: block;\n  width: 100%;\n}\n\n.btn-block[data-my-input]    + .btn-block[data-my-input] {\n  margin-top: 0.5rem;\n}\n\ninput[type=\"submit\"].btn-block[data-my-input], input[type=\"reset\"].btn-block[data-my-input], input[type=\"button\"].btn-block[data-my-input] {\n  width: 100%;\n}\n\n.fade[data-my-input] {\n  opacity: 0;\n  transition: opacity 0.15s linear;\n}\n\n.fade.show[data-my-input] {\n  opacity: 1;\n}\n\n.collapse[data-my-input] {\n  display: none;\n}\n\n.collapse.show[data-my-input] {\n  display: block;\n}\n\ntr.collapse.show[data-my-input] {\n  display: table-row;\n}\n\ntbody.collapse.show[data-my-input] {\n  display: table-row-group;\n}\n\n.collapsing[data-my-input] {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  transition: height 0.35s ease;\n}\n\n.dropup[data-my-input], .dropdown[data-my-input] {\n  position: relative;\n}\n\n.dropdown-toggle[data-my-input]::after {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0.3em solid;\n  border-right: 0.3em solid transparent;\n  border-bottom: 0;\n  border-left: 0.3em solid transparent;\n}\n\n.dropdown-toggle[data-my-input]:empty::after {\n  margin-left: 0;\n}\n\n.dropdown-menu[data-my-input] {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 10rem;\n  padding: 0.5rem 0;\n  margin: 0.125rem 0 0;\n  font-size: 1rem;\n  color: #212529;\n  text-align: left;\n  list-style: none;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n}\n\n.dropup[data-my-input]   .dropdown-menu[data-my-input] {\n  margin-top: 0;\n  margin-bottom: 0.125rem;\n}\n\n.dropup[data-my-input]   .dropdown-toggle[data-my-input]::after {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0;\n  border-right: 0.3em solid transparent;\n  border-bottom: 0.3em solid;\n  border-left: 0.3em solid transparent;\n}\n\n.dropup[data-my-input]   .dropdown-toggle[data-my-input]:empty::after {\n  margin-left: 0;\n}\n\n.dropright[data-my-input]   .dropdown-menu[data-my-input] {\n  margin-top: 0;\n  margin-left: 0.125rem;\n}\n\n.dropright[data-my-input]   .dropdown-toggle[data-my-input]::after {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0.3em solid transparent;\n  border-bottom: 0.3em solid transparent;\n  border-left: 0.3em solid;\n}\n\n.dropright[data-my-input]   .dropdown-toggle[data-my-input]:empty::after {\n  margin-left: 0;\n}\n\n.dropright[data-my-input]   .dropdown-toggle[data-my-input]::after {\n  vertical-align: 0;\n}\n\n.dropleft[data-my-input]   .dropdown-menu[data-my-input] {\n  margin-top: 0;\n  margin-right: 0.125rem;\n}\n\n.dropleft[data-my-input]   .dropdown-toggle[data-my-input]::after {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n}\n\n.dropleft[data-my-input]   .dropdown-toggle[data-my-input]::after {\n  display: none;\n}\n\n.dropleft[data-my-input]   .dropdown-toggle[data-my-input]::before {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-right: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0.3em solid transparent;\n  border-right: 0.3em solid;\n  border-bottom: 0.3em solid transparent;\n}\n\n.dropleft[data-my-input]   .dropdown-toggle[data-my-input]:empty::after {\n  margin-left: 0;\n}\n\n.dropleft[data-my-input]   .dropdown-toggle[data-my-input]::before {\n  vertical-align: 0;\n}\n\n.dropdown-divider[data-my-input] {\n  height: 0;\n  margin: 0.5rem 0;\n  overflow: hidden;\n  border-top: 1px solid #e9ecef;\n}\n\n.dropdown-item[data-my-input] {\n  display: block;\n  width: 100%;\n  padding: 0.25rem 1.5rem;\n  clear: both;\n  font-weight: 400;\n  color: #212529;\n  text-align: inherit;\n  white-space: nowrap;\n  background-color: transparent;\n  border: 0;\n}\n\n.dropdown-item[data-my-input]:hover, .dropdown-item[data-my-input]:focus {\n  color: #16181b;\n  text-decoration: none;\n  background-color: #f8f9fa;\n}\n\n.dropdown-item.active[data-my-input], .dropdown-item[data-my-input]:active {\n  color: #fff;\n  text-decoration: none;\n  background-color: #007bff;\n}\n\n.dropdown-item.disabled[data-my-input], .dropdown-item[data-my-input]:disabled {\n  color: #6c757d;\n  background-color: transparent;\n}\n\n.dropdown-menu.show[data-my-input] {\n  display: block;\n}\n\n.dropdown-header[data-my-input] {\n  display: block;\n  padding: 0.5rem 1.5rem;\n  margin-bottom: 0;\n  font-size: 0.875rem;\n  color: #6c757d;\n  white-space: nowrap;\n}\n\n.btn-group[data-my-input], .btn-group-vertical[data-my-input] {\n  position: relative;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  vertical-align: middle;\n}\n\n.btn-group[data-my-input]    > .btn[data-my-input], .btn-group-vertical[data-my-input]    > .btn[data-my-input] {\n  position: relative;\n  -webkit-box-flex: 0;\n  -ms-flex: 0 1 auto;\n  flex: 0 1 auto;\n}\n\n.btn-group[data-my-input]    > .btn[data-my-input]:hover, .btn-group-vertical[data-my-input]    > .btn[data-my-input]:hover {\n  z-index: 1;\n}\n\n.btn-group[data-my-input]    > .btn[data-my-input]:focus, .btn-group[data-my-input]    > .btn[data-my-input]:active, .btn-group[data-my-input]    > .btn.active[data-my-input], .btn-group-vertical[data-my-input]    > .btn[data-my-input]:focus, .btn-group-vertical[data-my-input]    > .btn[data-my-input]:active, .btn-group-vertical[data-my-input]    > .btn.active[data-my-input] {\n  z-index: 1;\n}\n\n.btn-group[data-my-input]   .btn[data-my-input]    + .btn[data-my-input], .btn-group[data-my-input]   .btn[data-my-input]    + .btn-group[data-my-input], .btn-group[data-my-input]   .btn-group[data-my-input]    + .btn[data-my-input], .btn-group[data-my-input]   .btn-group[data-my-input]    + .btn-group[data-my-input], .btn-group-vertical[data-my-input]   .btn[data-my-input]    + .btn[data-my-input], .btn-group-vertical[data-my-input]   .btn[data-my-input]    + .btn-group[data-my-input], .btn-group-vertical[data-my-input]   .btn-group[data-my-input]    + .btn[data-my-input], .btn-group-vertical[data-my-input]   .btn-group[data-my-input]    + .btn-group[data-my-input] {\n  margin-left: -1px;\n}\n\n.btn-toolbar[data-my-input] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  -webkit-box-pack: start;\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n}\n\n.btn-toolbar[data-my-input]   .input-group[data-my-input] {\n  width: auto;\n}\n\n.btn-group[data-my-input]    > .btn[data-my-input]:first-child {\n  margin-left: 0;\n}\n\n.btn-group[data-my-input]    > .btn[data-my-input]:not(:last-child):not(.dropdown-toggle), .btn-group[data-my-input]    > .btn-group[data-my-input]:not(:last-child)    > .btn[data-my-input] {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n\n.btn-group[data-my-input]    > .btn[data-my-input]:not(:first-child), .btn-group[data-my-input]    > .btn-group[data-my-input]:not(:first-child)    > .btn[data-my-input] {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n.dropdown-toggle-split[data-my-input] {\n  padding-right: 0.5625rem;\n  padding-left: 0.5625rem;\n}\n\n.dropdown-toggle-split[data-my-input]::after {\n  margin-left: 0;\n}\n\n.btn-sm[data-my-input]    + .dropdown-toggle-split[data-my-input], .btn-group-sm[data-my-input]    > .btn[data-my-input]    + .dropdown-toggle-split[data-my-input] {\n  padding-right: 0.375rem;\n  padding-left: 0.375rem;\n}\n\n.btn-lg[data-my-input]    + .dropdown-toggle-split[data-my-input], .btn-group-lg[data-my-input]    > .btn[data-my-input]    + .dropdown-toggle-split[data-my-input] {\n  padding-right: 0.75rem;\n  padding-left: 0.75rem;\n}\n\n.btn-group-vertical[data-my-input] {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-align: start;\n  -ms-flex-align: start;\n  align-items: flex-start;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n}\n\n.btn-group-vertical[data-my-input]   .btn[data-my-input], .btn-group-vertical[data-my-input]   .btn-group[data-my-input] {\n  width: 100%;\n}\n\n.btn-group-vertical[data-my-input]    > .btn[data-my-input]    + .btn[data-my-input], .btn-group-vertical[data-my-input]    > .btn[data-my-input]    + .btn-group[data-my-input], .btn-group-vertical[data-my-input]    > .btn-group[data-my-input]    + .btn[data-my-input], .btn-group-vertical[data-my-input]    > .btn-group[data-my-input]    + .btn-group[data-my-input] {\n  margin-top: -1px;\n  margin-left: 0;\n}\n\n.btn-group-vertical[data-my-input]    > .btn[data-my-input]:not(:last-child):not(.dropdown-toggle), .btn-group-vertical[data-my-input]    > .btn-group[data-my-input]:not(:last-child)    > .btn[data-my-input] {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n.btn-group-vertical[data-my-input]    > .btn[data-my-input]:not(:first-child), .btn-group-vertical[data-my-input]    > .btn-group[data-my-input]:not(:first-child)    > .btn[data-my-input] {\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n}\n\n.btn-group-toggle[data-my-input]    > .btn[data-my-input], .btn-group-toggle[data-my-input]    > .btn-group[data-my-input]    > .btn[data-my-input] {\n  margin-bottom: 0;\n}\n\n.btn-group-toggle[data-my-input]    > .btn[data-my-input]   input[type=\"radio\"][data-my-input], .btn-group-toggle[data-my-input]    > .btn[data-my-input]   input[type=\"checkbox\"][data-my-input], .btn-group-toggle[data-my-input]    > .btn-group[data-my-input]    > .btn[data-my-input]   input[type=\"radio\"][data-my-input], .btn-group-toggle[data-my-input]    > .btn-group[data-my-input]    > .btn[data-my-input]   input[type=\"checkbox\"][data-my-input] {\n  position: absolute;\n  clip: rect(0, 0, 0, 0);\n  pointer-events: none;\n}\n\n.input-group[data-my-input] {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  -webkit-box-align: stretch;\n  -ms-flex-align: stretch;\n  align-items: stretch;\n  width: 100%;\n}\n\n.input-group[data-my-input]    > .form-control[data-my-input], .input-group[data-my-input]    > .custom-select[data-my-input], .input-group[data-my-input]    > .custom-file[data-my-input] {\n  position: relative;\n  -webkit-box-flex: 1;\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n  width: 1%;\n  margin-bottom: 0;\n}\n\n.input-group[data-my-input]    > .form-control[data-my-input]:focus, .input-group[data-my-input]    > .custom-select[data-my-input]:focus, .input-group[data-my-input]    > .custom-file[data-my-input]:focus {\n  z-index: 3;\n}\n\n.input-group[data-my-input]    > .form-control[data-my-input]    + .form-control[data-my-input], .input-group[data-my-input]    > .form-control[data-my-input]    + .custom-select[data-my-input], .input-group[data-my-input]    > .form-control[data-my-input]    + .custom-file[data-my-input], .input-group[data-my-input]    > .custom-select[data-my-input]    + .form-control[data-my-input], .input-group[data-my-input]    > .custom-select[data-my-input]    + .custom-select[data-my-input], .input-group[data-my-input]    > .custom-select[data-my-input]    + .custom-file[data-my-input], .input-group[data-my-input]    > .custom-file[data-my-input]    + .form-control[data-my-input], .input-group[data-my-input]    > .custom-file[data-my-input]    + .custom-select[data-my-input], .input-group[data-my-input]    > .custom-file[data-my-input]    + .custom-file[data-my-input] {\n  margin-left: -1px;\n}\n\n.input-group[data-my-input]    > .form-control[data-my-input]:not(:last-child), .input-group[data-my-input]    > .custom-select[data-my-input]:not(:last-child) {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n\n.input-group[data-my-input]    > .form-control[data-my-input]:not(:first-child), .input-group[data-my-input]    > .custom-select[data-my-input]:not(:first-child) {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n.input-group[data-my-input]    > .custom-file[data-my-input] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n}\n\n.input-group[data-my-input]    > .custom-file[data-my-input]:not(:last-child)   .custom-file-label[data-my-input], .input-group[data-my-input]    > .custom-file[data-my-input]:not(:last-child)   .custom-file-label[data-my-input]::before {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n\n.input-group[data-my-input]    > .custom-file[data-my-input]:not(:first-child)   .custom-file-label[data-my-input], .input-group[data-my-input]    > .custom-file[data-my-input]:not(:first-child)   .custom-file-label[data-my-input]::before {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n.input-group-prepend[data-my-input], .input-group-append[data-my-input] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.input-group-prepend[data-my-input]   .btn[data-my-input], .input-group-append[data-my-input]   .btn[data-my-input] {\n  position: relative;\n  z-index: 2;\n}\n\n.input-group-prepend[data-my-input]   .btn[data-my-input]    + .btn[data-my-input], .input-group-prepend[data-my-input]   .btn[data-my-input]    + .input-group-text[data-my-input], .input-group-prepend[data-my-input]   .input-group-text[data-my-input]    + .input-group-text[data-my-input], .input-group-prepend[data-my-input]   .input-group-text[data-my-input]    + .btn[data-my-input], .input-group-append[data-my-input]   .btn[data-my-input]    + .btn[data-my-input], .input-group-append[data-my-input]   .btn[data-my-input]    + .input-group-text[data-my-input], .input-group-append[data-my-input]   .input-group-text[data-my-input]    + .input-group-text[data-my-input], .input-group-append[data-my-input]   .input-group-text[data-my-input]    + .btn[data-my-input] {\n  margin-left: -1px;\n}\n\n.input-group-prepend[data-my-input] {\n  margin-right: -1px;\n}\n\n.input-group-append[data-my-input] {\n  margin-left: -1px;\n}\n\n.input-group-text[data-my-input] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  padding: 0.375rem 0.75rem;\n  margin-bottom: 0;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #495057;\n  text-align: center;\n  white-space: nowrap;\n  background-color: #e9ecef;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n}\n\n.input-group-text[data-my-input]   input[type=\"radio\"][data-my-input], .input-group-text[data-my-input]   input[type=\"checkbox\"][data-my-input] {\n  margin-top: 0;\n}\n\n.input-group[data-my-input]    > .input-group-prepend[data-my-input]    > .btn[data-my-input], .input-group[data-my-input]    > .input-group-prepend[data-my-input]    > .input-group-text[data-my-input], .input-group[data-my-input]    > .input-group-append[data-my-input]:not(:last-child)    > .btn[data-my-input], .input-group[data-my-input]    > .input-group-append[data-my-input]:not(:last-child)    > .input-group-text[data-my-input], .input-group[data-my-input]    > .input-group-append[data-my-input]:last-child    > .btn[data-my-input]:not(:last-child):not(.dropdown-toggle), .input-group[data-my-input]    > .input-group-append[data-my-input]:last-child    > .input-group-text[data-my-input]:not(:last-child) {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n\n.input-group[data-my-input]    > .input-group-append[data-my-input]    > .btn[data-my-input], .input-group[data-my-input]    > .input-group-append[data-my-input]    > .input-group-text[data-my-input], .input-group[data-my-input]    > .input-group-prepend[data-my-input]:not(:first-child)    > .btn[data-my-input], .input-group[data-my-input]    > .input-group-prepend[data-my-input]:not(:first-child)    > .input-group-text[data-my-input], .input-group[data-my-input]    > .input-group-prepend[data-my-input]:first-child    > .btn[data-my-input]:not(:first-child), .input-group[data-my-input]    > .input-group-prepend[data-my-input]:first-child    > .input-group-text[data-my-input]:not(:first-child) {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n.custom-control[data-my-input] {\n  position: relative;\n  display: block;\n  min-height: 1.5rem;\n  padding-left: 1.5rem;\n}\n\n.custom-control-inline[data-my-input] {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  margin-right: 1rem;\n}\n\n.custom-control-input[data-my-input] {\n  position: absolute;\n  z-index: -1;\n  opacity: 0;\n}\n\n.custom-control-input[data-my-input]:checked    ~ .custom-control-label[data-my-input]::before {\n  color: #fff;\n  background-color: #007bff;\n}\n\n.custom-control-input[data-my-input]:focus    ~ .custom-control-label[data-my-input]::before {\n  box-shadow: 0 0 0 1px #fff, 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n\n.custom-control-input[data-my-input]:active    ~ .custom-control-label[data-my-input]::before {\n  color: #fff;\n  background-color: #b3d7ff;\n}\n\n.custom-control-input[data-my-input]:disabled    ~ .custom-control-label[data-my-input] {\n  color: #6c757d;\n}\n\n.custom-control-input[data-my-input]:disabled    ~ .custom-control-label[data-my-input]::before {\n  background-color: #e9ecef;\n}\n\n.custom-control-label[data-my-input] {\n  margin-bottom: 0;\n}\n\n.custom-control-label[data-my-input]::before {\n  position: absolute;\n  top: 0.25rem;\n  left: 0;\n  display: block;\n  width: 1rem;\n  height: 1rem;\n  pointer-events: none;\n  content: \"\";\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  background-color: #dee2e6;\n}\n\n.custom-control-label[data-my-input]::after {\n  position: absolute;\n  top: 0.25rem;\n  left: 0;\n  display: block;\n  width: 1rem;\n  height: 1rem;\n  content: \"\";\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: 50% 50%;\n}\n\n.custom-checkbox[data-my-input]   .custom-control-label[data-my-input]::before {\n  border-radius: 0.25rem;\n}\n\n.custom-checkbox[data-my-input]   .custom-control-input[data-my-input]:checked    ~ .custom-control-label[data-my-input]::before {\n  background-color: #007bff;\n}\n\n.custom-checkbox[data-my-input]   .custom-control-input[data-my-input]:checked    ~ .custom-control-label[data-my-input]::after {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E\");\n}\n\n.custom-checkbox[data-my-input]   .custom-control-input[data-my-input]:indeterminate    ~ .custom-control-label[data-my-input]::before {\n  background-color: #007bff;\n}\n\n.custom-checkbox[data-my-input]   .custom-control-input[data-my-input]:indeterminate    ~ .custom-control-label[data-my-input]::after {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'%3E%3Cpath stroke='%23fff' d='M0 2h4'/%3E%3C/svg%3E\");\n}\n\n.custom-checkbox[data-my-input]   .custom-control-input[data-my-input]:disabled:checked    ~ .custom-control-label[data-my-input]::before {\n  background-color: rgba(0, 123, 255, 0.5);\n}\n\n.custom-checkbox[data-my-input]   .custom-control-input[data-my-input]:disabled:indeterminate    ~ .custom-control-label[data-my-input]::before {\n  background-color: rgba(0, 123, 255, 0.5);\n}\n\n.custom-radio[data-my-input]   .custom-control-label[data-my-input]::before {\n  border-radius: 50%;\n}\n\n.custom-radio[data-my-input]   .custom-control-input[data-my-input]:checked    ~ .custom-control-label[data-my-input]::before {\n  background-color: #007bff;\n}\n\n.custom-radio[data-my-input]   .custom-control-input[data-my-input]:checked    ~ .custom-control-label[data-my-input]::after {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='3' fill='%23fff'/%3E%3C/svg%3E\");\n}\n\n.custom-radio[data-my-input]   .custom-control-input[data-my-input]:disabled:checked    ~ .custom-control-label[data-my-input]::before {\n  background-color: rgba(0, 123, 255, 0.5);\n}\n\n.custom-select[data-my-input] {\n  display: inline-block;\n  width: 100%;\n  height: calc(2.25rem + 2px);\n  padding: 0.375rem 1.75rem 0.375rem 0.75rem;\n  line-height: 1.5;\n  color: #495057;\n  vertical-align: middle;\n  background: #fff url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E\") no-repeat right 0.75rem center;\n  background-size: 8px 10px;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n}\n\n.custom-select[data-my-input]:focus {\n  border-color: #80bdff;\n  outline: 0;\n  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.075), 0 0 5px rgba(128, 189, 255, 0.5);\n}\n\n.custom-select[data-my-input]:focus::-ms-value {\n  color: #495057;\n  background-color: #fff;\n}\n\n.custom-select[multiple][data-my-input], .custom-select[size][data-my-input]:not([size=\"1\"]) {\n  height: auto;\n  padding-right: 0.75rem;\n  background-image: none;\n}\n\n.custom-select[data-my-input]:disabled {\n  color: #6c757d;\n  background-color: #e9ecef;\n}\n\n.custom-select[data-my-input]::-ms-expand {\n  opacity: 0;\n}\n\n.custom-select-sm[data-my-input] {\n  height: calc(1.8125rem + 2px);\n  padding-top: 0.375rem;\n  padding-bottom: 0.375rem;\n  font-size: 75%;\n}\n\n.custom-select-lg[data-my-input] {\n  height: calc(2.875rem + 2px);\n  padding-top: 0.375rem;\n  padding-bottom: 0.375rem;\n  font-size: 125%;\n}\n\n.custom-file[data-my-input] {\n  position: relative;\n  display: inline-block;\n  width: 100%;\n  height: calc(2.25rem + 2px);\n  margin-bottom: 0;\n}\n\n.custom-file-input[data-my-input] {\n  position: relative;\n  z-index: 2;\n  width: 100%;\n  height: calc(2.25rem + 2px);\n  margin: 0;\n  opacity: 0;\n}\n\n.custom-file-input[data-my-input]:focus    ~ .custom-file-control[data-my-input] {\n  border-color: #80bdff;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n\n.custom-file-input[data-my-input]:focus    ~ .custom-file-control[data-my-input]::before {\n  border-color: #80bdff;\n}\n\n.custom-file-input[data-my-input]:lang(en)    ~ .custom-file-label[data-my-input]::after {\n  content: \"Browse\";\n}\n\n.custom-file-label[data-my-input] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 1;\n  height: calc(2.25rem + 2px);\n  padding: 0.375rem 0.75rem;\n  line-height: 1.5;\n  color: #495057;\n  background-color: #fff;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n}\n\n.custom-file-label[data-my-input]::after {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 3;\n  display: block;\n  height: calc(calc(2.25rem + 2px) - 1px * 2);\n  padding: 0.375rem 0.75rem;\n  line-height: 1.5;\n  color: #495057;\n  content: \"Browse\";\n  background-color: #e9ecef;\n  border-left: 1px solid #ced4da;\n  border-radius: 0 0.25rem 0.25rem 0;\n}\n\n.nav[data-my-input] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none;\n}\n\n.nav-link[data-my-input] {\n  display: block;\n  padding: 0.5rem 1rem;\n}\n\n.nav-link[data-my-input]:hover, .nav-link[data-my-input]:focus {\n  text-decoration: none;\n}\n\n.nav-link.disabled[data-my-input] {\n  color: #6c757d;\n}\n\n.nav-tabs[data-my-input] {\n  border-bottom: 1px solid #dee2e6;\n}\n\n.nav-tabs[data-my-input]   .nav-item[data-my-input] {\n  margin-bottom: -1px;\n}\n\n.nav-tabs[data-my-input]   .nav-link[data-my-input] {\n  border: 1px solid transparent;\n  border-top-left-radius: 0.25rem;\n  border-top-right-radius: 0.25rem;\n}\n\n.nav-tabs[data-my-input]   .nav-link[data-my-input]:hover, .nav-tabs[data-my-input]   .nav-link[data-my-input]:focus {\n  border-color: #e9ecef #e9ecef #dee2e6;\n}\n\n.nav-tabs[data-my-input]   .nav-link.disabled[data-my-input] {\n  color: #6c757d;\n  background-color: transparent;\n  border-color: transparent;\n}\n\n.nav-tabs[data-my-input]   .nav-link.active[data-my-input], .nav-tabs[data-my-input]   .nav-item.show[data-my-input]   .nav-link[data-my-input] {\n  color: #495057;\n  background-color: #fff;\n  border-color: #dee2e6 #dee2e6 #fff;\n}\n\n.nav-tabs[data-my-input]   .dropdown-menu[data-my-input] {\n  margin-top: -1px;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n}\n\n.nav-pills[data-my-input]   .nav-link[data-my-input] {\n  border-radius: 0.25rem;\n}\n\n.nav-pills[data-my-input]   .nav-link.active[data-my-input], .nav-pills[data-my-input]   .show[data-my-input]    > .nav-link[data-my-input] {\n  color: #fff;\n  background-color: #007bff;\n}\n\n.nav-fill[data-my-input]   .nav-item[data-my-input] {\n  -webkit-box-flex: 1;\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n  text-align: center;\n}\n\n.nav-justified[data-my-input]   .nav-item[data-my-input] {\n  -ms-flex-preferred-size: 0;\n  flex-basis: 0;\n  -webkit-box-flex: 1;\n  -ms-flex-positive: 1;\n  flex-grow: 1;\n  text-align: center;\n}\n\n.tab-content[data-my-input]    > .tab-pane[data-my-input] {\n  display: none;\n}\n\n.tab-content[data-my-input]    > .active[data-my-input] {\n  display: block;\n}\n\n.navbar[data-my-input] {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  padding: 0.5rem 1rem;\n}\n\n.navbar[data-my-input]    > .container[data-my-input], .navbar[data-my-input]    > .container-fluid[data-my-input] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n}\n\n.navbar-brand[data-my-input] {\n  display: inline-block;\n  padding-top: 0.3125rem;\n  padding-bottom: 0.3125rem;\n  margin-right: 1rem;\n  font-size: 1.25rem;\n  line-height: inherit;\n  white-space: nowrap;\n}\n\n.navbar-brand[data-my-input]:hover, .navbar-brand[data-my-input]:focus {\n  text-decoration: none;\n}\n\n.navbar-nav[data-my-input] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none;\n}\n\n.navbar-nav[data-my-input]   .nav-link[data-my-input] {\n  padding-right: 0;\n  padding-left: 0;\n}\n\n.navbar-nav[data-my-input]   .dropdown-menu[data-my-input] {\n  position: static;\n  float: none;\n}\n\n.navbar-text[data-my-input] {\n  display: inline-block;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n\n.navbar-collapse[data-my-input] {\n  -ms-flex-preferred-size: 100%;\n  flex-basis: 100%;\n  -webkit-box-flex: 1;\n  -ms-flex-positive: 1;\n  flex-grow: 1;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n}\n\n.navbar-toggler[data-my-input] {\n  padding: 0.25rem 0.75rem;\n  font-size: 1.25rem;\n  line-height: 1;\n  background-color: transparent;\n  border: 1px solid transparent;\n  border-radius: 0.25rem;\n}\n\n.navbar-toggler[data-my-input]:hover, .navbar-toggler[data-my-input]:focus {\n  text-decoration: none;\n}\n\n.navbar-toggler[data-my-input]:not(:disabled):not(.disabled) {\n  cursor: pointer;\n}\n\n.navbar-toggler-icon[data-my-input] {\n  display: inline-block;\n  width: 1.5em;\n  height: 1.5em;\n  vertical-align: middle;\n  content: \"\";\n  background: no-repeat center center;\n  background-size: 100% 100%;\n}\n\n\@media (max-width: 575.98px) {\n  .navbar-expand-sm[data-my-input]    > .container[data-my-input], .navbar-expand-sm[data-my-input]    > .container-fluid[data-my-input] {\n    padding-right: 0;\n    padding-left: 0;\n  }\n}\n\n\@media (min-width: 576px) {\n  .navbar-expand-sm[data-my-input] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -ms-flex-flow: row nowrap;\n    flex-flow: row nowrap;\n    -webkit-box-pack: start;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n  }\n  .navbar-expand-sm[data-my-input]   .navbar-nav[data-my-input] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -ms-flex-direction: row;\n    flex-direction: row;\n  }\n  .navbar-expand-sm[data-my-input]   .navbar-nav[data-my-input]   .dropdown-menu[data-my-input] {\n    position: absolute;\n  }\n  .navbar-expand-sm[data-my-input]   .navbar-nav[data-my-input]   .dropdown-menu-right[data-my-input] {\n    right: 0;\n    left: auto;\n  }\n  .navbar-expand-sm[data-my-input]   .navbar-nav[data-my-input]   .nav-link[data-my-input] {\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n  }\n  .navbar-expand-sm[data-my-input]    > .container[data-my-input], .navbar-expand-sm[data-my-input]    > .container-fluid[data-my-input] {\n    -ms-flex-wrap: nowrap;\n    flex-wrap: nowrap;\n  }\n  .navbar-expand-sm[data-my-input]   .navbar-collapse[data-my-input] {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n    -ms-flex-preferred-size: auto;\n    flex-basis: auto;\n  }\n  .navbar-expand-sm[data-my-input]   .navbar-toggler[data-my-input] {\n    display: none;\n  }\n  .navbar-expand-sm[data-my-input]   .dropup[data-my-input]   .dropdown-menu[data-my-input] {\n    top: auto;\n    bottom: 100%;\n  }\n}\n\n\@media (max-width: 767.98px) {\n  .navbar-expand-md[data-my-input]    > .container[data-my-input], .navbar-expand-md[data-my-input]    > .container-fluid[data-my-input] {\n    padding-right: 0;\n    padding-left: 0;\n  }\n}\n\n\@media (min-width: 768px) {\n  .navbar-expand-md[data-my-input] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -ms-flex-flow: row nowrap;\n    flex-flow: row nowrap;\n    -webkit-box-pack: start;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n  }\n  .navbar-expand-md[data-my-input]   .navbar-nav[data-my-input] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -ms-flex-direction: row;\n    flex-direction: row;\n  }\n  .navbar-expand-md[data-my-input]   .navbar-nav[data-my-input]   .dropdown-menu[data-my-input] {\n    position: absolute;\n  }\n  .navbar-expand-md[data-my-input]   .navbar-nav[data-my-input]   .dropdown-menu-right[data-my-input] {\n    right: 0;\n    left: auto;\n  }\n  .navbar-expand-md[data-my-input]   .navbar-nav[data-my-input]   .nav-link[data-my-input] {\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n  }\n  .navbar-expand-md[data-my-input]    > .container[data-my-input], .navbar-expand-md[data-my-input]    > .container-fluid[data-my-input] {\n    -ms-flex-wrap: nowrap;\n    flex-wrap: nowrap;\n  }\n  .navbar-expand-md[data-my-input]   .navbar-collapse[data-my-input] {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n    -ms-flex-preferred-size: auto;\n    flex-basis: auto;\n  }\n  .navbar-expand-md[data-my-input]   .navbar-toggler[data-my-input] {\n    display: none;\n  }\n  .navbar-expand-md[data-my-input]   .dropup[data-my-input]   .dropdown-menu[data-my-input] {\n    top: auto;\n    bottom: 100%;\n  }\n}\n\n\@media (max-width: 991.98px) {\n  .navbar-expand-lg[data-my-input]    > .container[data-my-input], .navbar-expand-lg[data-my-input]    > .container-fluid[data-my-input] {\n    padding-right: 0;\n    padding-left: 0;\n  }\n}\n\n\@media (min-width: 992px) {\n  .navbar-expand-lg[data-my-input] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -ms-flex-flow: row nowrap;\n    flex-flow: row nowrap;\n    -webkit-box-pack: start;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n  }\n  .navbar-expand-lg[data-my-input]   .navbar-nav[data-my-input] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -ms-flex-direction: row;\n    flex-direction: row;\n  }\n  .navbar-expand-lg[data-my-input]   .navbar-nav[data-my-input]   .dropdown-menu[data-my-input] {\n    position: absolute;\n  }\n  .navbar-expand-lg[data-my-input]   .navbar-nav[data-my-input]   .dropdown-menu-right[data-my-input] {\n    right: 0;\n    left: auto;\n  }\n  .navbar-expand-lg[data-my-input]   .navbar-nav[data-my-input]   .nav-link[data-my-input] {\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n  }\n  .navbar-expand-lg[data-my-input]    > .container[data-my-input], .navbar-expand-lg[data-my-input]    > .container-fluid[data-my-input] {\n    -ms-flex-wrap: nowrap;\n    flex-wrap: nowrap;\n  }\n  .navbar-expand-lg[data-my-input]   .navbar-collapse[data-my-input] {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n    -ms-flex-preferred-size: auto;\n    flex-basis: auto;\n  }\n  .navbar-expand-lg[data-my-input]   .navbar-toggler[data-my-input] {\n    display: none;\n  }\n  .navbar-expand-lg[data-my-input]   .dropup[data-my-input]   .dropdown-menu[data-my-input] {\n    top: auto;\n    bottom: 100%;\n  }\n}\n\n\@media (max-width: 1199.98px) {\n  .navbar-expand-xl[data-my-input]    > .container[data-my-input], .navbar-expand-xl[data-my-input]    > .container-fluid[data-my-input] {\n    padding-right: 0;\n    padding-left: 0;\n  }\n}\n\n\@media (min-width: 1200px) {\n  .navbar-expand-xl[data-my-input] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -ms-flex-flow: row nowrap;\n    flex-flow: row nowrap;\n    -webkit-box-pack: start;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n  }\n  .navbar-expand-xl[data-my-input]   .navbar-nav[data-my-input] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -ms-flex-direction: row;\n    flex-direction: row;\n  }\n  .navbar-expand-xl[data-my-input]   .navbar-nav[data-my-input]   .dropdown-menu[data-my-input] {\n    position: absolute;\n  }\n  .navbar-expand-xl[data-my-input]   .navbar-nav[data-my-input]   .dropdown-menu-right[data-my-input] {\n    right: 0;\n    left: auto;\n  }\n  .navbar-expand-xl[data-my-input]   .navbar-nav[data-my-input]   .nav-link[data-my-input] {\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n  }\n  .navbar-expand-xl[data-my-input]    > .container[data-my-input], .navbar-expand-xl[data-my-input]    > .container-fluid[data-my-input] {\n    -ms-flex-wrap: nowrap;\n    flex-wrap: nowrap;\n  }\n  .navbar-expand-xl[data-my-input]   .navbar-collapse[data-my-input] {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n    -ms-flex-preferred-size: auto;\n    flex-basis: auto;\n  }\n  .navbar-expand-xl[data-my-input]   .navbar-toggler[data-my-input] {\n    display: none;\n  }\n  .navbar-expand-xl[data-my-input]   .dropup[data-my-input]   .dropdown-menu[data-my-input] {\n    top: auto;\n    bottom: 100%;\n  }\n}\n\n.navbar-expand[data-my-input] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -ms-flex-flow: row nowrap;\n  flex-flow: row nowrap;\n  -webkit-box-pack: start;\n  -ms-flex-pack: start;\n  justify-content: flex-start;\n}\n\n.navbar-expand[data-my-input]    > .container[data-my-input], .navbar-expand[data-my-input]    > .container-fluid[data-my-input] {\n  padding-right: 0;\n  padding-left: 0;\n}\n\n.navbar-expand[data-my-input]   .navbar-nav[data-my-input] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: row;\n  flex-direction: row;\n}\n\n.navbar-expand[data-my-input]   .navbar-nav[data-my-input]   .dropdown-menu[data-my-input] {\n  position: absolute;\n}\n\n.navbar-expand[data-my-input]   .navbar-nav[data-my-input]   .dropdown-menu-right[data-my-input] {\n  right: 0;\n  left: auto;\n}\n\n.navbar-expand[data-my-input]   .navbar-nav[data-my-input]   .nav-link[data-my-input] {\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n}\n\n.navbar-expand[data-my-input]    > .container[data-my-input], .navbar-expand[data-my-input]    > .container-fluid[data-my-input] {\n  -ms-flex-wrap: nowrap;\n  flex-wrap: nowrap;\n}\n\n.navbar-expand[data-my-input]   .navbar-collapse[data-my-input] {\n  display: -webkit-box !important;\n  display: -ms-flexbox !important;\n  display: flex !important;\n  -ms-flex-preferred-size: auto;\n  flex-basis: auto;\n}\n\n.navbar-expand[data-my-input]   .navbar-toggler[data-my-input] {\n  display: none;\n}\n\n.navbar-expand[data-my-input]   .dropup[data-my-input]   .dropdown-menu[data-my-input] {\n  top: auto;\n  bottom: 100%;\n}\n\n.navbar-light[data-my-input]   .navbar-brand[data-my-input] {\n  color: rgba(0, 0, 0, 0.9);\n}\n\n.navbar-light[data-my-input]   .navbar-brand[data-my-input]:hover, .navbar-light[data-my-input]   .navbar-brand[data-my-input]:focus {\n  color: rgba(0, 0, 0, 0.9);\n}\n\n.navbar-light[data-my-input]   .navbar-nav[data-my-input]   .nav-link[data-my-input] {\n  color: rgba(0, 0, 0, 0.5);\n}\n\n.navbar-light[data-my-input]   .navbar-nav[data-my-input]   .nav-link[data-my-input]:hover, .navbar-light[data-my-input]   .navbar-nav[data-my-input]   .nav-link[data-my-input]:focus {\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.navbar-light[data-my-input]   .navbar-nav[data-my-input]   .nav-link.disabled[data-my-input] {\n  color: rgba(0, 0, 0, 0.3);\n}\n\n.navbar-light[data-my-input]   .navbar-nav[data-my-input]   .show[data-my-input]    > .nav-link[data-my-input], .navbar-light[data-my-input]   .navbar-nav[data-my-input]   .active[data-my-input]    > .nav-link[data-my-input], .navbar-light[data-my-input]   .navbar-nav[data-my-input]   .nav-link.show[data-my-input], .navbar-light[data-my-input]   .navbar-nav[data-my-input]   .nav-link.active[data-my-input] {\n  color: rgba(0, 0, 0, 0.9);\n}\n\n.navbar-light[data-my-input]   .navbar-toggler[data-my-input] {\n  color: rgba(0, 0, 0, 0.5);\n  border-color: rgba(0, 0, 0, 0.1);\n}\n\n.navbar-light[data-my-input]   .navbar-toggler-icon[data-my-input] {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0, 0, 0, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E\");\n}\n\n.navbar-light[data-my-input]   .navbar-text[data-my-input] {\n  color: rgba(0, 0, 0, 0.5);\n}\n\n.navbar-light[data-my-input]   .navbar-text[data-my-input]   a[data-my-input] {\n  color: rgba(0, 0, 0, 0.9);\n}\n\n.navbar-light[data-my-input]   .navbar-text[data-my-input]   a[data-my-input]:hover, .navbar-light[data-my-input]   .navbar-text[data-my-input]   a[data-my-input]:focus {\n  color: rgba(0, 0, 0, 0.9);\n}\n\n.navbar-dark[data-my-input]   .navbar-brand[data-my-input] {\n  color: #fff;\n}\n\n.navbar-dark[data-my-input]   .navbar-brand[data-my-input]:hover, .navbar-dark[data-my-input]   .navbar-brand[data-my-input]:focus {\n  color: #fff;\n}\n\n.navbar-dark[data-my-input]   .navbar-nav[data-my-input]   .nav-link[data-my-input] {\n  color: rgba(255, 255, 255, 0.5);\n}\n\n.navbar-dark[data-my-input]   .navbar-nav[data-my-input]   .nav-link[data-my-input]:hover, .navbar-dark[data-my-input]   .navbar-nav[data-my-input]   .nav-link[data-my-input]:focus {\n  color: rgba(255, 255, 255, 0.75);\n}\n\n.navbar-dark[data-my-input]   .navbar-nav[data-my-input]   .nav-link.disabled[data-my-input] {\n  color: rgba(255, 255, 255, 0.25);\n}\n\n.navbar-dark[data-my-input]   .navbar-nav[data-my-input]   .show[data-my-input]    > .nav-link[data-my-input], .navbar-dark[data-my-input]   .navbar-nav[data-my-input]   .active[data-my-input]    > .nav-link[data-my-input], .navbar-dark[data-my-input]   .navbar-nav[data-my-input]   .nav-link.show[data-my-input], .navbar-dark[data-my-input]   .navbar-nav[data-my-input]   .nav-link.active[data-my-input] {\n  color: #fff;\n}\n\n.navbar-dark[data-my-input]   .navbar-toggler[data-my-input] {\n  color: rgba(255, 255, 255, 0.5);\n  border-color: rgba(255, 255, 255, 0.1);\n}\n\n.navbar-dark[data-my-input]   .navbar-toggler-icon[data-my-input] {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E\");\n}\n\n.navbar-dark[data-my-input]   .navbar-text[data-my-input] {\n  color: rgba(255, 255, 255, 0.5);\n}\n\n.navbar-dark[data-my-input]   .navbar-text[data-my-input]   a[data-my-input] {\n  color: #fff;\n}\n\n.navbar-dark[data-my-input]   .navbar-text[data-my-input]   a[data-my-input]:hover, .navbar-dark[data-my-input]   .navbar-text[data-my-input]   a[data-my-input]:focus {\n  color: #fff;\n}\n\n.card[data-my-input] {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  min-width: 0;\n  word-wrap: break-word;\n  background-color: #fff;\n  background-clip: border-box;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  border-radius: 0.25rem;\n}\n\n.card[data-my-input]    > hr[data-my-input] {\n  margin-right: 0;\n  margin-left: 0;\n}\n\n.card[data-my-input]    > .list-group[data-my-input]:first-child   .list-group-item[data-my-input]:first-child {\n  border-top-left-radius: 0.25rem;\n  border-top-right-radius: 0.25rem;\n}\n\n.card[data-my-input]    > .list-group[data-my-input]:last-child   .list-group-item[data-my-input]:last-child {\n  border-bottom-right-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem;\n}\n\n.card-body[data-my-input] {\n  -webkit-box-flex: 1;\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n  padding: 1.25rem;\n}\n\n.card-title[data-my-input] {\n  margin-bottom: 0.75rem;\n}\n\n.card-subtitle[data-my-input] {\n  margin-top: -0.375rem;\n  margin-bottom: 0;\n}\n\n.card-text[data-my-input]:last-child {\n  margin-bottom: 0;\n}\n\n.card-link[data-my-input]:hover {\n  text-decoration: none;\n}\n\n.card-link[data-my-input]    + .card-link[data-my-input] {\n  margin-left: 1.25rem;\n}\n\n.card-header[data-my-input] {\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 0;\n  background-color: rgba(0, 0, 0, 0.03);\n  border-bottom: 1px solid rgba(0, 0, 0, 0.125);\n}\n\n.card-header[data-my-input]:first-child {\n  border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;\n}\n\n.card-header[data-my-input]    + .list-group[data-my-input]   .list-group-item[data-my-input]:first-child {\n  border-top: 0;\n}\n\n.card-footer[data-my-input] {\n  padding: 0.75rem 1.25rem;\n  background-color: rgba(0, 0, 0, 0.03);\n  border-top: 1px solid rgba(0, 0, 0, 0.125);\n}\n\n.card-footer[data-my-input]:last-child {\n  border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px);\n}\n\n.card-header-tabs[data-my-input] {\n  margin-right: -0.625rem;\n  margin-bottom: -0.75rem;\n  margin-left: -0.625rem;\n  border-bottom: 0;\n}\n\n.card-header-pills[data-my-input] {\n  margin-right: -0.625rem;\n  margin-left: -0.625rem;\n}\n\n.card-img-overlay[data-my-input] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  padding: 1.25rem;\n}\n\n.card-img[data-my-input] {\n  width: 100%;\n  border-radius: calc(0.25rem - 1px);\n}\n\n.card-img-top[data-my-input] {\n  width: 100%;\n  border-top-left-radius: calc(0.25rem - 1px);\n  border-top-right-radius: calc(0.25rem - 1px);\n}\n\n.card-img-bottom[data-my-input] {\n  width: 100%;\n  border-bottom-right-radius: calc(0.25rem - 1px);\n  border-bottom-left-radius: calc(0.25rem - 1px);\n}\n\n.card-deck[data-my-input] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n}\n\n.card-deck[data-my-input]   .card[data-my-input] {\n  margin-bottom: 15px;\n}\n\n\@media (min-width: 576px) {\n  .card-deck[data-my-input] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -ms-flex-flow: row wrap;\n    flex-flow: row wrap;\n    margin-right: -15px;\n    margin-left: -15px;\n  }\n  .card-deck[data-my-input]   .card[data-my-input] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-flex: 1;\n    -ms-flex: 1 0 0%;\n    flex: 1 0 0%;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    margin-right: 15px;\n    margin-bottom: 0;\n    margin-left: 15px;\n  }\n}\n\n.card-group[data-my-input] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n}\n\n.card-group[data-my-input]    > .card[data-my-input] {\n  margin-bottom: 15px;\n}\n\n\@media (min-width: 576px) {\n  .card-group[data-my-input] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -ms-flex-flow: row wrap;\n    flex-flow: row wrap;\n  }\n  .card-group[data-my-input]    > .card[data-my-input] {\n    -webkit-box-flex: 1;\n    -ms-flex: 1 0 0%;\n    flex: 1 0 0%;\n    margin-bottom: 0;\n  }\n  .card-group[data-my-input]    > .card[data-my-input]    + .card[data-my-input] {\n    margin-left: 0;\n    border-left: 0;\n  }\n  .card-group[data-my-input]    > .card[data-my-input]:first-child {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n  }\n  .card-group[data-my-input]    > .card[data-my-input]:first-child   .card-img-top[data-my-input], .card-group[data-my-input]    > .card[data-my-input]:first-child   .card-header[data-my-input] {\n    border-top-right-radius: 0;\n  }\n  .card-group[data-my-input]    > .card[data-my-input]:first-child   .card-img-bottom[data-my-input], .card-group[data-my-input]    > .card[data-my-input]:first-child   .card-footer[data-my-input] {\n    border-bottom-right-radius: 0;\n  }\n  .card-group[data-my-input]    > .card[data-my-input]:last-child {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n  }\n  .card-group[data-my-input]    > .card[data-my-input]:last-child   .card-img-top[data-my-input], .card-group[data-my-input]    > .card[data-my-input]:last-child   .card-header[data-my-input] {\n    border-top-left-radius: 0;\n  }\n  .card-group[data-my-input]    > .card[data-my-input]:last-child   .card-img-bottom[data-my-input], .card-group[data-my-input]    > .card[data-my-input]:last-child   .card-footer[data-my-input] {\n    border-bottom-left-radius: 0;\n  }\n  .card-group[data-my-input]    > .card[data-my-input]:only-child {\n    border-radius: 0.25rem;\n  }\n  .card-group[data-my-input]    > .card[data-my-input]:only-child   .card-img-top[data-my-input], .card-group[data-my-input]    > .card[data-my-input]:only-child   .card-header[data-my-input] {\n    border-top-left-radius: 0.25rem;\n    border-top-right-radius: 0.25rem;\n  }\n  .card-group[data-my-input]    > .card[data-my-input]:only-child   .card-img-bottom[data-my-input], .card-group[data-my-input]    > .card[data-my-input]:only-child   .card-footer[data-my-input] {\n    border-bottom-right-radius: 0.25rem;\n    border-bottom-left-radius: 0.25rem;\n  }\n  .card-group[data-my-input]    > .card[data-my-input]:not(:first-child):not(:last-child):not(:only-child) {\n    border-radius: 0;\n  }\n  .card-group[data-my-input]    > .card[data-my-input]:not(:first-child):not(:last-child):not(:only-child)   .card-img-top[data-my-input], .card-group[data-my-input]    > .card[data-my-input]:not(:first-child):not(:last-child):not(:only-child)   .card-img-bottom[data-my-input], .card-group[data-my-input]    > .card[data-my-input]:not(:first-child):not(:last-child):not(:only-child)   .card-header[data-my-input], .card-group[data-my-input]    > .card[data-my-input]:not(:first-child):not(:last-child):not(:only-child)   .card-footer[data-my-input] {\n    border-radius: 0;\n  }\n}\n\n.card-columns[data-my-input]   .card[data-my-input] {\n  margin-bottom: 0.75rem;\n}\n\n\@media (min-width: 576px) {\n  .card-columns[data-my-input] {\n    -webkit-column-count: 3;\n    -moz-column-count: 3;\n    column-count: 3;\n    -webkit-column-gap: 1.25rem;\n    -moz-column-gap: 1.25rem;\n    column-gap: 1.25rem;\n  }\n  .card-columns[data-my-input]   .card[data-my-input] {\n    display: inline-block;\n    width: 100%;\n  }\n}\n\n.breadcrumb[data-my-input] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  padding: 0.75rem 1rem;\n  margin-bottom: 1rem;\n  list-style: none;\n  background-color: #e9ecef;\n  border-radius: 0.25rem;\n}\n\n.breadcrumb-item[data-my-input]    + .breadcrumb-item[data-my-input]::before {\n  display: inline-block;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  color: #6c757d;\n  content: \"/\";\n}\n\n.breadcrumb-item[data-my-input]    + .breadcrumb-item[data-my-input]:hover::before {\n  text-decoration: underline;\n}\n\n.breadcrumb-item[data-my-input]    + .breadcrumb-item[data-my-input]:hover::before {\n  text-decoration: none;\n}\n\n.breadcrumb-item.active[data-my-input] {\n  color: #6c757d;\n}\n\n.pagination[data-my-input] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  padding-left: 0;\n  list-style: none;\n  border-radius: 0.25rem;\n}\n\n.page-link[data-my-input] {\n  position: relative;\n  display: block;\n  padding: 0.5rem 0.75rem;\n  margin-left: -1px;\n  line-height: 1.25;\n  color: #007bff;\n  background-color: #fff;\n  border: 1px solid #dee2e6;\n}\n\n.page-link[data-my-input]:hover {\n  color: #0056b3;\n  text-decoration: none;\n  background-color: #e9ecef;\n  border-color: #dee2e6;\n}\n\n.page-link[data-my-input]:focus {\n  z-index: 2;\n  outline: 0;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n\n.page-link[data-my-input]:not(:disabled):not(.disabled) {\n  cursor: pointer;\n}\n\n.page-item[data-my-input]:first-child   .page-link[data-my-input] {\n  margin-left: 0;\n  border-top-left-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem;\n}\n\n.page-item[data-my-input]:last-child   .page-link[data-my-input] {\n  border-top-right-radius: 0.25rem;\n  border-bottom-right-radius: 0.25rem;\n}\n\n.page-item.active[data-my-input]   .page-link[data-my-input] {\n  z-index: 1;\n  color: #fff;\n  background-color: #007bff;\n  border-color: #007bff;\n}\n\n.page-item.disabled[data-my-input]   .page-link[data-my-input] {\n  color: #6c757d;\n  pointer-events: none;\n  cursor: auto;\n  background-color: #fff;\n  border-color: #dee2e6;\n}\n\n.pagination-lg[data-my-input]   .page-link[data-my-input] {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem;\n  line-height: 1.5;\n}\n\n.pagination-lg[data-my-input]   .page-item[data-my-input]:first-child   .page-link[data-my-input] {\n  border-top-left-radius: 0.3rem;\n  border-bottom-left-radius: 0.3rem;\n}\n\n.pagination-lg[data-my-input]   .page-item[data-my-input]:last-child   .page-link[data-my-input] {\n  border-top-right-radius: 0.3rem;\n  border-bottom-right-radius: 0.3rem;\n}\n\n.pagination-sm[data-my-input]   .page-link[data-my-input] {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n}\n\n.pagination-sm[data-my-input]   .page-item[data-my-input]:first-child   .page-link[data-my-input] {\n  border-top-left-radius: 0.2rem;\n  border-bottom-left-radius: 0.2rem;\n}\n\n.pagination-sm[data-my-input]   .page-item[data-my-input]:last-child   .page-link[data-my-input] {\n  border-top-right-radius: 0.2rem;\n  border-bottom-right-radius: 0.2rem;\n}\n\n.badge[data-my-input] {\n  display: inline-block;\n  padding: 0.25em 0.4em;\n  font-size: 75%;\n  font-weight: 700;\n  line-height: 1;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: 0.25rem;\n}\n\n.badge[data-my-input]:empty {\n  display: none;\n}\n\n.btn[data-my-input]   .badge[data-my-input] {\n  position: relative;\n  top: -1px;\n}\n\n.badge-pill[data-my-input] {\n  padding-right: 0.6em;\n  padding-left: 0.6em;\n  border-radius: 10rem;\n}\n\n.badge-primary[data-my-input] {\n  color: #fff;\n  background-color: #007bff;\n}\n\n.badge-primary[href][data-my-input]:hover, .badge-primary[href][data-my-input]:focus {\n  color: #fff;\n  text-decoration: none;\n  background-color: #0062cc;\n}\n\n.badge-secondary[data-my-input] {\n  color: #fff;\n  background-color: #6c757d;\n}\n\n.badge-secondary[href][data-my-input]:hover, .badge-secondary[href][data-my-input]:focus {\n  color: #fff;\n  text-decoration: none;\n  background-color: #545b62;\n}\n\n.badge-success[data-my-input] {\n  color: #fff;\n  background-color: #28a745;\n}\n\n.badge-success[href][data-my-input]:hover, .badge-success[href][data-my-input]:focus {\n  color: #fff;\n  text-decoration: none;\n  background-color: #1e7e34;\n}\n\n.badge-info[data-my-input] {\n  color: #fff;\n  background-color: #17a2b8;\n}\n\n.badge-info[href][data-my-input]:hover, .badge-info[href][data-my-input]:focus {\n  color: #fff;\n  text-decoration: none;\n  background-color: #117a8b;\n}\n\n.badge-warning[data-my-input] {\n  color: #212529;\n  background-color: #ffc107;\n}\n\n.badge-warning[href][data-my-input]:hover, .badge-warning[href][data-my-input]:focus {\n  color: #212529;\n  text-decoration: none;\n  background-color: #d39e00;\n}\n\n.badge-danger[data-my-input] {\n  color: #fff;\n  background-color: #dc3545;\n}\n\n.badge-danger[href][data-my-input]:hover, .badge-danger[href][data-my-input]:focus {\n  color: #fff;\n  text-decoration: none;\n  background-color: #bd2130;\n}\n\n.badge-light[data-my-input] {\n  color: #212529;\n  background-color: #f8f9fa;\n}\n\n.badge-light[href][data-my-input]:hover, .badge-light[href][data-my-input]:focus {\n  color: #212529;\n  text-decoration: none;\n  background-color: #dae0e5;\n}\n\n.badge-dark[data-my-input] {\n  color: #fff;\n  background-color: #343a40;\n}\n\n.badge-dark[href][data-my-input]:hover, .badge-dark[href][data-my-input]:focus {\n  color: #fff;\n  text-decoration: none;\n  background-color: #1d2124;\n}\n\n.jumbotron[data-my-input] {\n  padding: 2rem 1rem;\n  margin-bottom: 2rem;\n  background-color: #e9ecef;\n  border-radius: 0.3rem;\n}\n\n\@media (min-width: 576px) {\n  .jumbotron[data-my-input] {\n    padding: 4rem 2rem;\n  }\n}\n\n.jumbotron-fluid[data-my-input] {\n  padding-right: 0;\n  padding-left: 0;\n  border-radius: 0;\n}\n\n.alert[data-my-input] {\n  position: relative;\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 1rem;\n  border: 1px solid transparent;\n  border-radius: 0.25rem;\n}\n\n.alert-heading[data-my-input] {\n  color: inherit;\n}\n\n.alert-link[data-my-input] {\n  font-weight: 700;\n}\n\n.alert-dismissible[data-my-input] {\n  padding-right: 4rem;\n}\n\n.alert-dismissible[data-my-input]   .close[data-my-input] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  padding: 0.75rem 1.25rem;\n  color: inherit;\n}\n\n.alert-primary[data-my-input] {\n  color: #004085;\n  background-color: #cce5ff;\n  border-color: #b8daff;\n}\n\n.alert-primary[data-my-input]   hr[data-my-input] {\n  border-top-color: #9fcdff;\n}\n\n.alert-primary[data-my-input]   .alert-link[data-my-input] {\n  color: #002752;\n}\n\n.alert-secondary[data-my-input] {\n  color: #383d41;\n  background-color: #e2e3e5;\n  border-color: #d6d8db;\n}\n\n.alert-secondary[data-my-input]   hr[data-my-input] {\n  border-top-color: #c8cbcf;\n}\n\n.alert-secondary[data-my-input]   .alert-link[data-my-input] {\n  color: #202326;\n}\n\n.alert-success[data-my-input] {\n  color: #155724;\n  background-color: #d4edda;\n  border-color: #c3e6cb;\n}\n\n.alert-success[data-my-input]   hr[data-my-input] {\n  border-top-color: #b1dfbb;\n}\n\n.alert-success[data-my-input]   .alert-link[data-my-input] {\n  color: #0b2e13;\n}\n\n.alert-info[data-my-input] {\n  color: #0c5460;\n  background-color: #d1ecf1;\n  border-color: #bee5eb;\n}\n\n.alert-info[data-my-input]   hr[data-my-input] {\n  border-top-color: #abdde5;\n}\n\n.alert-info[data-my-input]   .alert-link[data-my-input] {\n  color: #062c33;\n}\n\n.alert-warning[data-my-input] {\n  color: #856404;\n  background-color: #fff3cd;\n  border-color: #ffeeba;\n}\n\n.alert-warning[data-my-input]   hr[data-my-input] {\n  border-top-color: #ffe8a1;\n}\n\n.alert-warning[data-my-input]   .alert-link[data-my-input] {\n  color: #533f03;\n}\n\n.alert-danger[data-my-input] {\n  color: #721c24;\n  background-color: #f8d7da;\n  border-color: #f5c6cb;\n}\n\n.alert-danger[data-my-input]   hr[data-my-input] {\n  border-top-color: #f1b0b7;\n}\n\n.alert-danger[data-my-input]   .alert-link[data-my-input] {\n  color: #491217;\n}\n\n.alert-light[data-my-input] {\n  color: #818182;\n  background-color: #fefefe;\n  border-color: #fdfdfe;\n}\n\n.alert-light[data-my-input]   hr[data-my-input] {\n  border-top-color: #ececf6;\n}\n\n.alert-light[data-my-input]   .alert-link[data-my-input] {\n  color: #686868;\n}\n\n.alert-dark[data-my-input] {\n  color: #1b1e21;\n  background-color: #d6d8d9;\n  border-color: #c6c8ca;\n}\n\n.alert-dark[data-my-input]   hr[data-my-input] {\n  border-top-color: #b9bbbe;\n}\n\n.alert-dark[data-my-input]   .alert-link[data-my-input] {\n  color: #040505;\n}\n\n\@-webkit-keyframes progress-bar-stripes {\n  from {\n    background-position: 1rem 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n\n\@keyframes progress-bar-stripes {\n  from {\n    background-position: 1rem 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n\n.progress[data-my-input] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 1rem;\n  overflow: hidden;\n  font-size: 0.75rem;\n  background-color: #e9ecef;\n  border-radius: 0.25rem;\n}\n\n.progress-bar[data-my-input] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  color: #fff;\n  text-align: center;\n  background-color: #007bff;\n  transition: width 0.6s ease;\n}\n\n.progress-bar-striped[data-my-input] {\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 1rem 1rem;\n}\n\n.progress-bar-animated[data-my-input] {\n  -webkit-animation: progress-bar-stripes 1s linear infinite;\n  animation: progress-bar-stripes 1s linear infinite;\n}\n\n.media[data-my-input] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n  -ms-flex-align: start;\n  align-items: flex-start;\n}\n\n.media-body[data-my-input] {\n  -webkit-box-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n}\n\n.list-group[data-my-input] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0;\n}\n\n.list-group-item-action[data-my-input] {\n  width: 100%;\n  color: #495057;\n  text-align: inherit;\n}\n\n.list-group-item-action[data-my-input]:hover, .list-group-item-action[data-my-input]:focus {\n  color: #495057;\n  text-decoration: none;\n  background-color: #f8f9fa;\n}\n\n.list-group-item-action[data-my-input]:active {\n  color: #212529;\n  background-color: #e9ecef;\n}\n\n.list-group-item[data-my-input] {\n  position: relative;\n  display: block;\n  padding: 0.75rem 1.25rem;\n  margin-bottom: -1px;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n}\n\n.list-group-item[data-my-input]:first-child {\n  border-top-left-radius: 0.25rem;\n  border-top-right-radius: 0.25rem;\n}\n\n.list-group-item[data-my-input]:last-child {\n  margin-bottom: 0;\n  border-bottom-right-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem;\n}\n\n.list-group-item[data-my-input]:hover, .list-group-item[data-my-input]:focus {\n  z-index: 1;\n  text-decoration: none;\n}\n\n.list-group-item.disabled[data-my-input], .list-group-item[data-my-input]:disabled {\n  color: #6c757d;\n  background-color: #fff;\n}\n\n.list-group-item.active[data-my-input] {\n  z-index: 2;\n  color: #fff;\n  background-color: #007bff;\n  border-color: #007bff;\n}\n\n.list-group-flush[data-my-input]   .list-group-item[data-my-input] {\n  border-right: 0;\n  border-left: 0;\n  border-radius: 0;\n}\n\n.list-group-flush[data-my-input]:first-child   .list-group-item[data-my-input]:first-child {\n  border-top: 0;\n}\n\n.list-group-flush[data-my-input]:last-child   .list-group-item[data-my-input]:last-child {\n  border-bottom: 0;\n}\n\n.list-group-item-primary[data-my-input] {\n  color: #004085;\n  background-color: #b8daff;\n}\n\n.list-group-item-primary.list-group-item-action[data-my-input]:hover, .list-group-item-primary.list-group-item-action[data-my-input]:focus {\n  color: #004085;\n  background-color: #9fcdff;\n}\n\n.list-group-item-primary.list-group-item-action.active[data-my-input] {\n  color: #fff;\n  background-color: #004085;\n  border-color: #004085;\n}\n\n.list-group-item-secondary[data-my-input] {\n  color: #383d41;\n  background-color: #d6d8db;\n}\n\n.list-group-item-secondary.list-group-item-action[data-my-input]:hover, .list-group-item-secondary.list-group-item-action[data-my-input]:focus {\n  color: #383d41;\n  background-color: #c8cbcf;\n}\n\n.list-group-item-secondary.list-group-item-action.active[data-my-input] {\n  color: #fff;\n  background-color: #383d41;\n  border-color: #383d41;\n}\n\n.list-group-item-success[data-my-input] {\n  color: #155724;\n  background-color: #c3e6cb;\n}\n\n.list-group-item-success.list-group-item-action[data-my-input]:hover, .list-group-item-success.list-group-item-action[data-my-input]:focus {\n  color: #155724;\n  background-color: #b1dfbb;\n}\n\n.list-group-item-success.list-group-item-action.active[data-my-input] {\n  color: #fff;\n  background-color: #155724;\n  border-color: #155724;\n}\n\n.list-group-item-info[data-my-input] {\n  color: #0c5460;\n  background-color: #bee5eb;\n}\n\n.list-group-item-info.list-group-item-action[data-my-input]:hover, .list-group-item-info.list-group-item-action[data-my-input]:focus {\n  color: #0c5460;\n  background-color: #abdde5;\n}\n\n.list-group-item-info.list-group-item-action.active[data-my-input] {\n  color: #fff;\n  background-color: #0c5460;\n  border-color: #0c5460;\n}\n\n.list-group-item-warning[data-my-input] {\n  color: #856404;\n  background-color: #ffeeba;\n}\n\n.list-group-item-warning.list-group-item-action[data-my-input]:hover, .list-group-item-warning.list-group-item-action[data-my-input]:focus {\n  color: #856404;\n  background-color: #ffe8a1;\n}\n\n.list-group-item-warning.list-group-item-action.active[data-my-input] {\n  color: #fff;\n  background-color: #856404;\n  border-color: #856404;\n}\n\n.list-group-item-danger[data-my-input] {\n  color: #721c24;\n  background-color: #f5c6cb;\n}\n\n.list-group-item-danger.list-group-item-action[data-my-input]:hover, .list-group-item-danger.list-group-item-action[data-my-input]:focus {\n  color: #721c24;\n  background-color: #f1b0b7;\n}\n\n.list-group-item-danger.list-group-item-action.active[data-my-input] {\n  color: #fff;\n  background-color: #721c24;\n  border-color: #721c24;\n}\n\n.list-group-item-light[data-my-input] {\n  color: #818182;\n  background-color: #fdfdfe;\n}\n\n.list-group-item-light.list-group-item-action[data-my-input]:hover, .list-group-item-light.list-group-item-action[data-my-input]:focus {\n  color: #818182;\n  background-color: #ececf6;\n}\n\n.list-group-item-light.list-group-item-action.active[data-my-input] {\n  color: #fff;\n  background-color: #818182;\n  border-color: #818182;\n}\n\n.list-group-item-dark[data-my-input] {\n  color: #1b1e21;\n  background-color: #c6c8ca;\n}\n\n.list-group-item-dark.list-group-item-action[data-my-input]:hover, .list-group-item-dark.list-group-item-action[data-my-input]:focus {\n  color: #1b1e21;\n  background-color: #b9bbbe;\n}\n\n.list-group-item-dark.list-group-item-action.active[data-my-input] {\n  color: #fff;\n  background-color: #1b1e21;\n  border-color: #1b1e21;\n}\n\n.close[data-my-input] {\n  float: right;\n  font-size: 1.5rem;\n  font-weight: 700;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  opacity: .5;\n}\n\n.close[data-my-input]:hover, .close[data-my-input]:focus {\n  color: #000;\n  text-decoration: none;\n  opacity: .75;\n}\n\n.close[data-my-input]:not(:disabled):not(.disabled) {\n  cursor: pointer;\n}\n\nbutton.close[data-my-input] {\n  padding: 0;\n  background-color: transparent;\n  border: 0;\n  -webkit-appearance: none;\n}\n\n.modal-open[data-my-input] {\n  overflow: hidden;\n}\n\n.modal[data-my-input] {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1050;\n  display: none;\n  overflow: hidden;\n  outline: 0;\n}\n\n.modal-open[data-my-input]   .modal[data-my-input] {\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n\n.modal-dialog[data-my-input] {\n  position: relative;\n  width: auto;\n  margin: 0.5rem;\n  pointer-events: none;\n}\n\n.modal.fade[data-my-input]   .modal-dialog[data-my-input] {\n  transition: -webkit-transform 0.3s ease-out;\n  transition: transform 0.3s ease-out;\n  transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;\n  -webkit-transform: translate(0, -25%);\n  transform: translate(0, -25%);\n}\n\n.modal.show[data-my-input]   .modal-dialog[data-my-input] {\n  -webkit-transform: translate(0, 0);\n  transform: translate(0, 0);\n}\n\n.modal-dialog-centered[data-my-input] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  min-height: calc(100% - (0.5rem * 2));\n}\n\n.modal-content[data-my-input] {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  width: 100%;\n  pointer-events: auto;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem;\n  outline: 0;\n}\n\n.modal-backdrop[data-my-input] {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n  background-color: #000;\n}\n\n.modal-backdrop.fade[data-my-input] {\n  opacity: 0;\n}\n\n.modal-backdrop.show[data-my-input] {\n  opacity: 0.5;\n}\n\n.modal-header[data-my-input] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n  -ms-flex-align: start;\n  align-items: flex-start;\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  padding: 1rem;\n  border-bottom: 1px solid #e9ecef;\n  border-top-left-radius: 0.3rem;\n  border-top-right-radius: 0.3rem;\n}\n\n.modal-header[data-my-input]   .close[data-my-input] {\n  padding: 1rem;\n  margin: -1rem -1rem -1rem auto;\n}\n\n.modal-title[data-my-input] {\n  margin-bottom: 0;\n  line-height: 1.5;\n}\n\n.modal-body[data-my-input] {\n  position: relative;\n  -webkit-box-flex: 1;\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n  padding: 1rem;\n}\n\n.modal-footer[data-my-input] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: end;\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n  padding: 1rem;\n  border-top: 1px solid #e9ecef;\n}\n\n.modal-footer[data-my-input]    > [data-my-input]:not(:first-child) {\n  margin-left: .25rem;\n}\n\n.modal-footer[data-my-input]    > [data-my-input]:not(:last-child) {\n  margin-right: .25rem;\n}\n\n.modal-scrollbar-measure[data-my-input] {\n  position: absolute;\n  top: -9999px;\n  width: 50px;\n  height: 50px;\n  overflow: scroll;\n}\n\n\@media (min-width: 576px) {\n  .modal-dialog[data-my-input] {\n    max-width: 500px;\n    margin: 1.75rem auto;\n  }\n  .modal-dialog-centered[data-my-input] {\n    min-height: calc(100% - (1.75rem * 2));\n  }\n  .modal-sm[data-my-input] {\n    max-width: 300px;\n  }\n}\n\n\@media (min-width: 992px) {\n  .modal-lg[data-my-input] {\n    max-width: 800px;\n  }\n}\n\n.tooltip[data-my-input] {\n  position: absolute;\n  z-index: 1070;\n  display: block;\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  font-style: normal;\n  font-weight: 400;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  letter-spacing: normal;\n  word-break: normal;\n  word-spacing: normal;\n  white-space: normal;\n  line-break: auto;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  opacity: 0;\n}\n\n.tooltip.show[data-my-input] {\n  opacity: 0.9;\n}\n\n.tooltip[data-my-input]   .arrow[data-my-input] {\n  position: absolute;\n  display: block;\n  width: 0.8rem;\n  height: 0.4rem;\n}\n\n.tooltip[data-my-input]   .arrow[data-my-input]::before {\n  position: absolute;\n  content: \"\";\n  border-color: transparent;\n  border-style: solid;\n}\n\n.bs-tooltip-top[data-my-input], .bs-tooltip-auto[x-placement^=\"top\"][data-my-input] {\n  padding: 0.4rem 0;\n}\n\n.bs-tooltip-top[data-my-input]   .arrow[data-my-input], .bs-tooltip-auto[x-placement^=\"top\"][data-my-input]   .arrow[data-my-input] {\n  bottom: 0;\n}\n\n.bs-tooltip-top[data-my-input]   .arrow[data-my-input]::before, .bs-tooltip-auto[x-placement^=\"top\"][data-my-input]   .arrow[data-my-input]::before {\n  top: 0;\n  border-width: 0.4rem 0.4rem 0;\n  border-top-color: #000;\n}\n\n.bs-tooltip-right[data-my-input], .bs-tooltip-auto[x-placement^=\"right\"][data-my-input] {\n  padding: 0 0.4rem;\n}\n\n.bs-tooltip-right[data-my-input]   .arrow[data-my-input], .bs-tooltip-auto[x-placement^=\"right\"][data-my-input]   .arrow[data-my-input] {\n  left: 0;\n  width: 0.4rem;\n  height: 0.8rem;\n}\n\n.bs-tooltip-right[data-my-input]   .arrow[data-my-input]::before, .bs-tooltip-auto[x-placement^=\"right\"][data-my-input]   .arrow[data-my-input]::before {\n  right: 0;\n  border-width: 0.4rem 0.4rem 0.4rem 0;\n  border-right-color: #000;\n}\n\n.bs-tooltip-bottom[data-my-input], .bs-tooltip-auto[x-placement^=\"bottom\"][data-my-input] {\n  padding: 0.4rem 0;\n}\n\n.bs-tooltip-bottom[data-my-input]   .arrow[data-my-input], .bs-tooltip-auto[x-placement^=\"bottom\"][data-my-input]   .arrow[data-my-input] {\n  top: 0;\n}\n\n.bs-tooltip-bottom[data-my-input]   .arrow[data-my-input]::before, .bs-tooltip-auto[x-placement^=\"bottom\"][data-my-input]   .arrow[data-my-input]::before {\n  bottom: 0;\n  border-width: 0 0.4rem 0.4rem;\n  border-bottom-color: #000;\n}\n\n.bs-tooltip-left[data-my-input], .bs-tooltip-auto[x-placement^=\"left\"][data-my-input] {\n  padding: 0 0.4rem;\n}\n\n.bs-tooltip-left[data-my-input]   .arrow[data-my-input], .bs-tooltip-auto[x-placement^=\"left\"][data-my-input]   .arrow[data-my-input] {\n  right: 0;\n  width: 0.4rem;\n  height: 0.8rem;\n}\n\n.bs-tooltip-left[data-my-input]   .arrow[data-my-input]::before, .bs-tooltip-auto[x-placement^=\"left\"][data-my-input]   .arrow[data-my-input]::before {\n  left: 0;\n  border-width: 0.4rem 0 0.4rem 0.4rem;\n  border-left-color: #000;\n}\n\n.tooltip-inner[data-my-input] {\n  max-width: 200px;\n  padding: 0.25rem 0.5rem;\n  color: #fff;\n  text-align: center;\n  background-color: #000;\n  border-radius: 0.25rem;\n}\n\n.popover[data-my-input] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1060;\n  display: block;\n  max-width: 276px;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  font-style: normal;\n  font-weight: 400;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  letter-spacing: normal;\n  word-break: normal;\n  word-spacing: normal;\n  white-space: normal;\n  line-break: auto;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem;\n}\n\n.popover[data-my-input]   .arrow[data-my-input] {\n  position: absolute;\n  display: block;\n  width: 1rem;\n  height: 0.5rem;\n  margin: 0 0.3rem;\n}\n\n.popover[data-my-input]   .arrow[data-my-input]::before, .popover[data-my-input]   .arrow[data-my-input]::after {\n  position: absolute;\n  display: block;\n  content: \"\";\n  border-color: transparent;\n  border-style: solid;\n}\n\n.bs-popover-top[data-my-input], .bs-popover-auto[x-placement^=\"top\"][data-my-input] {\n  margin-bottom: 0.5rem;\n}\n\n.bs-popover-top[data-my-input]   .arrow[data-my-input], .bs-popover-auto[x-placement^=\"top\"][data-my-input]   .arrow[data-my-input] {\n  bottom: calc((0.5rem + 1px) * -1);\n}\n\n.bs-popover-top[data-my-input]   .arrow[data-my-input]::before, .bs-popover-auto[x-placement^=\"top\"][data-my-input]   .arrow[data-my-input]::before, .bs-popover-top[data-my-input]   .arrow[data-my-input]::after, .bs-popover-auto[x-placement^=\"top\"][data-my-input]   .arrow[data-my-input]::after {\n  border-width: 0.5rem 0.5rem 0;\n}\n\n.bs-popover-top[data-my-input]   .arrow[data-my-input]::before, .bs-popover-auto[x-placement^=\"top\"][data-my-input]   .arrow[data-my-input]::before {\n  bottom: 0;\n  border-top-color: rgba(0, 0, 0, 0.25);\n}\n\n.bs-popover-top[data-my-input]   .arrow[data-my-input]::after, .bs-popover-auto[x-placement^=\"top\"][data-my-input]   .arrow[data-my-input]::after {\n  bottom: 1px;\n  border-top-color: #fff;\n}\n\n.bs-popover-right[data-my-input], .bs-popover-auto[x-placement^=\"right\"][data-my-input] {\n  margin-left: 0.5rem;\n}\n\n.bs-popover-right[data-my-input]   .arrow[data-my-input], .bs-popover-auto[x-placement^=\"right\"][data-my-input]   .arrow[data-my-input] {\n  left: calc((0.5rem + 1px) * -1);\n  width: 0.5rem;\n  height: 1rem;\n  margin: 0.3rem 0;\n}\n\n.bs-popover-right[data-my-input]   .arrow[data-my-input]::before, .bs-popover-auto[x-placement^=\"right\"][data-my-input]   .arrow[data-my-input]::before, .bs-popover-right[data-my-input]   .arrow[data-my-input]::after, .bs-popover-auto[x-placement^=\"right\"][data-my-input]   .arrow[data-my-input]::after {\n  border-width: 0.5rem 0.5rem 0.5rem 0;\n}\n\n.bs-popover-right[data-my-input]   .arrow[data-my-input]::before, .bs-popover-auto[x-placement^=\"right\"][data-my-input]   .arrow[data-my-input]::before {\n  left: 0;\n  border-right-color: rgba(0, 0, 0, 0.25);\n}\n\n.bs-popover-right[data-my-input]   .arrow[data-my-input]::after, .bs-popover-auto[x-placement^=\"right\"][data-my-input]   .arrow[data-my-input]::after {\n  left: 1px;\n  border-right-color: #fff;\n}\n\n.bs-popover-bottom[data-my-input], .bs-popover-auto[x-placement^=\"bottom\"][data-my-input] {\n  margin-top: 0.5rem;\n}\n\n.bs-popover-bottom[data-my-input]   .arrow[data-my-input], .bs-popover-auto[x-placement^=\"bottom\"][data-my-input]   .arrow[data-my-input] {\n  top: calc((0.5rem + 1px) * -1);\n}\n\n.bs-popover-bottom[data-my-input]   .arrow[data-my-input]::before, .bs-popover-auto[x-placement^=\"bottom\"][data-my-input]   .arrow[data-my-input]::before, .bs-popover-bottom[data-my-input]   .arrow[data-my-input]::after, .bs-popover-auto[x-placement^=\"bottom\"][data-my-input]   .arrow[data-my-input]::after {\n  border-width: 0 0.5rem 0.5rem 0.5rem;\n}\n\n.bs-popover-bottom[data-my-input]   .arrow[data-my-input]::before, .bs-popover-auto[x-placement^=\"bottom\"][data-my-input]   .arrow[data-my-input]::before {\n  top: 0;\n  border-bottom-color: rgba(0, 0, 0, 0.25);\n}\n\n.bs-popover-bottom[data-my-input]   .arrow[data-my-input]::after, .bs-popover-auto[x-placement^=\"bottom\"][data-my-input]   .arrow[data-my-input]::after {\n  top: 1px;\n  border-bottom-color: #fff;\n}\n\n.bs-popover-bottom[data-my-input]   .popover-header[data-my-input]::before, .bs-popover-auto[x-placement^=\"bottom\"][data-my-input]   .popover-header[data-my-input]::before {\n  position: absolute;\n  top: 0;\n  left: 50%;\n  display: block;\n  width: 1rem;\n  margin-left: -0.5rem;\n  content: \"\";\n  border-bottom: 1px solid #f7f7f7;\n}\n\n.bs-popover-left[data-my-input], .bs-popover-auto[x-placement^=\"left\"][data-my-input] {\n  margin-right: 0.5rem;\n}\n\n.bs-popover-left[data-my-input]   .arrow[data-my-input], .bs-popover-auto[x-placement^=\"left\"][data-my-input]   .arrow[data-my-input] {\n  right: calc((0.5rem + 1px) * -1);\n  width: 0.5rem;\n  height: 1rem;\n  margin: 0.3rem 0;\n}\n\n.bs-popover-left[data-my-input]   .arrow[data-my-input]::before, .bs-popover-auto[x-placement^=\"left\"][data-my-input]   .arrow[data-my-input]::before, .bs-popover-left[data-my-input]   .arrow[data-my-input]::after, .bs-popover-auto[x-placement^=\"left\"][data-my-input]   .arrow[data-my-input]::after {\n  border-width: 0.5rem 0 0.5rem 0.5rem;\n}\n\n.bs-popover-left[data-my-input]   .arrow[data-my-input]::before, .bs-popover-auto[x-placement^=\"left\"][data-my-input]   .arrow[data-my-input]::before {\n  right: 0;\n  border-left-color: rgba(0, 0, 0, 0.25);\n}\n\n.bs-popover-left[data-my-input]   .arrow[data-my-input]::after, .bs-popover-auto[x-placement^=\"left\"][data-my-input]   .arrow[data-my-input]::after {\n  right: 1px;\n  border-left-color: #fff;\n}\n\n.popover-header[data-my-input] {\n  padding: 0.5rem 0.75rem;\n  margin-bottom: 0;\n  font-size: 1rem;\n  color: inherit;\n  background-color: #f7f7f7;\n  border-bottom: 1px solid #ebebeb;\n  border-top-left-radius: calc(0.3rem - 1px);\n  border-top-right-radius: calc(0.3rem - 1px);\n}\n\n.popover-header[data-my-input]:empty {\n  display: none;\n}\n\n.popover-body[data-my-input] {\n  padding: 0.5rem 0.75rem;\n  color: #212529;\n}\n\n.carousel[data-my-input] {\n  position: relative;\n}\n\n.carousel-inner[data-my-input] {\n  position: relative;\n  width: 100%;\n  overflow: hidden;\n}\n\n.carousel-item[data-my-input] {\n  position: relative;\n  display: none;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  width: 100%;\n  transition: -webkit-transform 0.6s ease;\n  transition: transform 0.6s ease;\n  transition: transform 0.6s ease, -webkit-transform 0.6s ease;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  -webkit-perspective: 1000px;\n  perspective: 1000px;\n}\n\n.carousel-item.active[data-my-input], .carousel-item-next[data-my-input], .carousel-item-prev[data-my-input] {\n  display: block;\n}\n\n.carousel-item-next[data-my-input], .carousel-item-prev[data-my-input] {\n  position: absolute;\n  top: 0;\n}\n\n.carousel-item-next.carousel-item-left[data-my-input], .carousel-item-prev.carousel-item-right[data-my-input] {\n  -webkit-transform: translateX(0);\n  transform: translateX(0);\n}\n\n\@supports ((-webkit-transform-style: preserve-3d) or (transform-style: preserve-3d)) {\n  .carousel-item-next.carousel-item-left[data-my-input], .carousel-item-prev.carousel-item-right[data-my-input] {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n  }\n}\n\n.carousel-item-next[data-my-input], .active.carousel-item-right[data-my-input] {\n  -webkit-transform: translateX(100%);\n  transform: translateX(100%);\n}\n\n\@supports ((-webkit-transform-style: preserve-3d) or (transform-style: preserve-3d)) {\n  .carousel-item-next[data-my-input], .active.carousel-item-right[data-my-input] {\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n  }\n}\n\n.carousel-item-prev[data-my-input], .active.carousel-item-left[data-my-input] {\n  -webkit-transform: translateX(-100%);\n  transform: translateX(-100%);\n}\n\n\@supports ((-webkit-transform-style: preserve-3d) or (transform-style: preserve-3d)) {\n  .carousel-item-prev[data-my-input], .active.carousel-item-left[data-my-input] {\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n  }\n}\n\n.carousel-control-prev[data-my-input], .carousel-control-next[data-my-input] {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  width: 15%;\n  color: #fff;\n  text-align: center;\n  opacity: 0.5;\n}\n\n.carousel-control-prev[data-my-input]:hover, .carousel-control-prev[data-my-input]:focus, .carousel-control-next[data-my-input]:hover, .carousel-control-next[data-my-input]:focus {\n  color: #fff;\n  text-decoration: none;\n  outline: 0;\n  opacity: .9;\n}\n\n.carousel-control-prev[data-my-input] {\n  left: 0;\n}\n\n.carousel-control-next[data-my-input] {\n  right: 0;\n}\n\n.carousel-control-prev-icon[data-my-input], .carousel-control-next-icon[data-my-input] {\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  background: transparent no-repeat center center;\n  background-size: 100% 100%;\n}\n\n.carousel-control-prev-icon[data-my-input] {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E\");\n}\n\n.carousel-control-next-icon[data-my-input] {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E\");\n}\n\n.carousel-indicators[data-my-input] {\n  position: absolute;\n  right: 0;\n  bottom: 10px;\n  left: 0;\n  z-index: 15;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  padding-left: 0;\n  margin-right: 15%;\n  margin-left: 15%;\n  list-style: none;\n}\n\n.carousel-indicators[data-my-input]   li[data-my-input] {\n  position: relative;\n  -webkit-box-flex: 0;\n  -ms-flex: 0 1 auto;\n  flex: 0 1 auto;\n  width: 30px;\n  height: 3px;\n  margin-right: 3px;\n  margin-left: 3px;\n  text-indent: -999px;\n  background-color: rgba(255, 255, 255, 0.5);\n}\n\n.carousel-indicators[data-my-input]   li[data-my-input]::before {\n  position: absolute;\n  top: -10px;\n  left: 0;\n  display: inline-block;\n  width: 100%;\n  height: 10px;\n  content: \"\";\n}\n\n.carousel-indicators[data-my-input]   li[data-my-input]::after {\n  position: absolute;\n  bottom: -10px;\n  left: 0;\n  display: inline-block;\n  width: 100%;\n  height: 10px;\n  content: \"\";\n}\n\n.carousel-indicators[data-my-input]   .active[data-my-input] {\n  background-color: #fff;\n}\n\n.carousel-caption[data-my-input] {\n  position: absolute;\n  right: 15%;\n  bottom: 20px;\n  left: 15%;\n  z-index: 10;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  color: #fff;\n  text-align: center;\n}\n\n.align-baseline[data-my-input] {\n  vertical-align: baseline !important;\n}\n\n.align-top[data-my-input] {\n  vertical-align: top !important;\n}\n\n.align-middle[data-my-input] {\n  vertical-align: middle !important;\n}\n\n.align-bottom[data-my-input] {\n  vertical-align: bottom !important;\n}\n\n.align-text-bottom[data-my-input] {\n  vertical-align: text-bottom !important;\n}\n\n.align-text-top[data-my-input] {\n  vertical-align: text-top !important;\n}\n\n.bg-primary[data-my-input] {\n  background-color: #007bff !important;\n}\n\na.bg-primary[data-my-input]:hover, a.bg-primary[data-my-input]:focus, button.bg-primary[data-my-input]:hover, button.bg-primary[data-my-input]:focus {\n  background-color: #0062cc !important;\n}\n\n.bg-secondary[data-my-input] {\n  background-color: #6c757d !important;\n}\n\na.bg-secondary[data-my-input]:hover, a.bg-secondary[data-my-input]:focus, button.bg-secondary[data-my-input]:hover, button.bg-secondary[data-my-input]:focus {\n  background-color: #545b62 !important;\n}\n\n.bg-success[data-my-input] {\n  background-color: #28a745 !important;\n}\n\na.bg-success[data-my-input]:hover, a.bg-success[data-my-input]:focus, button.bg-success[data-my-input]:hover, button.bg-success[data-my-input]:focus {\n  background-color: #1e7e34 !important;\n}\n\n.bg-info[data-my-input] {\n  background-color: #17a2b8 !important;\n}\n\na.bg-info[data-my-input]:hover, a.bg-info[data-my-input]:focus, button.bg-info[data-my-input]:hover, button.bg-info[data-my-input]:focus {\n  background-color: #117a8b !important;\n}\n\n.bg-warning[data-my-input] {\n  background-color: #ffc107 !important;\n}\n\na.bg-warning[data-my-input]:hover, a.bg-warning[data-my-input]:focus, button.bg-warning[data-my-input]:hover, button.bg-warning[data-my-input]:focus {\n  background-color: #d39e00 !important;\n}\n\n.bg-danger[data-my-input] {\n  background-color: #dc3545 !important;\n}\n\na.bg-danger[data-my-input]:hover, a.bg-danger[data-my-input]:focus, button.bg-danger[data-my-input]:hover, button.bg-danger[data-my-input]:focus {\n  background-color: #bd2130 !important;\n}\n\n.bg-light[data-my-input] {\n  background-color: #f8f9fa !important;\n}\n\na.bg-light[data-my-input]:hover, a.bg-light[data-my-input]:focus, button.bg-light[data-my-input]:hover, button.bg-light[data-my-input]:focus {\n  background-color: #dae0e5 !important;\n}\n\n.bg-dark[data-my-input] {\n  background-color: #343a40 !important;\n}\n\na.bg-dark[data-my-input]:hover, a.bg-dark[data-my-input]:focus, button.bg-dark[data-my-input]:hover, button.bg-dark[data-my-input]:focus {\n  background-color: #1d2124 !important;\n}\n\n.bg-white[data-my-input] {\n  background-color: #fff !important;\n}\n\n.bg-transparent[data-my-input] {\n  background-color: transparent !important;\n}\n\n.border[data-my-input] {\n  border: 1px solid #dee2e6 !important;\n}\n\n.border-top[data-my-input] {\n  border-top: 1px solid #dee2e6 !important;\n}\n\n.border-right[data-my-input] {\n  border-right: 1px solid #dee2e6 !important;\n}\n\n.border-bottom[data-my-input] {\n  border-bottom: 1px solid #dee2e6 !important;\n}\n\n.border-left[data-my-input] {\n  border-left: 1px solid #dee2e6 !important;\n}\n\n.border-0[data-my-input] {\n  border: 0 !important;\n}\n\n.border-top-0[data-my-input] {\n  border-top: 0 !important;\n}\n\n.border-right-0[data-my-input] {\n  border-right: 0 !important;\n}\n\n.border-bottom-0[data-my-input] {\n  border-bottom: 0 !important;\n}\n\n.border-left-0[data-my-input] {\n  border-left: 0 !important;\n}\n\n.border-primary[data-my-input] {\n  border-color: #007bff !important;\n}\n\n.border-secondary[data-my-input] {\n  border-color: #6c757d !important;\n}\n\n.border-success[data-my-input] {\n  border-color: #28a745 !important;\n}\n\n.border-info[data-my-input] {\n  border-color: #17a2b8 !important;\n}\n\n.border-warning[data-my-input] {\n  border-color: #ffc107 !important;\n}\n\n.border-danger[data-my-input] {\n  border-color: #dc3545 !important;\n}\n\n.border-light[data-my-input] {\n  border-color: #f8f9fa !important;\n}\n\n.border-dark[data-my-input] {\n  border-color: #343a40 !important;\n}\n\n.border-white[data-my-input] {\n  border-color: #fff !important;\n}\n\n.rounded[data-my-input] {\n  border-radius: 0.25rem !important;\n}\n\n.rounded-top[data-my-input] {\n  border-top-left-radius: 0.25rem !important;\n  border-top-right-radius: 0.25rem !important;\n}\n\n.rounded-right[data-my-input] {\n  border-top-right-radius: 0.25rem !important;\n  border-bottom-right-radius: 0.25rem !important;\n}\n\n.rounded-bottom[data-my-input] {\n  border-bottom-right-radius: 0.25rem !important;\n  border-bottom-left-radius: 0.25rem !important;\n}\n\n.rounded-left[data-my-input] {\n  border-top-left-radius: 0.25rem !important;\n  border-bottom-left-radius: 0.25rem !important;\n}\n\n.rounded-circle[data-my-input] {\n  border-radius: 50% !important;\n}\n\n.rounded-0[data-my-input] {\n  border-radius: 0 !important;\n}\n\n.clearfix[data-my-input]::after {\n  display: block;\n  clear: both;\n  content: \"\";\n}\n\n.d-none[data-my-input] {\n  display: none !important;\n}\n\n.d-inline[data-my-input] {\n  display: inline !important;\n}\n\n.d-inline-block[data-my-input] {\n  display: inline-block !important;\n}\n\n.d-block[data-my-input] {\n  display: block !important;\n}\n\n.d-table[data-my-input] {\n  display: table !important;\n}\n\n.d-table-row[data-my-input] {\n  display: table-row !important;\n}\n\n.d-table-cell[data-my-input] {\n  display: table-cell !important;\n}\n\n.d-flex[data-my-input] {\n  display: -webkit-box !important;\n  display: -ms-flexbox !important;\n  display: flex !important;\n}\n\n.d-inline-flex[data-my-input] {\n  display: -webkit-inline-box !important;\n  display: -ms-inline-flexbox !important;\n  display: inline-flex !important;\n}\n\n\@media (min-width: 576px) {\n  .d-sm-none[data-my-input] {\n    display: none !important;\n  }\n  .d-sm-inline[data-my-input] {\n    display: inline !important;\n  }\n  .d-sm-inline-block[data-my-input] {\n    display: inline-block !important;\n  }\n  .d-sm-block[data-my-input] {\n    display: block !important;\n  }\n  .d-sm-table[data-my-input] {\n    display: table !important;\n  }\n  .d-sm-table-row[data-my-input] {\n    display: table-row !important;\n  }\n  .d-sm-table-cell[data-my-input] {\n    display: table-cell !important;\n  }\n  .d-sm-flex[data-my-input] {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n  .d-sm-inline-flex[data-my-input] {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n\@media (min-width: 768px) {\n  .d-md-none[data-my-input] {\n    display: none !important;\n  }\n  .d-md-inline[data-my-input] {\n    display: inline !important;\n  }\n  .d-md-inline-block[data-my-input] {\n    display: inline-block !important;\n  }\n  .d-md-block[data-my-input] {\n    display: block !important;\n  }\n  .d-md-table[data-my-input] {\n    display: table !important;\n  }\n  .d-md-table-row[data-my-input] {\n    display: table-row !important;\n  }\n  .d-md-table-cell[data-my-input] {\n    display: table-cell !important;\n  }\n  .d-md-flex[data-my-input] {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n  .d-md-inline-flex[data-my-input] {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n\@media (min-width: 992px) {\n  .d-lg-none[data-my-input] {\n    display: none !important;\n  }\n  .d-lg-inline[data-my-input] {\n    display: inline !important;\n  }\n  .d-lg-inline-block[data-my-input] {\n    display: inline-block !important;\n  }\n  .d-lg-block[data-my-input] {\n    display: block !important;\n  }\n  .d-lg-table[data-my-input] {\n    display: table !important;\n  }\n  .d-lg-table-row[data-my-input] {\n    display: table-row !important;\n  }\n  .d-lg-table-cell[data-my-input] {\n    display: table-cell !important;\n  }\n  .d-lg-flex[data-my-input] {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n  .d-lg-inline-flex[data-my-input] {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n\@media (min-width: 1200px) {\n  .d-xl-none[data-my-input] {\n    display: none !important;\n  }\n  .d-xl-inline[data-my-input] {\n    display: inline !important;\n  }\n  .d-xl-inline-block[data-my-input] {\n    display: inline-block !important;\n  }\n  .d-xl-block[data-my-input] {\n    display: block !important;\n  }\n  .d-xl-table[data-my-input] {\n    display: table !important;\n  }\n  .d-xl-table-row[data-my-input] {\n    display: table-row !important;\n  }\n  .d-xl-table-cell[data-my-input] {\n    display: table-cell !important;\n  }\n  .d-xl-flex[data-my-input] {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n  .d-xl-inline-flex[data-my-input] {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n\@media print {\n  .d-print-none[data-my-input] {\n    display: none !important;\n  }\n  .d-print-inline[data-my-input] {\n    display: inline !important;\n  }\n  .d-print-inline-block[data-my-input] {\n    display: inline-block !important;\n  }\n  .d-print-block[data-my-input] {\n    display: block !important;\n  }\n  .d-print-table[data-my-input] {\n    display: table !important;\n  }\n  .d-print-table-row[data-my-input] {\n    display: table-row !important;\n  }\n  .d-print-table-cell[data-my-input] {\n    display: table-cell !important;\n  }\n  .d-print-flex[data-my-input] {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n  .d-print-inline-flex[data-my-input] {\n    display: -webkit-inline-box !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n.embed-responsive[data-my-input] {\n  position: relative;\n  display: block;\n  width: 100%;\n  padding: 0;\n  overflow: hidden;\n}\n\n.embed-responsive[data-my-input]::before {\n  display: block;\n  content: \"\";\n}\n\n.embed-responsive[data-my-input]   .embed-responsive-item[data-my-input], .embed-responsive[data-my-input]   iframe[data-my-input], .embed-responsive[data-my-input]   embed[data-my-input], .embed-responsive[data-my-input]   object[data-my-input], .embed-responsive[data-my-input]   video[data-my-input] {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  border: 0;\n}\n\n.embed-responsive-21by9[data-my-input]::before {\n  padding-top: 42.857143%;\n}\n\n.embed-responsive-16by9[data-my-input]::before {\n  padding-top: 56.25%;\n}\n\n.embed-responsive-4by3[data-my-input]::before {\n  padding-top: 75%;\n}\n\n.embed-responsive-1by1[data-my-input]::before {\n  padding-top: 100%;\n}\n\n.flex-row[data-my-input] {\n  -webkit-box-orient: horizontal !important;\n  -webkit-box-direction: normal !important;\n  -ms-flex-direction: row !important;\n  flex-direction: row !important;\n}\n\n.flex-column[data-my-input] {\n  -webkit-box-orient: vertical !important;\n  -webkit-box-direction: normal !important;\n  -ms-flex-direction: column !important;\n  flex-direction: column !important;\n}\n\n.flex-row-reverse[data-my-input] {\n  -webkit-box-orient: horizontal !important;\n  -webkit-box-direction: reverse !important;\n  -ms-flex-direction: row-reverse !important;\n  flex-direction: row-reverse !important;\n}\n\n.flex-column-reverse[data-my-input] {\n  -webkit-box-orient: vertical !important;\n  -webkit-box-direction: reverse !important;\n  -ms-flex-direction: column-reverse !important;\n  flex-direction: column-reverse !important;\n}\n\n.flex-wrap[data-my-input] {\n  -ms-flex-wrap: wrap !important;\n  flex-wrap: wrap !important;\n}\n\n.flex-nowrap[data-my-input] {\n  -ms-flex-wrap: nowrap !important;\n  flex-wrap: nowrap !important;\n}\n\n.flex-wrap-reverse[data-my-input] {\n  -ms-flex-wrap: wrap-reverse !important;\n  flex-wrap: wrap-reverse !important;\n}\n\n.justify-content-start[data-my-input] {\n  -webkit-box-pack: start !important;\n  -ms-flex-pack: start !important;\n  justify-content: flex-start !important;\n}\n\n.justify-content-end[data-my-input] {\n  -webkit-box-pack: end !important;\n  -ms-flex-pack: end !important;\n  justify-content: flex-end !important;\n}\n\n.justify-content-center[data-my-input] {\n  -webkit-box-pack: center !important;\n  -ms-flex-pack: center !important;\n  justify-content: center !important;\n}\n\n.justify-content-between[data-my-input] {\n  -webkit-box-pack: justify !important;\n  -ms-flex-pack: justify !important;\n  justify-content: space-between !important;\n}\n\n.justify-content-around[data-my-input] {\n  -ms-flex-pack: distribute !important;\n  justify-content: space-around !important;\n}\n\n.align-items-start[data-my-input] {\n  -webkit-box-align: start !important;\n  -ms-flex-align: start !important;\n  align-items: flex-start !important;\n}\n\n.align-items-end[data-my-input] {\n  -webkit-box-align: end !important;\n  -ms-flex-align: end !important;\n  align-items: flex-end !important;\n}\n\n.align-items-center[data-my-input] {\n  -webkit-box-align: center !important;\n  -ms-flex-align: center !important;\n  align-items: center !important;\n}\n\n.align-items-baseline[data-my-input] {\n  -webkit-box-align: baseline !important;\n  -ms-flex-align: baseline !important;\n  align-items: baseline !important;\n}\n\n.align-items-stretch[data-my-input] {\n  -webkit-box-align: stretch !important;\n  -ms-flex-align: stretch !important;\n  align-items: stretch !important;\n}\n\n.align-content-start[data-my-input] {\n  -ms-flex-line-pack: start !important;\n  align-content: flex-start !important;\n}\n\n.align-content-end[data-my-input] {\n  -ms-flex-line-pack: end !important;\n  align-content: flex-end !important;\n}\n\n.align-content-center[data-my-input] {\n  -ms-flex-line-pack: center !important;\n  align-content: center !important;\n}\n\n.align-content-between[data-my-input] {\n  -ms-flex-line-pack: justify !important;\n  align-content: space-between !important;\n}\n\n.align-content-around[data-my-input] {\n  -ms-flex-line-pack: distribute !important;\n  align-content: space-around !important;\n}\n\n.align-content-stretch[data-my-input] {\n  -ms-flex-line-pack: stretch !important;\n  align-content: stretch !important;\n}\n\n.align-self-auto[data-my-input] {\n  -ms-flex-item-align: auto !important;\n  align-self: auto !important;\n}\n\n.align-self-start[data-my-input] {\n  -ms-flex-item-align: start !important;\n  align-self: flex-start !important;\n}\n\n.align-self-end[data-my-input] {\n  -ms-flex-item-align: end !important;\n  align-self: flex-end !important;\n}\n\n.align-self-center[data-my-input] {\n  -ms-flex-item-align: center !important;\n  align-self: center !important;\n}\n\n.align-self-baseline[data-my-input] {\n  -ms-flex-item-align: baseline !important;\n  align-self: baseline !important;\n}\n\n.align-self-stretch[data-my-input] {\n  -ms-flex-item-align: stretch !important;\n  align-self: stretch !important;\n}\n\n\@media (min-width: 576px) {\n  .flex-sm-row[data-my-input] {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n    -ms-flex-direction: row !important;\n    flex-direction: row !important;\n  }\n  .flex-sm-column[data-my-input] {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n    -ms-flex-direction: column !important;\n    flex-direction: column !important;\n  }\n  .flex-sm-row-reverse[data-my-input] {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: reverse !important;\n    -ms-flex-direction: row-reverse !important;\n    flex-direction: row-reverse !important;\n  }\n  .flex-sm-column-reverse[data-my-input] {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: reverse !important;\n    -ms-flex-direction: column-reverse !important;\n    flex-direction: column-reverse !important;\n  }\n  .flex-sm-wrap[data-my-input] {\n    -ms-flex-wrap: wrap !important;\n    flex-wrap: wrap !important;\n  }\n  .flex-sm-nowrap[data-my-input] {\n    -ms-flex-wrap: nowrap !important;\n    flex-wrap: nowrap !important;\n  }\n  .flex-sm-wrap-reverse[data-my-input] {\n    -ms-flex-wrap: wrap-reverse !important;\n    flex-wrap: wrap-reverse !important;\n  }\n  .justify-content-sm-start[data-my-input] {\n    -webkit-box-pack: start !important;\n    -ms-flex-pack: start !important;\n    justify-content: flex-start !important;\n  }\n  .justify-content-sm-end[data-my-input] {\n    -webkit-box-pack: end !important;\n    -ms-flex-pack: end !important;\n    justify-content: flex-end !important;\n  }\n  .justify-content-sm-center[data-my-input] {\n    -webkit-box-pack: center !important;\n    -ms-flex-pack: center !important;\n    justify-content: center !important;\n  }\n  .justify-content-sm-between[data-my-input] {\n    -webkit-box-pack: justify !important;\n    -ms-flex-pack: justify !important;\n    justify-content: space-between !important;\n  }\n  .justify-content-sm-around[data-my-input] {\n    -ms-flex-pack: distribute !important;\n    justify-content: space-around !important;\n  }\n  .align-items-sm-start[data-my-input] {\n    -webkit-box-align: start !important;\n    -ms-flex-align: start !important;\n    align-items: flex-start !important;\n  }\n  .align-items-sm-end[data-my-input] {\n    -webkit-box-align: end !important;\n    -ms-flex-align: end !important;\n    align-items: flex-end !important;\n  }\n  .align-items-sm-center[data-my-input] {\n    -webkit-box-align: center !important;\n    -ms-flex-align: center !important;\n    align-items: center !important;\n  }\n  .align-items-sm-baseline[data-my-input] {\n    -webkit-box-align: baseline !important;\n    -ms-flex-align: baseline !important;\n    align-items: baseline !important;\n  }\n  .align-items-sm-stretch[data-my-input] {\n    -webkit-box-align: stretch !important;\n    -ms-flex-align: stretch !important;\n    align-items: stretch !important;\n  }\n  .align-content-sm-start[data-my-input] {\n    -ms-flex-line-pack: start !important;\n    align-content: flex-start !important;\n  }\n  .align-content-sm-end[data-my-input] {\n    -ms-flex-line-pack: end !important;\n    align-content: flex-end !important;\n  }\n  .align-content-sm-center[data-my-input] {\n    -ms-flex-line-pack: center !important;\n    align-content: center !important;\n  }\n  .align-content-sm-between[data-my-input] {\n    -ms-flex-line-pack: justify !important;\n    align-content: space-between !important;\n  }\n  .align-content-sm-around[data-my-input] {\n    -ms-flex-line-pack: distribute !important;\n    align-content: space-around !important;\n  }\n  .align-content-sm-stretch[data-my-input] {\n    -ms-flex-line-pack: stretch !important;\n    align-content: stretch !important;\n  }\n  .align-self-sm-auto[data-my-input] {\n    -ms-flex-item-align: auto !important;\n    align-self: auto !important;\n  }\n  .align-self-sm-start[data-my-input] {\n    -ms-flex-item-align: start !important;\n    align-self: flex-start !important;\n  }\n  .align-self-sm-end[data-my-input] {\n    -ms-flex-item-align: end !important;\n    align-self: flex-end !important;\n  }\n  .align-self-sm-center[data-my-input] {\n    -ms-flex-item-align: center !important;\n    align-self: center !important;\n  }\n  .align-self-sm-baseline[data-my-input] {\n    -ms-flex-item-align: baseline !important;\n    align-self: baseline !important;\n  }\n  .align-self-sm-stretch[data-my-input] {\n    -ms-flex-item-align: stretch !important;\n    align-self: stretch !important;\n  }\n}\n\n\@media (min-width: 768px) {\n  .flex-md-row[data-my-input] {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n    -ms-flex-direction: row !important;\n    flex-direction: row !important;\n  }\n  .flex-md-column[data-my-input] {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n    -ms-flex-direction: column !important;\n    flex-direction: column !important;\n  }\n  .flex-md-row-reverse[data-my-input] {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: reverse !important;\n    -ms-flex-direction: row-reverse !important;\n    flex-direction: row-reverse !important;\n  }\n  .flex-md-column-reverse[data-my-input] {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: reverse !important;\n    -ms-flex-direction: column-reverse !important;\n    flex-direction: column-reverse !important;\n  }\n  .flex-md-wrap[data-my-input] {\n    -ms-flex-wrap: wrap !important;\n    flex-wrap: wrap !important;\n  }\n  .flex-md-nowrap[data-my-input] {\n    -ms-flex-wrap: nowrap !important;\n    flex-wrap: nowrap !important;\n  }\n  .flex-md-wrap-reverse[data-my-input] {\n    -ms-flex-wrap: wrap-reverse !important;\n    flex-wrap: wrap-reverse !important;\n  }\n  .justify-content-md-start[data-my-input] {\n    -webkit-box-pack: start !important;\n    -ms-flex-pack: start !important;\n    justify-content: flex-start !important;\n  }\n  .justify-content-md-end[data-my-input] {\n    -webkit-box-pack: end !important;\n    -ms-flex-pack: end !important;\n    justify-content: flex-end !important;\n  }\n  .justify-content-md-center[data-my-input] {\n    -webkit-box-pack: center !important;\n    -ms-flex-pack: center !important;\n    justify-content: center !important;\n  }\n  .justify-content-md-between[data-my-input] {\n    -webkit-box-pack: justify !important;\n    -ms-flex-pack: justify !important;\n    justify-content: space-between !important;\n  }\n  .justify-content-md-around[data-my-input] {\n    -ms-flex-pack: distribute !important;\n    justify-content: space-around !important;\n  }\n  .align-items-md-start[data-my-input] {\n    -webkit-box-align: start !important;\n    -ms-flex-align: start !important;\n    align-items: flex-start !important;\n  }\n  .align-items-md-end[data-my-input] {\n    -webkit-box-align: end !important;\n    -ms-flex-align: end !important;\n    align-items: flex-end !important;\n  }\n  .align-items-md-center[data-my-input] {\n    -webkit-box-align: center !important;\n    -ms-flex-align: center !important;\n    align-items: center !important;\n  }\n  .align-items-md-baseline[data-my-input] {\n    -webkit-box-align: baseline !important;\n    -ms-flex-align: baseline !important;\n    align-items: baseline !important;\n  }\n  .align-items-md-stretch[data-my-input] {\n    -webkit-box-align: stretch !important;\n    -ms-flex-align: stretch !important;\n    align-items: stretch !important;\n  }\n  .align-content-md-start[data-my-input] {\n    -ms-flex-line-pack: start !important;\n    align-content: flex-start !important;\n  }\n  .align-content-md-end[data-my-input] {\n    -ms-flex-line-pack: end !important;\n    align-content: flex-end !important;\n  }\n  .align-content-md-center[data-my-input] {\n    -ms-flex-line-pack: center !important;\n    align-content: center !important;\n  }\n  .align-content-md-between[data-my-input] {\n    -ms-flex-line-pack: justify !important;\n    align-content: space-between !important;\n  }\n  .align-content-md-around[data-my-input] {\n    -ms-flex-line-pack: distribute !important;\n    align-content: space-around !important;\n  }\n  .align-content-md-stretch[data-my-input] {\n    -ms-flex-line-pack: stretch !important;\n    align-content: stretch !important;\n  }\n  .align-self-md-auto[data-my-input] {\n    -ms-flex-item-align: auto !important;\n    align-self: auto !important;\n  }\n  .align-self-md-start[data-my-input] {\n    -ms-flex-item-align: start !important;\n    align-self: flex-start !important;\n  }\n  .align-self-md-end[data-my-input] {\n    -ms-flex-item-align: end !important;\n    align-self: flex-end !important;\n  }\n  .align-self-md-center[data-my-input] {\n    -ms-flex-item-align: center !important;\n    align-self: center !important;\n  }\n  .align-self-md-baseline[data-my-input] {\n    -ms-flex-item-align: baseline !important;\n    align-self: baseline !important;\n  }\n  .align-self-md-stretch[data-my-input] {\n    -ms-flex-item-align: stretch !important;\n    align-self: stretch !important;\n  }\n}\n\n\@media (min-width: 992px) {\n  .flex-lg-row[data-my-input] {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n    -ms-flex-direction: row !important;\n    flex-direction: row !important;\n  }\n  .flex-lg-column[data-my-input] {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n    -ms-flex-direction: column !important;\n    flex-direction: column !important;\n  }\n  .flex-lg-row-reverse[data-my-input] {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: reverse !important;\n    -ms-flex-direction: row-reverse !important;\n    flex-direction: row-reverse !important;\n  }\n  .flex-lg-column-reverse[data-my-input] {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: reverse !important;\n    -ms-flex-direction: column-reverse !important;\n    flex-direction: column-reverse !important;\n  }\n  .flex-lg-wrap[data-my-input] {\n    -ms-flex-wrap: wrap !important;\n    flex-wrap: wrap !important;\n  }\n  .flex-lg-nowrap[data-my-input] {\n    -ms-flex-wrap: nowrap !important;\n    flex-wrap: nowrap !important;\n  }\n  .flex-lg-wrap-reverse[data-my-input] {\n    -ms-flex-wrap: wrap-reverse !important;\n    flex-wrap: wrap-reverse !important;\n  }\n  .justify-content-lg-start[data-my-input] {\n    -webkit-box-pack: start !important;\n    -ms-flex-pack: start !important;\n    justify-content: flex-start !important;\n  }\n  .justify-content-lg-end[data-my-input] {\n    -webkit-box-pack: end !important;\n    -ms-flex-pack: end !important;\n    justify-content: flex-end !important;\n  }\n  .justify-content-lg-center[data-my-input] {\n    -webkit-box-pack: center !important;\n    -ms-flex-pack: center !important;\n    justify-content: center !important;\n  }\n  .justify-content-lg-between[data-my-input] {\n    -webkit-box-pack: justify !important;\n    -ms-flex-pack: justify !important;\n    justify-content: space-between !important;\n  }\n  .justify-content-lg-around[data-my-input] {\n    -ms-flex-pack: distribute !important;\n    justify-content: space-around !important;\n  }\n  .align-items-lg-start[data-my-input] {\n    -webkit-box-align: start !important;\n    -ms-flex-align: start !important;\n    align-items: flex-start !important;\n  }\n  .align-items-lg-end[data-my-input] {\n    -webkit-box-align: end !important;\n    -ms-flex-align: end !important;\n    align-items: flex-end !important;\n  }\n  .align-items-lg-center[data-my-input] {\n    -webkit-box-align: center !important;\n    -ms-flex-align: center !important;\n    align-items: center !important;\n  }\n  .align-items-lg-baseline[data-my-input] {\n    -webkit-box-align: baseline !important;\n    -ms-flex-align: baseline !important;\n    align-items: baseline !important;\n  }\n  .align-items-lg-stretch[data-my-input] {\n    -webkit-box-align: stretch !important;\n    -ms-flex-align: stretch !important;\n    align-items: stretch !important;\n  }\n  .align-content-lg-start[data-my-input] {\n    -ms-flex-line-pack: start !important;\n    align-content: flex-start !important;\n  }\n  .align-content-lg-end[data-my-input] {\n    -ms-flex-line-pack: end !important;\n    align-content: flex-end !important;\n  }\n  .align-content-lg-center[data-my-input] {\n    -ms-flex-line-pack: center !important;\n    align-content: center !important;\n  }\n  .align-content-lg-between[data-my-input] {\n    -ms-flex-line-pack: justify !important;\n    align-content: space-between !important;\n  }\n  .align-content-lg-around[data-my-input] {\n    -ms-flex-line-pack: distribute !important;\n    align-content: space-around !important;\n  }\n  .align-content-lg-stretch[data-my-input] {\n    -ms-flex-line-pack: stretch !important;\n    align-content: stretch !important;\n  }\n  .align-self-lg-auto[data-my-input] {\n    -ms-flex-item-align: auto !important;\n    align-self: auto !important;\n  }\n  .align-self-lg-start[data-my-input] {\n    -ms-flex-item-align: start !important;\n    align-self: flex-start !important;\n  }\n  .align-self-lg-end[data-my-input] {\n    -ms-flex-item-align: end !important;\n    align-self: flex-end !important;\n  }\n  .align-self-lg-center[data-my-input] {\n    -ms-flex-item-align: center !important;\n    align-self: center !important;\n  }\n  .align-self-lg-baseline[data-my-input] {\n    -ms-flex-item-align: baseline !important;\n    align-self: baseline !important;\n  }\n  .align-self-lg-stretch[data-my-input] {\n    -ms-flex-item-align: stretch !important;\n    align-self: stretch !important;\n  }\n}\n\n\@media (min-width: 1200px) {\n  .flex-xl-row[data-my-input] {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n    -ms-flex-direction: row !important;\n    flex-direction: row !important;\n  }\n  .flex-xl-column[data-my-input] {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n    -ms-flex-direction: column !important;\n    flex-direction: column !important;\n  }\n  .flex-xl-row-reverse[data-my-input] {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: reverse !important;\n    -ms-flex-direction: row-reverse !important;\n    flex-direction: row-reverse !important;\n  }\n  .flex-xl-column-reverse[data-my-input] {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: reverse !important;\n    -ms-flex-direction: column-reverse !important;\n    flex-direction: column-reverse !important;\n  }\n  .flex-xl-wrap[data-my-input] {\n    -ms-flex-wrap: wrap !important;\n    flex-wrap: wrap !important;\n  }\n  .flex-xl-nowrap[data-my-input] {\n    -ms-flex-wrap: nowrap !important;\n    flex-wrap: nowrap !important;\n  }\n  .flex-xl-wrap-reverse[data-my-input] {\n    -ms-flex-wrap: wrap-reverse !important;\n    flex-wrap: wrap-reverse !important;\n  }\n  .justify-content-xl-start[data-my-input] {\n    -webkit-box-pack: start !important;\n    -ms-flex-pack: start !important;\n    justify-content: flex-start !important;\n  }\n  .justify-content-xl-end[data-my-input] {\n    -webkit-box-pack: end !important;\n    -ms-flex-pack: end !important;\n    justify-content: flex-end !important;\n  }\n  .justify-content-xl-center[data-my-input] {\n    -webkit-box-pack: center !important;\n    -ms-flex-pack: center !important;\n    justify-content: center !important;\n  }\n  .justify-content-xl-between[data-my-input] {\n    -webkit-box-pack: justify !important;\n    -ms-flex-pack: justify !important;\n    justify-content: space-between !important;\n  }\n  .justify-content-xl-around[data-my-input] {\n    -ms-flex-pack: distribute !important;\n    justify-content: space-around !important;\n  }\n  .align-items-xl-start[data-my-input] {\n    -webkit-box-align: start !important;\n    -ms-flex-align: start !important;\n    align-items: flex-start !important;\n  }\n  .align-items-xl-end[data-my-input] {\n    -webkit-box-align: end !important;\n    -ms-flex-align: end !important;\n    align-items: flex-end !important;\n  }\n  .align-items-xl-center[data-my-input] {\n    -webkit-box-align: center !important;\n    -ms-flex-align: center !important;\n    align-items: center !important;\n  }\n  .align-items-xl-baseline[data-my-input] {\n    -webkit-box-align: baseline !important;\n    -ms-flex-align: baseline !important;\n    align-items: baseline !important;\n  }\n  .align-items-xl-stretch[data-my-input] {\n    -webkit-box-align: stretch !important;\n    -ms-flex-align: stretch !important;\n    align-items: stretch !important;\n  }\n  .align-content-xl-start[data-my-input] {\n    -ms-flex-line-pack: start !important;\n    align-content: flex-start !important;\n  }\n  .align-content-xl-end[data-my-input] {\n    -ms-flex-line-pack: end !important;\n    align-content: flex-end !important;\n  }\n  .align-content-xl-center[data-my-input] {\n    -ms-flex-line-pack: center !important;\n    align-content: center !important;\n  }\n  .align-content-xl-between[data-my-input] {\n    -ms-flex-line-pack: justify !important;\n    align-content: space-between !important;\n  }\n  .align-content-xl-around[data-my-input] {\n    -ms-flex-line-pack: distribute !important;\n    align-content: space-around !important;\n  }\n  .align-content-xl-stretch[data-my-input] {\n    -ms-flex-line-pack: stretch !important;\n    align-content: stretch !important;\n  }\n  .align-self-xl-auto[data-my-input] {\n    -ms-flex-item-align: auto !important;\n    align-self: auto !important;\n  }\n  .align-self-xl-start[data-my-input] {\n    -ms-flex-item-align: start !important;\n    align-self: flex-start !important;\n  }\n  .align-self-xl-end[data-my-input] {\n    -ms-flex-item-align: end !important;\n    align-self: flex-end !important;\n  }\n  .align-self-xl-center[data-my-input] {\n    -ms-flex-item-align: center !important;\n    align-self: center !important;\n  }\n  .align-self-xl-baseline[data-my-input] {\n    -ms-flex-item-align: baseline !important;\n    align-self: baseline !important;\n  }\n  .align-self-xl-stretch[data-my-input] {\n    -ms-flex-item-align: stretch !important;\n    align-self: stretch !important;\n  }\n}\n\n.float-left[data-my-input] {\n  float: left !important;\n}\n\n.float-right[data-my-input] {\n  float: right !important;\n}\n\n.float-none[data-my-input] {\n  float: none !important;\n}\n\n\@media (min-width: 576px) {\n  .float-sm-left[data-my-input] {\n    float: left !important;\n  }\n  .float-sm-right[data-my-input] {\n    float: right !important;\n  }\n  .float-sm-none[data-my-input] {\n    float: none !important;\n  }\n}\n\n\@media (min-width: 768px) {\n  .float-md-left[data-my-input] {\n    float: left !important;\n  }\n  .float-md-right[data-my-input] {\n    float: right !important;\n  }\n  .float-md-none[data-my-input] {\n    float: none !important;\n  }\n}\n\n\@media (min-width: 992px) {\n  .float-lg-left[data-my-input] {\n    float: left !important;\n  }\n  .float-lg-right[data-my-input] {\n    float: right !important;\n  }\n  .float-lg-none[data-my-input] {\n    float: none !important;\n  }\n}\n\n\@media (min-width: 1200px) {\n  .float-xl-left[data-my-input] {\n    float: left !important;\n  }\n  .float-xl-right[data-my-input] {\n    float: right !important;\n  }\n  .float-xl-none[data-my-input] {\n    float: none !important;\n  }\n}\n\n.position-static[data-my-input] {\n  position: static !important;\n}\n\n.position-relative[data-my-input] {\n  position: relative !important;\n}\n\n.position-absolute[data-my-input] {\n  position: absolute !important;\n}\n\n.position-fixed[data-my-input] {\n  position: fixed !important;\n}\n\n.position-sticky[data-my-input] {\n  position: -webkit-sticky !important;\n  position: sticky !important;\n}\n\n.fixed-top[data-my-input] {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 1030;\n}\n\n.fixed-bottom[data-my-input] {\n  position: fixed;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1030;\n}\n\n\@supports ((position: -webkit-sticky) or (position: sticky)) {\n  .sticky-top[data-my-input] {\n    position: -webkit-sticky;\n    position: sticky;\n    top: 0;\n    z-index: 1020;\n  }\n}\n\n.sr-only[data-my-input] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  -webkit-clip-path: inset(50%);\n  clip-path: inset(50%);\n  border: 0;\n}\n\n.sr-only-focusable[data-my-input]:active, .sr-only-focusable[data-my-input]:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  overflow: visible;\n  clip: auto;\n  white-space: normal;\n  -webkit-clip-path: none;\n  clip-path: none;\n}\n\n.w-25[data-my-input] {\n  width: 25% !important;\n}\n\n.w-50[data-my-input] {\n  width: 50% !important;\n}\n\n.w-75[data-my-input] {\n  width: 75% !important;\n}\n\n.w-100[data-my-input] {\n  width: 100% !important;\n}\n\n.h-25[data-my-input] {\n  height: 25% !important;\n}\n\n.h-50[data-my-input] {\n  height: 50% !important;\n}\n\n.h-75[data-my-input] {\n  height: 75% !important;\n}\n\n.h-100[data-my-input] {\n  height: 100% !important;\n}\n\n.mw-100[data-my-input] {\n  max-width: 100% !important;\n}\n\n.mh-100[data-my-input] {\n  max-height: 100% !important;\n}\n\n.m-0[data-my-input] {\n  margin: 0 !important;\n}\n\n.mt-0[data-my-input], .my-0[data-my-input] {\n  margin-top: 0 !important;\n}\n\n.mr-0[data-my-input], .mx-0[data-my-input] {\n  margin-right: 0 !important;\n}\n\n.mb-0[data-my-input], .my-0[data-my-input] {\n  margin-bottom: 0 !important;\n}\n\n.ml-0[data-my-input], .mx-0[data-my-input] {\n  margin-left: 0 !important;\n}\n\n.m-1[data-my-input] {\n  margin: 0.25rem !important;\n}\n\n.mt-1[data-my-input], .my-1[data-my-input] {\n  margin-top: 0.25rem !important;\n}\n\n.mr-1[data-my-input], .mx-1[data-my-input] {\n  margin-right: 0.25rem !important;\n}\n\n.mb-1[data-my-input], .my-1[data-my-input] {\n  margin-bottom: 0.25rem !important;\n}\n\n.ml-1[data-my-input], .mx-1[data-my-input] {\n  margin-left: 0.25rem !important;\n}\n\n.m-2[data-my-input] {\n  margin: 0.5rem !important;\n}\n\n.mt-2[data-my-input], .my-2[data-my-input] {\n  margin-top: 0.5rem !important;\n}\n\n.mr-2[data-my-input], .mx-2[data-my-input] {\n  margin-right: 0.5rem !important;\n}\n\n.mb-2[data-my-input], .my-2[data-my-input] {\n  margin-bottom: 0.5rem !important;\n}\n\n.ml-2[data-my-input], .mx-2[data-my-input] {\n  margin-left: 0.5rem !important;\n}\n\n.m-3[data-my-input] {\n  margin: 1rem !important;\n}\n\n.mt-3[data-my-input], .my-3[data-my-input] {\n  margin-top: 1rem !important;\n}\n\n.mr-3[data-my-input], .mx-3[data-my-input] {\n  margin-right: 1rem !important;\n}\n\n.mb-3[data-my-input], .my-3[data-my-input] {\n  margin-bottom: 1rem !important;\n}\n\n.ml-3[data-my-input], .mx-3[data-my-input] {\n  margin-left: 1rem !important;\n}\n\n.m-4[data-my-input] {\n  margin: 1.5rem !important;\n}\n\n.mt-4[data-my-input], .my-4[data-my-input] {\n  margin-top: 1.5rem !important;\n}\n\n.mr-4[data-my-input], .mx-4[data-my-input] {\n  margin-right: 1.5rem !important;\n}\n\n.mb-4[data-my-input], .my-4[data-my-input] {\n  margin-bottom: 1.5rem !important;\n}\n\n.ml-4[data-my-input], .mx-4[data-my-input] {\n  margin-left: 1.5rem !important;\n}\n\n.m-5[data-my-input] {\n  margin: 3rem !important;\n}\n\n.mt-5[data-my-input], .my-5[data-my-input] {\n  margin-top: 3rem !important;\n}\n\n.mr-5[data-my-input], .mx-5[data-my-input] {\n  margin-right: 3rem !important;\n}\n\n.mb-5[data-my-input], .my-5[data-my-input] {\n  margin-bottom: 3rem !important;\n}\n\n.ml-5[data-my-input], .mx-5[data-my-input] {\n  margin-left: 3rem !important;\n}\n\n.p-0[data-my-input] {\n  padding: 0 !important;\n}\n\n.pt-0[data-my-input], .py-0[data-my-input] {\n  padding-top: 0 !important;\n}\n\n.pr-0[data-my-input], .px-0[data-my-input] {\n  padding-right: 0 !important;\n}\n\n.pb-0[data-my-input], .py-0[data-my-input] {\n  padding-bottom: 0 !important;\n}\n\n.pl-0[data-my-input], .px-0[data-my-input] {\n  padding-left: 0 !important;\n}\n\n.p-1[data-my-input] {\n  padding: 0.25rem !important;\n}\n\n.pt-1[data-my-input], .py-1[data-my-input] {\n  padding-top: 0.25rem !important;\n}\n\n.pr-1[data-my-input], .px-1[data-my-input] {\n  padding-right: 0.25rem !important;\n}\n\n.pb-1[data-my-input], .py-1[data-my-input] {\n  padding-bottom: 0.25rem !important;\n}\n\n.pl-1[data-my-input], .px-1[data-my-input] {\n  padding-left: 0.25rem !important;\n}\n\n.p-2[data-my-input] {\n  padding: 0.5rem !important;\n}\n\n.pt-2[data-my-input], .py-2[data-my-input] {\n  padding-top: 0.5rem !important;\n}\n\n.pr-2[data-my-input], .px-2[data-my-input] {\n  padding-right: 0.5rem !important;\n}\n\n.pb-2[data-my-input], .py-2[data-my-input] {\n  padding-bottom: 0.5rem !important;\n}\n\n.pl-2[data-my-input], .px-2[data-my-input] {\n  padding-left: 0.5rem !important;\n}\n\n.p-3[data-my-input] {\n  padding: 1rem !important;\n}\n\n.pt-3[data-my-input], .py-3[data-my-input] {\n  padding-top: 1rem !important;\n}\n\n.pr-3[data-my-input], .px-3[data-my-input] {\n  padding-right: 1rem !important;\n}\n\n.pb-3[data-my-input], .py-3[data-my-input] {\n  padding-bottom: 1rem !important;\n}\n\n.pl-3[data-my-input], .px-3[data-my-input] {\n  padding-left: 1rem !important;\n}\n\n.p-4[data-my-input] {\n  padding: 1.5rem !important;\n}\n\n.pt-4[data-my-input], .py-4[data-my-input] {\n  padding-top: 1.5rem !important;\n}\n\n.pr-4[data-my-input], .px-4[data-my-input] {\n  padding-right: 1.5rem !important;\n}\n\n.pb-4[data-my-input], .py-4[data-my-input] {\n  padding-bottom: 1.5rem !important;\n}\n\n.pl-4[data-my-input], .px-4[data-my-input] {\n  padding-left: 1.5rem !important;\n}\n\n.p-5[data-my-input] {\n  padding: 3rem !important;\n}\n\n.pt-5[data-my-input], .py-5[data-my-input] {\n  padding-top: 3rem !important;\n}\n\n.pr-5[data-my-input], .px-5[data-my-input] {\n  padding-right: 3rem !important;\n}\n\n.pb-5[data-my-input], .py-5[data-my-input] {\n  padding-bottom: 3rem !important;\n}\n\n.pl-5[data-my-input], .px-5[data-my-input] {\n  padding-left: 3rem !important;\n}\n\n.m-auto[data-my-input] {\n  margin: auto !important;\n}\n\n.mt-auto[data-my-input], .my-auto[data-my-input] {\n  margin-top: auto !important;\n}\n\n.mr-auto[data-my-input], .mx-auto[data-my-input] {\n  margin-right: auto !important;\n}\n\n.mb-auto[data-my-input], .my-auto[data-my-input] {\n  margin-bottom: auto !important;\n}\n\n.ml-auto[data-my-input], .mx-auto[data-my-input] {\n  margin-left: auto !important;\n}\n\n\@media (min-width: 576px) {\n  .m-sm-0[data-my-input] {\n    margin: 0 !important;\n  }\n  .mt-sm-0[data-my-input], .my-sm-0[data-my-input] {\n    margin-top: 0 !important;\n  }\n  .mr-sm-0[data-my-input], .mx-sm-0[data-my-input] {\n    margin-right: 0 !important;\n  }\n  .mb-sm-0[data-my-input], .my-sm-0[data-my-input] {\n    margin-bottom: 0 !important;\n  }\n  .ml-sm-0[data-my-input], .mx-sm-0[data-my-input] {\n    margin-left: 0 !important;\n  }\n  .m-sm-1[data-my-input] {\n    margin: 0.25rem !important;\n  }\n  .mt-sm-1[data-my-input], .my-sm-1[data-my-input] {\n    margin-top: 0.25rem !important;\n  }\n  .mr-sm-1[data-my-input], .mx-sm-1[data-my-input] {\n    margin-right: 0.25rem !important;\n  }\n  .mb-sm-1[data-my-input], .my-sm-1[data-my-input] {\n    margin-bottom: 0.25rem !important;\n  }\n  .ml-sm-1[data-my-input], .mx-sm-1[data-my-input] {\n    margin-left: 0.25rem !important;\n  }\n  .m-sm-2[data-my-input] {\n    margin: 0.5rem !important;\n  }\n  .mt-sm-2[data-my-input], .my-sm-2[data-my-input] {\n    margin-top: 0.5rem !important;\n  }\n  .mr-sm-2[data-my-input], .mx-sm-2[data-my-input] {\n    margin-right: 0.5rem !important;\n  }\n  .mb-sm-2[data-my-input], .my-sm-2[data-my-input] {\n    margin-bottom: 0.5rem !important;\n  }\n  .ml-sm-2[data-my-input], .mx-sm-2[data-my-input] {\n    margin-left: 0.5rem !important;\n  }\n  .m-sm-3[data-my-input] {\n    margin: 1rem !important;\n  }\n  .mt-sm-3[data-my-input], .my-sm-3[data-my-input] {\n    margin-top: 1rem !important;\n  }\n  .mr-sm-3[data-my-input], .mx-sm-3[data-my-input] {\n    margin-right: 1rem !important;\n  }\n  .mb-sm-3[data-my-input], .my-sm-3[data-my-input] {\n    margin-bottom: 1rem !important;\n  }\n  .ml-sm-3[data-my-input], .mx-sm-3[data-my-input] {\n    margin-left: 1rem !important;\n  }\n  .m-sm-4[data-my-input] {\n    margin: 1.5rem !important;\n  }\n  .mt-sm-4[data-my-input], .my-sm-4[data-my-input] {\n    margin-top: 1.5rem !important;\n  }\n  .mr-sm-4[data-my-input], .mx-sm-4[data-my-input] {\n    margin-right: 1.5rem !important;\n  }\n  .mb-sm-4[data-my-input], .my-sm-4[data-my-input] {\n    margin-bottom: 1.5rem !important;\n  }\n  .ml-sm-4[data-my-input], .mx-sm-4[data-my-input] {\n    margin-left: 1.5rem !important;\n  }\n  .m-sm-5[data-my-input] {\n    margin: 3rem !important;\n  }\n  .mt-sm-5[data-my-input], .my-sm-5[data-my-input] {\n    margin-top: 3rem !important;\n  }\n  .mr-sm-5[data-my-input], .mx-sm-5[data-my-input] {\n    margin-right: 3rem !important;\n  }\n  .mb-sm-5[data-my-input], .my-sm-5[data-my-input] {\n    margin-bottom: 3rem !important;\n  }\n  .ml-sm-5[data-my-input], .mx-sm-5[data-my-input] {\n    margin-left: 3rem !important;\n  }\n  .p-sm-0[data-my-input] {\n    padding: 0 !important;\n  }\n  .pt-sm-0[data-my-input], .py-sm-0[data-my-input] {\n    padding-top: 0 !important;\n  }\n  .pr-sm-0[data-my-input], .px-sm-0[data-my-input] {\n    padding-right: 0 !important;\n  }\n  .pb-sm-0[data-my-input], .py-sm-0[data-my-input] {\n    padding-bottom: 0 !important;\n  }\n  .pl-sm-0[data-my-input], .px-sm-0[data-my-input] {\n    padding-left: 0 !important;\n  }\n  .p-sm-1[data-my-input] {\n    padding: 0.25rem !important;\n  }\n  .pt-sm-1[data-my-input], .py-sm-1[data-my-input] {\n    padding-top: 0.25rem !important;\n  }\n  .pr-sm-1[data-my-input], .px-sm-1[data-my-input] {\n    padding-right: 0.25rem !important;\n  }\n  .pb-sm-1[data-my-input], .py-sm-1[data-my-input] {\n    padding-bottom: 0.25rem !important;\n  }\n  .pl-sm-1[data-my-input], .px-sm-1[data-my-input] {\n    padding-left: 0.25rem !important;\n  }\n  .p-sm-2[data-my-input] {\n    padding: 0.5rem !important;\n  }\n  .pt-sm-2[data-my-input], .py-sm-2[data-my-input] {\n    padding-top: 0.5rem !important;\n  }\n  .pr-sm-2[data-my-input], .px-sm-2[data-my-input] {\n    padding-right: 0.5rem !important;\n  }\n  .pb-sm-2[data-my-input], .py-sm-2[data-my-input] {\n    padding-bottom: 0.5rem !important;\n  }\n  .pl-sm-2[data-my-input], .px-sm-2[data-my-input] {\n    padding-left: 0.5rem !important;\n  }\n  .p-sm-3[data-my-input] {\n    padding: 1rem !important;\n  }\n  .pt-sm-3[data-my-input], .py-sm-3[data-my-input] {\n    padding-top: 1rem !important;\n  }\n  .pr-sm-3[data-my-input], .px-sm-3[data-my-input] {\n    padding-right: 1rem !important;\n  }\n  .pb-sm-3[data-my-input], .py-sm-3[data-my-input] {\n    padding-bottom: 1rem !important;\n  }\n  .pl-sm-3[data-my-input], .px-sm-3[data-my-input] {\n    padding-left: 1rem !important;\n  }\n  .p-sm-4[data-my-input] {\n    padding: 1.5rem !important;\n  }\n  .pt-sm-4[data-my-input], .py-sm-4[data-my-input] {\n    padding-top: 1.5rem !important;\n  }\n  .pr-sm-4[data-my-input], .px-sm-4[data-my-input] {\n    padding-right: 1.5rem !important;\n  }\n  .pb-sm-4[data-my-input], .py-sm-4[data-my-input] {\n    padding-bottom: 1.5rem !important;\n  }\n  .pl-sm-4[data-my-input], .px-sm-4[data-my-input] {\n    padding-left: 1.5rem !important;\n  }\n  .p-sm-5[data-my-input] {\n    padding: 3rem !important;\n  }\n  .pt-sm-5[data-my-input], .py-sm-5[data-my-input] {\n    padding-top: 3rem !important;\n  }\n  .pr-sm-5[data-my-input], .px-sm-5[data-my-input] {\n    padding-right: 3rem !important;\n  }\n  .pb-sm-5[data-my-input], .py-sm-5[data-my-input] {\n    padding-bottom: 3rem !important;\n  }\n  .pl-sm-5[data-my-input], .px-sm-5[data-my-input] {\n    padding-left: 3rem !important;\n  }\n  .m-sm-auto[data-my-input] {\n    margin: auto !important;\n  }\n  .mt-sm-auto[data-my-input], .my-sm-auto[data-my-input] {\n    margin-top: auto !important;\n  }\n  .mr-sm-auto[data-my-input], .mx-sm-auto[data-my-input] {\n    margin-right: auto !important;\n  }\n  .mb-sm-auto[data-my-input], .my-sm-auto[data-my-input] {\n    margin-bottom: auto !important;\n  }\n  .ml-sm-auto[data-my-input], .mx-sm-auto[data-my-input] {\n    margin-left: auto !important;\n  }\n}\n\n\@media (min-width: 768px) {\n  .m-md-0[data-my-input] {\n    margin: 0 !important;\n  }\n  .mt-md-0[data-my-input], .my-md-0[data-my-input] {\n    margin-top: 0 !important;\n  }\n  .mr-md-0[data-my-input], .mx-md-0[data-my-input] {\n    margin-right: 0 !important;\n  }\n  .mb-md-0[data-my-input], .my-md-0[data-my-input] {\n    margin-bottom: 0 !important;\n  }\n  .ml-md-0[data-my-input], .mx-md-0[data-my-input] {\n    margin-left: 0 !important;\n  }\n  .m-md-1[data-my-input] {\n    margin: 0.25rem !important;\n  }\n  .mt-md-1[data-my-input], .my-md-1[data-my-input] {\n    margin-top: 0.25rem !important;\n  }\n  .mr-md-1[data-my-input], .mx-md-1[data-my-input] {\n    margin-right: 0.25rem !important;\n  }\n  .mb-md-1[data-my-input], .my-md-1[data-my-input] {\n    margin-bottom: 0.25rem !important;\n  }\n  .ml-md-1[data-my-input], .mx-md-1[data-my-input] {\n    margin-left: 0.25rem !important;\n  }\n  .m-md-2[data-my-input] {\n    margin: 0.5rem !important;\n  }\n  .mt-md-2[data-my-input], .my-md-2[data-my-input] {\n    margin-top: 0.5rem !important;\n  }\n  .mr-md-2[data-my-input], .mx-md-2[data-my-input] {\n    margin-right: 0.5rem !important;\n  }\n  .mb-md-2[data-my-input], .my-md-2[data-my-input] {\n    margin-bottom: 0.5rem !important;\n  }\n  .ml-md-2[data-my-input], .mx-md-2[data-my-input] {\n    margin-left: 0.5rem !important;\n  }\n  .m-md-3[data-my-input] {\n    margin: 1rem !important;\n  }\n  .mt-md-3[data-my-input], .my-md-3[data-my-input] {\n    margin-top: 1rem !important;\n  }\n  .mr-md-3[data-my-input], .mx-md-3[data-my-input] {\n    margin-right: 1rem !important;\n  }\n  .mb-md-3[data-my-input], .my-md-3[data-my-input] {\n    margin-bottom: 1rem !important;\n  }\n  .ml-md-3[data-my-input], .mx-md-3[data-my-input] {\n    margin-left: 1rem !important;\n  }\n  .m-md-4[data-my-input] {\n    margin: 1.5rem !important;\n  }\n  .mt-md-4[data-my-input], .my-md-4[data-my-input] {\n    margin-top: 1.5rem !important;\n  }\n  .mr-md-4[data-my-input], .mx-md-4[data-my-input] {\n    margin-right: 1.5rem !important;\n  }\n  .mb-md-4[data-my-input], .my-md-4[data-my-input] {\n    margin-bottom: 1.5rem !important;\n  }\n  .ml-md-4[data-my-input], .mx-md-4[data-my-input] {\n    margin-left: 1.5rem !important;\n  }\n  .m-md-5[data-my-input] {\n    margin: 3rem !important;\n  }\n  .mt-md-5[data-my-input], .my-md-5[data-my-input] {\n    margin-top: 3rem !important;\n  }\n  .mr-md-5[data-my-input], .mx-md-5[data-my-input] {\n    margin-right: 3rem !important;\n  }\n  .mb-md-5[data-my-input], .my-md-5[data-my-input] {\n    margin-bottom: 3rem !important;\n  }\n  .ml-md-5[data-my-input], .mx-md-5[data-my-input] {\n    margin-left: 3rem !important;\n  }\n  .p-md-0[data-my-input] {\n    padding: 0 !important;\n  }\n  .pt-md-0[data-my-input], .py-md-0[data-my-input] {\n    padding-top: 0 !important;\n  }\n  .pr-md-0[data-my-input], .px-md-0[data-my-input] {\n    padding-right: 0 !important;\n  }\n  .pb-md-0[data-my-input], .py-md-0[data-my-input] {\n    padding-bottom: 0 !important;\n  }\n  .pl-md-0[data-my-input], .px-md-0[data-my-input] {\n    padding-left: 0 !important;\n  }\n  .p-md-1[data-my-input] {\n    padding: 0.25rem !important;\n  }\n  .pt-md-1[data-my-input], .py-md-1[data-my-input] {\n    padding-top: 0.25rem !important;\n  }\n  .pr-md-1[data-my-input], .px-md-1[data-my-input] {\n    padding-right: 0.25rem !important;\n  }\n  .pb-md-1[data-my-input], .py-md-1[data-my-input] {\n    padding-bottom: 0.25rem !important;\n  }\n  .pl-md-1[data-my-input], .px-md-1[data-my-input] {\n    padding-left: 0.25rem !important;\n  }\n  .p-md-2[data-my-input] {\n    padding: 0.5rem !important;\n  }\n  .pt-md-2[data-my-input], .py-md-2[data-my-input] {\n    padding-top: 0.5rem !important;\n  }\n  .pr-md-2[data-my-input], .px-md-2[data-my-input] {\n    padding-right: 0.5rem !important;\n  }\n  .pb-md-2[data-my-input], .py-md-2[data-my-input] {\n    padding-bottom: 0.5rem !important;\n  }\n  .pl-md-2[data-my-input], .px-md-2[data-my-input] {\n    padding-left: 0.5rem !important;\n  }\n  .p-md-3[data-my-input] {\n    padding: 1rem !important;\n  }\n  .pt-md-3[data-my-input], .py-md-3[data-my-input] {\n    padding-top: 1rem !important;\n  }\n  .pr-md-3[data-my-input], .px-md-3[data-my-input] {\n    padding-right: 1rem !important;\n  }\n  .pb-md-3[data-my-input], .py-md-3[data-my-input] {\n    padding-bottom: 1rem !important;\n  }\n  .pl-md-3[data-my-input], .px-md-3[data-my-input] {\n    padding-left: 1rem !important;\n  }\n  .p-md-4[data-my-input] {\n    padding: 1.5rem !important;\n  }\n  .pt-md-4[data-my-input], .py-md-4[data-my-input] {\n    padding-top: 1.5rem !important;\n  }\n  .pr-md-4[data-my-input], .px-md-4[data-my-input] {\n    padding-right: 1.5rem !important;\n  }\n  .pb-md-4[data-my-input], .py-md-4[data-my-input] {\n    padding-bottom: 1.5rem !important;\n  }\n  .pl-md-4[data-my-input], .px-md-4[data-my-input] {\n    padding-left: 1.5rem !important;\n  }\n  .p-md-5[data-my-input] {\n    padding: 3rem !important;\n  }\n  .pt-md-5[data-my-input], .py-md-5[data-my-input] {\n    padding-top: 3rem !important;\n  }\n  .pr-md-5[data-my-input], .px-md-5[data-my-input] {\n    padding-right: 3rem !important;\n  }\n  .pb-md-5[data-my-input], .py-md-5[data-my-input] {\n    padding-bottom: 3rem !important;\n  }\n  .pl-md-5[data-my-input], .px-md-5[data-my-input] {\n    padding-left: 3rem !important;\n  }\n  .m-md-auto[data-my-input] {\n    margin: auto !important;\n  }\n  .mt-md-auto[data-my-input], .my-md-auto[data-my-input] {\n    margin-top: auto !important;\n  }\n  .mr-md-auto[data-my-input], .mx-md-auto[data-my-input] {\n    margin-right: auto !important;\n  }\n  .mb-md-auto[data-my-input], .my-md-auto[data-my-input] {\n    margin-bottom: auto !important;\n  }\n  .ml-md-auto[data-my-input], .mx-md-auto[data-my-input] {\n    margin-left: auto !important;\n  }\n}\n\n\@media (min-width: 992px) {\n  .m-lg-0[data-my-input] {\n    margin: 0 !important;\n  }\n  .mt-lg-0[data-my-input], .my-lg-0[data-my-input] {\n    margin-top: 0 !important;\n  }\n  .mr-lg-0[data-my-input], .mx-lg-0[data-my-input] {\n    margin-right: 0 !important;\n  }\n  .mb-lg-0[data-my-input], .my-lg-0[data-my-input] {\n    margin-bottom: 0 !important;\n  }\n  .ml-lg-0[data-my-input], .mx-lg-0[data-my-input] {\n    margin-left: 0 !important;\n  }\n  .m-lg-1[data-my-input] {\n    margin: 0.25rem !important;\n  }\n  .mt-lg-1[data-my-input], .my-lg-1[data-my-input] {\n    margin-top: 0.25rem !important;\n  }\n  .mr-lg-1[data-my-input], .mx-lg-1[data-my-input] {\n    margin-right: 0.25rem !important;\n  }\n  .mb-lg-1[data-my-input], .my-lg-1[data-my-input] {\n    margin-bottom: 0.25rem !important;\n  }\n  .ml-lg-1[data-my-input], .mx-lg-1[data-my-input] {\n    margin-left: 0.25rem !important;\n  }\n  .m-lg-2[data-my-input] {\n    margin: 0.5rem !important;\n  }\n  .mt-lg-2[data-my-input], .my-lg-2[data-my-input] {\n    margin-top: 0.5rem !important;\n  }\n  .mr-lg-2[data-my-input], .mx-lg-2[data-my-input] {\n    margin-right: 0.5rem !important;\n  }\n  .mb-lg-2[data-my-input], .my-lg-2[data-my-input] {\n    margin-bottom: 0.5rem !important;\n  }\n  .ml-lg-2[data-my-input], .mx-lg-2[data-my-input] {\n    margin-left: 0.5rem !important;\n  }\n  .m-lg-3[data-my-input] {\n    margin: 1rem !important;\n  }\n  .mt-lg-3[data-my-input], .my-lg-3[data-my-input] {\n    margin-top: 1rem !important;\n  }\n  .mr-lg-3[data-my-input], .mx-lg-3[data-my-input] {\n    margin-right: 1rem !important;\n  }\n  .mb-lg-3[data-my-input], .my-lg-3[data-my-input] {\n    margin-bottom: 1rem !important;\n  }\n  .ml-lg-3[data-my-input], .mx-lg-3[data-my-input] {\n    margin-left: 1rem !important;\n  }\n  .m-lg-4[data-my-input] {\n    margin: 1.5rem !important;\n  }\n  .mt-lg-4[data-my-input], .my-lg-4[data-my-input] {\n    margin-top: 1.5rem !important;\n  }\n  .mr-lg-4[data-my-input], .mx-lg-4[data-my-input] {\n    margin-right: 1.5rem !important;\n  }\n  .mb-lg-4[data-my-input], .my-lg-4[data-my-input] {\n    margin-bottom: 1.5rem !important;\n  }\n  .ml-lg-4[data-my-input], .mx-lg-4[data-my-input] {\n    margin-left: 1.5rem !important;\n  }\n  .m-lg-5[data-my-input] {\n    margin: 3rem !important;\n  }\n  .mt-lg-5[data-my-input], .my-lg-5[data-my-input] {\n    margin-top: 3rem !important;\n  }\n  .mr-lg-5[data-my-input], .mx-lg-5[data-my-input] {\n    margin-right: 3rem !important;\n  }\n  .mb-lg-5[data-my-input], .my-lg-5[data-my-input] {\n    margin-bottom: 3rem !important;\n  }\n  .ml-lg-5[data-my-input], .mx-lg-5[data-my-input] {\n    margin-left: 3rem !important;\n  }\n  .p-lg-0[data-my-input] {\n    padding: 0 !important;\n  }\n  .pt-lg-0[data-my-input], .py-lg-0[data-my-input] {\n    padding-top: 0 !important;\n  }\n  .pr-lg-0[data-my-input], .px-lg-0[data-my-input] {\n    padding-right: 0 !important;\n  }\n  .pb-lg-0[data-my-input], .py-lg-0[data-my-input] {\n    padding-bottom: 0 !important;\n  }\n  .pl-lg-0[data-my-input], .px-lg-0[data-my-input] {\n    padding-left: 0 !important;\n  }\n  .p-lg-1[data-my-input] {\n    padding: 0.25rem !important;\n  }\n  .pt-lg-1[data-my-input], .py-lg-1[data-my-input] {\n    padding-top: 0.25rem !important;\n  }\n  .pr-lg-1[data-my-input], .px-lg-1[data-my-input] {\n    padding-right: 0.25rem !important;\n  }\n  .pb-lg-1[data-my-input], .py-lg-1[data-my-input] {\n    padding-bottom: 0.25rem !important;\n  }\n  .pl-lg-1[data-my-input], .px-lg-1[data-my-input] {\n    padding-left: 0.25rem !important;\n  }\n  .p-lg-2[data-my-input] {\n    padding: 0.5rem !important;\n  }\n  .pt-lg-2[data-my-input], .py-lg-2[data-my-input] {\n    padding-top: 0.5rem !important;\n  }\n  .pr-lg-2[data-my-input], .px-lg-2[data-my-input] {\n    padding-right: 0.5rem !important;\n  }\n  .pb-lg-2[data-my-input], .py-lg-2[data-my-input] {\n    padding-bottom: 0.5rem !important;\n  }\n  .pl-lg-2[data-my-input], .px-lg-2[data-my-input] {\n    padding-left: 0.5rem !important;\n  }\n  .p-lg-3[data-my-input] {\n    padding: 1rem !important;\n  }\n  .pt-lg-3[data-my-input], .py-lg-3[data-my-input] {\n    padding-top: 1rem !important;\n  }\n  .pr-lg-3[data-my-input], .px-lg-3[data-my-input] {\n    padding-right: 1rem !important;\n  }\n  .pb-lg-3[data-my-input], .py-lg-3[data-my-input] {\n    padding-bottom: 1rem !important;\n  }\n  .pl-lg-3[data-my-input], .px-lg-3[data-my-input] {\n    padding-left: 1rem !important;\n  }\n  .p-lg-4[data-my-input] {\n    padding: 1.5rem !important;\n  }\n  .pt-lg-4[data-my-input], .py-lg-4[data-my-input] {\n    padding-top: 1.5rem !important;\n  }\n  .pr-lg-4[data-my-input], .px-lg-4[data-my-input] {\n    padding-right: 1.5rem !important;\n  }\n  .pb-lg-4[data-my-input], .py-lg-4[data-my-input] {\n    padding-bottom: 1.5rem !important;\n  }\n  .pl-lg-4[data-my-input], .px-lg-4[data-my-input] {\n    padding-left: 1.5rem !important;\n  }\n  .p-lg-5[data-my-input] {\n    padding: 3rem !important;\n  }\n  .pt-lg-5[data-my-input], .py-lg-5[data-my-input] {\n    padding-top: 3rem !important;\n  }\n  .pr-lg-5[data-my-input], .px-lg-5[data-my-input] {\n    padding-right: 3rem !important;\n  }\n  .pb-lg-5[data-my-input], .py-lg-5[data-my-input] {\n    padding-bottom: 3rem !important;\n  }\n  .pl-lg-5[data-my-input], .px-lg-5[data-my-input] {\n    padding-left: 3rem !important;\n  }\n  .m-lg-auto[data-my-input] {\n    margin: auto !important;\n  }\n  .mt-lg-auto[data-my-input], .my-lg-auto[data-my-input] {\n    margin-top: auto !important;\n  }\n  .mr-lg-auto[data-my-input], .mx-lg-auto[data-my-input] {\n    margin-right: auto !important;\n  }\n  .mb-lg-auto[data-my-input], .my-lg-auto[data-my-input] {\n    margin-bottom: auto !important;\n  }\n  .ml-lg-auto[data-my-input], .mx-lg-auto[data-my-input] {\n    margin-left: auto !important;\n  }\n}\n\n\@media (min-width: 1200px) {\n  .m-xl-0[data-my-input] {\n    margin: 0 !important;\n  }\n  .mt-xl-0[data-my-input], .my-xl-0[data-my-input] {\n    margin-top: 0 !important;\n  }\n  .mr-xl-0[data-my-input], .mx-xl-0[data-my-input] {\n    margin-right: 0 !important;\n  }\n  .mb-xl-0[data-my-input], .my-xl-0[data-my-input] {\n    margin-bottom: 0 !important;\n  }\n  .ml-xl-0[data-my-input], .mx-xl-0[data-my-input] {\n    margin-left: 0 !important;\n  }\n  .m-xl-1[data-my-input] {\n    margin: 0.25rem !important;\n  }\n  .mt-xl-1[data-my-input], .my-xl-1[data-my-input] {\n    margin-top: 0.25rem !important;\n  }\n  .mr-xl-1[data-my-input], .mx-xl-1[data-my-input] {\n    margin-right: 0.25rem !important;\n  }\n  .mb-xl-1[data-my-input], .my-xl-1[data-my-input] {\n    margin-bottom: 0.25rem !important;\n  }\n  .ml-xl-1[data-my-input], .mx-xl-1[data-my-input] {\n    margin-left: 0.25rem !important;\n  }\n  .m-xl-2[data-my-input] {\n    margin: 0.5rem !important;\n  }\n  .mt-xl-2[data-my-input], .my-xl-2[data-my-input] {\n    margin-top: 0.5rem !important;\n  }\n  .mr-xl-2[data-my-input], .mx-xl-2[data-my-input] {\n    margin-right: 0.5rem !important;\n  }\n  .mb-xl-2[data-my-input], .my-xl-2[data-my-input] {\n    margin-bottom: 0.5rem !important;\n  }\n  .ml-xl-2[data-my-input], .mx-xl-2[data-my-input] {\n    margin-left: 0.5rem !important;\n  }\n  .m-xl-3[data-my-input] {\n    margin: 1rem !important;\n  }\n  .mt-xl-3[data-my-input], .my-xl-3[data-my-input] {\n    margin-top: 1rem !important;\n  }\n  .mr-xl-3[data-my-input], .mx-xl-3[data-my-input] {\n    margin-right: 1rem !important;\n  }\n  .mb-xl-3[data-my-input], .my-xl-3[data-my-input] {\n    margin-bottom: 1rem !important;\n  }\n  .ml-xl-3[data-my-input], .mx-xl-3[data-my-input] {\n    margin-left: 1rem !important;\n  }\n  .m-xl-4[data-my-input] {\n    margin: 1.5rem !important;\n  }\n  .mt-xl-4[data-my-input], .my-xl-4[data-my-input] {\n    margin-top: 1.5rem !important;\n  }\n  .mr-xl-4[data-my-input], .mx-xl-4[data-my-input] {\n    margin-right: 1.5rem !important;\n  }\n  .mb-xl-4[data-my-input], .my-xl-4[data-my-input] {\n    margin-bottom: 1.5rem !important;\n  }\n  .ml-xl-4[data-my-input], .mx-xl-4[data-my-input] {\n    margin-left: 1.5rem !important;\n  }\n  .m-xl-5[data-my-input] {\n    margin: 3rem !important;\n  }\n  .mt-xl-5[data-my-input], .my-xl-5[data-my-input] {\n    margin-top: 3rem !important;\n  }\n  .mr-xl-5[data-my-input], .mx-xl-5[data-my-input] {\n    margin-right: 3rem !important;\n  }\n  .mb-xl-5[data-my-input], .my-xl-5[data-my-input] {\n    margin-bottom: 3rem !important;\n  }\n  .ml-xl-5[data-my-input], .mx-xl-5[data-my-input] {\n    margin-left: 3rem !important;\n  }\n  .p-xl-0[data-my-input] {\n    padding: 0 !important;\n  }\n  .pt-xl-0[data-my-input], .py-xl-0[data-my-input] {\n    padding-top: 0 !important;\n  }\n  .pr-xl-0[data-my-input], .px-xl-0[data-my-input] {\n    padding-right: 0 !important;\n  }\n  .pb-xl-0[data-my-input], .py-xl-0[data-my-input] {\n    padding-bottom: 0 !important;\n  }\n  .pl-xl-0[data-my-input], .px-xl-0[data-my-input] {\n    padding-left: 0 !important;\n  }\n  .p-xl-1[data-my-input] {\n    padding: 0.25rem !important;\n  }\n  .pt-xl-1[data-my-input], .py-xl-1[data-my-input] {\n    padding-top: 0.25rem !important;\n  }\n  .pr-xl-1[data-my-input], .px-xl-1[data-my-input] {\n    padding-right: 0.25rem !important;\n  }\n  .pb-xl-1[data-my-input], .py-xl-1[data-my-input] {\n    padding-bottom: 0.25rem !important;\n  }\n  .pl-xl-1[data-my-input], .px-xl-1[data-my-input] {\n    padding-left: 0.25rem !important;\n  }\n  .p-xl-2[data-my-input] {\n    padding: 0.5rem !important;\n  }\n  .pt-xl-2[data-my-input], .py-xl-2[data-my-input] {\n    padding-top: 0.5rem !important;\n  }\n  .pr-xl-2[data-my-input], .px-xl-2[data-my-input] {\n    padding-right: 0.5rem !important;\n  }\n  .pb-xl-2[data-my-input], .py-xl-2[data-my-input] {\n    padding-bottom: 0.5rem !important;\n  }\n  .pl-xl-2[data-my-input], .px-xl-2[data-my-input] {\n    padding-left: 0.5rem !important;\n  }\n  .p-xl-3[data-my-input] {\n    padding: 1rem !important;\n  }\n  .pt-xl-3[data-my-input], .py-xl-3[data-my-input] {\n    padding-top: 1rem !important;\n  }\n  .pr-xl-3[data-my-input], .px-xl-3[data-my-input] {\n    padding-right: 1rem !important;\n  }\n  .pb-xl-3[data-my-input], .py-xl-3[data-my-input] {\n    padding-bottom: 1rem !important;\n  }\n  .pl-xl-3[data-my-input], .px-xl-3[data-my-input] {\n    padding-left: 1rem !important;\n  }\n  .p-xl-4[data-my-input] {\n    padding: 1.5rem !important;\n  }\n  .pt-xl-4[data-my-input], .py-xl-4[data-my-input] {\n    padding-top: 1.5rem !important;\n  }\n  .pr-xl-4[data-my-input], .px-xl-4[data-my-input] {\n    padding-right: 1.5rem !important;\n  }\n  .pb-xl-4[data-my-input], .py-xl-4[data-my-input] {\n    padding-bottom: 1.5rem !important;\n  }\n  .pl-xl-4[data-my-input], .px-xl-4[data-my-input] {\n    padding-left: 1.5rem !important;\n  }\n  .p-xl-5[data-my-input] {\n    padding: 3rem !important;\n  }\n  .pt-xl-5[data-my-input], .py-xl-5[data-my-input] {\n    padding-top: 3rem !important;\n  }\n  .pr-xl-5[data-my-input], .px-xl-5[data-my-input] {\n    padding-right: 3rem !important;\n  }\n  .pb-xl-5[data-my-input], .py-xl-5[data-my-input] {\n    padding-bottom: 3rem !important;\n  }\n  .pl-xl-5[data-my-input], .px-xl-5[data-my-input] {\n    padding-left: 3rem !important;\n  }\n  .m-xl-auto[data-my-input] {\n    margin: auto !important;\n  }\n  .mt-xl-auto[data-my-input], .my-xl-auto[data-my-input] {\n    margin-top: auto !important;\n  }\n  .mr-xl-auto[data-my-input], .mx-xl-auto[data-my-input] {\n    margin-right: auto !important;\n  }\n  .mb-xl-auto[data-my-input], .my-xl-auto[data-my-input] {\n    margin-bottom: auto !important;\n  }\n  .ml-xl-auto[data-my-input], .mx-xl-auto[data-my-input] {\n    margin-left: auto !important;\n  }\n}\n\n.text-justify[data-my-input] {\n  text-align: justify !important;\n}\n\n.text-nowrap[data-my-input] {\n  white-space: nowrap !important;\n}\n\n.text-truncate[data-my-input] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.text-left[data-my-input] {\n  text-align: left !important;\n}\n\n.text-right[data-my-input] {\n  text-align: right !important;\n}\n\n.text-center[data-my-input] {\n  text-align: center !important;\n}\n\n\@media (min-width: 576px) {\n  .text-sm-left[data-my-input] {\n    text-align: left !important;\n  }\n  .text-sm-right[data-my-input] {\n    text-align: right !important;\n  }\n  .text-sm-center[data-my-input] {\n    text-align: center !important;\n  }\n}\n\n\@media (min-width: 768px) {\n  .text-md-left[data-my-input] {\n    text-align: left !important;\n  }\n  .text-md-right[data-my-input] {\n    text-align: right !important;\n  }\n  .text-md-center[data-my-input] {\n    text-align: center !important;\n  }\n}\n\n\@media (min-width: 992px) {\n  .text-lg-left[data-my-input] {\n    text-align: left !important;\n  }\n  .text-lg-right[data-my-input] {\n    text-align: right !important;\n  }\n  .text-lg-center[data-my-input] {\n    text-align: center !important;\n  }\n}\n\n\@media (min-width: 1200px) {\n  .text-xl-left[data-my-input] {\n    text-align: left !important;\n  }\n  .text-xl-right[data-my-input] {\n    text-align: right !important;\n  }\n  .text-xl-center[data-my-input] {\n    text-align: center !important;\n  }\n}\n\n.text-lowercase[data-my-input] {\n  text-transform: lowercase !important;\n}\n\n.text-uppercase[data-my-input] {\n  text-transform: uppercase !important;\n}\n\n.text-capitalize[data-my-input] {\n  text-transform: capitalize !important;\n}\n\n.font-weight-light[data-my-input] {\n  font-weight: 300 !important;\n}\n\n.font-weight-normal[data-my-input] {\n  font-weight: 400 !important;\n}\n\n.font-weight-bold[data-my-input] {\n  font-weight: 700 !important;\n}\n\n.font-italic[data-my-input] {\n  font-style: italic !important;\n}\n\n.text-white[data-my-input] {\n  color: #fff !important;\n}\n\n.text-primary[data-my-input] {\n  color: #007bff !important;\n}\n\na.text-primary[data-my-input]:hover, a.text-primary[data-my-input]:focus {\n  color: #0062cc !important;\n}\n\n.text-secondary[data-my-input] {\n  color: #6c757d !important;\n}\n\na.text-secondary[data-my-input]:hover, a.text-secondary[data-my-input]:focus {\n  color: #545b62 !important;\n}\n\n.text-success[data-my-input] {\n  color: #28a745 !important;\n}\n\na.text-success[data-my-input]:hover, a.text-success[data-my-input]:focus {\n  color: #1e7e34 !important;\n}\n\n.text-info[data-my-input] {\n  color: #17a2b8 !important;\n}\n\na.text-info[data-my-input]:hover, a.text-info[data-my-input]:focus {\n  color: #117a8b !important;\n}\n\n.text-warning[data-my-input] {\n  color: #ffc107 !important;\n}\n\na.text-warning[data-my-input]:hover, a.text-warning[data-my-input]:focus {\n  color: #d39e00 !important;\n}\n\n.text-danger[data-my-input] {\n  color: #dc3545 !important;\n}\n\na.text-danger[data-my-input]:hover, a.text-danger[data-my-input]:focus {\n  color: #bd2130 !important;\n}\n\n.text-light[data-my-input] {\n  color: #f8f9fa !important;\n}\n\na.text-light[data-my-input]:hover, a.text-light[data-my-input]:focus {\n  color: #dae0e5 !important;\n}\n\n.text-dark[data-my-input] {\n  color: #343a40 !important;\n}\n\na.text-dark[data-my-input]:hover, a.text-dark[data-my-input]:focus {\n  color: #1d2124 !important;\n}\n\n.text-muted[data-my-input] {\n  color: #6c757d !important;\n}\n\n.text-hide[data-my-input] {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0;\n}\n\n.visible[data-my-input] {\n  visibility: visible !important;\n}\n\n.invisible[data-my-input] {\n  visibility: hidden !important;\n}\n\n\@media print {\n  *[data-my-input], *[data-my-input]::before, *[data-my-input]::after {\n    text-shadow: none !important;\n    box-shadow: none !important;\n  }\n  a[data-my-input]:not(.btn) {\n    text-decoration: underline;\n  }\n  abbr[title][data-my-input]::after {\n    content: \" (\" attr(title) \")\";\n  }\n  pre[data-my-input] {\n    white-space: pre-wrap !important;\n  }\n  pre[data-my-input], blockquote[data-my-input] {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n  thead[data-my-input] {\n    display: table-header-group;\n  }\n  tr[data-my-input], img[data-my-input] {\n    page-break-inside: avoid;\n  }\n  p[data-my-input], h2[data-my-input], h3[data-my-input] {\n    orphans: 3;\n    widows: 3;\n  }\n  h2[data-my-input], h3[data-my-input] {\n    page-break-after: avoid;\n  }\n  \@page {\n    size[data-my-input]:   a3[data-my-input];\n  }\n  body[data-my-input] {\n    min-width: 992px !important;\n  }\n  .container[data-my-input] {\n    min-width: 992px !important;\n  }\n  .navbar[data-my-input] {\n    display: none;\n  }\n  .badge[data-my-input] {\n    border: 1px solid #000;\n  }\n  .table[data-my-input] {\n    border-collapse: collapse !important;\n  }\n  .table[data-my-input]   td[data-my-input], .table[data-my-input]   th[data-my-input] {\n    background-color: #fff !important;\n  }\n  .table-bordered[data-my-input]   th[data-my-input], .table-bordered[data-my-input]   td[data-my-input] {\n    border: 1px solid #ddd !important;\n  }\n}/*# sourceMappingURL=bootstrap.css.map */"; }
}

export { MyInput };
