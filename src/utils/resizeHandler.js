import {isMobile} from '../utils/helpers';

const classes = {
    'overlay-fill'      : 'vff-overlay-fill',
    'overlay-fit'       : 'vff-overlay-fit',
    'video-fit'         : 'vff-video-fit',
    'video-fill'        : 'vff-video-fill',
    'video-fitTop'      : 'vff-video-fit-top',
    'video-fitBottom'   : 'vff-video-fit-bottom',
};

function readDeviceOrientation(){
    //We are using this method in order no to use window.orientation
    //window.orientation gives different results on Android and iOS
    let screenOrientation = window.innerWidth > window.innerHeight? 'landscape' : 'portrait';
    let orientation = ((window.screen.orientation && window.screen.orientation.type.indexOf('portrait') >= 0) || screenOrientation === 'portrait')? 'Portrait' : 'Landscape';
    return orientation;
}

function resizeHandler(){
    let overlaySizing = '';
    let videoSizing = '';
    try {
        overlaySizing = window.vff._playerStatus[`overlaySizing${isMobile? readDeviceOrientation(): ''}`];
        videoSizing = window.vff._playerStatus[`contentSizing${isMobile? readDeviceOrientation(): ''}`];
    } catch (e) {
        //no status yet
    }
    Object.values(classes).forEach(c => {
        window.document.body.classList.remove(c);
    });
    window.document.body.classList.add(classes[`overlay-${overlaySizing}`]);
    window.document.body.classList.add(classes[`video-${videoSizing}`]);
}


module.exports = {
    init : ()=>{
        window.addEventListener('resize', ()=>{
            resizeHandler();
        });
        resizeHandler();
    }
};
