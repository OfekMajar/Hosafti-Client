import React from "react";
import { useNavigate } from "react-router-dom";
import groupImg1 from "../assets/groupIconImg-group-1.jpg";
import familyImg1 from "../assets/groupIconImg-Family-1.png";
import styles from "../pages/myGroups/myGroups.module.css";
function MyGroupsCard({ id, owner, title }) {
  const navigate = useNavigate();

  const goToSingleGroup = () => {
    navigate(`/myGroups/group/${id}`);
  };
  return (
    <div onClick={goToSingleGroup} className={styles.groupCard}>
      <img
        
        src={groupImg1}
        width={100}
        height={100}
        alt=""
      />
      <p>שם קבוצה: {title}</p>
      <p> יוצר: {owner}</p>
    </div>
  );
}

export default MyGroupsCard;
