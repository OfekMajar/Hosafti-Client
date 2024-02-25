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
      console.log(data);
      setGroceryList(data);
    } catch (error) {
      console.log(error);
    }
  };
  //const { groceryListId, productId, action } = req.body;
  const addGoGroceryList = async (groceryListId, productId) => {
    try {
      const res = await axios.post(`${baseUrl}/groceryLists/updateMainList`, {
        groceryListId,
        productId,
        action: "add",
      });
      console.log(res);
      const data = res.data;
      console.log(data);
      getGroceryListFromDb(groceryListId);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromGroceryList = async (groceryListId, productId) => {
    try {
      const res = await axios.post(`${baseUrl}/groceryLists/updateMainList`, {
        groceryListId,
        productId,
        action: "remove",
      });
      console.log(res);
      const data = res.data;
      console.log(data);
      getGroceryListFromDb(groceryListId);
    } catch (error) {
      console.log(error);
    }
  };
  const shared = {
    groceryList,
    setGroceryList,
    getGroceryListFromDb,
    addGoGroceryList,removeFromGroceryList
  };
  return (
    <GroceryListContext.Provider value={shared}>
      {children}
    </GroceryListContext.Provider>
  );
}
