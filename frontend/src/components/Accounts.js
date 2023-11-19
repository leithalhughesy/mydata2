// src/components/Accounts.js
import React, { useState } from 'react';
import { addAccount, deleteAccount, updateAccount } from '../firebase/firebaseUtils';
import { Button, Input, Card, Table, Thead, Tbody, Tr, Th, Td, TrH, TableContainer, Select, AccountsContainer } from './StyledComponents';
import EditAccountModal from './EditAccountModal';

const Accounts = ({ userId, accounts, setAccounts }) => {
  const [newAccountName, setNewAccountName] = useState('');
  const [newAccountBalance, setNewAccountBalance] = useState('');
  const [newAccountType, setNewAccountType] = useState('Bank');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  
    // Add the formatting function
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);
    };
  
    const openEditModal = (account) => {
    setEditingAccount(account);
    setIsModalOpen(true);
  };
  
  const closeEditModal = () => {
    setIsModalOpen(false);
    setEditingAccount(null);
  };
  
  // Replace handleUpdateAccount function with this
  const handleSaveEditedAccount = (updatedAccount) => {
    handleUpdateAccount(updatedAccount.id, updatedAccount);
    closeEditModal();
  };
  
  // Function to handle the addition of a new account
  const handleAddAccount = (event) => {
    event.preventDefault();
    addAccount(userId, {
      name: newAccountName,
      balance: parseFloat(newAccountBalance),
      type: newAccountType,
    }).then(() => {
      setNewAccountName('');
      setNewAccountBalance('');
      setNewAccountType('Bank');
    }).catch((error) => {
      console.error("Error adding account: ", error);
    });
  };

  // Function to handle account deletion
  const handleDeleteAccount = async (accountId) => {
    try {
      await deleteAccount(userId, accountId);
      // Update local state to reflect the deletion
      const updatedAccounts = { ...accounts };
      delete updatedAccounts[accountId];
      setAccounts(updatedAccounts);
    } catch (error) {
      console.error("Error deleting account: ", error);
    }
  };

  // Function to handle account updates
  const handleUpdateAccount = (accountId, updatedAccount) => {
    updateAccount(userId, accountId, updatedAccount).catch((error) => {
      console.error("Error updating account: ", error);
    });
  };

  return (
    <>
      <EditAccountModal
        account={editingAccount}
        isOpen={isModalOpen}
        onClose={closeEditModal}
        onSave={handleSaveEditedAccount}
      />

      {/* Display existing accounts */}
      <AccountsContainer>
      {['Bank', 'Asset', 'Income', 'Expense'].map((type) => (
      <Card key={type}>
        <h2>{type} Accounts</h2>
        <TableContainer>
          <Table>
            <Thead>
              <TrH>
                <Th>Name</Th>
                <Th>Balance</Th>
                <Th>Actions</Th>
              </TrH>
            </Thead>
            <Tbody>
            {Object.entries(accounts).filter(([id, account]) => account.type === type)
              .map(([id, account]) => (
                <Tr key={id}>
                  <Td>{account.name}</Td>
                  <Td style={{ color: account.balance < 0 ? '#c26166' : 'inherit' }}>
          {formatCurrency(account.balance)}
        </Td>
                  <Td>
                    <Button onClick={() => openEditModal({ id, ...account })}>Edit</Button>
                    <Button onClick={() => handleDeleteAccount(id)}>Delete</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    ))} </AccountsContainer>
          {/* Add new account form */}
          <Card>
        <h3>Add new Account</h3>
        <form onSubmit={handleAddAccount}>
          <Input
            type="text"
            value={newAccountName}
            onChange={(e) => setNewAccountName(e.target.value)}
            placeholder="Account Name"
            required />
          <Input
            type="number"
            value={newAccountBalance}
            onChange={(e) => setNewAccountBalance(e.target.value)}
            placeholder="Starting Balance"
            required />
          <Select
            value={newAccountType}
            onChange={(e) => setNewAccountType(e.target.value)}
            required>
            <option value="">Select Account Type</option>
            <option value="Bank">Bank</option>
            <option value="Asset">Asset</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </Select>
          <Button type="submit">Add Account</Button>
        </form>
      </Card>

    </>
  );
};

export default Accounts;