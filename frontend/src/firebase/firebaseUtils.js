import { database } from './firebaseConfig';
import { ref, push, set, update,remove } from 'firebase/database';

// Accounts
export const addAccount = (userId, account) => {
  const newAccountRef = push(ref(database, `users/${userId}/accounts`));
  return set(newAccountRef, account);
};

export const deleteAccount = (userId, accountId) => {
  return remove(ref(database, `users/${userId}/accounts/${accountId}`));
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
  set(newNoteRef, note);
  return newNoteRef; // Return the reference to the new note
};

export const updateNote = (userId, noteId, noteUpdate) => {
  return update(ref(database, `users/${userId}/notes/${noteId}`), noteUpdate);
};

export const deleteNote = (userId, noteId) => {
  return remove(ref(database, `users/${userId}/notes/${noteId}`));
};

export const updateNoteOrderInFirebase = async (userId, reorderedNotes) => {
  const updates = {};
  reorderedNotes.forEach((note, index) => {
      const noteKey = note.id; // Assuming 'id' is the Firebase key for the note
      updates[`/users/${userId}/notes/${noteKey}/order`] = index;
  });

  try {
      await update(ref(database), updates); // Perform the update
  } catch (error) {
      console.error("Error updating note order: ", error);
  }
};

