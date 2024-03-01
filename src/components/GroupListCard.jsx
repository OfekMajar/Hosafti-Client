import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/backEndUtils";
import styles from "../pages/singleGroup/singleGroup.module.css";
function groupListCard({ groupList, isHistory }) {
  const [isCurrCardHistory,setIsCurrCardHistory]=useState(false)
  const navigate = useNavigate();
  const goToList = () => {
    navigate(
      `/myGroups/group/${groupList.groupId}/groceryLists/groceryList/${groupList._id}`
    );
  };

  const moveListToHistory = async () => {
    try {
      const res = await axios.patch(
        `${baseUrl}/groups/moveListToHistory/${groupList.groupId}`,
        {
          groupListId: groupList._id,
        }
      );
      setIsCurrCardHistory(true)
    } catch (error) {
      console.log(error);
    }
  };
 return (
  !isCurrCardHistory && (
    <div className={styles.listCard}>
      <div className={styles.clickHere} onClick={goToList}>
        <img
          src="https://static.thenounproject.com/png/166411-200.png"
          width={100}
          height={100}
          alt=""
        />
        <div>
          <span>שם הקבוצה: {groupList.title}</span>
        </div>
        <div>
          <span>תאריך: {groupList.date.heDate}</span>
        </div>
      </div>
      {isHistory ? null : (
        <div>
          <button className={styles.historyBtn} onClick={moveListToHistory}>
            העבר לארכיון
          </button>
        </div>
      )}
    </div>
  )
);

}

export default groupListCard;
