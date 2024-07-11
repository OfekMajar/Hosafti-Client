import React, { useContext, useEffect, useState } from 'react';
import styles from './singleGroup.module.css';
import { Link, useFetcher, useParams } from 'react-router-dom';
import { baseInviteUrl, baseUrl } from '../../utils/backEndUtils';
import GroupListCard from '../../components/GroupListCard';
import { UserContext } from '../../context/User';
import axios from 'axios';
import loadingImg from '../../assets/LoadingImg.gif';

function SingleGroup() {
  //ToDO add valdition to check if online user has access to this group
  const [groupLists, setGroupLists] = useState([]);
  const { globalUser, getAccessToken } = useContext(UserContext);
  const { id } = useParams();
  const [userInGroup, setUserInGroup] = useState(true);
  const [didLinkGenerate, setDidLinkGenerate] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkIfUserIsInGroup = async () => {
    setLoading(true);
    try {
      const accessToken = await getAccessToken();
      const res = await axios.get(
        `${baseUrl}/groups/checkIfUserInGroup/${id}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.status == 200) {
        setUserInGroup(true);
      }
    } catch (error) {
      setUserInGroup(false);
    } finally {
      setLoading(false);
    }
  };
  const getGroupGroceryLists = async () => {
    const accessToken = await getAccessToken();
    try {
      const res = await axios.get(`${baseUrl}/groceryLists/group/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = res.data;
      setGroupLists(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (globalUser) checkIfUserIsInGroup();
    if (userInGroup) getGroupGroceryLists();
  }, [globalUser, userInGroup]);

  const linkGenerator = async () => {
    try {
      const accessToken = await getAccessToken();
      const res = await axios.post(
        `${baseUrl}/tokenManipulation/createLinkToken/${id}`,
        {
          inviter: globalUser?.fullName,
        },
        { headers: { Authorization: `bearer ${accessToken}` } }
      );
      const token = res.data;
      const newLink = `${baseInviteUrl}/joinGroup/${id}/${token}`;
      navigator.clipboard.writeText(newLink);
      setDidLinkGenerate(true);
      setTimeout(() => {
        setDidLinkGenerate(false);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <div className={styles.loadingGifContainer}>
      <img className={styles.loadingGif} src={loadingImg} alt="loading" />
    </div>
  ) : !userInGroup ? (
    <div>אין גישה לקבוצה זו</div>
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
      <section className={styles.orderBySection}>
        סדר לפי:{' '}
        <select name="" id="">
          <option value="">תאריך</option>
        </select>
      </section>
      <div className={styles.listsContainer}>
        {groupLists.map((item) => {
          return <GroupListCard groupList={item} />;
        })}
      </div>
    </div>
  );
}

export default SingleGroup;
