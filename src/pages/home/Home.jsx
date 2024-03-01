import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareShareNodes,
  faHourglassHalf,
  faClock,
  faListCheck,
  faShareNodes,
  faUsersLine,
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
              ברוכים הבאים להוספתי!
              <br />
              <span style={{ whiteSpace: "nowrap" }}>
                איתנו תסיימו עם הקניות בפעם אחת
              </span>
            </p>
          </div>
          <div className={styles.gettingStartedBtn}>
            <button>לחץ כאן כדי להתחיל</button>
          </div>
          <div className={styles.whatWeOfferContainer}>
            <h3>מה אנחנו מציעים:</h3>
            <div className={styles.offeringList}>
              <ul>
                <li>
                  <FontAwesomeIcon icon={faUsersLine} />
                  <p> יכולת לשיתוף רשימות בין חברי הקבוצה</p>
                </li>
                <li>
                  <FontAwesomeIcon icon={faClock} />
                  <p>
                    חיסכון בזמן: צפייה בתמונות של המוצרים תחסוך לך בחיפושים
                    מיותרים בסופר
                  </p>
                </li>
                <li>
                  <FontAwesomeIcon icon={faListCheck} size="lg" />
                  <p>
                    ארגון טוב יותר- יצירת רשימות קניות ממוקדות ומסודרות לכל צורך
                  </p>
                </li>
              </ul>
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
