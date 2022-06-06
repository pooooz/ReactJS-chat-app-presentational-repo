import { useDispatch } from 'react-redux';
import React, { FC, useState } from 'react';

import { Input } from 'src/components/Input/Input';
import { changeAuth } from 'src/store/profile/slice';

import styles from './SignIn.module.scss';

export const SignIn: FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(false);
    if (login === 'POZ' && password === 'POZ') {
      dispatch(changeAuth(true));
    } else {
      setError(true);
    }
  };

  return (
    <section className={styles.signIn}>
      <h2 className={styles.signIn__header}>Sign In</h2>
      <form className={styles.signIn__form} onSubmit={handleSubmit}>
        <div>
          <p>Login (POZ):</p>
          <Input
            change={(e) => setLogin(e.target.value)}
            value={login}
            type="text"
          />
          <p>Password (POZ):</p>
          <Input
            change={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          />
          <button className={styles.signIn__button}>sign in</button>
        </div>
        {error && (
          <p style={{ color: 'red' }}>Login or password is not correct</p>
        )}
      </form>
    </section>
  );
};
