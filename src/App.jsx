import { useState } from 'react';
import './App.css';
import AccountCreation from './accountCreation/AccountCreation';
import { createTheme, ThemeProvider } from '@mui/material';
import { createAccount, deposit, transfer, withdraw } from './services/accountManagement.helpers';
import ExistingAccount from './accountManagement/ExistingAccount';

const App = () => {
  const [accounts, setAccounts] = useState({});

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const handleAddAccount = (name, balance) => {
    setAccounts((prev) => createAccount(prev, name, balance));
  }

  const handleDeposit = (name, amount) => {
    setAccounts((prev) => deposit(prev, name, amount));
  };

  const handleWithdraw = (name, amount) => {
    setAccounts((prev) => withdraw(prev, name, amount));
  };

  const handleTransfer = (fromName, toName, amount) => {
    setAccounts((prev) => transfer(prev, fromName, toName, amount));
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <h1>Bank Account Management</h1>
        <AccountCreation onAdd={handleAddAccount} />
        {Object.values(accounts)?.map(account => {
          return <ExistingAccount
            account={account}
            onDeposit={handleDeposit}
            onTransfer={handleTransfer}
            onWithdraw={handleWithdraw} />;
        })}
      </ThemeProvider>
    </>
  );
}

export default App;
