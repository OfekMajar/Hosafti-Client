import React, { useContext, useEffect, useState } from 'react';
import styles from '../../pages/singleGroceryList/singleGroceryList.module.css';
import MainGroceryListItem from './MainGroceryListItem';
import { useParams } from 'react-router-dom';
import { GroceryListContext } from '../../context/GroceryList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
function GroceryListRenderer() {
  const { listId } = useParams();
  // const [mainListRender, setMainListRender] = useState([]);
  const {
    groceryList,
    addGoGroceryList,
    checkOffGroceryItem,
    removeFromGroceryList,
    getGroceryListFromDb,
    changeGroceryListTitle,
  } = useContext(GroceryListContext);
  const [toggleNameChanger, setToggleNameChanger] = useState(false);
  const [newTitle, setNewTitle] = useState(groceryList.title);
  useEffect(() => {
    getGroceryListFromDb(listId);
  }, []);

  const addItemToList = async (_id) => {
    addGoGroceryList(listId, _id);
  };

  const removeItemFromList = (_id) => {
    removeFromGroceryList(listId, _id);
  };
  const checkListItem = (_id) => {
    checkOffGroceryItem(listId, _id);
  };

  const handleNewTitleInput = (e) => {
    setNewTitle(e.target.value);
  };

  const handleNameChanger = async () => {
    await changeGroceryListTitle(listId, newTitle);
    setToggleNameChanger(false);
  };
  return (
    <div className={styles.leftContainer}>
      <div className={styles.theList}>
        <div className={styles.listTitle}>
          {!toggleNameChanger ? (
            <>
              <h2>{groceryList.title}</h2>
              <FontAwesomeIcon
                onClick={() => {
                  setToggleNameChanger(true);
                }}
                style={{ cursor: 'pointer' }}
                icon={faPen}
              ></FontAwesomeIcon>
            </>
          ) : (
            <>
              <input onChange={handleNewTitleInput} value={newTitle} />
              <FontAwesomeIcon
                onClick={handleNameChanger}
                icon={faCheck}
                style={{ cursor: 'pointer' }}
              ></FontAwesomeIcon>
            </>
          )}
        </div>
        <div className={styles.mainGroceryListContainer}>
          {groceryList?.mainList?.map((item) => {
            return (
              <MainGroceryListItem
                checkListItem={checkListItem}
                removeItemFromList={removeItemFromList}
                addItemToList={addItemToList}
                product={item}
                key={item.productId._id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GroceryListRenderer;
