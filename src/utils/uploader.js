import {uuid} from './helpers';

let uploads = {};

// import Worker from './webworkers/fileupload.worker.js';
//
// let worker = new Worker();
// // let worker = new Worker('./webworkers/fileupload.js', { type: "module" });
//
// worker.onerror = function (e) {
//     console.log('ERROR: Line ', e.lineno, ' in ', e.filename, ': ', e.message);
// };
//




function _upload(file, url, options){

    let uid = uuid();
    options = options || {};
    let req = new XMLHttpRequest();
    uploads[uid] = req;
    req.open("PUT", url, true);
    req.setRequestHeader('Content-type', file.type);
    req.upload.onprogress = function() {
        if(options.onProgress){
            options.onProgress(event.loaded / event.total);
        }
        // console.log(JSON.stringify({uuid, type: 'progress', progress : event.loaded / event.total, loaded : event.loaded, total : event.total}));
    };
    req.onreadystatechange = function () {
        if (req.readyState !== 4) return;
        if (req.status >= 200 && req.status < 300) {
            if(options.onSuccess){
                options.onSuccess();
            }
            // console.log(JSON.stringify({uuid, type: 'success', filename : file.name}));
            delete uploads[uuid];
        } else {
            // console.log(JSON.stringify({uuid, type: 'error', data: {
            //         status: req.status,
            //         statusText: req.statusText
            //     }}));
            if(options.onError){
                options.onError({
                    status: req.status,
                    statusText: req.statusText
                });
            }
            delete uploads[uuid];
        }
    };
    req.send(file);
}



// function uploadFile(file, uploadUrl){
//     let uid = uuid();
//     let handler = function(e){
//         let msg = JSON.parse(e.data);
//         if(msg.uuid !== uid) return;
//         switch (msg.type){
//             case 'progress':
//                 // console.log(`${(msg.progress*100).toFixed(0)}%`);
//                 break;
//
//             case 'success':
//                 worker.removeEventListener('message', handler);
//                 delete uploads[uid];
//                 break;
//             case 'error':
//                 if(msg.data.status !== 0 || msg.data.statusText){
//                     // console.log('Failed to upload file - error ', msg.data.statusText);
//                 }
//                 worker.removeEventListener('message', handler);
//
//                 delete uploads[uid];
//                 break;
//             default:
//                 break;
//         }
//     };
//
//     worker.addEventListener('message', handler);
//
//     uploads[uid] = true;
//     worker.postMessage({
//         cmd     : 'upload',
//         file,
//         url     : uploadUrl,
//         uuid: uid
//     });
// }

module.exports = {
    uploadFile : _upload
};