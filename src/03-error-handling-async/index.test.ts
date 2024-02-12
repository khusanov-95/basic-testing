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
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultErrorMessage ='Oops!';
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
    await expect(rejectCustomError()).rejects.toThrow('error');
  });
});