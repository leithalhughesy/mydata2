import { database } from './firebaseConfig';
import { ref, push, set, update, remove, get } from 'firebase/database';

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

export const updateTransaction = (userId, transactionId, transactionUpdate, parentId = null) => {
  const transactionRef = parentId
    ? ref(database, `users/${userId}/transactions/${parentId}/childTransactions/${transactionId}`)
    : ref(database, `users/${userId}/transactions/${transactionId}`);
  return update(transactionRef, transactionUpdate);
};

export const addRecurringTransaction = async (userId, transaction) => {
  const newTransactionRef = push(ref(database, `users/${userId}/transactions`));
  await set(newTransactionRef, transaction);
  return newTransactionRef;
};

export const addChildTransaction = (userId, parentId, transaction) => {
  const newChildTransactionRef = push(ref(database, `users/${userId}/transactions/${parentId}/childTransactions`));
  return set(newChildTransactionRef, transaction);
};

export const deleteTransaction = async (userId, transactionId, parentId = null) => {
  const transactionRef = parentId 
    ? ref(database, `users/${userId}/transactions/${parentId}/childTransactions/${transactionId}`) 
    : ref(database, `users/${userId}/transactions/${transactionId}`);
  await remove(transactionRef);
};

export const deleteRecurringTransaction = async (userId, parentId) => {
  const parentTransactionRef = ref(database, `users/${userId}/transactions/${parentId}`);
  const snapshot = await get(parentTransactionRef);
  const parentTransactionData = snapshot.val();

  if (parentTransactionData && parentTransactionData.childTransactions) {
    const updates = {};
    Object.keys(parentTransactionData.childTransactions).forEach(childId => {
      updates[`users/${userId}/transactions/${parentId}/childTransactions/${childId}`] = null;
    });

    // Perform the child transactions deletion first
    await update(ref(database), updates);

    // Then remove the parent transaction
    await remove(parentTransactionRef);
  } else {
    await remove(parentTransactionRef);
  }
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
    const noteKey = note.id;
    updates[`/users/${userId}/notes/${noteKey}/order`] = index;
  });

  try {
    await update(ref(database), updates);
  } catch (error) {
    console.error("Error updating note order: ", error);
  }
};
