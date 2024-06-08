import React, { useState, useEffect } from 'react';
import { ModalContainer, ModalContent, Form, Label, Button, Input, Select, Option } from './StyledComponents';

const AddTransactionModal = ({ isOpen, onClose, onSave, accounts }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [date, setDate] = useState('');
  const [recurrence, setRecurrence] = useState('');
  const [recurrenceEndDate, setRecurrenceEndDate] = useState('');
  const [recurrenceInterval, setRecurrenceInterval] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setDate(new Date().toISOString().split('T')[0]); // Set current date
      console.log("Modal opened, setting date to current date");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      description,
      amount: parseFloat(amount),
      fromAccount,
      toAccount,
      date,
      recurrence,
      recurrenceEndDate,
      recurrenceInterval: parseInt(recurrenceInterval),
    };
    console.log("Submitting transaction: ", newTransaction);
    onSave(newTransaction);
    onClose();
  };

  const handleRecurrenceChange = (e) => {
    setRecurrence(e.target.value);
  };

  if (!isOpen) return null;

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
          <Label>Recurrence:</Label>
          <Select value={recurrence} onChange={handleRecurrenceChange}>
            <Option value="">None</Option>
            <Option value="weekly">Weekly</Option>
            <Option value="monthly">Monthly</Option>
            <Option value="annually">Annually</Option>
            <Option value="custom">Custom</Option>
          </Select>
          {recurrence && recurrence !== 'custom' && (
            <>
              <Label>Recurrence End Date:</Label>
              <Input type="date" value={recurrenceEndDate} onChange={(e) => setRecurrenceEndDate(e.target.value)} required />
            </>
          )}
          {recurrence === 'custom' && (
            <>
              <Label>Recurrence Interval:</Label>
              <Input type="number" value={recurrenceInterval} onChange={(e) => setRecurrenceInterval(e.target.value)} required />
              <Label>Recurrence End Date:</Label>
              <Input type="date" value={recurrenceEndDate} onChange={(e) => setRecurrenceEndDate(e.target.value)} required />
            </>
          )}
          <Button type="submit">Add Transaction</Button>
          <Button
            type="button"
            onClick={() => {
              console.log("Closing modal");
              onClose();
            }}
          >
            Close
          </Button>
        </Form>
      </ModalContent>
    </ModalContainer>
  );
};

export default AddTransactionModal;
