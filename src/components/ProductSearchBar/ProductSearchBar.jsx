import axios from 'axios';
import React, { useState } from 'react';
import { baseUrl } from '../../utils/backEndUtils';
import ProductSearchBarItem from './ProductSearchBarItem';
import styles from './productSearchBar.module.css';
import { categories } from '../../utils/constains';
function ProductSearchBar() {
  const [searchOptions, setSearchOptions] = useState([]);
  const [category, setCategory] = useState('');

  const onChangeSearchBarHandler = async (e) => {
    const res = await axios.get(
      `${baseUrl}/products/autoCompSearch?category=${category}&title=${e.target.value}`
    );
    const data = res.data;
    setSearchOptions(data);
  };

  const handleCategorySelector = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className={styles.searchProductContainer}>
      <div className={styles.searchBar}>
        <input
          type="text"
          onChange={onChangeSearchBarHandler}
          placeholder="שם המוצר"
        />
        <button
          onClick={async () => {
            let res = await axios.put(`${baseUrl}/products/normalize-titles`);
            console.log(res);
          }}
        >
          {' '}
          fix
        </button>
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
            return <ProductSearchBarItem product={item} />;
          })}
        </div>
      )}
    </div>
  );
}

export default ProductSearchBar;
