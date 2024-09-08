import React, { useContext, useState } from 'react';
import Navbar from './Navbar';
import styles from './header.module.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/User';
import defaultAvatar from '../../../public/images/default_avatar.png';
import logoImg from '../../assets/logoImg-removebg-preview.png';
import smallLogoImg from '../../assets/logoIcon.png';

function Header() {
  const { globalUser, logOutHandler, isLoadingUser } = useContext(UserContext);
  const nav = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      {isLoadingUser ? (
        <p>טוען</p>
      ) : globalUser ? (
        <section className={styles.userSection}>
          <img
            className={styles.profileImg}
            src={globalUser.profilePicture || defaultAvatar}
            alt="Profile"
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

      <div className={styles.hamburger} onClick={toggleMenu}>
        {isMenuOpen ? 'X' : '☰'}
      </div>

      {/* Show overlay when menu is open */}
      {isMenuOpen && (
        <div
          className={`${styles.overlay} ${styles.overlayActive}`}
          onClick={closeMenu}
        ></div>
      )}

      <Navbar styles={styles} isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
      <img className={styles['logo-img']} src={logoImg} alt="logo img" />
      <img
        className={styles['small-logo-img']}
        src={smallLogoImg}
        alt="shopping cart logo image"
      />
    </header>
  );
}

export default Header;
