import React from "react";
import styles from "../../pages/singleGroceryList/singleGroceryList.module.css";

function MainGroceryListItem({ product }) {
  console.log("ddd");
  return (
    <div className={styles.MainGroceryListItem}>
      <div>
        <span>-</span>
        <span>{product.amount}</span>
        <span>+</span>
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
