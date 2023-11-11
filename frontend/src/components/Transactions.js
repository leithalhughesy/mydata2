// src/components/Transactions.js
import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase/firebaseConfig';
import { addTransaction } from '../firebase/firebaseUtils';

const Transactions = ({ userId, accounts }) => {
  const [transactions, setTransactions] = useState([]);
  const [newTransactionDescription, setNewTransactionDescription] = useState('');
  const [newTransactionAmount, setNewTransactionAmount] = useState('');
  const [newTransactionAccount, setNewTransactionAccount] = useState('');

  useEffect(() => {
    if (!userId) return;

    const transactionsRef = ref(database, `transactions/${userId}`);
    const unsubscribe = onValue(transactionsRef, (snapshot) => {
      const data = snapshot.val();
      const transactionsArray = data ? Object.entries(data).map(([key, value]) => ({
        id: key,
        ...value
      })) : [];
      setTransactions(transactionsArray);
    });

    return () => unsubscribe();
  }, [userId, accounts]); // Include accounts in the dependency array if transactions depend on accounts

  const handleAddTransaction = (event) => {
    event.preventDefault();
    const newTransaction = {
      description: newTransactionDescription,
      amount: parseFloat(newTransactionAmount),
      accountId: newTransactionAccount,
      date: new Date().toISOString().split('T')[0],
    };

    addTransaction(userId, newTransaction).then(() => {
      // Reset the form state
      setNewTransactionDescription('');
      setNewTransactionAmount('');
      setNewTransactionAccount('');
    }).catch(error => {
      console.error("Error adding transaction: ", error);
    });
  };

  return (
    <div>
      <h2>Transactions</h2>
      {/* This form should always be rendered */}
      <form onSubmit={handleAddTransaction}>
        <input
          type="text"
          value={newTransactionDescription}
          onChange={(e) => setNewTransactionDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="number"
          value={newTransactionAmount}
          onChange={(e) => setNewTransactionAmount(e.target.value)}
          placeholder="Amount"
          required
        />
        <select
          value={newTransactionAccount}
          onChange={(e) => setNewTransactionAccount(e.target.value)}
          required
        >
          <option value="">Select Account</option>
          {Object.entries(accounts).map(([id, account]) => (
            <option key={id} value={id}>{account.name}</option>
          ))}
        </select>
        <button type="submit">Add Transaction</button>
      </form>
      {/* ... */}
    </div>
  );
};

export default Transactions;
