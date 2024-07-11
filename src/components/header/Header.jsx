import React, { useContext } from 'react';
import Navbar from './Navbar';
import styles from './header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/User';
import logoImg from '../../assets/logoImg-removebg-preview.png';
import defaultAvatar from '../../../public/images/default_avatar.png';

function Header() {
  const { globalUser, logOutHandler, isLoadingUser } = useContext(UserContext);
  const nav = useNavigate();
  return (
    <header className={styles.header}>
      {isLoadingUser ? (
        <p>'טוען..'</p>
      ) : globalUser ? (
        <section className={styles.userSection}>
          <img
            className={styles.profileImg}
            src={
              globalUser.profilePicture
                ? globalUser.profilePicture
                : defaultAvatar
            }
          />
          <button onClick={logOutHandler} className={styles.authNavBtn}>
            התנתק
          </button>
        </section>
      ) : (
        <section className={styles.userSection}>
          <p>אורח</p>
          <button
            onClick={() => {
              nav('/auth');
            }}
            className={styles.authNavBtn}
          >
            התחבר
          </button>
        </section>
      )}

      <Navbar styles={styles} />
      <img className={styles.logoImg} src={logoImg} alt="logo img" />
    </header>
  );
}

export default Header;
