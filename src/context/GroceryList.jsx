import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { baseUrl } from "../utils/backEndUtils";

export const GroceryListContext = createContext({});

export default function GroceryListProvider({ children }) {
  const [groceryList, setGroceryList] = useState([]);

  const getGroceryListFromDb = async (id) => {
    try {
      const res = await axios.get(`${baseUrl}/groceryLists/groceryList/${id}`);
      const data = res.data;
      setGroceryList(data);
    } catch (error) {
      console.log(error);
    }
  };
  //const { groceryListId, productId, action } = req.body;
  const addGoGroceryList = async (groceryListId, productId) => {
    const token = localStorage.getItem("hosafti_user_token");
    try {
      const res = await axios.post(
        `${baseUrl}/groceryLists/updateMainList`,
        {
          groceryListId,
          productId,
          action: "add",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getGroceryListFromDb(groceryListId);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromGroceryList = async (groceryListId, productId) => {
    const token = localStorage.getItem("hosafti_user_token");
    try {
      const res = await axios.post(
        `${baseUrl}/groceryLists/updateMainList`,
        {
          groceryListId,
          productId,
          action: "remove",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
        }
      );
      getGroceryListFromDb(groceryListId);
    } catch (error) {}
  };
  const shared = {
    groceryList,
    setGroceryList,
    getGroceryListFromDb,
    addGoGroceryList,
    removeFromGroceryList,
    checkOffGroceryItem,
  };
  return (
    <GroceryListContext.Provider value={shared}>
      {children}
    </GroceryListContext.Provider>
  );
}
