const playerApi       = require('../../../src/core/api/player');
const messenger = require('../../../src/utils/messenger.js');
import {GO, CROP, TRANSFORM,AUDIO_TRACK} from '../../../src/utils/events';

describe("Player Api", () =>{
   describe("Go", () => {
      it("Should post a massage", () => {
          const send = jest.spyOn(messenger, 'send');
          playerApi.go('test', 0);
          expect(send).toHaveBeenCalledTimes(1);
          expect(send).toHaveBeenCalledWith(GO, {target: 'test', time: 0});

      });
   });
   describe("CROP", () => {
        it("Should send crop massage", () => {
            const send = jest.spyOn(messenger, 'send');
            playerApi.crop(0);
            expect(send).toHaveBeenCalledTimes(1);
            expect(send).toHaveBeenCalledWith(CROP,  {"crop": 0});
        });

       it("Should send crop massage", () => {
           const send = jest.spyOn(messenger, 'send');
           const top = 0;
           const left = 90;
           const width = 180;
           const height = 180;
           playerApi.crop(top,left,width,height);
           expect(send).toHaveBeenCalledTimes(1);
           expect(send).toHaveBeenCalledWith(CROP,  {top,left,width,height});
       });

        it("Should throw an exception", () => {
            const send = jest.spyOn(messenger, 'send');
            expect(()=>playerApi.crop()).toThrow(Error);
        });
    });
   describe("AUDIO_TRACKS", () => {
        it("Should send audio track massage", () => {
            const send = jest.spyOn(messenger, 'send');
            playerApi.audioTrack(0);
            expect(send).toHaveBeenCalledTimes(1);
            expect(send).toHaveBeenCalledWith(AUDIO_TRACK, 0);
        });
   });
   describe("Transform", () => {
       it("Should handle overloading", () => {
           const send = jest.spyOn(messenger, 'send');
           playerApi.transform(0,0,1,1);
           expect(send).toHaveBeenCalledTimes(1);
           expect(send).toHaveBeenCalledWith(TRANSFORM,  {fromTopLeftX : 0, fromTopLeftY : 0, fromBottomRightX: 1, fromBottomRightY : 1,
               toTopLeftX: 0, toTopLeftY : 0, toBottomRightX:1, toBottomRightY :1, options : {}});
       });
       it("Should handle overloading", () => {
           const send = jest.spyOn(messenger, 'send');
           playerApi.transform(0,0,1,1,2,2,2,2);
           expect(send).toHaveBeenCalledTimes(1);
           expect(send).toHaveBeenCalledWith(TRANSFORM,  {fromTopLeftX : 0, fromTopLeftY : 0, fromBottomRightX: 1, fromBottomRightY : 1,
               toTopLeftX: 2, toTopLeftY : 2, toBottomRightX:2, toBottomRightY :2, options : {}});
       });
       it("Should Throw error when incorrect number of arguments is passed", () => {
           const send = jest.spyOn(messenger, 'send');
           playerApi.transform(0,0,1,1,2,2);
           expect(send).toHaveBeenCalledTimes(1);
           expect(send).toHaveBeenCalledWith(TRANSFORM,  {fromTopLeftX : undefined, fromTopLeftY : undefined, fromBottomRightX: undefined, fromBottomRightY : undefined,
               toTopLeftX: undefined, toTopLeftY : undefined, toBottomRightX:undefined, toBottomRightY :undefined, options : undefined});

       })
   })
});