// src/components/Accounts.js
import React, { useState } from 'react';
import { addAccount } from '../firebase/firebaseUtils';
import { Button, Input, Card, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from './StyledComponents';

const Accounts = ({ userId, accounts, setAccounts }) => {
  const [newAccountName, setNewAccountName] = useState('');
  const [newAccountBalance, setNewAccountBalance] = useState('');

  const handleAddAccount = (event) => {
    event.preventDefault();
    addAccount(userId, {
      name: newAccountName,
      balance: parseFloat(newAccountBalance),
    }).then(() => {
      setNewAccountName('');
      setNewAccountBalance('');
    }).catch((error) => {
      console.error("Error adding account: ", error);
    });
  };

  return (
    <><Card>
          <h2>Accounts</h2>
          <TableContainer><Table><Thead><Tr><Th>Name</Th><Th>Balance</Th></Tr></Thead>
                <Tbody>
                  {Object.entries(accounts).map(([id, account]) => (
                      <Tr key={id}>
                          <Td>{account.name}</Td>
                          <Td>${account.balance}</Td>
                          {/* Add edit and delete functionality */}
                      </Tr>
                  ))}
                </Tbody>
          </Table></TableContainer>
      </Card>
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
              <Button type="submit">Add Account</Button>
            </form>
       </Card></>
  );
};

export default Accounts;
