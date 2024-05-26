import React, { useState } from 'react';
import { ModalContainer, ModalContent, Form, Label, Button, Input, Select, Option } from './StyledComponents';

const AddTransactionModal = ({ isOpen, onClose, onSave, accounts }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      description,
      amount: parseFloat(amount),
      fromAccount,
      toAccount,
      date: new Date().toISOString().split('T')[0],
    });
    setDescription('');
    setAmount('');
    setFromAccount('');
    setToAccount('');
    onClose();
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
          <Button type="submit">Add Transaction</Button>
          <Button onClick={onClose}>Close</Button>
        </Form>
      </ModalContent>
    </ModalContainer>
  );
};

export default AddTransactionModal;
