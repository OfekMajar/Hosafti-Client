import React from 'react';
import styles from './GoogleSignInButton.module.css';
import googleLogo from '../../../public/images/GoogleIcon.svg'; // Use the Google logo

function GoogleSignInButton({ onClick }) {
  return (
    <button className={styles.googleButton} onClick={onClick}>
      Sign in with Google
      <img src={googleLogo} alt="Google logo" />
    </button>
  );
}

export default GoogleSignInButton;
