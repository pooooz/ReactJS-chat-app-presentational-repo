import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Input } from 'src/components/Input/Input';
import { signUp } from 'src/services/firebase';

import styles from './SignUp.module.scss';

export const SignUp: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      await signUp(email, password);
      navigate('/signin');
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <section className={styles.signUp}>
      <h2 className={styles.signUp__header}>Sign Up</h2>
      <form className={styles.signUp__form} onSubmit={handleSubmit}>
        <div>
          <p>Login:</p>
          <Input
            change={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
          />
          <p>Password:</p>
          <Input
            change={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          />
          <button className={styles.signUp__button}>sign up</button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </section>
  );
};
