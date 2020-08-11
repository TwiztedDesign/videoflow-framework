const helpers = require('../../src/utils/helpers.js');
let obj;

describe('Helpers', () => {
    beforeAll(() => {
        obj = {
            test:{}
        };
    });

    describe('find key', () => {
        it('Should find a key in a given object, case insensitive', () => {
            expect(helpers.findKey(obj, 'Test')).toBe('test');
        });

        it('Should return undefined for a key in a given object if said key does not exists', () => {
            expect(helpers.findKey(obj, 'testKey')).toBe(undefined);
        });

        it('Should return either key in a given object if two keys have the same value variation', () => {
            let obj = {test : {a : {}}, TesT : {b : {}}};
            expect(obj).toHaveProperty('TesT');
            expect(helpers.findKey(obj, 'TesT')).toBe('test');
        });
    });

    describe('Trim', () => {
        it('Should trim the given character from the given string and return the string', () => {
            expect(helpers.trim('**the quick brown fox jumps**', '*')).toBe('the quick brown fox jumps');
            expect(helpers.trim('.the quick brown fox jumps.', '.')).toBe('the quick brown fox jumps');
            expect(helpers.trim('the quick. brown fox jumps', '.')).toBe('the quick. brown fox jumps');
        });

        it('Should not trim the given character if it does not exist in the given string and return the string', () => {
            expect(helpers.trim('**the quick brown fox jumps**', ',')).toBe('**the quick brown fox jumps**');
            expect(helpers.trim('the quick. brown fox jumps', ',')).toBe('the quick. brown fox jumps');
        });

        it('Should trim space if no character argument was passed and return the string', () => {
            expect(helpers.trim(' the quick brown fox jumps ')).toBe('the quick brown fox jumps');
        });
    });

    describe('Get by path', () => {
        beforeEach(() => {
            obj = {
                a:{
                    b:{
                        c: 2
                    }
                }
            };

        });

        it('Should return the data in the given object based on the given path separated by dots', () => {
            expect(helpers.getByPath(obj, 'a.b.c')).toBe(2);
            expect(helpers.getByPath(obj, 'a.b')).toEqual({c: 2});
            expect(helpers.getByPath(obj, 'a')).toEqual({b:{c: 2}});
        });

        it('Should return the data in the given object based on the given partial/missing path separated by dots', () => {
            expect(helpers.getByPath(obj, 'a.b.')).toEqual({c: 2});
            expect(helpers.getByPath(obj, '.a.')).toEqual({b:{c: 2}});
            expect(helpers.getByPath(obj, '.a.b.c.')).toBe(2);
        });

        it('Should return the undefined if incorrect path was given', () => {
            expect(helpers.getByPath(obj, 'c.b.a')).toBe(undefined);
            expect(helpers.getByPath(obj, 'a.c.d')).toBe(undefined);
        });

        it('Should return the undefined if no path was given', () => {
            expect(helpers.getByPath(obj)).toBe(undefined);
        });
    });

    describe('Set by path', () => {
        beforeEach(() => {
            obj = {
                a:{
                    b:{
                        c: 3
                    }
                }
            };

        });

        it('Should set the given value in the given object based on the given path separated by dots', () => {
            helpers.setByPath(obj, 'a.b.c', 2);
            expect(obj.a.b.c).toBe(2);
            helpers.setByPath(obj, 'a.b', 4);
            expect(obj.a.b).toBe(4);
            helpers.setByPath(obj, 'a', 1);
            expect(obj.a).toBe(1);
        });

        it('Should set the given value in the given object based on the given partial/missing path separated by dots', () => {
            helpers.setByPath(obj, 'a.b.c.', 2);
            expect(obj.a.b.c).toBe(2);
            helpers.setByPath(obj, '.a.b.', 4);
            expect(obj.a.b).toBe(4);
            helpers.setByPath(obj, '.a.', 1);
            expect(obj.a).toBe(1);
        });

        it('Should leave the object as is if incorrect path was given', () => {
            let initObj = JSON.parse(JSON.stringify(obj));
            expect(helpers.setByPath(obj, 'a..c.', 3)).toBe(undefined);
            expect(initObj).toEqual(obj);
        });

        it('Should throw an Error "Missing Arguments" if all 3 arguments of the function were not passed', () => {
            expect(helpers.setByPath).toThrow(Error, 'Missing Arguments!');
        });
    });


    describe('Camelize', () => {
        it("should not affect empty strings", () => {
           expect(helpers.camelize('')).toBe('');
        });
        it("should trim spaces", () => {
            expect(helpers.camelize('   a b   c')).toBe('aBC');
        });
        it("should lowercase first char", () => {
            expect(helpers.camelize('Test')).toBe('test');
        });
        it("should uppercase every first letter after space", () => {
            expect(helpers.camelize('ab cd ef')).toBe('abCdEf');
        });
    });
    describe('Decamelize', () => {
        it("should not affect empty strings", () => {
            expect(helpers.camelize('')).toBe('');
        });
        it("should insert a space before evey capital letter ecxept the first one", () => {
            expect(helpers.decamelize('ABC')).toBe('A B C');
        });
    });
    describe('uuid', () => {
        it("should return an alphanumeric string", () => {
            let id = helpers.uuid();
            expect(id.match("[A-Za-z0-9]+")).toBeTruthy();
        });
        it("should a random string", () => {
            let id1 = helpers.uuid();
            let id2 = helpers.uuid();
            expect(id1).not.toBe(id2);
        });
        it("should return string of length 32", () => {
            let id = helpers.uuid();
            expect(id.length).toBe(32);
        });
    });
    describe('extend', () => {
        it('extend lhs object with rhs object', () => {
            var lhs = {a : 1};
            var rhs = {b : 2};
            helpers.extend(lhs, rhs);
            expect(lhs.a).toBe(1);
            expect(lhs.b).toBe(2);
        });
        it('return the extended object', () => {
            var lhs = {a : 1};
            var rhs = {b : 2};
            var result = helpers.extend(lhs, rhs);
            expect(result).toBe(lhs);
        });
        it('override existing properties', () => {
            var lhs = {a : 1};
            var rhs = {a : 2};
            helpers.extend(lhs, rhs);
            expect(lhs.a).toBe(2);
        });
    });
    describe('docRef', () => {
        it('should return a link with an appropriate anchor', () => {
           expect(helpers.docRef('anchor')).toBe('https://www.videoflow.io/documentation/api/vff?id=anchor');
        });
    });
    describe('deepCompare', () => {
        it('should work', () => {
            let obj = {};
            expect(helpers.deepCompare({},{})).toBeTruthy();
            expect(helpers.deepCompare({a:1}, {a:1})).toBeTruthy();
            expect(helpers.deepCompare({a:[1,2]}, {a:[1,2]})).toBeTruthy();
            expect(helpers.deepCompare({a:1}, new Proxy({a:1},{}))).toBeTruthy();
            expect(helpers.deepCompare({a:{b:{c:1}}},{a:{b:{c:1}}})).toBeTruthy();
            expect(helpers.deepCompare({a:1},{a:2})).toBeFalsy();
            expect(helpers.deepCompare({a:1},{b:1})).toBeFalsy();
            expect(helpers.deepCompare({a:1},{a:1, b:1})).toBeTruthy();
            expect(helpers.deepCompare({a:1},{a:"1"})).toBeFalsy();
            expect(helpers.deepCompare({a:1, _b : 2},{a:1})).toBeTruthy();
            expect(helpers.deepCompare({a:[1,2]},{a:[1,3]})).toBeFalsy();
            expect(helpers.deepCompare({a:{b:[1,2]}},{a:{b:[1,2]}})).toBeTruthy();
            expect(helpers.deepCompare(obj,obj)).toBeTruthy();
            expect(helpers.deepCompare(()=>{console.log('x')},()=>{console.log('x')})).toBeTruthy();
            expect(helpers.deepCompare(()=>{console.log('x')},()=>{console.log('y')})).toBeFalsy();
            expect(helpers.deepCompare(undefined,undefined)).toBeTruthy();
            expect(helpers.deepCompare(Number.NaN,Number.NaN)).toBeTruthy();
            expect(helpers.deepCompare(Number.NaN,5)).toBeFalsy();
            expect(helpers.deepCompare([1,2],[1])).toBeFalsy();

        });
    });
    describe('noop', () => {
        it('should noop', () => {
            expect(helpers.noop()).toBeUndefined();
        });
    });
    describe('defer', () => {
        it('should return a defer object with promise, resolve and reject', function () {
            let defer = helpers.defer();
            expect(defer).toHaveProperty('promise');
            expect(defer).toHaveProperty('resolve');
            expect(defer).toHaveProperty('reject');
        });
        it('should resolve properly', function (done) {
            let defer = helpers.defer();
            defer.promise.then((data) => {
                expect(data).toBeTruthy();
                done();
            });
            defer.resolve(true);
        });
        it('should reject properly', function (done) {
            let defer = helpers.defer();
            defer.promise.then(() => {}).catch((err) => {
                expect(err).toBe('error');
                done();
            });
            defer.reject('error');
        });
    });

    function serialize( obj ) {
        return Object.keys(obj).reduce(function(a,k){a.push(k+'='+encodeURIComponent(obj[k]));return a},[]).join('&');
    }

    describe('Get query params', () => {
        it('Should return all the query params as object - sending query string', () => {
            //Arrange
            let queryObject = {'name':'text','otherName':'anotherText'};
            let queryString = serialize(queryObject);

            //Act
            let queryParamsObject = helpers.getQueryParams(queryString);

            //Assert
            expect(queryParamsObject).toBeDefined();
            expect(queryParamsObject).toEqual(queryObject);
        });

        it('Should return all the query params as object - from url', () => {
            //Arrange
            let queryObject = {'name':'text','otherName':'anotherText'};
            let queryString = serialize(queryObject);
            window.history.pushState({}, 'Test Title', `/test?${queryString}`);

            //Act
            let queryParamsObject = helpers.getQueryParams();

            //Assert
            expect(queryParamsObject).toBeDefined();
            expect(queryParamsObject).toEqual(queryObject);
        });

        it('Failed on parsing - Should return empty object', () => {
            //Arrange
            let queryObject = {'name??':'te&xt','othe?rName':'anotherText'};
            let queryString = serialize(queryObject);
            window.history.pushState({}, 'Test Title', `/test?${queryString}`);

            //Act
            let queryParamsObject = helpers.getQueryParams();

            //Assert
            expect(queryParamsObject).toBeDefined();
            expect(queryParamsObject).toEqual({});
        });
    });

    describe('filter', () => {
        it('Should return new array with filtered items', () => {
            //Arrange
            let array = [1,2,3,4,5,6,7,8,9,10];
            let filterFunc = (val) => {
                return val % 2 === 0;
            };
            //Act
            let filteredArray = helpers.filter(array,filterFunc);

            //Assert
            expect(array).not.toEqual(filteredArray);
            filteredArray.forEach(val => {
                if(!filterFunc(val)){
                    expect(false).toBeTruthy();
                }
            });
        });

        it('Using object instead of array - Should throw exception', () => {
            //Arrange
            let emptyObj = {};
            let filterFunc = (val) => {
                return val % 2 === 0;
            };

            expect(()=>{
                //Act
                let filteredArray = helpers.filter(emptyObj,filterFunc);
            }).toThrowError();
        });

        it('Using object instead of function - Should throw exception', () => {
            //Arrange
            let array = [1,2,3,4,5,6,7,8,9,10];
            expect(()=>{
                //Act
                let filteredArray = helpers.filter(array,{});
            }).toThrowError();
        });
    });

    describe('deepExtend', () => {
        it('should work', () => {
            let extendedObject = {};

            let emptyObj = {};
            helpers.deepExtend(extendedObject, emptyObj);
            expect(extendedObject).toEqual(emptyObj);
            
            let simpleObj = {
                'a':1,
                'b':2
            };
            helpers.deepExtend(extendedObject, simpleObj);
            expect(extendedObject).toEqual(simpleObj);

            let complexObj = {
                'a':1,
                'b': {
                    c:3
                }
            };
            helpers.deepExtend(extendedObject, complexObj);
            expect(extendedObject).toEqual(complexObj);

            let ObjWithArray = {
                'a':1,
                'b': {
                    c:[1,2,3]
                }
            };
            helpers.deepExtend(extendedObject, ObjWithArray);
            expect(extendedObject).toEqual(ObjWithArray);

        });
    });



    describe('parseRJSON', () => {
        it('should work', () => {
            let expectedObject = {
                'a' : '1',
                'b' : 2,
                'c' : {
                    'd': [1,2,3], // Currently not supported in array
                    'e': 4,
                    'f': 5
                },
                'g' : 6,
                'h1' : 7,
                'H' : 8,
                'i$' : 9,
                'J@' : 10,
                'j j j ' : 11
            };
            expect(helpers.parseRJSON(JSON.stringify(expectedObject))).toEqual(expectedObject);
        });
    });

    describe('query', () => {
        let collection = [
            {prop1 : "hello1", Prop2 : 'World', "prop 3" : 1},
            {prop1 : "hello2", Prop2 : 'World', "prop 3" : 2},
            {prop1 : "hello3", Prop2 : 'World', "prop 3" : 2},
        ];
        it('should find elements in array', () => {
            expect(helpers.query(collection, {prop1: 'hello1'}).length).toBe(1);
            expect(helpers.query(collection, {Prop2: 'World'}).length).toBe(3);
            expect(helpers.query(collection, {prop2: 'world'}).length).toBe(0);
            expect(helpers.query(collection, {Prop2: 'world'}, {insensitive : true}).length).toBe(3);
            expect(helpers.query(collection, {prop2: 'world'}, {insensitive : true}).length).toBe(3);
            expect(helpers.query(collection, {"Prop 3": 2}, {insensitive : true}).length).toBe(2);
        })
    });

    describe('isFunction', () => {
        it('should return trun only for function', () => {
            expect(helpers.isFunction(()=>{})).toBe(true);
            expect(helpers.isFunction({})).toBe(false);
            expect(helpers.isFunction()).toBe(false);
            expect(helpers.isFunction("")).toBe(false);
            expect(helpers.isFunction("not a function")).toBe(false);
            expect(helpers.isFunction(1)).toBe(false);
            expect(helpers.isFunction("1")).toBe(false);
        });
    });
});
