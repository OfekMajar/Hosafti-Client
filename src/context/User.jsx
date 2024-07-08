import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { baseUrl } from '../utils/backEndUtils';
import { useAuth0 } from '@auth0/auth0-react';

export const UserContext = createContext({});

export default function UserProvider({ children }) {
  const { loginWithPopup, user, logout, getAccessTokenSilently } = useAuth0();
  const getUserFromDb = async () => {
    try {
      let tes = await getAccessTokenSilently();
      console.log(tes);
      const token = localStorage.getItem('hosafti_user_token');
      if (token != null) {
        const res = await axios.patch(
          `${baseUrl}/tokenManipulation/tokenDecryptor`,
          { token }
        );
      } else {
        console.log('no user history');
      }
    } catch (error) {
      console.log('no user history');
    }
  };

  useEffect(() => {
    getUserFromDb;
  }, [user]);
  const logOutHandler = () => {
    localStorage.removeItem('hosafti_user_token');
    logout();
  };
  console.log(user);
  const shared = {
    user,
    logOutHandler,
    getUserFromDb,
  };
  return <UserContext.Provider value={shared}>{children}</UserContext.Provider>;
}
