import {TRACK_EVENT} from '../../utils/events.js';
import {send} from '../../utils/messenger';
import {queryParams} from '../../core/queryParams.js';

module.exports = {

    track : (name, data) => {
        let payload = {};
        payload.name = name;
        payload.data = data;
        payload.query = queryParams.get();
        send(TRACK_EVENT, payload);
    }
};

