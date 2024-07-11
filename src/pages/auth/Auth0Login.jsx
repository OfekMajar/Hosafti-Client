import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { baseUrl } from '../../utils/backEndUtils';

function Auth0Login() {
  const { loginWithPopup, user, logout, getAccessTokenSilently } = useAuth0();

  const checkUser = async () => {
    console.log(user);
  };

  const fakeLogin = async () => {
    try {
      const token = await getAccessTokenSilently();
      const res = await axios.post(
        `${baseUrl}/users/login`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error('Error during fake login:', error);
    }
  };

  return (
    <div>
      <button onClick={loginWithPopup}>log in</button>
      <button onClick={logout}>logout</button>
      <button onClick={checkUser}>check user info</button>
      <button onClick={fakeLogin}>fake login</button>
    </div>
  );
}

export default Auth0Login;
