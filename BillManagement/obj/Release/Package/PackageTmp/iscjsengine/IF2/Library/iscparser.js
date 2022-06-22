// IIFE (immediately-invoked function expression) to determain the scope of the function
//(function (window, document, undefined) {
//    // 'use strict';    
var
    slice = [].slice,
    $isc = window.$isc || (window.$isc = {});
function initilize($isc) {
    extend($isc, {
        'isUndefined': isUndefined,
        'isDefined': isDefined,
        'isString': isString,
        'isFunction': isFunction,
        'isObject': isObject,
        'isNumber': isNumber,
        'isElement': isElement,
        'isArray': isArray,
        'isDate': isDate,
        'lowercase': lowercase,
        'uppercase': uppercase,
        'executeFunction': executeFunction,
        'readArrayUsingProperty': readArrayUsingProperty
    });
}
function readArrayUsingProperty(object, property, value) {    
    var matchedArray= [];
    if (object) {
        $.each(object, function (index, item) {
            if (item[property] == value) {
                matchedArray.push(item);
            }
        });
    }
    return matchedArray;
}
function executeFunction(functionName, context, args) {
    var args = [].slice.call(arguments).splice(2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(this, args);
}
function isDefined(value) { return typeof value !== 'undefined'; }
function isUndefined(value) { return typeof value === 'undefined'; }
function isObject(value) { return value !== null && typeof value === 'object'; }
function isBlankObject(value) {
    return value !== null && typeof value === 'object' && !getPrototypeOf(value);
}
function isString(value) { return typeof value === 'string'; }
function isNumber(value) { return typeof value === 'number'; }
function isDate(value) {
    return toString.call(value) === '[object Date]';
}
var isArray = Array.isArray;
function isFunction(value) { return typeof value === 'function'; }
function isRegExp(value) {
    return toString.call(value) === '[object RegExp]';
}
function isWindow(obj) {
    return obj && obj.window === obj;
}
function isScope(obj) {
    return obj && obj.$evalAsync && obj.$watch;
}
function isFile(obj) {
    return toString.call(obj) === '[object File]';
}
function isFormData(obj) {
    return toString.call(obj) === '[object FormData]';
}
function isBlob(obj) {
    return toString.call(obj) === '[object Blob]';
}
function isBoolean(value) {
    return typeof value === 'boolean';
}
function isElement(node) {
    return !!(node &&
      (node.nodeName  // we are a direct element
      || (node.prop && node.attr && node.find)));  // we have an on and find method part of jQuery API
}
var lowercase = function (string) { return isString(string) ? string.toLowerCase() : string; };
var uppercase = function (string) { return isString(string) ? string.toUpperCase() : string; };
function extend(dst) {
    return baseExtend(dst, slice.call(arguments, 1), false);
}
function setHashKey(obj, h) {
    if (h) {
        obj.$$hashKey = h;
    } else {
        delete obj.$$hashKey;
    }
}
function baseExtend(dst, objs, deep) {
    var h = dst.$$hashKey;

    for (var i = 0, ii = objs.length; i < ii; ++i) {
        var obj = objs[i];
        if (!isObject(obj) && !isFunction(obj)) continue;
        var keys = Object.keys(obj);
        for (var j = 0, jj = keys.length; j < jj; j++) {
            var key = keys[j];
            var src = obj[key];

            if (deep && isObject(src)) {
                if (isDate(src)) {
                    dst[key] = new Date(src.valueOf());
                } else if (isRegExp(src)) {
                    dst[key] = new RegExp(src);
                } else {
                    if (!isObject(dst[key])) dst[key] = isArray(src) ? [] : {};
                    baseExtend(dst[key], [src], true);
                }
            } else {
                dst[key] = src;
            }
        }
    }

    setHashKey(dst, h);
    return dst;
}
initilize($isc);
//})(window, document);

