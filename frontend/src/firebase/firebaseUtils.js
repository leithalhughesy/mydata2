import { database } from './firebaseConfig';
import { ref, push, set, update } from 'firebase/database';

// Accounts
export const addAccount = (userId, account) => {
  const newAccountRef = push(ref(database, `users/${userId}/accounts`));
  return set(newAccountRef, account);
};

export const updateAccount = (userId, accountId, accountUpdate) => {
  return update(ref(database, `users/${userId}/accounts/${accountId}`), accountUpdate);
};

// Transactions
export const addTransaction = (userId, transaction) => {
  const newTransactionRef = push(ref(database, `users/${userId}/transactions`));
  return set(newTransactionRef, transaction);
};

export const updateTransaction = (userId, transactionId, transactionUpdate) => {
  return update(ref(database, `users/${userId}/transactions/${transactionId}`), transactionUpdate);
};
