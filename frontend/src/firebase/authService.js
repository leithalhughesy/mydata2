import { auth, googleProvider } from './firebaseConfig';
import { signInWithPopup } from 'firebase/auth';

export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

export const signOutUser = () => {
  return auth.signOut();
};
