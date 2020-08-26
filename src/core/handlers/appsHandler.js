import {metadata} from '../metadata.js';


function handleApps(data) {
    metadata.setApps(data.apps);
}

module.exports = {
    apps : handleApps
};

