import React from "react";
import styles from "../../pages/singleGroceryList/singleGroceryList.module.css";

function MainGroceryListItem({ product, removeItemFromList, addItemToList }) {
  return (
    <div className={styles.MainGroceryListItem}>
      <div className={styles.productAmountContainer}>
        <span
          onClick={() => {
            removeItemFromList(product.productId._id);
          }}>
          <i class="fa-solid fa-circle-minus"></i>
        </span>
        <span>{product.amount}</span>
        <span
          onClick={() => {
            addItemToList(product.productId._id);
          }}>
          <i class="fa-solid fa-circle-plus"></i>
        </span>
      </div>
      <div>{product.productId.title}</div>
      <img
        src={product.productId.img}
        alt={`${product.productId.title} image`}
      />
    </div>
  );
}

export default MainGroceryListItem;
