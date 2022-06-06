import React, { FC, useContext, useState } from 'react';
import { ThemeContext } from 'src/utils/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';

import { toggleProfile, changeName } from 'src/store/profile/actions';
import { selectName, selectVisible } from 'src/store/profile/selectors';

import { Button, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import styles from './Profile.module.scss';
import { Input } from 'src/components/Input/Input';

const muiTheme = createTheme({
  typography: {
    fontFamily: 'Press Start 2P',
  },
});

export const Profile: FC = () => {
  const [value, setValue] = useState('');
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const visible = useSelector(selectVisible);
  const name = useSelector(selectName);

  const handleChangeName = () => {
    if (value) {
      dispatch(changeName(value));
    }
    setValue('');
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <section className={styles.profile}>
        <h1 className={styles.profile_header}>Profile</h1>
        <div className={styles.profile_theme}>
          <p>{theme === 'light' ? '🌞 LIGHT' : '🌙 DARK'} </p>
          <Button
            onClick={toggleTheme}
            className={styles.profile_changeTheme}
            style={{
              width: '100px',
              color: '#32CD32FF',
            }}
          >
            Change theme
          </Button>
        </div>
        <section className={styles.profile_name}>
          <div className={styles.profile_nameSection}>
            <h3>Your name: {name}</h3>
            <div className={styles.profile_visibility}>
              Hide name in chat?
              <button
                className={
                  visible
                    ? styles.profile_visibilityValuePositive
                    : styles.profile_visibilityValueNegative
                }
                onClick={() => dispatch(toggleProfile())}
              >
                {visible ? 'Yes!' : 'No!'}
              </button>
            </div>
          </div>

          <div className={styles.profile_changeName}>
            <Input
              value={value}
              change={(event) => setValue(event.target.value)}
            />
            <Button
              onClick={handleChangeName}
              className={styles.profile_changeNameButton}
              style={{
                width: '100px',
                color: '#32CD32FF',
              }}
            >
              Change name
            </Button>
          </div>
        </section>
      </section>
    </ThemeProvider>
  );
};
