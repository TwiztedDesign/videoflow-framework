import {defer} from '../utils/helpers';


const dataProperty = Symbol();
const deferProperty = Symbol();
const timeout = 30000;

class Metadata {
    constructor(data){
        this[dataProperty] = data || {};
        this[deferProperty] = defer();
        setTimeout(() => {
            this[deferProperty].reject({error : "timeout"});
        }, timeout);

    }
    whenReady(){
        return this[deferProperty].promise;
    }
    get(){
        return this[dataProperty];
    }
    set(data){
        this[dataProperty] = data;
        this[deferProperty].resolve(data);
    }

}

export let metadata = new Metadata();
