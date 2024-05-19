// src/components/EditAccountModal.js
import React, { useState, useEffect } from 'react';
import { ModalContainer, ModalContent, Form, Label, Select, Button, Input } from './StyledComponents';

const EditAccountModal = ({ account, isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);
  const [type, setType] = useState('Bank');

  useEffect(() => {
    if (account) {
      setName(account.name);
      setBalance(account.balance);
      setType(account.type);
    }
  }, [account]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...account, name, balance: parseFloat(balance), type });
  };

  if (!isOpen || !account) return null;

  return (
    <ModalContainer>
      <ModalContent>
        <Form onSubmit={handleSubmit}>
          <Label>Name:</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <Label>Balance:</Label>
          <Input type="number" value={balance} onChange={(e) => setBalance(e.target.value)} />
          <Label>Type:</Label>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Bank">Bank</option>
            <option value="Loan">Loan</option>
            <option value="Asset">Asset</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </Select>
          <Button type="submit">Save Changes</Button>
          <Button onClick={onClose}>Close</Button>
        </Form>
      </ModalContent>
    </ModalContainer>
  );
};

export default EditAccountModal;
