import {metadata} from '../metadata.js';
import {createStyle, showStyle} from '../../utils/customStyle';

function handleVFData(data) {
    metadata.set(data.input);

    if(data.mode){
        window.vff.mode = data.mode;
    }
    if(data.customCss){
        createStyle(data.customCss);
        if(!window.vff.isController()){
            showStyle();
        }
    }
    window.vff.onReady();
}

module.exports = {
    handleVFData : handleVFData
};

