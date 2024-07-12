import axios from 'axios';
import React, { useState } from 'react';
import { baseUrl } from '../../utils/backEndUtils';
import ProductSearchBarItem from './ProductSearchBarItem';
import styles from './productSearchBar.module.css';
import { categories } from '../../utils/constains';
function ProductSearchBar() {
  const [searchOptions, setSearchOptions] = useState([]);
  const [category, setCategory] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const onChangeSearchBarHandler = async (e) => {
    let res;
    if (e.target.tagName.toLowerCase() === 'input') {
      setSearchValue(e.target.value);
      res = await axios.get(
        `${baseUrl}/products/autoCompSearch?category=${category}&title=${e.target.value}`
      );
    } else {
      res = await axios.get(
        `${baseUrl}/products/autoCompSearch?category=${e.target.value}&title=${searchValue}`
      );
    }

    const data = res.data;
    setSearchOptions(data);
  };

  const handleCategorySelector = (e) => {
    setCategory(e.target.value);
    onChangeSearchBarHandler(e);
  };

  return (
    <div className={styles.searchProductContainer}>
      <div className={styles.searchBar}>
        <input
          type="text"
          onChange={onChangeSearchBarHandler}
          placeholder="שם המוצר"
        />
        <select onChange={handleCategorySelector}>
          <option value="">הכל</option>
          {categories.map((category) => {
            return (
              <option key={`category-${category}`} value={category}>
                {category}
              </option>
            );
          })}
        </select>
      </div>
      {searchOptions.length > 0 && (
        <div className={styles.searchOptionsContainer}>
          {searchOptions.map((item) => {
            return <ProductSearchBarItem key={item._id} product={item} />;
          })}
        </div>
      )}
    </div>
  );
}

export default ProductSearchBar;
