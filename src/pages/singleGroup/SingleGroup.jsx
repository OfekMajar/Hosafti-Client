import React, { useContext, useEffect, useState } from "react";
import styles from "./singleGroup.module.css";
import { Link, useFetcher, useParams } from "react-router-dom";
import { baseUrl } from "../../utils/backEndUtils";
import GroupListCard from "../../components/GroupListCard";
import { UserContext } from "../../context/User";
import axios from "axios";
function SingleGroup() {
  //ToDO add valdition to check if online user has access to this group
  const [groupLists, setGroupLists] = useState([]);
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [userInGroup, setUserInGroup] = useState(false);
  const [didLinkGenerate, setDidLinkGenerate] = useState(false);
  const checkIfUserIsInGroup = async () => {
    try {
      const res = await axios.patch(
        `${baseUrl}/groups/checkIfUserInGroup/${id}`,
        { userId: user.id }
      );
      const data = res.data;
      if (res.status == 200) {
        setUserInGroup(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getGroupGroceryLists = async () => {
    try {
      const res = await axios.get(`${baseUrl}/groceryLists/group/${id}`);
      const data = res.data;
      setGroupLists(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfUserIsInGroup();
    if (userInGroup) getGroupGroceryLists();
  }, [user, userInGroup]);

  const linkGenerator = async () => {
    try {
      const res = await axios.post(
        `${baseUrl}/tokenManipulation/createLinkToken/${id}`,
        {
          inviter: user.fullName,
        }
      );
      const token = res.data;
      const newLink = `http://localhost:5173/joinGroup/${id}/${token}`;
      navigator.clipboard.writeText(newLink);
      setDidLinkGenerate(true);
      setTimeout(() => {
        setDidLinkGenerate(false);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return !userInGroup ? (
    <div>אין גישה</div>
  ) : (
    <div>
      <div className={styles.buttonsBox}>
        <Link to={`/group/${id}/createList`}>
          <button className={styles.newListBtn}>צור רשימה חדשה</button>
        </Link>

        <Link to={`/myGroups/group/${id}/historyLists`}>
          <button className={styles.historyListsBtn}>ארכיון</button>
        </Link>

        <button className={styles.createLinkBtn} onClick={linkGenerator}>
          שתף את הקבוצה
          {didLinkGenerate && (
            <div className={styles.clipBoardMsg}>קישור הועתק ללוח</div>
          )}
        </button>
      </div>
      <div className={styles.listsContainer}>
        {groupLists.map((item) => {
          return <GroupListCard groupList={item} />;
        })}
      </div>
    </div>
  );
}

export default SingleGroup;
