import React, { useState, useEffect } from 'react';
import { ref, onValue, push, set, update } from 'firebase/database';
import { database } from '../firebase/firebaseConfig';
import { Button, Input, Select, Option, Card, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from './StyledComponents';
import EditTransactionModal from './EditTransactionModal';

const Transactions = ({ userId, accounts }) => {
  const [transactions, setTransactions] = useState([]);
  const [newTransactionDescription, setNewTransactionDescription] = useState('');
  const [newTransactionAmount, setNewTransactionAmount] = useState('');
  const [newTransactionFromAccount, setNewTransactionFromAccount] = useState('');
  const [newTransactionToAccount, setNewTransactionToAccount] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const transactionsRef = ref(database, `users/${userId}/transactions`);
    onValue(transactionsRef, (snapshot) => {
      const data = snapshot.val() || {};
      setTransactions(Object.entries(data).map(([key, value]) => ({ id: key, ...value })));
    });
  }, [userId]);

  const handleAddTransaction = async (event) => {
    event.preventDefault();
    const newTransactionRef = push(ref(database, `users/${userId}/transactions`));
    const newTransaction = {
      description: newTransactionDescription,
      amount: parseFloat(newTransactionAmount),
      fromAccount: newTransactionFromAccount,
      toAccount: newTransactionToAccount,
      date: new Date().toISOString().split('T')[0],
    };

    try {
      await set(newTransactionRef, newTransaction);
      setNewTransactionDescription('');
      setNewTransactionAmount('');
      setNewTransactionFromAccount('');
      setNewTransactionToAccount('');
    } catch (error) {
      console.error("Error adding transaction: ", error);
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const handleSaveTransaction = async (updatedTransaction) => {
    try {
      await update(ref(database, `users/${userId}/transactions/${updatedTransaction.id}`), updatedTransaction);
      setIsEditModalOpen(false);
      setEditingTransaction(null);
    } catch (error) {
      console.error("Error updating transaction: ", error);
    }
  };

  return (
    <><Card>
          <h2>Transactions</h2>
          <TableContainer><Table><Thead><Tr><Th>Description</Th><Th>Amount</Th><Th>From Account</Th><Th>To Account</Th></Tr></Thead>
              <Tbody>
                  {transactions.map((transaction) => (
                      <Tr key={transaction.id} onClick={() => handleEditTransaction(transaction)}>
                          <Td>{transaction.description}</Td><Td>${transaction.amount}</Td><Td>{accounts[transaction.fromAccount]?.name}</Td><Td>{accounts[transaction.toAccount]?.name}</Td>
                      </Tr>
                  ))}
              </Tbody>
          </Table></TableContainer>
      </Card><Card>
      <h3>Add new Transaction</h3>
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
                      value={newTransactionFromAccount}
                      onChange={(e) => setNewTransactionFromAccount(e.target.value)}
                      required
                  >
                      <option value="">From Account</option>
                      {Object.entries(accounts).map(([id, account]) => (
                          <Option key={id} value={id}>{account.name}</Option>
                      ))}
                  </Select>
                  <Select
                      value={newTransactionToAccount}
                      onChange={(e) => setNewTransactionToAccount(e.target.value)}
                      required
                  >
                      <option value="">To Account</option>
                      {Object.entries(accounts).map(([id, account]) => (
                          <Option key={id} value={id}>{account.name}</Option>
                      ))}
                  </Select>
                  <Button type="submit">Add Transaction</Button>
              </form>
          </Card><EditTransactionModal
            transaction={editingTransaction}
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleSaveTransaction}
            accounts={accounts}
          /></>
  );  
};

export default Transactions;
