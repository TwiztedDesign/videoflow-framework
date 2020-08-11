let events = require("../utils/events.js");
import {update} from "./handlers/updateHandler.js";
import {pages} from "./handlers/pagesHandler.js";
import {queryParams} from "./handlers/queryParamsHandler.js";
import {reload} from "./handlers/reloadHandler.js";
import {handleVFData} from './handlers/vfDataHandler';
import {deviceChange, playerStatus, modeChange} from './handlers/playerHandler';

let handlers = {};
handlers['vff-update'] = (e) => {
    update(e.event.data);
};
handlers[events.PAGES] = pages;
handlers[events.QUERY_PARAMS] = queryParams;
handlers[events.RELOAD] = reload;
handlers[events.VF_DATA] = handleVFData;
handlers[events.DEVICE_CHANGE] = deviceChange;
handlers[events.PLAYER_STATUS] = playerStatus;
handlers[events.MODE_CHANGE] = modeChange;


module.exports = handlers;