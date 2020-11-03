import {broadcast} from '../../utils/helpers';
import {VIDEO_TIME_UPDATE, MODE_CHANGE, DEVICE_CHANGE} from '../../utils/events';
import {showStyle, hideStyle} from '../../utils/customStyle';

function deviceChange(data){
    window.vff.isMobile = data.device === 'mobile';
    if(window.vff.isMobile){
        window.document.body.classList.add('vff-mobile');
    } else {
        window.document.body.classList.remove('vff-mobile');
    }
    broadcast(DEVICE_CHANGE);
}

function modeChange(data){
    window.vff.mode = data.mode;
    broadcast(MODE_CHANGE, data.mode);
    if(window.vff.isController()){
        hideStyle();
    } else {
        showStyle();
    }
}

function playerStatus(data){
    if(!window.vff._playerStatus || data.timecode !== window.vff._playerStatus.timecode){
        broadcast(VIDEO_TIME_UPDATE, data.timecode);
    }
    window.vff._playerStatus = data;
    //TODO handle status change
}

module.exports = {
    deviceChange,
    playerStatus,
    modeChange
};

