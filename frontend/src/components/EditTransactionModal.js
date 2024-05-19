import React, { useState, useEffect } from 'react';
import { ModalContainer, ModalContent, Form, Label, Button, Input, Select, Option } from './StyledComponents';

const EditTransactionModal = ({ transaction, isOpen, onClose, onSave, accounts }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');

  useEffect(() => {
    if (transaction) {
      setDescription(transaction.description);
      setAmount(transaction.amount);
      setFromAccount(transaction.fromAccount);
      setToAccount(transaction.toAccount);
    }
  }, [transaction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...transaction,
      description,
      amount: parseFloat(amount),
      fromAccount,
      toAccount,
    });
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
          <Button type="submit">Save Changes</Button>
          <Button onClick={onClose}>Close</Button>
        </Form>
      </ModalContent>
    </ModalContainer>
  );
};

export default EditTransactionModal;
