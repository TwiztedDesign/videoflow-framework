
let dataProperty = Symbol();

class Pages {

    constructor(data){
        this[dataProperty] = data || [];
    }
    get(){
        return this[dataProperty];
    }
    set(data){
        this[dataProperty] = data;
    }

}

export let pages = new Pages();
