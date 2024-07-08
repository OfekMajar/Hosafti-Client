import React, { useContext, useState } from 'react';
import { baseUrl } from '../../utils/backEndUtils';
import styles from './authLaptop.module.css';
import axios from 'axios';
import { UserContext } from '../../context/User';
import Login from '../../components/authentication/Login';
import SignUp from '../../components/authentication/SignUp';
import { getScreenSize } from '../../utils/screenSize';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState();
  const { user, getUserFromDb, setUser } = useContext(UserContext);
  const naviagte = useNavigate();
  //^switching from Login and SignUp
  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  //^ handing extracting the data from the form
  const changeHandler = (e) => {
    formData[e.target.name] = e.target.value;
    setFormData({ ...formData });
  };

  //^ handling the login method
  const loginHandler = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const res = await axios.post(`${baseUrl}/users/login`, {
        email,
      });
      const token = res.data;
      localStorage.setItem('hosafti_user_token', token);
      await getUserFromDb();
      naviagte('/');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle "Email or password are incorrect" error
        setError('Email or password are incorrect');
        console.log('Email or password are incorrect');
      } else {
        // Handle other errors
        console.log('An error occurred:', error.message);
      }
    }
  };

  //^ handling the signUp method
  const signUpHandler = async (e) => {
    const { email, password, fullName } = formData;
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/users/register`, {
        email,
        password,
        fullName,
      });
      const data = res.data;
      localStorage.setItem('hosafti_user_token', data.token);
      setUser(data.user);
      naviagte('/');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className={styles.authContainer}>
      {isLoginMode ? (
        <Login
          styles={styles}
          sumbitHandler={loginHandler}
          changeHandler={changeHandler}
          toggleMode={toggleMode}
          error={error}
        />
      ) : (
        <SignUp
          styles={styles}
          sumbitHandler={signUpHandler}
          changeHandler={changeHandler}
          toggleMode={toggleMode}
        />
      )}
    </div>
  );
}

export default Auth;
