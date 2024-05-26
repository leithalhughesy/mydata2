import React, { useState, useEffect } from 'react';
import { ref, onValue, push, set, update, remove } from 'firebase/database';
import { database } from '../firebase/firebaseConfig';
import { Button, Card, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from './StyledComponents';
import EditTransactionModal from './EditTransactionModal';
import AddTransactionModal from './AddTransactionModal';

const Transactions = ({ userId, accounts }) => {
  const [transactions, setTransactions] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const transactionsRef = ref(database, `users/${userId}/transactions`);
    onValue(transactionsRef, (snapshot) => {
      const data = snapshot.val() || {};
      setTransactions(Object.entries(data).map(([key, value]) => ({ id: key, ...value })));
    });
  }, [userId]);

  const handleAddTransaction = async (newTransaction) => {
    const newTransactionRef = push(ref(database, `users/${userId}/transactions`));
    try {
      await set(newTransactionRef, newTransaction);
    } catch (error) {
      console.error("Error adding transaction: ", error);
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      await remove(ref(database, `users/${userId}/transactions/${transactionId}`));
    } catch (error) {
      console.error("Error deleting transaction: ", error);
    }
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
    <>
      <EditTransactionModal
        transaction={editingTransaction}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveTransaction}
        accounts={accounts}
      />
      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddTransaction}
        accounts={accounts}
      />
      <Card>
        <h2>Transactions <Button onClick={() => setIsAddModalOpen(true)}>+</Button></h2>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Description</Th>
                <Th>Amount</Th>
                <Th>From Account</Th>
                <Th>To Account</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((transaction) => (
                <Tr key={transaction.id} onClick={() => handleEditTransaction(transaction)}>
                  <Td>{transaction.description}</Td>
                  <Td>${transaction.amount}</Td>
                  <Td>{accounts[transaction.fromAccount]?.name}</Td>
                  <Td>{accounts[transaction.toAccount]?.name}</Td>
                  <Td>
                    <Button onClick={(e) => { e.stopPropagation(); handleEditTransaction(transaction); }}>Edit</Button>
                    <Button onClick={(e) => { e.stopPropagation(); handleDeleteTransaction(transaction.id); }}>Delete</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

export default Transactions;
