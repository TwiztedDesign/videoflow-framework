import {send} from '../../utils/messenger.js';
import {on} from '../../utils/helpers.js';
import {VIDEO_TIME_UPDATE} from '../../utils/events';
const api = {};

Object.defineProperty(api, 'currentTime', {
    get : function() {
        return window.vff._playerStatus.timecode;
    }
});

Object.defineProperty(api, 'src', {
    get : function() {
        return window.vff._playerStatus.src;
    }
});

Object.defineProperty(api, 'duration', {
    get : function() {
        return window.vff._playerStatus.duration;
    }
});

Object.defineProperty(api, 'paused', {
    get : function() {
        return window.vff._playerStatus.paused;
    }
});

Object.defineProperty(api, 'muted', {
    get : function() {
        return window.vff._playerStatus.muted;
    }
});

api.play = function(){
    send('vff-play');
};

api.pause = function(){
    send('vff-pause');
};

api.goTo = function(time){
    send('vff-video-go', {time});
};

api.onTimeUpdate = function(fn){
    on(VIDEO_TIME_UPDATE, fn);
};


/*
-- isPlaying //(paused)
-- currentTime
-- length //(duration)
gotTo(time, play)
-- play()
-- pause()
onProgress //timeupdate
onsStateChange(state=>{})
-- src
 */

module.exports = {api};