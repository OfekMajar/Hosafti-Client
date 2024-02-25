import React, { useContext, useEffect } from "react";
import styles from "./singleGroceryList.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../utils/backEndUtils";
import ProductSearchBar from "../../components/ProductSearchBar/ProductSearchBar";
import { GroceryListContext } from "../../context/GroceryList";
import GroceryListRenderer from "../../components/mainGroceryListRender/GroceryListRenderer";
function SingleGroceryList() {
  return (
    <div className={styles.SingleGroceryListContainer}>
      <ProductSearchBar />
      <GroceryListRenderer />
    </div>
  );
}

export default SingleGroceryList;
