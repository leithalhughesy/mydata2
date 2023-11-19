// src/components/UserSettingsModal.js
import React, { useState, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { ModalContainer, ModalContent, CloseButton, Form, Label, ModalSelect, ModalButton } from './StyledComponents';
import { database } from '../firebase/firebaseConfig';
import { ref, set } from 'firebase/database';

const UserSettingsModal = ({ user, isOpen, onClose }) => {
const { id } = user;
const currentTheme = useContext(ThemeContext);
const [selectedTheme, setSelectedTheme] = useState(currentTheme.title);
const saveSettings = async () => {
    if (user && user.uid) {
        const settingsRef = ref(database, `users/${user.uid}/settings`);
        try {
        await set(settingsRef, { theme: selectedTheme });
        onClose(); // Close the modal after saving
        } catch (error) {
        console.error("Error saving settings: ", error);
        // Optionally handle the error in the UI
        }
    } else {
        console.error("User not defined or user ID (uid) missing");
        // Handle cases where the user object or uid is not available
    }
};

  return isOpen ? (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        <Form>
          <Label>Theme:</Label>
          <ModalSelect value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </ModalSelect>
          <ModalButton onClick={saveSettings}>Save Settings</ModalButton>
        </Form>
      </ModalContent>
    </ModalContainer>
  ) : null;
};

export default UserSettingsModal;
