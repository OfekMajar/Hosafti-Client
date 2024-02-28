import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User";
import styles from "./myGroups.module.css";
import axios from "axios";
import { baseUrl } from "../../utils/backEndUtils";
import MyGroupsCard from "../../components/MyGroupsCard";
import { Link } from "react-router-dom";
import loadingImg from "../../assets/LoadingImg.gif";
function MyGroups() {
  const { user } = useContext(UserContext);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMyGroups, setShowMyGroups] = useState("");
  const getUserGroups = async () => {
    if (user) {
      try {
        const res = await axios.get(`${baseUrl}/groups/myGroups/${user.id}`);
        const data = res.data;
        setGroups(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
    }
  };
  useEffect(() => {
    getUserGroups();
  }, [user]);
  return (
    <div className={styles.myGroupsPageContainer}>
      {!user ? (
        <div>
          <h1>עליך להיכנס למשתמש שלך על מנת לראות את הקבוצות שלך</h1>
        </div>
      ) : (
        <>
          {loading ? (
            <div className={styles.loadingGifContainer}>
              <img
                className={styles.loadingGif}
                src={loadingImg}
                alt="loading"
              />
            </div>
          ) : (
            <>
              <div className={styles.newGroupBtnBox}>
                <Link to={"/myGroups/createGroup"}>
                  <button className={styles.newGroupBtn}>
                    {" "}
                    לחץ כדי ליצור קבוצה חדשה{" "}
                  </button>
                </Link>
              </div>
              <div className={styles.groupsCardsContainer}>
                {groups.length > 0 ? (
                  <>
                    {groups.map((item, index) => {
                      return (
                        <MyGroupsCard
                          key={index}
                          id={item._id}
                          title={item.title}
                          owner={item.owner.fullName}
                        />
                      );
                    })}
                  </>
                ) : (
                  <div>
                    <h1>
                      אין לך עדיין שום קבוצות , תלחץ על הכפתור למעלה ליצור את
                      הקבוצה הראשונה שלך!
                    </h1>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default MyGroups;
