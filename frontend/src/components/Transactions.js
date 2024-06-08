import React, { useState, useEffect } from 'react';
import { ref, onValue, update, get } from 'firebase/database';
import { database } from '../firebase/firebaseConfig';
import { 
  addRecurringTransaction, 
  addChildTransaction, 
  addTransaction, 
  deleteTransaction, 
  deleteRecurringTransaction, 
  updateTransaction 
} from '../firebase/firebaseUtils';
import { Button, Card, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from './StyledComponents';
import EditTransactionModal from './EditTransactionModal';
import AddTransactionModal from './AddTransactionModal';
import DeleteTransactionModal from './DeleteTransactionModal';

const Transactions = ({ userId, accounts }) => {
  const [transactions, setTransactions] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [deletingTransaction, setDeletingTransaction] = useState(null);

  useEffect(() => {
    if (!userId) return;
  
    const transactionsRef = ref(database, `users/${userId}/transactions`);
    onValue(transactionsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const allTransactions = [];
  
      Object.entries(data).forEach(([key, value]) => {
        if (value.childTransactions) {
          const parentRecurrence = value.recurrence;
          const parentRecurrenceEndDate = value.recurrenceEndDate;
          Object.entries(value.childTransactions).forEach(([childKey, childValue]) => {
            allTransactions.push({ id: childKey, parentId: key, recurrence: parentRecurrence, recurrenceEndDate: parentRecurrenceEndDate, ...childValue });
          });
        } else {
          allTransactions.push({ id: key, ...value });
        }
      });
  
      console.log('Fetched Transactions:', allTransactions); // Add this log
      setTransactions(allTransactions.sort((a, b) => new Date(a.date) - new Date(b.date)));
    });
  }, [userId]);
  
  const handleAddTransaction = async (newTransaction) => {
    const { 
      description, 
      amount, 
      fromAccount, 
      toAccount, 
      date, 
      recurrence, 
      recurrenceEndDate, 
      recurrenceInterval 
    } = newTransaction;

    const generateRecurrenceDates = (startDate, endDate, interval) => {
      const dates = [];
      let currentDate = new Date(startDate);
      const end = new Date(endDate);

      while (currentDate <= end) {
        dates.push(new Date(currentDate).toISOString().split('T')[0]);
        if (recurrence === 'weekly') {
          currentDate.setDate(currentDate.getDate() + 7 * interval);
        } else if (recurrence === 'monthly') {
          currentDate.setMonth(currentDate.getMonth() + interval);
        } else if (recurrence === 'annually') {
          currentDate.setFullYear(currentDate.getFullYear() + interval);
        }
      }

      return dates;
    };

    const dates = recurrence ? generateRecurrenceDates(date, recurrenceEndDate, recurrenceInterval) : [date];

    if (recurrence) {
      const parentTransaction = {
        description,
        amount,
        fromAccount,
        toAccount,
        date,
        recurrence,
        recurrenceEndDate,
        recurrenceInterval,
        childTransactions: {},
      };

      try {
        const parentTransactionRef = await addRecurringTransaction(userId, parentTransaction);

        if (!parentTransactionRef.key) {
          throw new Error('Failed to add parent transaction');
        }

        for (const transactionDate of dates) {
          const childTransaction = { 
            description, 
            amount, 
            fromAccount, 
            toAccount, 
            date: transactionDate, 
            parentId: parentTransactionRef.key 
          };
          await addChildTransaction(userId, parentTransactionRef.key, childTransaction);
        }
      } catch (error) {
        console.error('Error in handleAddTransaction:', error);
      }
    } else {
      const singleTransaction = { description, amount, fromAccount, toAccount, date };
      await addTransaction(userId, singleTransaction);
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const handleDeleteTransactionClick = (transaction) => {
    setDeletingTransaction(transaction);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteTransaction = async (deleteMode) => {
    const { id, parentId } = deletingTransaction;

    try {
      if (deleteMode === 'single' || !parentId) {
        await deleteTransaction(userId, id, parentId);
      } else if (deleteMode === 'series' && parentId) {
        await deleteRecurringTransaction(userId, parentId);
      }

      setDeletingTransaction(null);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting transaction: ", error);
    }
  };

  const handleSaveTransaction = async (updatedTransaction) => {
    const { id, parentId, editMode, date, recurrence, recurrenceEndDate, recurrenceInterval, ...transactionData } = updatedTransaction;

    const generateRecurrenceDates = (startDate, endDate, interval) => {
      const dates = [];
      let currentDate = new Date(startDate);
      const end = new Date(endDate);

      console.log("generateRecurrenceDates - startDate:", startDate, "endDate:", endDate, "interval:", interval); // Add logging

      while (currentDate <= end) {
        dates.push(new Date(currentDate).toISOString().split('T')[0]);
        if (recurrence === 'weekly') {
          currentDate.setDate(currentDate.getDate() + 7 * interval);
        } else if (recurrence === 'monthly') {
          currentDate.setMonth(currentDate.getMonth() + interval);
        } else if (recurrence === 'annually') {
          currentDate.setFullYear(currentDate.getFullYear() + interval);
        }
      }

      return dates;
    };

    try {
      if (editMode === 'single' || !parentId) {
        await updateTransaction(userId, id, transactionData, parentId);
      } else if (editMode === 'series' && parentId) {
        const parentRef = ref(database, `users/${userId}/transactions/${parentId}`);
        await update(parentRef, { ...transactionData, date });

        if (!recurrenceEndDate) {
          console.error("Recurrence end date is required for series update.");
          return;
        }

        const dates = generateRecurrenceDates(date, recurrenceEndDate, recurrenceInterval);
        console.log("Generated dates: ", dates); // Add logging

        const childTransactionsSnapshot = await get(ref(database, `users/${userId}/transactions/${parentId}/childTransactions`));
        const childTransactions = childTransactionsSnapshot.val() || {};

        const updates = {};
        Object.keys(childTransactions).forEach((childId, index) => {
          const newDate = dates[index] || childTransactions[childId].date; // Ensure the date is properly updated
          console.log(`Updating child transaction ${childId} with date ${newDate}`); // Add logging
          updates[`users/${userId}/transactions/${parentId}/childTransactions/${childId}`] = {
            ...childTransactions[childId],
            ...transactionData,
            date: newDate
          };
        });

        await update(ref(database), updates);
      }

      setIsEditModalOpen(false);
      setEditingTransaction(null);
    } catch (error) {
      console.error("Error updating transaction: ", error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <>
      <EditTransactionModal
        transaction={editingTransaction}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveTransaction}
        accounts={accounts}
        userId={userId}
      />
      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddTransaction}
        accounts={accounts}
      />
      <DeleteTransactionModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteTransaction}
        transaction={deletingTransaction}
      />
      <Card>
        <h2>Transactions <Button onClick={() => setIsAddModalOpen(true)}>+</Button></h2>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Description</Th>
                <Th>Amount</Th>
                <Th>Date</Th>
                <Th>From Account</Th>
                <Th>To Account</Th>
                <Th>Recurrence</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
            {transactions.map((transaction) => {
              console.log('Transaction:', transaction); // Add this log
              return (
                <Tr key={transaction.id} onClick={() => handleEditTransaction(transaction)}>
                  <Td>{transaction.description}</Td>
                  <Td>${transaction.amount}</Td>
                  <Td>{formatDate(transaction.date)}</Td>
                  <Td>{accounts[transaction.fromAccount]?.name}</Td>
                  <Td>{accounts[transaction.toAccount]?.name}</Td>
                  <Td>{transaction.recurrence ? transaction.recurrence : 'None'}</Td> {/* Display 'None' if no recurrence */}
                  <Td>
                    <Button onClick={(e) => { e.stopPropagation(); handleEditTransaction(transaction); }}>Edit</Button>
                    <Button onClick={(e) => { e.stopPropagation(); handleDeleteTransactionClick(transaction); }}>Delete</Button>
                  </Td>
                </Tr>
              );
            })}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

export default Transactions;
