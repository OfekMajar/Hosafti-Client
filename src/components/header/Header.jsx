import React, { useContext } from "react";
import Navbar from "./Navbar";
import styles from "./header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/User";

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
        <button
          onClick={() => {
            nav("/auth");
          }}
          className={styles.authNavBtn}>
          התחבר
        </button>
      )}

      <Navbar styles={styles} />
    </header>
  );
}

export default Header;
