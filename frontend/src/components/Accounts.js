// src/components/Accounts.js
import React, { useState } from 'react';
import { addAccount, deleteAccount, updateAccount } from '../firebase/firebaseUtils';
import { Button, Card, Table, Thead, Tbody, Tr, Th, Td, TrH, TableContainer, AccountsContainer } from './StyledComponents';
import EditAccountModal from './EditAccountModal';
import AddAccountModal from './AddAccountModal';
import { database } from '../firebase/firebaseConfig';
import { ref, onValue } from 'firebase/database';

const Accounts = ({ userId, accounts, setAccounts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAccountType, setNewAccountType] = useState('');

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

  const openAddModal = (accountType) => {
    setNewAccountType(accountType);
    setIsAddModalOpen(true);
  };

  const handleAddNewAccount = async (newAccount) => {
    setIsAddModalOpen(false);
    try {
      await addAccount(userId, newAccount);
      // Fetch updated accounts list
      const accountsRef = ref(database, `users/${userId}/accounts`);
      
      onValue(accountsRef, (snapshot) => {
        const data = snapshot.val() || {};
        setAccounts(Object.entries(data).reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {}));
      }, { onlyOnce: true });
    } catch (error) {
      console.error("Error adding account: ", error);
    }
  };

  const handleDeleteAccount = async (accountId) => {
    try {
      await deleteAccount(userId, accountId);
      const updatedAccounts = { ...accounts };
      delete updatedAccounts[accountId];
      setAccounts(updatedAccounts);
    } catch (error) {
      console.error("Error deleting account: ", error);
    }
  };

  const handleUpdateAccount = (updatedAccount) => {
    if (!updatedAccount.id) {
      console.error('Error: Account ID is missing');
      return;
    }
    updateAccount(userId, updatedAccount.id, {
      name: updatedAccount.name,
      balance: parseFloat(updatedAccount.balance),
      type: updatedAccount.type
    }).then(() => {
      // Refresh or update the accounts list here
    }).catch((error) => {
      console.error("Error updating account: ", error);
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <EditAccountModal
        account={editingAccount}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleUpdateAccount}
      />
      <AddAccountModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddNewAccount}
        accountType={newAccountType}
      />

      <AccountsContainer>
        {['Bank', 'Loan', 'Asset'].map((type) => (
          <Card key={type}>
            <h2>{type} Accounts <Button onClick={() => openAddModal(type)}>+</Button></h2>
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
                {Object.entries(accounts || {}).filter(([id, account]) => account.type === type)
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
        ))}
      </AccountsContainer>
    </>
  );
};

export default Accounts;
