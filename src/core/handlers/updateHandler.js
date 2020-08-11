import {broadcast, flatten, deepCompare, getByPath} from '../../utils/helpers.js';
import {vffState} from '../vffState.js';
import {VFF_EVENT} from '../../utils/events';



async function update(data){
    let oldVal = JSON.parse(JSON.stringify(vffState.data || {}));

    vffState._update(data);

    let flat = flatten(vffState.data, true);
    for(let key in flat){
        let equal = deepCompare(flat[key], getByPath(oldVal, key));
        broadcast(VFF_EVENT + key.toLowerCase(), { dataChanged: !equal, data : flat[key]});
    }
    broadcast(VFF_EVENT, { dataChanged: true, data : vffState.data, oldVal});
}

module.exports = {
    update : update,
};