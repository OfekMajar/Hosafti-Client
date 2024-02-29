import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/backEndUtils";
import styles from "../pages/singleGroup/singleGroup.module.css"
function groupListCard({ groupList, isHistory }) {
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
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.listCard}>
      <img
        onClick={goToList}
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
      {isHistory ? null : (
        <div>
          <button onClick={moveListToHistory}>העבר לארכיון</button>
        </div>
      )}
    </div>
  );
}

export default groupListCard;
