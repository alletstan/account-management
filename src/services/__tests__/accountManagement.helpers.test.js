import { vi } from "vitest";
import { createAccount, deposit, formatHistory, transfer, validateAmount, withdraw } from "../accountManagement.helpers";

let alertSpy;
vi.setSystemTime(new Date('5-May-2025'));

describe('Helpers: accountManagement', () => {
    beforeEach(() => {
        alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => { });
    });

    describe('formatHistory', () => {
        it('should format history', () => {
            const oldHistory = ['Test'];
            const newMessage = 'New Message';

            const result = formatHistory(oldHistory, newMessage);
            const expected = ['Test', '05/05/2025, 12:00:00 am: New Message'];
            expect(result).toEqual(expected);
        });
        it('should have no change - empty new activity', () => {
            const oldHistory = ['Test'];
            const newMessage = '';

            const result = formatHistory(oldHistory, newMessage);
            expect(result).toEqual(oldHistory);
        });
    });

    describe('validateAmount', () => {
        it.each([
            // invalid numbers
            [NaN, 'amount is not a valid number. Please reinput a valid number.'],
            ['abc', 'amount is not a valid number. Please reinput a valid number.'],
            ['', 'amount is not a valid number. Please reinput a valid number.'],
            [undefined, 'amount is not a valid number. Please reinput a valid number.'],
            [null, 'amount is not a valid number. Please reinput a valid number.'],
            // negative numbers
            [-1, 'amount is negative. Please reinput a positive amount.'],
            [-0.001, 'amount is negative. Please reinput a positive amount.'],
            // valid inputs should return null
            [10, null],
            ['56.78', null],
        ])('validateAmount(%s) returns %s', (input, expected) => {
            expect(validateAmount(input)).toBe(expected);
        });
    });

    describe('accountCreation', () => {
        it('should add a new account to accounts', () => {
            const initialAccounts = {
                existing1: {
                    id: 'existing1',
                    name: 'Existing Account',
                    balance: 100,
                },
            };
            const name = 'New Account';
            const balance = '150.25';

            const result = createAccount(initialAccounts, name, balance);
            const expected = {
                ...initialAccounts,
                [name]: {
                    name: 'New Account',
                    balance: 150.25,
                    history: [
                        "05/05/2025, 12:00:00 am: Created account with balance $150.25",
                    ],
                },
            };
            expect(result).toEqual(expected);
        });
        it('should throw error - missing name', () => {
            const result = createAccount({}, null, '150.25');
            expect(alertSpy).toHaveBeenCalledWith('Please input name.');
            expect(result).toEqual({});
        });
        it('should throw error - missing balance', () => {
            const result = createAccount({}, 'test', '');
            expect(alertSpy).toHaveBeenCalledWith('Please input balance.');
            expect(result).toEqual({});
        });
        it('should throw error - invalid balance', () => {
            const result = createAccount({}, 'test', '-1');
            expect(alertSpy).toHaveBeenCalledWith('Balance amount is negative. Please reinput a positive amount.');
            expect(result).toEqual({});
        });
        it('should throw error - name already exists', () => {
            const name = 'Existing Account';
            const balance = '150.25';
            const initialAccounts = {
                [name]: {
                    name: 'Existing Account',
                    balance: 100,
                },
            };
            const result = createAccount(initialAccounts, name, balance);
            expect(alertSpy).toHaveBeenCalledWith('Account name already exists. Please use a different account name.');
            expect(result).toBe(initialAccounts);
        });
    });

    describe('deposit', () => {
        it('should add amount to the account balance and return updated accounts object', () => {
            const accounts = {
                'acc1': {
                    id: 'acc1',
                    name: 'Test Account 1',
                    balance: 100,
                    history: ['Test'],
                },
                'acc2': {
                    id: 'acc2',
                    name: 'Test Account 2',
                    balance: 200,
                    history: ['Test'],
                },
            };
            const result = deposit(accounts, 'acc1', '50');
            const expected = {
                'acc1': {
                    id: 'acc1',
                    name: 'Test Account 1',
                    balance: 150,
                    history: [
                        "Test",
                        "05/05/2025, 12:00:00 am: Deposited $50",
                    ],
                },
                'acc2': {
                    id: 'acc2',
                    name: 'Test Account 2',
                    balance: 200,
                    history: ['Test'],
                },
            };
            expect(result).toEqual(expected);
        });
        it('should alert and return accounts if account name is not found', () => {
            const accounts = {
                'acc1': {
                    id: 'acc1',
                    name: 'Test Account',
                    balance: 100,
                },
            };
            const result = deposit(accounts, 'unknown_id', '50');
            expect(alertSpy).toHaveBeenCalledWith('Failed to find account. Please retry or create a new account.');
            expect(result).toEqual(accounts);
        });
        it('should alert and return accounts if deposit amount is invalid', () => {
            const accounts = {
                'acc1': {
                    id: 'acc1',
                    name: 'Test Account',
                    balance: 100,
                    history: [],
                },
            };
            const result = deposit(accounts, 'acc1', '50t');
            expect(alertSpy).toHaveBeenCalledWith('Deposit amount is not a valid number. Please reinput a valid number.');
            expect(result).toEqual(accounts);
        });
    });

    describe('withdraw', () => {
        it('should withdraw amount from account and updates balance and history', () => {
            const name = 'Test Account';
            const accounts = {
                [name]: {
                    name,
                    balance: 100,
                    history: [],
                },
            };
            const result = withdraw(accounts, name, '50');
            const expected = {
                [name]: {
                    name,
                    balance: 50,
                    history: ["05/05/2025, 12:00:00 am: Withdrew $50"],
                },
            };
            expect(result).toEqual(expected);
        });
        it('should alert and return original accounts if account name is not found', () => {
            const accounts = {
                'Test Account': {
                    name: 'Test Account',
                    balance: 100,
                    history: [],
                },
            };
            const result = withdraw(accounts, 'unknown_id', '50');
            expect(alertSpy).toHaveBeenCalledWith('Failed to find account. Please retry or create a new account.');
            expect(result).toEqual(accounts);
        });
        it('should alert and return original accounts if withdrawal amount is invalid', () => {
            const accounts = {
                'Test Account': {
                    name: 'Test Account',
                    balance: 50,
                    history: [],
                },
            };
            const result = withdraw(accounts, 'Test Account', 'test');
            expect(alertSpy).toHaveBeenCalledWith('Withdraw amount is not a valid number. Please reinput a valid number.');
            expect(result).toEqual(accounts);
        });
        it('should alert and return original accounts if withdrawal amount exceeds balance', () => {
            const accounts = {
                'Test Account': {
                    name: 'Test Account',
                    balance: 50,
                    history: [],
                },
            };
            const result = withdraw(accounts, 'Test Account', '100');
            expect(alertSpy).toHaveBeenCalledWith('You are only allowed to withdraw up to the balance of this account.');
            expect(result).toEqual(accounts);
        });
    });

    describe('transfer', () => {
        it('should transfer amount from one account to another and update balances and history', () => {
            const accounts = {
                'acc1': {
                    name: 'acc1',
                    balance: 100,
                    history: [],
                },
                'acc2': {
                    name: 'acc2',
                    balance: 50,
                    history: [],
                },
            };
            const result = transfer(accounts, 'acc1', 'acc2', '30');
            const expected = {
                'acc1': {
                    name: 'acc1',
                    balance: 70,
                    history: ['05/05/2025, 12:00:00 am: Transferred $30 to acc2'],
                },
                'acc2': {
                    name: 'acc2',
                    balance: 80,
                    history: ['05/05/2025, 12:00:00 am: Received $30 from acc1'],
                },
            };
            expect(result).toEqual(expected);
        });

        it('should alert and return original accounts if transferring to the same account', () => {
            const accounts = {
                'acc1': {
                    id: 'acc1',
                    name: 'Account 1',
                    balance: 100,
                    history: [],
                },
            };
            const result = transfer(accounts, 'acc1', 'acc1', '30');
            expect(alertSpy).toHaveBeenCalledWith('Please key in different account names.');
            expect(result).toEqual(accounts);
        });

        it('should alert and return original accounts if account to transfer to does not exist', () => {
            const accounts = {
                'acc1': {
                    name: 'acc1',
                    balance: 100,
                    history: [],
                },
            };
            const result = transfer(accounts, 'acc1', 'unknown_id', '30');
            expect(alertSpy).toHaveBeenCalledWith('Account to be transerred to could not be found. Please retry or key in a different account name.');
            expect(result).toEqual(accounts);
        });

        it('should alert and return original accounts if transfer amount is invalid', () => {
            const accounts = {
                'acc1': {
                    name: 'acc1',
                    balance: 50,
                    history: [],
                },
                'acc2': {
                    name: 'acc2',
                    balance: 50,
                    history: [],
                },
            };
            const result = transfer(accounts, 'acc1', 'acc2', '-100');
            expect(alertSpy).toHaveBeenCalledWith('Transfer amount is negative. Please reinput a positive amount.');
            expect(result).toEqual(accounts);
        });

        it('should alert and return original accounts if transfer amount exceeds balance', () => {
            const accounts = {
                'acc1': {
                    name: 'acc1',
                    balance: 50,
                    history: [],
                },
                'acc2': {
                    name: 'acc2',
                    balance: 50,
                    history: [],
                },
            };
            const result = transfer(accounts, 'acc1', 'acc2', '100');
            expect(alertSpy).toHaveBeenCalledWith('You are only allowed to transfer up to the balance of the account.');
            expect(result).toEqual(accounts);
        });
    });
});