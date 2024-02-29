import React, { useContext } from "react";
import Navbar from "./Navbar";
import styles from "./header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/User";
import logoImg from "../../assets/logoImg-removebg-preview.png";
function Header() {
  const { user, logOutHandler } = useContext(UserContext);
  const nav = useNavigate();
  return (
    <header className={styles.header}>
      {user ? (
        <div>
          <p>{user.fullName}</p>
          <button onClick={logOutHandler} className={styles.authNavBtn}>
            התנתק
          </button>
        </div>
      ) : (
        <div>
          <p>אורח</p>
          <button
            onClick={() => {
              nav("/auth");
            }}
            className={styles.authNavBtn}>
            התחבר
          </button>
        </div>
      )}

      <Navbar styles={styles} />
      <img className={styles.logoImg} src={logoImg} alt="logo img" />
    </header>
  );
}

export default Header;
