import React, { FC } from 'react';

import styles from './Input.module.scss';

interface InputProps {
  value: string;
  change: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

export const Input: FC<InputProps> = (props) => {
  return (
    <div className={styles.input_wrap}>
      <input
        className={styles.input_green}
        type={props.type}
        value={props.value}
        onChange={props.change}
        autoFocus
      />
    </div>
  );
};
