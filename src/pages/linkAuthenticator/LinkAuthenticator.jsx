import React, { useContext, useEffect, useState } from "react";
import { useFetcher, useParams } from "react-router-dom";
import { UserContext } from "../../context/User";
import axios from "axios";
import { baseUrl } from "../../utils/backEndUtils";

function LinkAuthenticator() {
  const { user } = useContext(UserContext);
  const [group, setGroup] = useState({});
  const { id, token } = useParams();
  console.log(id);
  const getGroup = async () => {
    const res = await axios.get(`${baseUrl}/groups/group/${id}`);
    const data = res.data;
    setGroup(data);
    console.log(data);
  };
  useEffect(() => {
    getGroup();
  }, [user]);

  const joinGroup = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.patch(
        `${baseUrl}/groups/joinGroup`,
        { userId: user.id },
        config
      );
      const data = res.data;
      console.log(data);
    } catch (error) {}
  };
  return (
    <div>
      {user ? (
        <div>
          <div>
            <button onClick={joinGroup}>
              תלחץ כאן כדי להצטרף לקבוצה: {group.title}, של{" "}
              {group.owner.fullName}
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
