import React, { useContext } from "react";
import Navbar from "./Navbar";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/User";

function Header() {
  const { user, logOutHandler } = useContext(UserContext);
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
        <button className={styles.authNavBtn}>
          <Link to={"/auth"}>התחבר</Link>
        </button>
      )}

      <Navbar styles={styles} />
    </header>
  );
}

export default Header;
