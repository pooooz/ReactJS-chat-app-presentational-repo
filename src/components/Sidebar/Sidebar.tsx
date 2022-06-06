import React, { FC, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectAuth } from 'src/store/profile/selectors';
import { logOut } from 'src/services/firebase';

import styles from './Sidebar.module.scss';

export const Sidebar: FC = () => {
  const auth = useSelector(selectAuth);
  const [error, setError] = useState('');

  const handleLogout = async () => {
    setError('');
    try {
      await logOut();
    } catch (error) {
      setError((error as Error).message);
    }
  };
  return (
    <>
      <aside className={styles.sidebar}>
        <ul>
          <li className={styles.sidebar__element}>
            <NavLink className={styles.sidebar__link} to="/profile">
              Profile
            </NavLink>
          </li>
          <li className={styles.sidebar__element}>
            <NavLink className={styles.sidebar__link} to="/chats">
              Messages
            </NavLink>
          </li>
          {auth ? (
            <button className={styles.sidebar__button} onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <li className={styles.sidebar__element}>
              <NavLink className={styles.sidebar__link} to="/signin">
                SignIn
              </NavLink>
              |
              <NavLink className={styles.sidebar__link} to="/signup">
                SignUp
              </NavLink>
            </li>
          )}
        </ul>
      </aside>
      <main className={styles.main}>
        {error && <p>{error}</p>}
        <Outlet />
      </main>
    </>
  );
};
