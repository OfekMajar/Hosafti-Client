import React from "react";
import styles from "./errorPage.module.css";
import { Link, useNavigate } from "react-router-dom";
function ErrorPage() {
  const nav = useNavigate();
  return (
    <div>
      <h1>404</h1>
      <Link to={'/'}>חזור לחוף מבטחים </Link>
      
    </div>
  );
}

export default ErrorPage;
