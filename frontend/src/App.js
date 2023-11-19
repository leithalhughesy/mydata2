// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, onValue, set } from 'firebase/database';
import { auth, database } from './firebase/firebaseConfig';
import Header from './components/Header';
import Home from './components/Home';
import Finances from './components/Finances';
import ToDo from './components/ToDo';
import Notes from './components/Notes';
import { MainContent } from './components/StyledComponents';
import Login from './components/Login';
import UserSettingsModal from './components/UserSettingsModal';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme'; // Import the themes

function App() {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState({});
  const [theme, setTheme] = useState(darkTheme); // Default to dark theme
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

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

  useEffect(() => {
    if (user) {
      const settingsRef = ref(database, `users/${user.uid}/settings`);
      onValue(settingsRef, (snapshot) => {
        if (snapshot.exists()) {
          const userSettings = snapshot.val();
          setTheme(userSettings.theme === 'light' ? lightTheme : darkTheme);
        } else {
          // Set default theme in database for new users
          set(settingsRef, { theme: 'dark' });
          setTheme(darkTheme);
        }
      }, {
        onlyOnce: true
      });
    }
  }, [user]);

  const toggleSettingsModal = () => setIsSettingsModalOpen(!isSettingsModalOpen);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const updateTheme = (newTheme) => {
    setTheme(newTheme === 'light' ? lightTheme : darkTheme);
  };
  

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Header user={user} onLogout={handleLogout} onSettings={toggleSettingsModal} />
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
            {isSettingsModalOpen && (
              <UserSettingsModal
                user={user}
                isOpen={isSettingsModalOpen}
                onClose={toggleSettingsModal}
                updateTheme={updateTheme}
                currentTheme={theme.title} // Assuming your theme object has a title property
              />
            )}          
          </MainContent>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
