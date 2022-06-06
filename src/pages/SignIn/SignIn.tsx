import React, { FC, useState } from 'react';

import { Input } from 'src/components/Input/Input';
import { signIn } from 'src/services/firebase';

import styles from './SignIn.module.scss';

export const SignIn: FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signIn(login, password);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <section className={styles.signIn}>
      <h2 className={styles.signIn__header}>Sign In</h2>
      <form className={styles.signIn__form} onSubmit={handleSubmit}>
        <div>
          <p>Login:</p>
          <Input
            change={(e) => setLogin(e.target.value)}
            value={login}
            type="text"
          />
          <p>Password:</p>
          <Input
            change={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          />
          <button className={styles.signIn__button}>sign in</button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </section>
  );
};
