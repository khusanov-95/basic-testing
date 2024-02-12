import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path, { join } from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
 

  const callback = jest.fn();
  const timer = 1000;


  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, timer);

    expect(setTimeout).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalledTimes(1)
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    jest.clearAllTimers()
    doStuffByTimeout(callback, timer);


    expect(callback).not.toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), timer);

    jest.runAllTimers();
    
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const callback = jest.fn();
  const interval = 1000;
  const repeatCount = 3;

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, interval);

    expect(setInterval).toHaveBeenCalled()
    expect(setInterval).toHaveBeenCalledTimes(1)
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.clearAllTimers()
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, interval);


    expect(callback).not.toHaveBeenCalled();
    for (let i = 0; i < repeatCount; i++) {
      jest.advanceTimersByTime(interval);
    }
    expect(callback).toHaveBeenCalledTimes(repeatCount);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'index.ts'
  test('should call join with pathToFile', async () => {
    jest.mock('path', () => ({
      join: jest.fn((...segments) => segments.join('/'))
    }));

    jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);

    expect(join).toHaveBeenCalled()
    expect(join).toHaveBeenCalledTimes(1)
  });

  test('should return null if file does not exist', async () => {
    const result = await readFileAsynchronously('test');
    expect(typeof result).toEqual('object')
  });

  test('should return file content if file exists', async () => {
    const result = await readFileAsynchronously(pathToFile);
    expect(typeof result).toEqual('string')
  });
});
