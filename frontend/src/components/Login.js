import React from 'react';
import { signInWithGoogle } from '../firebase/authService';
import { Button, Card, DivCenter } from './StyledComponents';

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
    <Card>
      <DivCenter>
        <h2>Welcome to My Data</h2>
        <p>Manage all your data in one place.</p>
        <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
      </DivCenter>
    </Card>
  );
};

export default Login;
