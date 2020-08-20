import {metadata} from '../metadata.js';

function addStyle(styleString) {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
}

function handleVFData(data) {
    metadata.set(data.input);

    if(data.mode){
        window.vff.mode = data.mode;
    }
    if(data.customCss){
        addStyle(data.customCss);
    }
    window.vff.onReady();
}

module.exports = {
    handleVFData : handleVFData
};

