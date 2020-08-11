function findKey(data, keyToFind) {
    let keys = Object.keys(data);
    for(let i = 0 ; i < keys.length ; i++){
        if(keys[i].toLowerCase() === keyToFind.toLowerCase()){
            return keys[i];
        }
    }
}
function trim(str, charList) {
    if (charList === undefined) {
        charList = "\\s";
    }
    return str
        .replace(new RegExp("^[" + charList + "]+"), "")
        .replace(new RegExp("[" + charList + "]+$"), "");
}

function isObject(obj){
    return obj === Object(obj) && !Array.isArray(obj) && !(obj instanceof HTMLElement);
}

function getByPath(obj, path){
    path = path? trim(path, '.').split('.') : [""];

    let result = obj;
    for (let i = 0; i < path.length; i++) {
        result = result[path[i]];
        if(result === undefined){
            return result;
        }
    }

    return result;
}
function setByPath(obj, path, value){
    if(arguments.length !== 3){
        throw new Error('Missing Arguments!');
    }
    path = path? trim(path, '.').split('.') : [""];
    let result = obj;
    for (let i = 0; i < path.length; i++) {
        if(i === path.length -1){
            result[path[i]] = value;
        } else {
            if(result[path[i]] !== undefined){
                result = result[path[i]];
            }else {
                return;
            }
        }
    }
}

function isFunction(functionToCheck) {
    return !!functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

function camelize(str) {
    return str
        .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
        .replace(/\s/g, '')
        .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
    // return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    //     return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    // }).replace(/\s+/g, '');
}
function decamelize(str) {
    return str.replace(/([A-Z])/g, ' $1').trim();
}

function uuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
}

function mobilecheck() {
    let check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|Tablet|iPad|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true; // eslint-disable-line no-useless-escape
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}
function controllerCheck(){
    try{
        return window.frameElement.ownerDocument.defaultView.frameElement.hasAttribute('controller');
    } catch (err){
        return false;
    }
}

function extend(a, b){
    for(let key in b)
        if(b.hasOwnProperty(key))
            a[key] = b[key];
    return a;
}

function deepExtend(destination, source) {
    for (let property in source) {
        // if (source[property] && source[property].constructor && source[property].constructor === Object) {
        if (source[property] && isObject(source[property])) {
            destination[property] = (destination[property] && isObject(destination[property]))?
                destination[property] : {};
            deepExtend(destination[property], source[property]);
        } else {
            destination[property] = source[property];
        }
    }
    return destination;
}


// function modeCheck(){
//     //"controller_preview" "controller_program" "editor" "player_external" "player_internal"
//     let mode = 'normal';
//
//     try{
//         let frame = window.frameElement.ownerDocument.defaultView.frameElement;
//         mode = frame.getAttribute('vff-mode') || mode;
//     } catch (err){
//         // not in iframe
//     }
//     return mode;
// }
function docRef(anchor){
    return 'https://www.videoflow.io/documentation/api/vff?id=' + anchor;
}


//compares only properties from lhs and ignores properties that start with _
function deepCompare () {
    var i, l, leftChain, rightChain;

    function compare2Objects (x, y) {
        var p;

        // remember that NaN === NaN returns false
        // and isNaN(undefined) returns true
         if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
            return true;
        }

        // Compare primitives and functions.
        // Check if both arguments link to the same object.
        // Especially useful on the step where we compare prototypes
        if (x === y) {
            return true;
        }

        // Works in case when functions are created in constructor.
        // Comparing dates is a common scenario. Another built-ins?
        // We can even handle functions passed across iframes
        if ((typeof x === 'function' && typeof y === 'function') ||
            (x instanceof Date && y instanceof Date) ||
            (x instanceof RegExp && y instanceof RegExp) ||
            (x instanceof String && y instanceof String) ||
            (x instanceof Number && y instanceof Number)) {
            return x.toString() === y.toString();
        }

        // At last checking prototypes as good as we can
        if (!(x instanceof Object && y instanceof Object)) {
            return false;
        }

        if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
            return false;
        }

        if (x.constructor !== y.constructor) {
            return false;
        }

        if (x.prototype !== y.prototype) {
            return false;
        }

        if (x instanceof Array && y instanceof Array && x.length !== y.length){
             return false;
        }

        // Check for infinitive linking loops
        if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
            return false;
        }

        // Quick checking of one object being a subset of another.
        // todo: cache the structure of arguments[0] for performance
        // for (p in y) {
        //     if(!p.startsWith('_')){
        //         if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        //             return false;
        //         }
        //         else if (typeof y[p] !== typeof x[p]) {
        //             return false;
        //         }
        //     }
        //
        // }

        for (p in x) {
            if(!p.startsWith('_')) {
                if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                    return false;
                }
                else if (typeof y[p] !== typeof x[p]) {
                    return false;
                }


                switch (typeof (x[p])) {
                    case 'object':
                    case 'function':

                        leftChain.push(x);
                        rightChain.push(y);

                        if (!compare2Objects(x[p], y[p])) {
                            return false;
                        }

                        leftChain.pop();
                        rightChain.pop();
                        break;

                    default:
                        if (x[p] !== y[p]) {
                            return false;
                        }
                        break;
                }
            }
        }

        return true;
    }

    if (arguments.length < 1) {
        return true;
    }

    for (i = 1, l = arguments.length; i < l; i++) {

        leftChain = []; //Todo: this can be cached
        rightChain = [];

        if (!compare2Objects(arguments[0], arguments[i])) {
            return false;
        }
    }

    return true;
}
function broadcast(event, data){
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
}
function on(event, listener){

    document.addEventListener(event, e => {listener(e.detail);});
}
function off(event, listener){
    document.removeEventListener(event, listener);
}
function defer(){
    let resolve = noop, reject = noop;
    let promise =  new Promise(function(res, rej) {
        resolve = res;
        reject  = rej;
    });
    return {
        promise : promise,
        resolve : resolve,
        reject  : reject
    };
}
function getQueryParams(queryString){

    let search = queryString || location.href.split("?")[1] || location.search.substring(1);
    try{
        return JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', (key, value) => { return key === "" ? value : decodeURIComponent(value); });
    } catch (err){
        return {};
    }
}


const queryDefaultOptions = {
    insensitive : false
};
function lower(str){
    if(str && str.toLowerCase){
        return str.toLowerCase();
    }
    return str;
}

function query(collection, query, options){
    options = Object.assign({}, queryDefaultOptions, options || {});
    let found = [];
    collection.forEach(function(item) {
        let match = true;
        for(let key in query){
            if(options.insensitive && lower(query[key]) !== lower(item[findKey(item, key)])){
                match = false;
            } else if(!options.insensitive && query[key] !== item[key]){
                match = false;
            }

        }
        if(match){
            found.push(item);
        }
    });
    return found;
}
function queryOne(collection, q, options){
    let found = query(collection, q, options);
    return found.length? found[0] : undefined;
}
function filter(collection, fn){
    let filtered = [];
    collection.forEach(item => {
        if(fn(item)){
            filtered.push(item);
        }
    });
    return filtered;
}
function parseRJSON(json){
    return JSON.parse(

        json.replace(/:\s*"([^"]*)"/g, function(match, p1) {
            return ': "' + p1.replace(/:/g, '@colon@') + '"';
        })

        // Replace all single quotes with double quotes - this is correct only because this function is used only to parse html attributes
        .replace(/'/g,'"')

        // Replace ":" with "@colon@" if it's between single-quotes
        .replace(/:\s*'([^']*)'/g, function(match, p1) {
            return ': "' + p1.replace(/:/g, '@colon@') + '"';
        })

        // Add double-quotes around any tokens before the remaining ":"
        .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ')

        // Turn "@colon@" back into ":"
        .replace(/@colon@/g, ':')
    );
}

function overlaod(object, name, fn){
    const old = object[ name ];
    if ( old ) {
        object[name] = function () {
            if (fn.length == arguments.length)
                return fn.apply(this, arguments);
            else if (typeof old == 'function')
                return old.apply(this, arguments);
        };
    }
    else {
        object[name] = fn;
    }
}

function getAllChildrenIncludinShadowDOM(el){
    let shadow = el.shadowRoot;
    let children = Array.from(el.children || []);
    if(shadow){
        children = children.concat(Array.from(shadow.children || []));
    }
    return children;
}

function searchAttributeHelper(acc, element, attr, value){
    if(element.hasAttribute && element.hasAttribute(attr) && (value === undefined || element.getAttribute(attr).replace(/\[/g,".").replace(/\]/g,".").replace(/\.\./g, ".").replace(/\.$/, "") === value)){
        acc.push(element);
    }
    if(!element.shadowRoot && (!element.children || !element.children.length)){
        return acc;
    } else {
        let children = getAllChildrenIncludinShadowDOM(element);

        for(let i = 0 ; i < children.length ; i++){
            searchAttributeHelper(acc, children[i], attr, value);
        }
    }
    return acc;
}

function searchAttribute(attr, value, element){
    if(Array.isArray(attr)){
        return [...new Set(attr.map((att) => searchAttributeHelper([], element || document, att, value)).flat())];
    } else {
        return searchAttributeHelper([], element || document, attr, value);
    }
}

function debounce(func, wait, immediate) {
    let timeout;

    return function executedFunction() {
        let context = this;
        let args = arguments;

        let later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        let callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
}


function flatten(data, keepObjects) {
    const result = {};

    function recurse(cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
            let l = cur.length;
            if(keepObjects) result[prop] = cur; //add for full array reference
            for (let i = 0 ; i < l; i++)
                recurse(cur[i], prop + "." + i);
            if (l === 0) result[prop] = [];
        } else {
            let isEmpty = true;
            for (let p in cur) {
                isEmpty = false;
                if(keepObjects) result[prop ? prop + "." + p : p] = cur[p]; //add for full object reference
                recurse(cur[p], prop ? prop + "." + p : p);
            }
            if (isEmpty && prop) result[prop] = {};
        }
    }
    recurse(data, "");
    return result;
}
function unflatten(data) {
    if (Object(data) !== data || Array.isArray(data))
        return data;
    var result = {}, cur, prop, idx, last, temp;
    for(var p in data) {
        cur = result, prop = "", last = 0;
        do {
            idx = p.indexOf(".", last);
            temp = p.substring(last, idx !== -1 ? idx : undefined);
            cur = cur[prop] || (cur[prop] = (!isNaN(parseInt(temp)) ? [] : {}));
            prop = temp;
            last = idx + 1;
        } while(idx >= 0);
        cur[prop] = data[p];
    }
    return result[""];
}

function format(string, ...args) {
    return string.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
}
function escapeRegExp(string) {
    return string.replace(/[.*+?^$(){}|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
function unformat(string, pattern){
    let r = new RegExp(escapeRegExp(pattern).replace(/\\{(\d+)\\}/g, "(.*)"));
    let match = string.match(r);
    if(match && match.length > 1){
        return match[1];
    }
}
function loadScript(url) {
    let script = document.createElement("script");
    script.src = url;
    document.head.appendChild(script);
}
function loadStyle(url){
    let link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}


function noop(){}



module.exports = {
    findKey         : findKey,
    trim            : trim,
    getByPath       : getByPath,
    setByPath       : setByPath,
    camelize        : camelize,
    decamelize      : decamelize,
    uuid            : uuid,
    extend          : extend,
    deepExtend      : deepExtend,
    deepCompare     : deepCompare,
    isMobile        : mobilecheck(),
    isController    : controllerCheck(),
    // mode            : modeCheck(),
    docRef          : docRef,
    broadcast       : broadcast,
    on              : on,
    off             : off,
    defer           : defer,
    noop            : noop,
    query           : query,
    queryOne        : queryOne,
    filter          : filter,
    getQueryParams  : getQueryParams,
    parseRJSON      : parseRJSON,
    isFunction      : isFunction,
    isObject        : isObject,
    overlaod,
    searchAttribute,
    debounce,
    flatten,
    unflatten,
    format,
    unformat,
    loadScript,
    loadStyle
};