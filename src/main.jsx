import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

import UserProvider from './context/User.jsx';
import GroceryListProvider from './context/GroceryList.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENTID}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      scope: 'openid profile email ',
    }}
  >
    <UserProvider>
      <GroceryListProvider>
        <App />
      </GroceryListProvider>
    </UserProvider>
  </Auth0Provider>
);
