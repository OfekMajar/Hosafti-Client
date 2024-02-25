import React from "react";
import { useNavigate } from "react-router-dom";
import groupImg1 from "../assets/groupIconImg-group-1.jpg";
import familyImg1 from "../assets/groupIconImg-Family-1.png";
function MyGroupsCard({ id, owner, title }) {
  const navigate = useNavigate();

  const goToSingleGroup = () => {
    navigate(`/myGroups/group/${id}`);
  };
  return (
    <div>
      <img
        onClick={goToSingleGroup}
        src={groupImg1}
        width={100}
        height={100}
        alt=""
      />
      <p>{title}</p>
      <p>{owner}</p>
    </div>
  );
}

export default MyGroupsCard;
