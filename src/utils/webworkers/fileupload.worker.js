let uploads = {};

function upload(file, url, uuid){

    let req = new XMLHttpRequest();
    uploads[uuid] = req;
    req.open("PUT", url, true);
    req.setRequestHeader('Content-type', file.type);
    req.upload.onprogress = function(event) {
        self.postMessage(JSON.stringify({uuid, type: 'progress', progress : event.loaded / event.total, loaded : event.loaded, total : event.total}));
    };
    req.onreadystatechange = function () {
        if (req.readyState !== 4) return;
        if (req.status >= 200 && req.status < 300) {
            self.postMessage(JSON.stringify({uuid, type: 'success', filename : file.name}));
            delete uploads[uuid];
        } else {
            self.postMessage(JSON.stringify({uuid, type: 'error', data: {
                    status: req.status,
                    statusText: req.statusText
                }}));
            delete uploads[uuid];
        }
    };
    req.send(file);
}

function cancel(uuid){
    try {
        uploads[uuid].abort();
        delete uploads[uuid];
    } catch(e){
        //
    }

}



self.onmessage = function(e) {

    switch(e.data.cmd){
        case "upload":
            upload(e.data.file, e.data.url, e.data.uuid);
            break;
        case "cancel":
            cancel(e.data.uuid);
            break;
    }
};