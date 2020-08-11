
let dataProperty = Symbol();

class QueryParams {

    constructor(data){
        this[dataProperty] = data || {};
    }
    get(){
        return this[dataProperty];
    }
    set(data){
        this[dataProperty] = data;
    }

}

export let queryParams = new QueryParams();
