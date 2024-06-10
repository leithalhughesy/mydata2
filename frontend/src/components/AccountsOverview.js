import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { get, ref } from 'firebase/database';
import { database } from '../firebase/firebaseConfig';
import { Button, Card, AccountsContainer, TableContainer } from './StyledComponents';
import 'chart.js/auto';

const timePeriods = [
  { label: '3M', value: 3 * 30 * 24 * 60 * 60 * 1000 },
  { label: '6M', value: 6 * 30 * 24 * 60 * 60 * 1000 },
  { label: '1Y', value: 365 * 24 * 60 * 60 * 1000 },
  { label: '2Y', value: 2 * 365 * 24 * 60 * 60 * 1000 },
  { label: '5Y', value: 5 * 365 * 24 * 60 * 60 * 1000 },
  { label: '10Y', value: 10 * 365 * 24 * 60 * 60 * 1000 },
  { label: '20Y', value: 20 * 365 * 24 * 60 * 60 * 1000 },
  { label: '40Y', value: 40 * 365 * 24 * 60 * 60 * 1000 },
  { label: '60Y', value: 60 * 365 * 24 * 60 * 60 * 1000 },
];

const AccountsOverview = ({ userId }) => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(timePeriods[0].value);
  const [accounts, setAccounts] = useState({});

  useEffect(() => {
    if (userId) {
      const accountsRef = ref(database, `users/${userId}/accounts`);
      get(accountsRef).then((snapshot) => {
        if (snapshot.exists()) {
          setAccounts(snapshot.val());
        }
      });

      const transactionsRef = ref(database, `users/${userId}/transactions`);
      get(transactionsRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const transactionsArray = [];

          Object.entries(data).forEach(([key, value]) => {
            if (value.childTransactions) {
              Object.entries(value.childTransactions).forEach(([childKey, childValue]) => {
                transactionsArray.push({ id: childKey, parentId: key, ...childValue });
              });
            } else {
              transactionsArray.push({ id: key, ...value });
            }
          });

          setTransactions(transactionsArray);
        }
      });
    }
  }, [userId]);

  const handleTimePeriodChange = (period) => {
    setSelectedTimePeriod(period);
  };

  const filterTransactionsByDate = (transactions, period) => {
    const now = new Date().getTime();
    return transactions.filter(transaction => new Date(transaction.date).getTime() >= (now - period));
  };

  const calculateAccountBalances = (transactions, accounts) => {
    const accountBalances = {};
    Object.keys(accounts).forEach(accountId => {
      accountBalances[accountId] = [];
    });

    const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

    sortedTransactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date).toLocaleDateString();
      Object.keys(accounts).forEach(accountId => {
        if (accountBalances[accountId].length === 0) {
          accountBalances[accountId].push({ date: transactionDate, balance: parseFloat(accounts[accountId].balance) });
        } else {
          const lastBalance = accountBalances[accountId][accountBalances[accountId].length - 1].balance;
          accountBalances[accountId].push({ date: transactionDate, balance: lastBalance });
        }
      });

      if (transaction.fromAccount && accountBalances[transaction.fromAccount]) {
        accountBalances[transaction.fromAccount][accountBalances[transaction.fromAccount].length - 1].balance -= parseFloat(transaction.amount);
      }
      if (transaction.toAccount && accountBalances[transaction.toAccount]) {
        accountBalances[transaction.toAccount][accountBalances[transaction.toAccount].length - 1].balance += parseFloat(transaction.amount);
      }
    });

    return accountBalances;
  };

  const filteredTransactions = filterTransactionsByDate(transactions, selectedTimePeriod);

  const accountBalancesOverTime = calculateAccountBalances(filteredTransactions, accounts);

  const data = {
    labels: Array.from(new Set(filteredTransactions.map(transaction => new Date(transaction.date).toLocaleDateString()))),
    datasets: Object.entries(accountBalancesOverTime).map(([accountId, balanceEntries]) => ({
      label: accounts[accountId]?.name || accountId,
      data: balanceEntries.map(entry => entry.balance),
      fill: false,
      borderColor: 'rgba(75,192,192,1)',
      tension: 0.1,
    })),
  };

  return (
    <AccountsContainer>
      <Card>
        <h2>Overview</h2>
        <div>
          {timePeriods.map(period => (
            <Button
              key={period.label}
              onClick={() => handleTimePeriodChange(period.value)}
              style={{
                backgroundColor: selectedTimePeriod === period.value ? '#4CAF50' : '',
              }}
            >
              {period.label}
            </Button>
          ))}
        </div>
        <TableContainer>
          <Line data={data} />
        </TableContainer>
      </Card>
    </AccountsContainer>
  );
};

export default AccountsOverview;
