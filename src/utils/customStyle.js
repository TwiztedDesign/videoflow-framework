let customStyleElement;
const customStyleElementId = 'vf-custom-style';

function createStyle(styleString) {

    customStyleElement = document.createElement('style');
    customStyleElement.textContent = styleString;
    customStyleElement.id = customStyleElementId;
}
function showStyle(){
    if(customStyleElement && !document.getElementById(customStyleElementId)) {
        document.head.append(customStyleElement);
    }
}
function hideStyle(){
    try{
        document.getElementById(customStyleElementId).remove();
    } catch (e) {
        //element doesn't exist
    }
}

module.exports = {
    createStyle, showStyle, hideStyle
};

