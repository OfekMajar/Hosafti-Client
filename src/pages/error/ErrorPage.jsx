import React from "react";
import styles from "./errorPage.module.css";
import { useNavigate } from "react-router-dom";
function ErrorPage() {
  const nav = useNavigate();
  return (
    <div>
      <h1>404</h1>
      <p>חזור לחוף מבטחים </p>
    </div>
  );
}

export default ErrorPage;
