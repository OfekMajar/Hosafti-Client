import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { baseUrl } from '../../utils/backEndUtils';
import { useEffect } from 'react';
import Login from '../../components/authentication/Login';
import styles from "./Auth.module.css"
function Auth0Login() {
  const {
    loginWithPopup,
    getAccessTokenSilently,
    user,
    logout,
    isAuthenticated,
  } = useAuth0();
  const registerUser = async () => {
    try {
      let token = await getAccessTokenSilently();
      const res = await axios.post(
        `${baseUrl}/users/login`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('User registered:', res.data);
    } catch (error) {
      console.error('Error during user registration:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      registerUser();
    }
  }, [isAuthenticated, user]);
  return (
    <div className={styles['auth-page-container']}>
     
      <Login />
    </div>
  );
}

export default Auth0Login;
