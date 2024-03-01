import React, { useContext } from "react";
import { GroceryListContext } from "../../context/GroceryList";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./productSearchBar.module.css";
function ProductSearchBarItem({ product }) {
  const { title, img, category, _id } = product;
  const { listId } = useParams();
  const { addGoGroceryList, getGroceryListFromDb } =
    useContext(GroceryListContext);

  const addItemToList = async (e) => {
    e.preventDefault();
    addGoGroceryList(listId, _id);
    getGroceryListFromDb(listId);
  };
  return (
    <div
      onClick={addItemToList}
      className={styles.productSearchBarItemContainer}>
      <div>
        <FontAwesomeIcon icon={faPlusCircle} className={styles.addBtn} />
      </div>
      <p className={styles.productName}>{title}</p>
      <img className={styles.productSearchBarImg} src={img} alt="" />
      <p>{category}</p>
    </div>
  );
}

export default ProductSearchBarItem;
