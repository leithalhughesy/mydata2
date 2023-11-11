// src/App.js

import React, { useState, useEffect } from 'react';
import { database } from './firebase';
import { ref, onValue, set } from 'firebase/database';

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const messageRef = ref(database, 'message');

    const unsubscribe = onValue(messageRef, (snapshot) => {
      const newMessage = snapshot.val();
      setMessage(newMessage);
    });

    // Unsubscribe from the listener when the component unmounts
    return unsubscribe;
  }, []);

  const updateMessage = (newMessage) => {
	console.log(newMessage); // Add this to check if the function is called
	  set(ref(database, 'message'), newMessage);
  };

  return (
    <div>
      <h1>Realtime Hello World</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => updateMessage(e.target.value)}
      />
      <p>{message}</p>
    </div>
  );
};

export default App;

