import React, { useContext, useState } from "react";
import { UserContext } from "../../context/User";
import { useNavigate } from "react-router-dom";

function Login({ sumbitHandler, changeHandler, toggleMode, styles }) {
  const nav = useNavigate();
  return (
    <div className={styles.logInModeContainer}>
      <div className={styles.box}>
        <div className={styles.lockBox}>
          <i className={`fa-solid fa-lock ${styles.lockIcon}`}></i>
        </div>
        <h1>התחברות</h1>
        <form onSubmit={sumbitHandler}>
          <div className={styles.authLableAndInput}>
            <label htmlFor="userEmailInput">אימייל:</label>
            <input
              className={styles.authInput}
              onChange={changeHandler}
              type="email"
              name="email"
              id="userEmailInput"
              required
            />
          </div>
          <div className={styles.authLableAndInput}>
            <label htmlFor="userPasswordInput">סיסמה:</label>
            <input
              className={styles.authInput}
              onChange={changeHandler}
              type="password"
              name="password"
              id="userPasswordInput"
              required
            />
          </div>
          <button className={styles.authSumbitBtn} type="submit">
            התחברות
          </button>
        </form>
        <div className={styles.bottonFormBtns}>
          <p
            className={styles.forgotPassword}
            onClick={() => {
              nav("/auth/forgotpassword");
            }}>
            שכחת סיסמא? לחץ כאן
          </p>
          <p className={styles.switchSignUpLogInBtn} onClick={toggleMode}>
            אין לך חשבון? לחץ כאן
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
