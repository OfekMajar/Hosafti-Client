import React from "react";
import styles from "../../pages/singleGroceryList/singleGroceryList.module.css";

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
          onClick={()=>{checkListItem(product.productId._id)}}
          type="checkbox"
          checked={product.checked}
        />
      </div>
      <div className={styles.productAmountContainer}>
        <span
          onClick={() => {
            removeItemFromList(product.productId._id);
          }}>
          <i className="fa-solid fa-circle-minus"></i>
        </span>
        <span>{product.amount}</span>
        <span
          onClick={() => {
            addItemToList(product.productId._id);
          }}>
          <i className="fa-solid fa-circle-plus"></i>
        </span>
      </div>
      <div className={product.checked?styles.checkedItem:styles.uncheckedItem}>{product.productId.title}</div>
      <img
        src={product.productId.img}
        alt={`${product.productId.title} image`}
      />
    </div>
  );
}

export default MainGroceryListItem;
