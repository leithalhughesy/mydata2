// src/components/AddAccountModal.js
import React, { useState } from 'react';
import { ModalContainer, ModalContent, Form, Label, Button, Input } from './StyledComponents';

const AddAccountModal = ({ isOpen, onClose, onSave, accountType }) => {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, balance: parseFloat(balance), type: accountType });
  };

  if (!isOpen) return null;

  return (
    <ModalContainer>
      <ModalContent>
        <Form onSubmit={handleSubmit}>
          <Label>Name:</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <Label>Balance:</Label>
          <Input type="number" value={balance} onChange={(e) => setBalance(e.target.value)} />
          <Button type="submit">Add Account</Button>
          <Button onClick={onClose}>Close</Button>
        </Form>
      </ModalContent>
    </ModalContainer>
  );
};

export default AddAccountModal;
