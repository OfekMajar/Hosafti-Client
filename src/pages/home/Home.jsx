import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareShareNodes,
  faHourglassHalf,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styles from "./home.module.css";
import homePageImg from "../../assets/homePageImg.jpg";
function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.contextContainer}>
        <div className={styles.rightSide}>
          <div className={styles.sloganContainer}>
            <p className={styles.slogan}>
              ברוכים הבאים להוספתי !<br />
              איתנו תסיימו עם הקניות בפעם אחת
            </p>
          </div>
          <div className={styles.whatWeOfferContainer}>
            <div className={styles.offeringList}>
              <h3>מה אנחנו מציעים:</h3>
              <ul>
                <li>
                  <FontAwesomeIcon icon={faSquareShareNodes} size="lg" />
                  <span> יכולת לשיתוף רשימות בין חברי הקבוצה</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faHourglassHalf} size="lg" />
                  <span>
                    חיסכון בזמן: צפייה בתמונות של המוצרים תחסוך לך בחיפושים
                    מיותרים בסופר
                  </span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faListCheck} size="lg" />
                  <span>
                    ארגון טוב יותר- יצירת רשימות קניות ממוקדות ומסודרות לכל צורך
                  </span>
                </li>
              </ul>
            </div>
            <div className={styles.gettingStartedBtn}>
              <button>לחץ כאן כדאי להתחיל</button>
            </div>
          </div>
        </div>
        <div className={styles.leftSide}>
          <div className={styles.imgContainer}>
            <img
              className={styles.homePageImg}
              src={homePageImg}
              alt="אדם בסופר"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
