// Left only for codesandbox to work, I understand well that I should not do this
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getDatabase, ref } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyC7bQDrXgvdk8V2tKRdn-M5C2DLhmU3hyU',
  authDomain: 'react-chat-c8af4.firebaseapp.com',
  projectId: 'react-chat-c8af4',
  storageBucket: 'react-chat-c8af4.appspot.com',
  messagingSenderId: '1086538989591',
  appId: '1:1086538989591:web:be5633d3b881277c041c52',
  measurementId: 'G-H1D6YBRGX1',
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const auth = getAuth(firebase);

export const signUp = async (email: string, password: string) =>
  await createUserWithEmailAndPassword(auth, email, password);

export const signIn = async (email: string, password: string) =>
  await signInWithEmailAndPassword(auth, email, password);

export const logOut = async () => signOut(auth);

export const refUserById = (userId: string) => ref(database, 'users/' + userId);
