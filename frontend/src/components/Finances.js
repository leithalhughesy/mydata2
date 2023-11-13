// src/components/Finances.js
import React from 'react';
import Accounts from './Accounts';
import Transactions from './Transactions';

const Finances = ({ user, accounts, setAccounts }) => {
  // Check if user is defined before rendering Accounts and Transactions
  if (!user) {
    // If there's no user, return null or some placeholder
    // Alternatively, you could redirect to the login page or show a loading spinner
    return <p>Loading user data...</p>;
  }

  return (
    <div className="App">
      <Accounts userId={user.uid} accounts={accounts} setAccounts={setAccounts} />
      <Transactions userId={user.uid} accounts={accounts} />
    </div>
  );
};

export default Finances;
