import axios from 'axios';
import { createContext, useEffect, useState, useContext } from 'react';
import { baseUrl } from '../utils/backEndUtils';
import { UserContext } from './User';

export const GroceryListContext = createContext({});

export default function GroceryListProvider({ children }) {
  const [groceryList, setGroceryList] = useState([]);
  const { accessToken } = useContext(UserContext);
  const getGroceryListFromDb = async (id) => {
    try {
      const res = await axios.get(`${baseUrl}/groceryLists/groceryList/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = res.data;
      setGroceryList(data);
    } catch (error) {
      console.log(error);
    }
  };
  //const { groceryListId, productId, action } = req.body;
  const addGoGroceryList = async (groceryListId, productId) => {
    try {
      const res = await axios.post(
        `${baseUrl}/groceryLists/updateMainList`,
        {
          groceryListId,
          productId,
          action: 'add',
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      getGroceryListFromDb(groceryListId);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromGroceryList = async (groceryListId, productId) => {
    try {
      const res = await axios.post(
        `${baseUrl}/groceryLists/updateMainList`,
        {
          groceryListId,
          productId,
          action: 'remove',
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      getGroceryListFromDb(groceryListId);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFromGroceryList = async (groceryListId, productId) => {
    try {
      const res = await axios.post(`${baseUrl}/groceryLists/updateMainList`, {
        groceryListId,
        productId,
      });
      getGroceryListFromDb(groceryListId);
    } catch (error) {
      console.log(error);
    }
  };

  const checkOffGroceryItem = async (groceryListId, productId, checked) => {
    try {
      const res = await axios.patch(
        `${baseUrl}/groceryLists/checkOffListItem`,
        {
          groceryListId,
          productId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      getGroceryListFromDb(groceryListId);
    } catch (error) {}
  };

  const changeGroceryListTitle = async (groceryListId, title) => {
    try {
      const res = await axios.patch(
        `${baseUrl}/groceryLists/updateGroceryList/${groceryListId}`,
        {
          title: title,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      getGroceryListFromDb(groceryListId);
    } catch (error) {
      console.log(error);
    }
  };
  const shared = {
    groceryList,
    setGroceryList,
    getGroceryListFromDb,
    addGoGroceryList,
    removeFromGroceryList,
    checkOffGroceryItem,
    changeGroceryListTitle,
  };
  return (
    <GroceryListContext.Provider value={shared}>
      {children}
    </GroceryListContext.Provider>
  );
}
