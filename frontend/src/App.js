// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import { auth, database } from './firebase/firebaseConfig';
import Header from './components/Header';
import Home from './components/Home';
import Finances from './components/Finances';
import ToDo from './components/ToDo';
import Notes from './components/Notes';
import { MainContent } from './components/StyledComponents';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState({});

  // Monitor auth state and fetch accounts when user logs in
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch accounts
        const accountsRef = ref(database, `users/${currentUser.uid}/accounts`);
        onValue(accountsRef, (snapshot) => {
          setAccounts(snapshot.val() || {});
        });
      } else {
        setAccounts({});
      }
    });

    // Cleanup function to unsubscribe from the auth listener on component unmount
    return unsubscribeAuth;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Header user={user} onLogout={handleLogout} />
        <MainContent>
          {user ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/finances" element={user ? <Finances user={user} accounts={accounts} setAccounts={setAccounts} /> : <Login />}/>
              <Route path="/todo" element={<ToDo />} />
              <Route path="/notes" element={<Notes />} />
            </Routes>
          ) : (
            <Login />
          )}
        </MainContent>
      </div>
    </Router>
  );
}

export default App;
