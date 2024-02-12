//@ts-ignore
import axios, { AxiosInstance, AxiosResponse } from 'axios';
//@ts-ignore
import { throttledGetDataFromApi } from './index';


describe('throttledGetDataFromApi', () => {
  let axiosInstance: AxiosInstance;
  beforeEach(() => {
    jest.resetAllMocks();
    const createMock = jest.spyOn(axios, 'create');
    axiosInstance = {
      get: jest.fn().mockImplementation(async () => {
        return { data: { test: 'test-response' } } as AxiosResponse;
      })
    } as unknown as AxiosInstance;
    createMock.mockReturnValueOnce(axiosInstance);
  })
  const baseURL = 'https://jsonplaceholder.typicode.com';
  
  test('should create instance with provided base url', async () => {
    const createMock = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi('test');

    expect(createMock).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {

    const createMock = jest.spyOn(axios, 'create');
    createMock.mockReturnValueOnce(axiosInstance);

    await throttledGetDataFromApi('test');

    expect(axiosInstance.get).toHaveBeenCalledWith('test');
  });

  test('should return response data', async () => {
    jest.spyOn(axios, 'get');
    const createMock = jest.spyOn(axios, 'create');
    createMock.mockReturnValueOnce(axiosInstance);
    const result = await throttledGetDataFromApi('test');

    expect(result).toEqual({"test": "test-response"});
  });
});
