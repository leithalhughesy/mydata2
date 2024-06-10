import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, onValue, set } from 'firebase/database';
import { auth, database } from './firebase/firebaseConfig';
import Header from './components/Header';
import Home from './components/Home';
import ToDo from './components/ToDo';
import Notes from './components/Notes';
import Login from './components/Login';
import UserSettingsModal from './components/UserSettingsModal';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeContext } from './context/ThemeContext';
import { GlobalStyle, MainContent } from './components/StyledComponents';
import Accounts from './components/Accounts';
import Transactions from './components/Transactions';
import AccountsOverview from './components/AccountsOverview'; // Import AccountsOverview

function App() {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState({}); // Define accounts state
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const { theme, updateTheme } = useContext(ThemeContext);
 
  // Monitor auth state
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
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
          updateTheme(userSettings.theme === 'light' ? 'light' : 'dark');
        } else {
          set(settingsRef, { theme: 'dark' });
          updateTheme('dark');
        }
      }, {
        onlyOnce: true
      });
    }
  }, [user, updateTheme]);

  useEffect(() => {
    if (user) {
      const accountsRef = ref(database, `users/${user.uid}/accounts`);
      onValue(accountsRef, (snapshot) => {
        const data = snapshot.val();
        const formattedAccounts = data ? Object.entries(data).reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {}) : {};
        setAccounts(formattedAccounts);
      });
    } else {
      setAccounts({});
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

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <div className="App">
          <Header user={user} onLogout={handleLogout} onSettings={toggleSettingsModal} />
          <MainContent>
            {user ? (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/overview" element={<AccountsOverview userId={user?.uid} />} /> {/* Default route */}
                <Route path="/accounts" element={<Accounts userId={user?.uid} accounts={accounts}/>} />
                <Route path="/todo" element={<ToDo />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/transactions" element={<Transactions userId={user?.uid} accounts={accounts}/>} />
                <Route path="*" element={<Navigate to="/overview" />} /> {/* Redirect unknown routes */}
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
                currentTheme={theme.title}
              />
            )}          
          </MainContent>
        </div>
      </Router>
    </StyledThemeProvider>
  );
}

export default App;
