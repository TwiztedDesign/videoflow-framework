
export default class VFFEvent {
    constructor(data){
        //namespace, data, timecode, changed
        Object.assign(this, data);
    }
}
