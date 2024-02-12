import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({a: 1, b:2, action: Action.Add})).toEqual(3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({a: 3, b:2, action: Action.Subtract})).toEqual(1);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({a: 2, b:2, action: Action.Multiply})).toEqual(4);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({a: 4, b:2, action: Action.Divide})).toEqual(2);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({a: 3, b:2, action: Action.Exponentiate})).toEqual(9);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({a: 3, b:2, action: "Test"})).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({a: 3, b:'test', action: Action.Multiply})).toEqual(null);
  });
});
