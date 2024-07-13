import axios from 'axios';
import React, { useState, useCallback } from 'react';
import { baseUrl } from '../../utils/backEndUtils';
import ProductSearchBarItem from './ProductSearchBarItem';
import styles from './productSearchBar.module.css';
import { categories } from '../../utils/constains';
import debounce from 'lodash.debounce';

function ProductSearchBar() {
  const [searchOptions, setSearchOptions] = useState([]);
  const [category, setCategory] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const fetchSearchResults = async (searchValue, category) => {
    try {
      const res = await axios.get(
        `${baseUrl}/products/autoCompSearch?category=${category}&title=${searchValue}`
      );
      const data = res.data;
      setSearchOptions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const debouncedFetchSearchResults = useCallback(
    debounce((searchValue, category) => {
      fetchSearchResults(searchValue, category);
    }, 300), // 300ms debounce time
    []
  );

  const onChangeSearchBarHandler = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedFetchSearchResults(value, category);
  };

  const handleCategorySelector = (e) => {
    const value = e.target.value;
    setCategory(value);
    debouncedFetchSearchResults(searchValue, value);
  };

  return (
    <div className={styles.searchProductContainer}>
      <div className={styles.searchBar}>
        <input
          type="text"
          value={searchValue}
          onChange={onChangeSearchBarHandler}
          placeholder="שם המוצר"
        />
        <select value={category} onChange={handleCategorySelector}>
          <option value="">הכל</option>
          {categories.map((category) => (
            <option key={`category-${category}`} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {searchOptions.length > 0 && (
        <div className={styles.searchOptionsContainer}>
          {searchOptions.map((item) => (
            <ProductSearchBarItem key={item._id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductSearchBar;
