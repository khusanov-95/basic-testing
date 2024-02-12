import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
const originalModule = jest.requireActual<typeof import('./index')>('./index');

return {
  __esModule: true,
  ...originalModule,
  mockOne: jest.fn,
  mockTwo: jest.fn,
  mockThree: jest.fn
};
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  console.log = jest.fn();

  test('mockOne, mockTwo, mockThree should not log into console', () => {
   mockOne();
   mockTwo();
   mockThree();

   expect(console.log).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction()

    expect(console.log).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('I am not mocked');
  });
});
