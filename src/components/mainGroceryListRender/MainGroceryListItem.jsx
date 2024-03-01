import React from "react";
import styles from "../../pages/singleGroceryList/singleGroceryList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

function MainGroceryListItem({
  product,
  removeItemFromList,
  addItemToList,
  checkListItem,
}) {
  return (
    <div className={styles.MainGroceryListItem}>
      <div>
        <input
          onClick={() => {
            checkListItem(product.productId._id);
          }}
          type="checkbox"
          checked={product.checked}
        />
      </div>
      <div className={styles.productAmountContainer}>
        <span
          onClick={() => {
            removeItemFromList(product.productId._id);
          }}>
          <FontAwesomeIcon
            icon={faMinusCircle}
            className={styles.removeFromList}
          />
        </span>
        <span>{product.amount}</span>
        <span
          onClick={() => {
            addItemToList(product.productId._id);
          }}>
          <FontAwesomeIcon icon={faPlusCircle} className={styles.addToList} />
        </span>
      </div>
      <p
        className={product.checked ? styles.checkedItem : styles.uncheckedItem}>
        {product.productId.title}
      </p>
      <img
        src={product.productId.img}
        alt={`${product.productId.title} image`}
      />
    </div>
  );
}

export default MainGroceryListItem;
