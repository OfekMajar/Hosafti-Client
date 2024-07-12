import React from 'react';
import styles from './singleGroceryList.module.css';
import ProductSearchBar from '../../components/ProductSearchBar/ProductSearchBar';
import GroceryListRenderer from '../../components/mainGroceryListRender/GroceryListRenderer';
function SingleGroceryList() {
  return (
    <div className={styles.SingleGroceryListContainer}>
      <ProductSearchBar />
      <GroceryListRenderer />
    </div>
  );
}

export default SingleGroceryList;
