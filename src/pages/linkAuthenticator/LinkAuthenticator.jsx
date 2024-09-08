import React, { useContext, useEffect, useState } from 'react';
import { useFetcher, useParams } from 'react-router-dom';
import { UserContext } from '../../context/User';
import axios from 'axios';
import { baseUrl } from '../../utils/backEndUtils';

function LinkAuthenticator() {
  const { globalUser, getAccessToken } = useContext(UserContext);
  const [group, setGroup] = useState({});
  const { id, token } = useParams();
  const getGroup = async () => {
    const accessToken = await getAccessToken();
    try {
      const res = await axios.get(`${baseUrl}/groups/group/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = res.data;
      setGroup(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getGroup();
  }, [globalUser]);

  const joinGroup = async () => {
    try {
      const accessToken = await getAccessToken();
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const res = await axios.patch(
        `${baseUrl}/groups/joinGroup`,
        { userId: globalUser.id, inviteLinkToken: token },
        config
      );
      const data = res.data;
      console.log(data);
    } catch (error) {}
  };
  return (
    <div>
      {globalUser ? (
        <div>
          <div>
            <button onClick={joinGroup}>
              תלחץ כאן כדי להצטרף לקבוצה: {group.title}, של{' '}
              {group?.owner?.fullName}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div>you must login before being able to join a group</div>
        </div>
      )}
    </div>
  );
}

export default LinkAuthenticator;
