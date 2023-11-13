import { database } from './firebaseConfig';
import { ref, push, set, update,remove } from 'firebase/database';

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

// Notes
export const addNote = (userId, note) => {
  const newNoteRef = push(ref(database, `users/${userId}/notes`));
  return set(newNoteRef, note);
};

export const updateNote = (userId, noteId, noteUpdate) => {
  return update(ref(database, `users/${userId}/notes/${noteId}`), noteUpdate);
};

export const deleteNote = (userId, noteId) => {
  return remove(ref(database, `users/${userId}/notes/${noteId}`));
};