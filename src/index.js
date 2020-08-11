import {send, request} from './utils/messenger.js';
import {setup} from './core/vffSetup';
import {READY, CUSTOM_READY, MODE_CHANGE} from './utils/events.js';
import {vffState} from './core/vffState.js';
import {queryParams} from "./core/queryParams.js";
import {start as startListener} from './utils/listener';

import {init as initResizeHandler} from './utils/resizeHandler';


import {isMobile, extend, defer, uuid, on} from './utils/helpers';
import * as eventsApi from './core/api/events';
import * as playerApi from './core/api/player';
import {api as videoApi} from './core/api/video';
import * as httpApi from './core/api/http';
import {MODE} from './core/consts';
import * as noOverScroll from './utils/noOverscroll';
import {colorPicker} from './utils/helpers/colorpicker.js';
// import Sortable from './utils/helpers/sortable';

startListener();

window.addEventListener('load', () => {
    initResizeHandler();
    isMobile ? window.document.body.classList.add('vff-mobile') : window.document.body.classList.remove('vff-mobile');
    send(READY);
});

const _readyCallbacks = [];

const vff = {};

vff.ready               = (cb) => {_readyCallbacks.push(cb);};
vff.onReady             = () => {_readyCallbacks.forEach(cb => {cb();});}; //todo shouldn't be public
vff.customReady         = () => {send(CUSTOM_READY);};

vff.getQueryParams      = () => {return queryParams.get();};
vff.request             = (type, payload, cb) => { request(type, payload, cb); };
vff.setup               = (options) => {return setup(options);};

vff.isMobile            = isMobile;
vff.isController        = () => {return vff.mode === MODE.PREVIEW || vff.mode === MODE.PROGRAM;};
vff.mode                = MODE.NORMAL;
vff.MODE                = MODE; //Enum


vff.defer               = defer;
vff.extend              = (name, extension) => { vff[name] = extension; };


vff.uuid                = uuid();
vff.enableOverscroll    = () => {noOverScroll.disable();}; //Enabled by default
vff.disableOverscroll   = () => {noOverScroll.enable();}; //When disabled, body is not scrollable


extend(vff, playerApi);
extend(vff, eventsApi);

vff._playerStatus = {};

vff.onModeChange = (cb) => {
    on(MODE_CHANGE, cb);
};
vff.colorpicker = (el,options) => {colorPicker(el,options);};
// vff.sortable = (el, items, options) => {return new Sortable(el, items, options);};

/********* State *********/
vff.state = vffState.data;
vff.send = (path) => { return vffState.take(path);};
vff.style = vffState.style();
vff.onStateChange = (namespace, cb, options) => {return vffState.on(namespace, cb, options);};
vff.upload = (asset, cb) => {return vffState.upload(asset, cb);};
/************************/

vff.extend('video', videoApi);
vff.extend('http', httpApi);


module.exports = vff;