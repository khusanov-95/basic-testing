import { getBankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError } from '.';

describe('BankAccount', () => {
  const initialBalance = 1000;
  const bankAccount2InitialBalance = 2000
  const bankAccount = getBankAccount(initialBalance);
  const bankAccount2 = getBankAccount(bankAccount2InitialBalance)
  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toEqual(initialBalance)
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      bankAccount.withdraw(1001);
    }).toThrow(new InsufficientFundsError(initialBalance));
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => {
      bankAccount.transfer(1001, bankAccount2);
    }).toThrow(new InsufficientFundsError(initialBalance));
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      bankAccount.transfer(1001, bankAccount);
    }).toThrow(new TransferFailedError());
  });

  test('should deposit money', () => {
    const moneyToDeposit = 100;
    bankAccount.deposit(100);

    expect(bankAccount.getBalance()).toEqual(initialBalance + moneyToDeposit);
  });

  test('should withdraw money', () => {
    const moneyToWithdraw = 100;
    bankAccount.withdraw(100);

    expect(bankAccount.getBalance()).toEqual(initialBalance - moneyToWithdraw);
  });

  test('should transfer money', () => {
    const moneyToTransfer = 100;
    bankAccount.transfer(moneyToTransfer, bankAccount2);

    expect(bankAccount.getBalance()).toEqual(initialBalance - moneyToTransfer);
    expect(bankAccount2.getBalance()).toEqual(bankAccount2InitialBalance + moneyToTransfer);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await bankAccount.fetchBalance();
    if(balance) {
      expect(typeof balance).toBe('number');
    } else {
      expect(typeof balance).toBe('object');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const newBalance = 55;
    bankAccount.fetchBalance = jest.fn(async () => newBalance);
    await bankAccount.synchronizeBalance();

    expect(bankAccount.getBalance()).toEqual(newBalance)
    
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const newBalance = null;
    bankAccount.fetchBalance = jest.fn(async () => newBalance);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(new SynchronizationFailedError());
  });
});
