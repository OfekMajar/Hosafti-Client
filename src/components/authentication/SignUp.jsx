import React from 'react'

function SignUp({ sumbitHandler, changeHandler, toggleMode, styles }) {
  return (
    <div className={styles.logInModeContainer}>
      <div className={styles.box}>
        <div className={styles.lockBox}>
          <i className={`fa-solid fa-lock ${styles.lockIcon}`}></i>
        </div>
        <h1>הרשמה</h1>
        <form onSubmit={sumbitHandler}>
          <div className={styles.authLableAndInput}>
            <label htmlFor="userNameInput">שם מלא:</label>
            <input className={styles.authInput} onChange={changeHandler} type="text" name="fullName" id="userNameInput" required />
          </div>
          <div className={styles.authLableAndInput}>
            <label htmlFor="userEmailInput">אימייל:</label>
            <input className={styles.authInput} onChange={changeHandler} type="email" name="email" id="userEmailInput" required />
          </div>
          <div className={styles.authLableAndInput}>
            <label htmlFor="userPasswordInput">סיסמה:</label>
            <input className={styles.authInput} onChange={changeHandler} type="password" name="password" id="userPasswordInput" required />
          </div>
          <button className={styles.authSumbitBtn} type="submit">הרשמה</button>
        </form>
        <p className={styles.switchSignUpLogInBtn} onClick={toggleMode}>כבר יש לך חשבון? לחץ כאן</p>
      </div>
    </div>
  )
}

export default SignUp
