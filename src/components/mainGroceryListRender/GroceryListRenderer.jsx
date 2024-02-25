import React, { useContext, useEffect, useState } from "react";
import styles from "../../pages/singleGroceryList/singleGroceryList.module.css";
import MainGroceryListItem from "./MainGroceryListItem";
import { useParams } from "react-router-dom";
import { GroceryListContext } from "../../context/GroceryList";
import axios from "axios";
import { baseUrl } from "../../utils/backEndUtils";

function GroceryListRenderer() {
  const { listId } = useParams();
  // const [mainListRender, setMainListRender] = useState([]);
  const { groceryList, addGoGroceryList, getGroceryListFromDb } =
    useContext(GroceryListContext);

  useEffect(() => {
    getGroceryListFromDb(listId);
  }, []);

  const addItemToList = async (_id) => {
    addGoGroceryList(listId, _id);
    getGroceryListFromDb(listId);
  };

  const removeItemFromList = () => {
    addGoGroceryList(listId, _id);
    getGroceryListFromDb(listId);
  };
  return (
    <div className={styles.mainGroceryListContainor}>
      <div>
        {groceryList?.mainList?.map((item) => {
          return <MainGroceryListItem addItemToList={addItemToList} product={item} />;
        })}
      </div>
    </div>
  );
}

export default GroceryListRenderer;
