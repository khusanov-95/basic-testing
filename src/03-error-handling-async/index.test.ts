// Uncomment the code below and write your tests


// Error handling & async
// Your task is to test functions that work asynchronously/throw/reject exceptions..

// Write your tests in src/03-error-handling-async/index.test.ts.

// @ts-ignore
import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'test'
    expect(await resolveValue(value)).toEqual(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => {
      throwError('test error');
    }).toThrow(/^test error$/);
    // expect(throwError('test error')).toThrow(/^test error$/)
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultErrorMessage ='Oops!';
    // expect(throwError).toThrow(new Error(defaultErrorMessage))
    expect(() => {
      throwError(defaultErrorMessage);
    }).toThrow(defaultErrorMessage);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrow(MyAwesomeError)
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    // await expect(fetchData()).rejects.toMatch('error');
    // expect(await rejectCustomError()).rejects.toMatch('error');
  });
});