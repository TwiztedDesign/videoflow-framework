const reloadHandler  = require('../../../src/core/handlers/reloadHandler');

describe('Reload Handler', () => {

    describe('Reload', () => {
        it('Should call global window reload method', () => {
            //Arrange

            let w = {location : {reload : () => {}}};

            const reloadspy = jest.spyOn(w.location, 'reload');

            //Act
            try{
                reloadHandler.reload(w);
            } catch(e) {

            }


            //Assert
            expect(reloadspy).toHaveBeenCalledTimes(1);
        });
    });
});