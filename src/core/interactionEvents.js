import {createXPathFromElement, lookupElementByXPath} from '../utils/xpath';
import {send} from '../utils/messenger';
import {INTERACTION} from '../utils/events';


const events = [
    '__mouseup__',
    '__mousedown__',
    '__mousemove__',
    '__mouseover__',
    '__mouseout__',
    '__mouseenter__',
    '__mouseleave__',
    '__click__',
    '__dblclick__',
    '__touchstart__',
    '__touchend__',
    '__touchmove__',
    '__drag__',
    '__dragstart__',
    '__dragend__',
    '__dragover__',
    '__dragenter__',
    '__dragleave__',
    '__dragexit__',
    '__drop__',
    '__wheel__'
];

function touchesToJson(touches){
    if(!touches) return touches;
    let touchArray = [];

    for (let i = 0; i < touches.length; i++) {
        let touch = touches[i];
        let touchData = {
            clientX : touch.clientX,
            clientY : touch.clientY,
            pageX   : touch.pageX,
            pageY   : touch.pageY
        };
        touchArray.push(touchData);
    }
    return touchArray;
}

function sync(e){
    if(e.ctrlKey && e.metaKey && e.altKey && e.shiftKey) return;
    let msg = {};
    msg["__" + e.type + "__"] = {
        pageX: e.pageX,
        pageY: e.pageY,
        clientX: e.clientX,
        clientY: e.clientY,
        deltaX : e.deltaX,
        deltaY : e.deltaY,
        deltaZ : e.deltaZ,
        deltaMode : e.deltaMode,
        target: createXPathFromElement(e.target),
        touches: touchesToJson(e.touches),
        targetTouches: touchesToJson(e.targetTouches),
        changedTouches: touchesToJson(e.changedTouches)
    };
    send(INTERACTION, msg);


}

function bindSyncEvents(element){
    events.forEach((event) => {
        event = event.replace(/__/g, '');
        element.addEventListener(event, sync, true);
    });
}

function dispatchEvent(event, data){
    let target;
    if(['__click__'].indexOf(event) > -1){
        target = document.elementFromPoint(data.pageX, data.pageY);
    } else {
        target = lookupElementByXPath(data.target);
    }
    data.bubbles = true;
    data.cancelable = true;
    data.ctrlKey = data.metaKey = data.altKey = data.shiftKey = true; //Distinct the event to avoid looping
    data.view = window;
    // data.detail = {"test" : true};

    if(target){
        if(['__touchstart__', '__touchend__', '__touchmove__'].indexOf(event) > -1){
            target.dispatchEvent(new TouchEvent(event.slice(2, -2), handleTouchEvent(data,target)));
        } else if(event === '__wheel__'){
            target.dispatchEvent(new WheelEvent(event.slice(2, -2), data));
        } else {
            target.dispatchEvent(new MouseEvent(event.slice(2, -2), data));
        }
    } else {
        window.console.log('cannot find target:', data.target);
    }
}

function handleTouchEvent(data,target){
    data.changedTouches = createTouchArray(data.changedTouches,target);
    data.targetTouches = createTouchArray(data.targetTouches,target);
    data.touches = createTouchArray(data.touches,target);
    return data;
}

function createTouchArray(touches,target){
    return touches.map(function(touch){
        touch.identifier = Date.now();
        touch.target = target;
        return new Touch(touch);
    });
}

function isInteractionEvent(event){
    return events.indexOf(event) > -1;
}




module.exports = {
    "sync" : sync,
    "events" : events,
    "bindSyncEvents" : bindSyncEvents,
    "isInteractionEvent" : isInteractionEvent,
    "dispatchEvent" : dispatchEvent
};
