// src/components/Transactions.js
import React, { useState, useEffect } from 'react';
import { ref, onValue, push, set } from 'firebase/database';
import { database } from '../firebase/firebaseConfig';
import { Button, Input, Select, Option, Card, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from './StyledComponents';

const Transactions = ({ userId, accounts }) => {
  const [transactions, setTransactions] = useState([]);
  const [newTransactionDescription, setNewTransactionDescription] = useState('');
  const [newTransactionAmount, setNewTransactionAmount] = useState('');
  const [newTransactionAccount, setNewTransactionAccount] = useState('');

  // Effect to listen to transactions updates
  useEffect(() => {
    if (!userId) return;

    const transactionsRef = ref(database, `users/${userId}/transactions`);
    const unsubscribe = onValue(transactionsRef, (snapshot) => {
      const data = snapshot.val();
      const transactionsArray = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      })) : [];
      setTransactions(transactionsArray);
    });

    return () => unsubscribe();
  }, [userId]); // Removed accounts from dependencies as it's not used here

  const handleAddTransaction = async (event) => {
    event.preventDefault();
    const newTransactionRef = push(ref(database, `users/${userId}/transactions`));
    const newTransaction = {
      description: newTransactionDescription,
      amount: parseFloat(newTransactionAmount),
      accountId: newTransactionAccount,
      date: new Date().toISOString().split('T')[0],
    };

    try {
      await set(newTransactionRef, newTransaction);
      setNewTransactionDescription('');
      setNewTransactionAmount('');
      setNewTransactionAccount('');
    } catch (error) {
      console.error("Error adding transaction: ", error);
    }
  };

  return (
    <><Card>
          <h2>Transactions</h2>
          <TableContainer><Table><Thead><Tr><Th>Name</Th><Th>Amount</Th><Th>From</Th></Tr></Thead>
              <Tbody>
                  {/* List of transactions */}
                  {transactions.map((transaction) => (
                      <Tr key={transaction.id}>
                          <Td>{transaction.description}</Td><Td>${transaction.amount}</Td><Td>{transaction.accounts}</Td>
                          {/* Add more details about transaction */}
                      </Tr>
                  ))}
              </Tbody>
          </Table></TableContainer>
      </Card><Card>
      <h3>Add new Transaction</h3>
              {/* This form should always be rendered, so ensure it's outside any conditional logic */}
              <form onSubmit={handleAddTransaction}>
                  <Input
                      type="text"
                      value={newTransactionDescription}
                      onChange={(e) => setNewTransactionDescription(e.target.value)}
                      placeholder="Description"
                      required />
                  <Input
                      type="number"
                      value={newTransactionAmount}
                      onChange={(e) => setNewTransactionAmount(e.target.value)}
                      placeholder="Amount"
                      required />
                      <Select
                          value={newTransactionAccount}
                          onChange={(e) => setNewTransactionAccount(e.target.value)}
                          required
                      >
                          <option value="">Select Account</option>
                          {/* Make sure `accounts` is an object with keys as account ids */}
                          {Object.entries(accounts).map(([id, account]) => (
                              <Option key={id} value={id}>{account.name}</Option>
                          ))}
                      </Select>
                  <Button type="submit">Add Transaction</Button>
              </form>

          </Card></>
  );  
};

export default Transactions;
