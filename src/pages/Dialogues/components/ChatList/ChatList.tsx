import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { selectChatList } from 'src/store/dialogues/selectors';
import { addChat, deleteChat } from 'src/store/dialogues/actions';

import styles from './ChatList.module.scss';

export const ChatList: FC = () => {
  const [name, setName] = useState('');
  const chatList = useSelector(
    selectChatList,
    (prev, next) => prev.length === next.length
  );
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name) {
      dispatch(addChat(name));
      setName('');
    }
  };

  return (
    <aside className={styles.chatList}>
      <div className={styles.chatHeader}>Chats</div>
      <ul>
        {chatList.map((chat) => (
          <li className={styles.chatItem} key={chat.id}>
            <NavLink to={`/chats/${chat.name}`} className={styles.link}>
              {chat.name}
            </NavLink>
            <button
              className={styles.deleteButton}
              onClick={() => dispatch(deleteChat(chat.name))}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputWrap}>
          <input
            type="text"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button className={styles.button} type="submit">
          Add chat
        </button>
      </form>
    </aside>
  );
};
