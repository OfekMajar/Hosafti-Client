import React, { useContext, useEffect, useState } from "react";
import styles from "./singleGroup.module.css";
import { Link, useParams } from "react-router-dom";
import { baseUrl } from "../../utils/backEndUtils";
import GroupListCard from "../../components/GroupListCard";
import {UserContext} from "../../context/User"
import axios from "axios";
function SingleGroup() {
  //ToDO add valdition to check if online user has access to this group
  const [groupLists, setGroupLists] = useState([]);
  const {user} = useContext(UserContext)
  const { id } = useParams();

  const getGroupGroceryLists = async () => {
    try {
      const res = await axios.get(`${baseUrl}/groceryLists/group/${id}`);
      const data = res.data;
      setGroupLists(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getGroupGroceryLists();
  }, []);

  const linkGenerator = async () => {
    try {
      const res = await axios.post(
        `${baseUrl}/tokenManipulation/createLinkToken/${id}`,
        {
          inviter: user.fullName,
        }
      );
      const token = res.data;
      console.log(token);
      const newLink = `http://localhost:5173/joinGroup/${id}/${token}`;
      navigator.clipboard.writeText(newLink);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <Link to={`/group/${id}/createList`}>create list</Link>
      </div>
      <div>
        <Link to={`/myGroups/group/${id}/historyLists`}>ארכיון</Link>
      </div>
      <div>
        <button onClick={linkGenerator}>צור קישור</button>
      </div>
      <div>
        {groupLists.map((item) => {
          return <GroupListCard groupList={item} />;
        })}
      </div>
    </div>
  );
}

export default SingleGroup;
