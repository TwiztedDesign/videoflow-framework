import {setup} from '../../src/core/vffSetup';
import {VF_SETUP} from "../../src/utils/events";
const messenger     = require('../../src/utils/messenger.js');
const sendSpy = jest.spyOn(messenger, 'send');

describe('vffSetup', () => {

    describe('Setup', () => {
        it(`Sending event with the options`, () => {
            //Arrange
            let mockedOptions = {
                '123':'456',
                '111':'111'
            };

            //Act
            setup(mockedOptions);

            //Assert
            expect(sendSpy).toBeCalled();
            expect(sendSpy).toHaveBeenCalledWith(VF_SETUP,expect.any(Object));
        });

        it(`Don't send event in case of no options`, () => {
            //Arrange

            //Act
            setup();

            //Assert
            expect(sendSpy).not.toHaveBeenCalled();
        });
    });

});