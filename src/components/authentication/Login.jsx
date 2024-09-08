import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/User';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import GoogleSignInButton from '../GoogleSignInButton/GoogleSignInButton';
import { useAuth0 } from '@auth0/auth0-react';

function Login() {
  const {
    loginWithPopup,
  } = useAuth0();
  return (
    <div className={styles.logInModeContainer}>
      <div className={styles.box}>
        <div className={styles.lockBox}>
          <i className={`fa-solid fa-lock ${styles.lockIcon}`}></i>
        </div>
        <h1>התחברות</h1>

        <GoogleSignInButton onClick={loginWithPopup} />
      </div>
    </div>
  );
}

export default Login;
