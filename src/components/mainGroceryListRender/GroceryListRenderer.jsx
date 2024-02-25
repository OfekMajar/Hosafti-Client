import React, { useContext, useEffect, useState } from "react";
import styles from "../../pages/singleGroceryList/singleGroceryList.module.css";
import MainGroceryListItem from "./MainGroceryListItem";
import { useParams } from "react-router-dom";
import { GroceryListContext } from "../../context/GroceryList";
import axios from "axios";
import { baseUrl } from "../../utils/backEndUtils";

function GroceryListRenderer() {
  const { listId } = useParams();
  const [mainListRender, setMainListRender] = useState([]);
  const [groceryList, setGroceryList] = useState({});
  const { addGoGroceryList } = useContext(GroceryListContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/groceryLists/groceryList/${listId}`
        );
        const data = res.data;
        console.log(data);
        console.log(data.mainList);
        setMainListRender(data.mainList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.mainGroceryListContainor}>
      <div>
        {mainListRender?.map((item) => {
          return <MainGroceryListItem product={item} />;
        })}
      </div>
    </div>
  );
}

export default GroceryListRenderer;
