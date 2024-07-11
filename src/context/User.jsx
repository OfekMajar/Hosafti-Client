import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { baseUrl } from '../utils/backEndUtils';
import { useAuth0 } from '@auth0/auth0-react';

export const UserContext = createContext({});

export default function UserProvider({ children }) {
  const { user, logout, getAccessTokenSilently } = useAuth0();
  const [globalUser, setGlobalUser] = useState();
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchTokenAndUser = async () => {
      console.log('fetching');
      try {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
        console.log('toke,', accessToken);

        await getUserFromDb(accessToken);
        console.log('after user fetch,', globalUser);
      } catch (error) {
        console.log('Error fetching access token or user data:', error);
      }
    };

    if (user) {
      fetchTokenAndUser();
      console.log(globalUser);
    }
  }, [user, getAccessTokenSilently]);

  const getUserFromDb = async (accessToken) => {
    console.log('in get user,', accessToken);

    try {
      const res = await axios.get(`${baseUrl}/users/personal`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(res);
      console.log(res.data);
      setGlobalUser(res.data);
    } catch (error) {
      console.log('Error fetching user data from DB:', error);
    }
  };

  const logOutHandler = () => {
    logout();
    setGlobalUser()
  };

  const shared = {
    user,
    globalUser,
    token,
    logOutHandler,
    getAccessToken: async () => {
      const accessToken = await getAccessTokenSilently();
      setToken(accessToken);
      return accessToken;
    },
  };

  return <UserContext.Provider value={shared}>{children}</UserContext.Provider>;
}
