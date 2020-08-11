const events = require("../../src/utils/events");
import * as handlers from '../../src/core/handlers';
const listener = require('../../src/utils/listener.js');
const spy = jest.spyOn(window, 'addEventListener');

beforeAll(() => {

});

describe("listener", () =>{
    describe("Start", () => {
        it("Should add to the window obj an event listener for 'massage'", () => {
            listener.start();
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith('message', expect.any(Function), false);
        });
    });




});


test('dummy test', () => {
    expect(true).toBe(true);
});