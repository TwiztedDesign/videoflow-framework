import {send} from '../../utils/messenger.js';
import {GO, CROP, AUDIO_TRACK, TRANSFORM} from '../../utils/events.js';
import {noop, overlaod} from '../../utils/helpers';


function go(target, time){
    send(GO,{
        target  : target,
        time    : time
    });
}
function crop(top, left, width, height){
    if(top === undefined){
        throw new Error("vff.crop incorrect usage, please pass width, height, top and left values");
    } else {
        if(height === undefined) {height = width;}
        send(CROP, left === undefined? {crop : top} : {top, left, width, height});
    }
}


function transform(fromTopLeftX, fromTopLeftY, fromBottomRightX, fromBottomRightY, toTopLeftX, toTopLeftY, toBottomRightX, toBottomRightY, options){
    for (let arg of arguments) {
        if(arg === undefined){
            throw new Error("vff.transform incorrect usage, please pass fromTopLeftX, fromTopLeftY, fromBottomRightX, fromBottomRightY, toTopLeftX, toTopLeftY, toBottomRightX and toBottomRightY values");
        }
    }
    send(TRANSFORM, {fromTopLeftX, fromTopLeftY, fromBottomRightX, fromBottomRightY, toTopLeftX, toTopLeftY, toBottomRightX, toBottomRightY, options});
}
let transformFunctions = {};
overlaod(transformFunctions,'transform', () => {
    transform();
});
overlaod(transformFunctions,'transform', (x0,y0,x1,y1) => {
    transform(x0,y0,x1,y1,0,0,1,1,{});
});
overlaod(transformFunctions,'transform', (x0,y0,x1,y1,options) => {
    transform(x0,y0,x1,y1,0,0,1,1,options);
});
overlaod(transformFunctions,'transform', (x0,y0,x1,y1,x00,y00,x11,y11) => {
    transform(x0,y0,x1,y1,x00,y00,x11,y11,{});
});
overlaod(transformFunctions,'transform', (x0,y0,x1,y1,x00,y00,x11,y11, options) => {
    transform(x0,y0,x1,y1,x00,y00,x11,y11,options);
});


function switchAudioTrack(channel){
    send(AUDIO_TRACK, channel);
}


module.exports = {
    go                      : go,
    crop                    : crop,
    transform               : transformFunctions.transform,
    audioTrack              : switchAudioTrack,
    videoTransform          : crop,
    next                    : noop,
    previous                : noop,
    home                    : noop
};
