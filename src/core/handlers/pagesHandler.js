import {pages} from '../pages.js';

function addPages(data) {
    pages.set(data);
}

module.exports = {
    pages : addPages
};

