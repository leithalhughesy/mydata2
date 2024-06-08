import { get, ref } from 'firebase/database'; // Ensure you import the get and ref functions from firebase/database
import React, { useState, useEffect } from 'react';
import { ModalContainer, ModalContent, Form, Label, Button, Input, Select, Option } from './StyledComponents';
import { database } from '../firebase/firebaseConfig'; // Ensure you import the database configuration

const EditTransactionModal = ({ transaction, isOpen, onClose, onSave, accounts, userId }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [date, setDate] = useState('');
  const [recurrence, setRecurrence] = useState('');
  const [recurrenceEndDate, setRecurrenceEndDate] = useState('');
  const [recurrenceInterval, setRecurrenceInterval] = useState(1);
  const [editMode, setEditMode] = useState('single'); // 'single' or 'series'

  useEffect(() => {
    const fetchParentData = async (parentId) => {
      const parentTransactionRef = ref(database, `users/${userId}/transactions/${parentId}`);
      const parentSnapshot = await get(parentTransactionRef);
      return parentSnapshot.val();
    };

    if (transaction) {
      setDescription(transaction.description || '');
      setAmount(transaction.amount || '');
      setFromAccount(transaction.fromAccount || '');
      setToAccount(transaction.toAccount || '');
      setDate(transaction.date ? new Date(transaction.date).toISOString().split('T')[0] : ''); // Ensure date is in the correct format

      if (transaction.parentId) {
        fetchParentData(transaction.parentId).then(parentData => {
          if (parentData) {
            setRecurrence(parentData.recurrence || '');
            setRecurrenceEndDate(parentData.recurrenceEndDate ? new Date(parentData.recurrenceEndDate).toISOString().split('T')[0] : '');
            setRecurrenceInterval(parentData.recurrenceInterval || 1);
          }
        });
      } else {
        setRecurrence(transaction.recurrence || '');
        setRecurrenceEndDate(transaction.recurrenceEndDate ? new Date(transaction.recurrenceEndDate).toISOString().split('T')[0] : ''); // Ensure date is in the correct format
        setRecurrenceInterval(transaction.recurrenceInterval || 1);
      }

      setEditMode(transaction.parentId ? 'series' : 'single'); // Determine if the transaction is part of a series
    }
  }, [transaction, userId]); // Add userId to the dependency array

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...transaction,
      description,
      amount: parseFloat(amount),
      fromAccount,
      toAccount,
      date,
      recurrence,
      recurrenceEndDate,
      recurrenceInterval,
      editMode,
    });
  };

  const handleRecurrenceChange = (e) => {
    setRecurrence(e.target.value);
  };

  if (!isOpen || !transaction) return null;

  return (
    <ModalContainer>
      <ModalContent>
        <Form onSubmit={handleSubmit}>
          <Label>Description:</Label>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} required />
          <Label>Amount:</Label>
          <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          <Label>Date:</Label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          <Label>From Account:</Label>
          <Select value={fromAccount} onChange={(e) => setFromAccount(e.target.value)} required>
            <option value="">Select Account</option>
            {Object.entries(accounts).map(([id, account]) => (
              <Option key={id} value={id}>{account.name}</Option>
            ))}
          </Select>
          <Label>To Account:</Label>
          <Select value={toAccount} onChange={(e) => setToAccount(e.target.value)} required>
            <option value="">Select Account</option>
            {Object.entries(accounts).map(([id, account]) => (
              <Option key={id} value={id}>{account.name}</Option>
            ))}
          </Select>
          {transaction.parentId && (
            <>
              <Label>Edit Mode:</Label>
              <Select value={editMode} onChange={(e) => setEditMode(e.target.value)}>
                <Option value="single">Single Occurrence</Option>
                <Option value="series">Entire Series</Option>
              </Select>
            </>
          )}
          {(editMode === 'series' || recurrence) && (
            <>
              <Label>Recurrence:</Label>
              <Select value={recurrence} onChange={handleRecurrenceChange}>
                <Option value="">None</Option>
                <Option value="weekly">Weekly</Option>
                <Option value="monthly">Monthly</Option>
                <Option value="annually">Annually</Option>
                <Option value="custom">Custom</Option>
              </Select>
              {recurrence && (
                <>
                  <Label>Recurrence End Date:</Label>
                  <Input type="date" value={recurrenceEndDate} onChange={(e) => setRecurrenceEndDate(e.target.value)} required />
                </>
              )}
              {recurrence === 'custom' && (
                <>
                  <Label>Recurrence Interval:</Label>
                  <Input type="number" value={recurrenceInterval} onChange={(e) => setRecurrenceInterval(e.target.value)} required />
                </>
              )}
            </>
          )}
          <Button type="submit">Save Changes</Button>
          <Button onClick={onClose}>Close</Button>
        </Form>
      </ModalContent>
    </ModalContainer>
  );
};

export default EditTransactionModal;
