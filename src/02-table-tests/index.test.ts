import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 3, b: 2, action: Action.Subtract, expected: 1 },
    { a: 2, b: 2, action: Action.Multiply, expected: 4 },
    { a: 4, b: 2, action: Action.Divide, expected:2 },
    { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
    { a: 3, b: 2, action: "Test to return null", expected: null },
    { a: 3, b: "Test to return null", action: Action.Add, expected: null }, 
];



describe('simpleCalculator', () => {
  it.each(testCases)(
    "should be equal to correction result with appropriate action",
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({a, b, action})).toEqual(expected);
    }
  );

});
