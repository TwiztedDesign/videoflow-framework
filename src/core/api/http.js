import {defer} from "../../utils/helpers";

function get(url, callback) {
    let deferred = defer();
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        //TODO handle reject on callback
        if (xmlHttp.readyState == 4) {
            if(xmlHttp.status == 200){
                if(callback){
                    callback(xmlHttp.responseText);
                }
                deferred.resolve(xmlHttp.responseText);
            } else {
                deferred.reject(xmlHttp.status);
            }
        }
    };
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
    return deferred.promise;
}


module.exports = {
    get          : get

};
