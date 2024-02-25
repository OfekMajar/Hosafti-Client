import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../utils/backEndUtils";
import { useParams } from "react-router-dom";
import GroupListCard from "../../components/GroupListCard";
function GroupHistoryList() {
  const [groupLists, setGroupLists] = useState([]);
  const { id } = useParams();
  //
  const getGroupHistoryLists = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/GroceryLists/getGroupHistoryList/${id}`
      );
      const data = res.data;
      setGroupLists(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getGroupHistoryLists();
  }, []);
  return (
    <div>
      <div>
        {groupLists.map((item) => {
          return <GroupListCard isHistory={true} groupList={item} />;
        })}
      </div>
    </div>
  );
}

export default GroupHistoryList;
