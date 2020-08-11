import {send} from "../utils/messenger";
import {VF_SETUP} from "../utils/events";

function setup(options){
    if(options){
        send(VF_SETUP, options);
    }
}

module.exports = {
    setup          : setup
};