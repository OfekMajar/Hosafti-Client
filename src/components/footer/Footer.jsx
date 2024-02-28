import React from "react";
import styles from "./footer.module.css";
function Footer() {
  return (
    <footer>
      <div className={styles.contactInfoBox}>
        <p>
          יצירת קשר: <span>x.x@gmail.com</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
