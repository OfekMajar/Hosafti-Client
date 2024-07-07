import { useAuth0 } from "@auth0/auth0-react";

function Auth0Login() {
  const { loginWithPopup, user, logout, getAccessTokenSilently } = useAuth0();

  const checkUser = () => {
    console.log(user);
  };
  
  return (
    <div>
      <button onClick={loginWithPopup}>log in</button>
      <button onClick={logout}>logout</button>
      <button onClick={checkUser}>check user info</button>
    </div>
  );
}

export default Auth0Login;
