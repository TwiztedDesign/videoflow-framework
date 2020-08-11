function handleVFData(data) {
    if(data.mode){
        window.vff.mode = data.mode;
    }
    window.vff.onReady();
}

module.exports = {
    handleVFData : handleVFData
};

