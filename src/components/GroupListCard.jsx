import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../utils/backEndUtils';
import styles from '../pages/singleGroup/singleGroup.module.css';
import { UserContext } from '../context/User';
function groupListCard({ groupList, isHistory }) {
  const { accessToken, globalUser } = useContext(UserContext);
  const [isCurrCardHistory, setIsCurrCardHistory] = useState(false);
  const navigate = useNavigate();
  const goToList = async () => {
    const listUrl = `/myGroups/group/${groupList.groupId}/groceryLists/groceryList/${groupList._id}`;
    try {
      const res = await axios.put(
        `${baseUrl}/users/last-used-list`,
        { lastUsedList: listUrl },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
    } catch (error) {
      console.error(error);
    }
    globalUser.lastUsedList = listUrl;
    navigate(listUrl);
  };

  const moveListToHistory = async () => {
    try {
      const res = await axios.patch(
        `${baseUrl}/groups/moveListToHistory/${groupList.groupId}`,
        {
          groupListId: groupList._id,
        }
      );
      setIsCurrCardHistory(true);
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
