import React from 'react';
import { signInWithGoogle } from '../firebase/authService';

const Login = () => {
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      // Handle sign-in success
    } catch (error) {
      // Handle sign-in errors
    }
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default Login;
