// src/App.js
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import { auth, database } from './firebase/firebaseConfig';
import Login from './components/Login';
import Accounts from './components/Accounts';
import Transactions from './components/Transactions';

function App() {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState({});

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const accountsRef = ref(database, `users/${currentUser.uid}/accounts`);
        const unsubscribeAccounts = onValue(accountsRef, (snapshot) => {
          setAccounts(snapshot.val() || {});
        });
        return () => unsubscribeAccounts();
      } else {
        setAccounts({});
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <div className="App">
      {user ? (
        <>
          <Accounts userId={user.uid} accounts={accounts} setAccounts={setAccounts} />
          <Transactions userId={user.uid} accounts={accounts} />
          {/* Add a logout button or link */}
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
