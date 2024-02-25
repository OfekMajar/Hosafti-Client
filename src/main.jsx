import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserProvider from "./context/User.jsx";
import GroceryListProvider from "./context/GroceryList.jsx"
ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <GroceryListProvider>
      <App />
    </GroceryListProvider>
  </UserProvider>
);
