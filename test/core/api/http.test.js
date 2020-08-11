const httpApi       = require('../../../src/core/api/http');
var READY_STATE = {
    UNSENT              : 0,
    OPENED              : 1,
    HEADERS_RECEIVED    : 2,
    LOADING             : 3,
    DONE                : 4,
};
let open, send, status, onreadystatechange;
function createXHRmock(returnStatusCode, readyState,responseText) {
    open = jest.fn();
    status = returnStatusCode;

    send = jest.fn().mockImplementation(function(){
        onreadystatechange = this.onreadystatechange.bind(this);
        onreadystatechange();
    });

    const xhrMockClass = function () {
        return {
            open,
            send,
            status,
            readyState,
            responseText
        };
    };

    window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);
}

describe("Http Api", () =>{
    describe("get", () => {
        it("Should return callback with data", (done) => {
            //Arrange
            const url = 'https://www.test.com/api/test';
            const responseText = 'demo123';
            createXHRmock(200, READY_STATE.DONE, responseText);
            //
            // //Act
            httpApi.get(url, (res) => {
                //Assert
                expect(res).toBe(responseText);
                done();
            });
        });

        it("Should return promise with data", (done) => {
            //Arrange
            const url = 'https://www.test.com/api/test';
            const responseText = 'demo123';
            createXHRmock(200, READY_STATE.DONE, responseText);
            //
            // //Act
            httpApi.get(url).then(res => {
                expect(res).toBe(responseText);
                done();
            }, () =>{
                expect(false).toBeTruthy();
                done();
            });
        });

        it("Should reject due to 404 status code state", (done) => {
            //Arrange
            const url = 'https://www.test.com/api/test';
            const responseText = 'demo123';
            createXHRmock(404, READY_STATE.DONE, responseText);
            //
            // //Act
            httpApi.get(url).then(res => {
                expect(false).toBeTruthy();
                done();
            }, () =>{
                expect(true).toBeTruthy();
                done();
            });
        });
    });
});