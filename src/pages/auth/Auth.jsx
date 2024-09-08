import React, { useState } from 'react';
import styles from './authLaptop.module.css';
import Login from '../../components/authentication/Login';

function Auth() {
  const [error, setError] = useState();

  return (
    <div className={styles.authContainer}>
      <Login />
    </div>
  );
}

export default Auth;
