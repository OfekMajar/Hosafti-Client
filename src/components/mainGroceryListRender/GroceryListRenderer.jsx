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
  const {
    groceryList,
    addGoGroceryList,
    checkOffGroceryItem,
    removeFromGroceryList,
    getGroceryListFromDb,
  } = useContext(GroceryListContext);

  useEffect(() => {
    getGroceryListFromDb(listId);
  }, []);

  const addItemToList = async (_id) => {
    addGoGroceryList(listId, _id);
  };

  const removeItemFromList = (_id) => {
    removeFromGroceryList(listId, _id);
  };
  const checkListItem = (_id) => {
    checkOffGroceryItem(listId, _id);
  };
  return (
    <div className={styles.leftContainer}>
      <div className={styles.listTitle}>
        <h2>{groceryList.title}</h2>
      </div>
      <div className={styles.mainGroceryListContainor}>
        {groceryList?.mainList?.map((item) => {
          return (
            <MainGroceryListItem
              checkListItem={checkListItem}
              removeItemFromList={removeItemFromList}
              addItemToList={addItemToList}
              product={item}
            />
          );
        })}
      </div>
    </div>
  );
}

export default GroceryListRenderer;
