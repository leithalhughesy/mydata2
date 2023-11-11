// src/components/Accounts.js
import React, { useState } from 'react';
import { addAccount } from '../firebase/firebaseUtils';

const Accounts = ({ userId, accounts, setAccounts }) => {
  const [newAccountName, setNewAccountName] = useState('');
  const [newAccountBalance, setNewAccountBalance] = useState('');

  const handleAddAccount = (event) => {
    event.preventDefault();
    addAccount(userId, {
      name: newAccountName,
      balance: parseFloat(newAccountBalance),
    }).then(() => {
      setNewAccountName('');
      setNewAccountBalance('');
    }).catch((error) => {
      console.error("Error adding account: ", error);
    });
  };

  return (
    <div>
      <h2>Accounts</h2>
      <form onSubmit={handleAddAccount}>
        <input
          type="text"
          value={newAccountName}
          onChange={(e) => setNewAccountName(e.target.value)}
          placeholder="Account Name"
          required
        />
        <input
          type="number"
          value={newAccountBalance}
          onChange={(e) => setNewAccountBalance(e.target.value)}
          placeholder="Starting Balance"
          required
        />
        <button type="submit">Add Account</button>
      </form>
      <div>
        {Object.entries(accounts).map(([id, account]) => (
          <div key={id}>
            <h3>{account.name}</h3>
            <p>${account.balance}</p>
            {/* Add edit and delete functionality */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accounts;
