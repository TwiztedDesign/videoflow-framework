import {vffEvent} from '../../src/core/vffEvent';
import VFFEvent from "../../src/core/vffEvent";

describe('vffEvent', () => {

    describe('Create vffEvent', () => {

        it(`New VffEvent object should contain all the data `, () => {
           //Arrange
            let mockedData = {
                '123':'456',
                '111':'111'
            };

            //Act
            let newVffEvent = new VFFEvent(mockedData);

            //Assert
            expect(newVffEvent).toEqual(mockedData);
        });
    });

});