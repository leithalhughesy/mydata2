import React, { useState } from 'react';
import { ModalContainer, ModalContent, Form, Label, Button, Select, Option } from './StyledComponents';

const DeleteTransactionModal = ({ isOpen, onClose, onDelete, transaction }) => {
  const [deleteMode, setDeleteMode] = useState('single');

  const handleDelete = () => {
    onDelete(deleteMode);
    onClose();
  };

  if (!isOpen || !transaction) return null;

  return (
    <ModalContainer>
      <ModalContent>
        <Form>
          {transaction.parentId && (
            <>
              <Label>Delete Mode:</Label>
              <Select value={deleteMode} onChange={(e) => setDeleteMode(e.target.value)}>
                <Option value="single">Single Occurrence</Option>
                <Option value="series">Entire Series</Option>
              </Select>
            </>
          )}
          <Button type="button" onClick={handleDelete}>Delete</Button>
          <Button type="button" onClick={onClose}>Cancel</Button>
        </Form>
      </ModalContent>
    </ModalContainer>
  );
};

export default DeleteTransactionModal;
