import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User";
import styles from "./myGroups.module.css";
import axios from "axios";
import { baseUrl } from "../../utils/backEndUtils";
import Login from "../../components/authentication/Login";
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
      console.log("yes user");
      try {
        const res = await axios.get(`${baseUrl}/groups/myGroups/${user.id}`);
        const data = res.data;
        console.log(data);
        setGroups(data);
        console.log(res);
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
    <div>
      {!user ? (
        <div>
          <h1>you must log in first</h1>
        </div>
      ) : (
        <div>
          {loading ? (
            <div className={styles.loadingGifContainer}>
              <img
                className={styles.loadingGif}
                src={loadingImg}
                alt="loading"
              />
            </div>
          ) : (
            <div>
              <div>
                <p>
                  <Link to={"/myGroups/createGroup"}>
                    לחץ כדי ליצור קבוצה חדשה
                  </Link>
                </p>
              </div>
              <div>
                {groups.length > 0 ? (
                  <div>
                    {groups.map((item, index) => {
                      console.log(item);
                      return (
                        <MyGroupsCard
                          key={index}
                          id={item._id}
                          title={item.title}
                          owner={item.owner.fullName}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    <h1>
                      אין לך עדיין שום קבוצות , תלחץ על הכפתור למעלה ליצור את
                      הקבוצה הראשונה שלך!
                    </h1>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MyGroups;
