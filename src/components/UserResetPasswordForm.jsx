import React from "react";
import styles from "../pages/userProfile/userProfile.module.css";

function UserResetPasswordForm({ changeHandler, submitHandler, isNotMatch }) {
  return (
    <form onSubmit={submitHandler}>
      <div className={styles.authLableAndInput}>
        <label>הכנס סיסמא:</label>
        <input
          className={styles.authInput}
          onChange={changeHandler}
          type="password"
          name="password"
          required
        />
      </div>
      <div className={styles.authLabelAndInput}>
        <label>הכנס סיסמא בשנית:</label>
        <input
          className={
            !isNotMatch
              ? styles.authInput
              : `${styles.authInput} ${styles.notMatch}`
          }
          onChange={changeHandler}
          type="password"
          name="confirmPassword"
          required
        />
      </div>
      <button type="submit">חדש סיסמא</button>
    </form>
  );
}

export default UserResetPasswordForm;
