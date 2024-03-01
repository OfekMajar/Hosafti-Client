import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../../utils/backEndUtils";
import ProductSearchBarItem from "./ProductSearchBarItem";
import styles from "./productSearchBar.module.css";
function ProductSearchBar() {
  const [searchOptions, setSearchOptions] = useState([]);
  const onChangeSearchBarHandler = async (e) => {
    const res = await axios.get(
      `${baseUrl}/products/autoCompSearch?title=${e.target.value}`
    );
    const data = res.data;
    setSearchOptions(data);
  };
  return (
    <div className={styles.searchProductContainer}>
      <div className={styles.searchBar}>
        <input
          type="text"
          onChange={onChangeSearchBarHandler}
          placeholder="שם המוצר"
        />
      </div>
      {searchOptions.length > 0 && (
        <div className={styles.searchOptionsContainer}>
          {searchOptions.map((item) => {
            return <ProductSearchBarItem product={item} />;
          })}
        </div>
      )}
    </div>
  );
}

export default ProductSearchBar;
