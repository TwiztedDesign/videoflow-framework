import {defer} from '../utils/helpers';


const dataProperty = Symbol();
const deferProperty = Symbol();
const appsDeferProperty = Symbol();
const appsProperty = Symbol();

const timeout = 30000;

class Metadata {
    constructor(data){
        this[dataProperty] = data || {};
        this[deferProperty] = defer();
        this[appsDeferProperty] = defer();
        setTimeout(() => {
            this[deferProperty].reject({error : "timeout"});
            this[appsDeferProperty].reject({error : "timeout"});
        }, timeout);

    }
    whenReady(){
        return this[deferProperty].promise;
    }
    appsReady(){
        return this[appsDeferProperty].promise;
    }
    get(){
        return this[dataProperty];
    }
    set(data){
        this[dataProperty] = data;
        this[deferProperty].resolve(data);
    }
    setApps(data){
        this[appsProperty] = data;
        this[appsDeferProperty].resolve(data);
    }
    getApps(){
        return this[appsProperty];
    }

}

export let metadata = new Metadata();
