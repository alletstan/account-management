export const formatHistory = (oldHistory, newActivity) => {
  if (!newActivity || newActivity.trim() === '') return oldHistory;
  return [...oldHistory, `${new Date().toLocaleString()}: ${newActivity}`];
};

export const validateAmount = (amount) => {
  if (!amount || amount === '' || isNaN(amount) || !isFinite(amount)) {
    return 'amount is not a valid number. Please reinput a valid number.';
  }
  if (amount < 0) {
    return 'amount is negative. Please reinput a positive amount.';
  }
  return null;
}

export const createAccount = (accounts, name, balance) => {
  if (!name || name.trim() === '') {
    alert('Please input name.');
    return accounts;
  }
  if (!balance || balance === '') {
    alert('Please input balance.');
    return accounts;
  }
  const balanceErrorMessage = validateAmount(balance);
  if (balanceErrorMessage) {
    alert(`Balance ${balanceErrorMessage}`);
    return accounts;
  }

  if (accounts[name]) {
    alert('Account name already exists. Please use a different account name.');
    return accounts;
  }

  return {
    ...accounts,
    [name]: {
      name,
      balance: parseFloat(balance),
      history: formatHistory([], `Created account with balance $${balance}`),
    },
  };
};

export const deposit = (accounts, id, amount) => {
  const acc = accounts[id];

  if (!acc) {
    alert('Failed to find account. Please retry or create a new account.');
    return accounts;
  }

  const depositErrorMessage = validateAmount(amount);
  if (depositErrorMessage) {
    alert(`Deposit ${depositErrorMessage}`);
    return accounts;
  }

  const newBalance = acc.balance + parseFloat(amount);
  return {
    ...accounts,
    [id]: {
      ...acc,
      balance: newBalance,
      history: formatHistory(acc.history, `Deposited $${amount}`),
    },
  };
};

export const withdraw = (accounts, name, amount) => {
  const acc = accounts[name];

  if (!acc) {
    alert('Failed to find account. Please retry or create a new account.');
    return accounts;
  }

  if (acc.balance < amount) {
    alert('You are only allowed to withdraw up to the balance of this account.');
    return accounts;
  }

  const withdrawErrorMessage = validateAmount(amount);
  if (withdrawErrorMessage) {
    alert(`Withdraw ${withdrawErrorMessage}`);
    return accounts;
  }

  const newBalance = acc.balance - parseFloat(amount);
  return {
    ...accounts,
    [name]: {
      ...acc,
      balance: newBalance,
      history: formatHistory(acc.history, `Withdrew $${amount}`),
    },
  };
};

export const transfer = (accounts, fromName, toName, amount) => {
  if (fromName === toName) {
    alert('Please key in different account names.');
    return accounts;
  }
  if (!accounts[toName]) {
    alert('Account to be transerred to could not be found. Please retry or key in a different account name.');
    return accounts;
  }

  const transferAmountErrorMessage = validateAmount(amount);
  if (transferAmountErrorMessage) {
    alert(`Transfer ${transferAmountErrorMessage}`);
    return accounts;
  }

  const from = accounts[fromName];
  const to = accounts[toName];
  if (from.balance < amount) {
    alert('You are only allowed to transfer up to the balance of the account.');
    return accounts;
  }

  return {
    ...accounts,
    [fromName]: {
      ...from,
      balance: from.balance - parseFloat(amount),
      history: formatHistory(from.history, `Transferred $${amount} to ${to.name}`),
    },
    [toName]: {
      ...to,
      balance: to.balance + parseFloat(amount),
      history: formatHistory(to.history, `Received $${amount} from ${from.name}`),
    },
  };
};