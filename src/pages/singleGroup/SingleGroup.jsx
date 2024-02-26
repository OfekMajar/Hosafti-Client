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
  const checkIfUserIsInGroup = async () => {
    try {
      const res = await axios.patch(
        `${baseUrl}/groups/checkIfUserInGroup/${id}`,
        { userId: user.id }
      );
      const data = res.data;
      if (res.status == 200) {
        setUserInGroup(true);
        console.log("works");
      } else console.log("doesn't work");
      console.log(res);
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
  }, []);
  useEffect(() => {
    if (userInGroup) getGroupGroceryLists();
  }, [userInGroup]);

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

  return !userInGroup ? (
    <div>NOt</div>
  ) : (
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
