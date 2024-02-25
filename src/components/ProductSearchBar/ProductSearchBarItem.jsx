import React, { useContext } from "react";
import { GroceryListContext } from "../../context/GroceryList";
import { useParams } from "react-router-dom";
import styles from "./productSearchBar.module.css";
function ProductSearchBarItem({ product }) {
  const { title, img, category, _id } = product;
  const { listId } = useParams();
  const { addGoGroceryList, getGroceryListFromDb } =
    useContext(GroceryListContext);

  const addItemToList = async () => {
    addGoGroceryList(listId, _id);
    getGroceryListFromDb(listId);
  };
  return (
    <div onClick={addItemToList} className={styles.productSearchBarItemContainer}>
      <div>
        <i className="fa-solid fa-plus"></i>
      </div>
      <p>{title}</p>
      <img className={styles.productSearchBarImg} src={img} alt="" />
      <p>{category}</p>
    </div>
  );
}

export default ProductSearchBarItem;
