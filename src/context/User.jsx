import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { baseUrl } from '../utils/backEndUtils';
import { useAuth0 } from '@auth0/auth0-react';

export const UserContext = createContext({});

export default function UserProvider({ children }) {
  const { user, logout, getAccessTokenSilently } = useAuth0();
  const [globalUser, setGlobalUser] = useState();
  const [accessToken, setAccessToken] = useState('');
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const fetchTokenAndUser = async () => {
      if (user && !globalUser) {
        setIsLoadingUser(true);
        try {
          const token = await getAccessTokenSilently();
          setAccessToken(token);
          await getUserFromDb(token);
        } catch (error) {
          console.log('Error fetching access token or user data:', error);
        } finally {
          setIsLoadingUser(false);
        }
      } else {
        setIsLoadingUser(false);
      }
    };

    fetchTokenAndUser();
  }, [user, globalUser, getAccessTokenSilently]);

  const getUserFromDb = async (token) => {
    try {
      const res = await axios.get(`${baseUrl}/users/personal`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGlobalUser(res.data);
    } catch (error) {
      console.log('Error fetching user data from DB:', error);
    }
  };

  const logOutHandler = () => {
    logout();
    setGlobalUser();
    setAccessToken('')
  };

  const shared = {
    user,
    globalUser,
    accessToken,
    logOutHandler,
    isLoadingUser,
    getAccessToken: async () => {
      const token = await getAccessTokenSilently();
      setAccessToken(token);
      return token;
    },
  };

  return <UserContext.Provider value={shared}>{children}</UserContext.Provider>;
}
