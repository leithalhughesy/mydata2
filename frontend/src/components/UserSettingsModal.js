// src/components/UserSettingsModal.js
import React, { useState, useContext } from 'react';
import { ModalContainer, ModalContent, Form, Label, Button, Select } from './StyledComponents';
import { database } from '../firebase/firebaseConfig';
import { ref, set } from 'firebase/database';
import { ThemeContext } from '../context/ThemeContext'; // adjust the path as necessary

const UserSettingsModal = ({ user, isOpen, onClose }) => {
  const { theme, updateTheme } = useContext(ThemeContext);
  const [selectedTheme, setSelectedTheme] = useState(theme.title);

  const saveSettings = async () => {
    if (user && user.uid) {
      const settingsRef = ref(database, `users/${user.uid}/settings`);
      try {
        await set(settingsRef, { theme: selectedTheme });
        updateTheme(selectedTheme); // Update theme using context
        onClose(); // Close the modal after saving
      } catch (error) {
        console.error("Error saving settings: ", error);
      }
    } else {
      console.error("User not defined or user ID (uid) missing");
    }
  };

  return isOpen ? (
    <ModalContainer>
      <ModalContent>
        <Form>
          <Label>Theme:</Label>
          <Select value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </Select>
          <Button onClick={saveSettings}>Save Settings</Button>
          <Button onClick={onClose}>Close</Button>
        </Form>
      </ModalContent>
    </ModalContainer>
  ) : null;
};

export default UserSettingsModal;
