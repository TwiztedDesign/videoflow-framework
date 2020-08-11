import {queryParams} from '../queryParams.js';

function qp(data) {
    queryParams.set(data);
}

module.exports = {
    queryParams : qp
};

