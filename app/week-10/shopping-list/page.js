"use client";
import React, { useState, useEffect } from 'react';
import { useUserAuth } from "../_utils/auth-context";
import NewItem from './new-item';
import ItemList from './item-list';
import MealIdeas from './meal-ideas';
import { getItems, addItems, deleteItem } from "../_services/shopping-list-service";

export default function Page() {
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState('');
  const [error, setError] = useState(null);

  const { user, firebaseSignOut } = useUserAuth();

  const loadItems = async () => {
    if (user) {
      const itemsList = await getItems(user.uid);
      console.log("Load items:", itemsList);
      setItems(itemsList);
    }
  };

  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]);

  const handleItemSelect = (itemName) => {
    const cleanedItemName = itemName.split(',')[0].trim().replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
    setSelectedItemName(cleanedItemName);
  };

  const validateItem = (item) => {
    if (!item.name || typeof item.name !== 'string' || item.name.length < 1 || item.name.length > 50) {
      return "Name must be a string between 1 and 50 characters.";
    }
    if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 100) {
      return "Quantity must be an integer between 1 and 100.";
    }
    const validCategories = ['produce', 'dairy', 'bakery', 'meat', 'frozen foods', 'canned goods', 'dry goods', 'beverages', 'snacks', 'household', 'other'];
    if (!item.category || typeof item.category !== 'string' || !validCategories.includes(item.category)) {
      return "Category must be one of the predefined categories.";
    }
    return null;
  };

  const handleAddItem = async (newItem) => {
    console.log("Adding item:", newItem);
    const validationError = validateItem(newItem);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (user) {
      try {
        const itemId = await addItems(user.uid, newItem);
        loadItems()
        //setItems(prevItems => [...prevItems, { id: itemId, ...newItem }]);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError("Failed to add item. Please check your permissions.");
      }
    }
  };

  const handleDeleteItem = async (itemId) => {
    console.log("Deleting item:", itemId);
    if (user) {
      try {
        await deleteItem(user.uid, itemId);
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
      } catch (err) {
        setError("Failed to delete item. Please check your permissions.");
      }
    }
  };

  if (user) {
    return (

      <div className="flex flex-col">
        <button
          onClick={async () => await firebaseSignOut()}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
        <p classname="font-bold text-center color-red-500">{error}</p>
        <div className="mb-4">
          <NewItem onAddItem={handleAddItem}/>
        </div>
        <div className="flex">
          <div className="w-1/2">
            <ItemList items={items} onItemSelect={handleItemSelect} onItemDelete={handleDeleteItem}/>
          </div>
          <div className="w-1/2">
            <MealIdeas ingredient={selectedItemName} />
          </div>
        </div>
      </div>
    );
  }
};

