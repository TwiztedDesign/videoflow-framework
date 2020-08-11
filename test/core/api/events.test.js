const eventsApi       = require('../../../src/core/api/events');
const messenger = require('../../../src/utils/messenger.js');
import {TRACK_EVENT} from '../../../src/utils/events';

describe("Events Api", () =>{
    describe("Track", () => {
        it("Should send track event with primitive data", () => {
            //Arrange
            const send = jest.spyOn(messenger, 'send');
            const eventName = 'test';
            const eventPrimitiveData = '123';

            //Act
            eventsApi.track(eventName, eventPrimitiveData);

            //Assert
            expect(send).toHaveBeenCalledTimes(1);
            expect(send).toHaveBeenCalledWith(TRACK_EVENT, {name: eventName, data: eventPrimitiveData, query: undefined});
        });

        it("Should send track event with object data", () => {
            //Arrange
            const send = jest.spyOn(messenger, 'send');
            const eventName = 'test';
            const eventObjectData = {'123':'456'};

            //Act
            eventsApi.track(eventName, eventObjectData);

            //Assert
            expect(send).toHaveBeenCalledTimes(1);
            expect(send).toHaveBeenCalledWith(TRACK_EVENT, {name: eventName, data: eventObjectData, query: undefined});
        });

        it("Should send track event with undefined data", () => {
            //Arrange
            const send = jest.spyOn(messenger, 'send');
            const eventName = 'test';
            const eventUndefinedData = undefined;

            //Act
            eventsApi.track(eventName, eventUndefinedData);

            //Assert
            expect(send).toHaveBeenCalledTimes(1);
            expect(send).toHaveBeenCalledWith(TRACK_EVENT, {name: eventName, data: eventUndefinedData, query: undefined});
        });

        it("Should send track event with undefined data and undefined name", () => {
            //Arrange
            const send = jest.spyOn(messenger, 'send');
            const eventName = undefined;
            const eventUndefinedData = undefined;

            //Act
            eventsApi.track(eventName, eventUndefinedData);

            //Assert
            expect(send).toHaveBeenCalledTimes(1);
            expect(send).toHaveBeenCalledWith(TRACK_EVENT, {name: eventName, data: eventUndefinedData, query: undefined});
        });

    });
});