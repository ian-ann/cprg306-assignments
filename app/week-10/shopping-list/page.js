"use client";

import React, { useState, useEffect } from 'react';
import { useUserAuth } from "../_utils/auth-context";
import NewItem from './new-item';
import ItemList from './item-list';
import MealIdeas from './meal-ideas';
import { getItems, addItems } from "../_services/shopping-list-service";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState('');

  const { user, firebaseSignOut } = useUserAuth();

  const loadItems = async () => {
    if (user) {
      const itemsList = await getItems(user.uid);
      setItems(itemsList);
    }
  };

  useEffect(() => {
    loadItems();
  }, [user]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <p>
          Please sign in to continue.
        </p>
        <a href="/week-9" className="px-4 py-2 bg-green-500 text-white rounded mt-4">
          Go to Sign In
        </a>
      </div>
    )
  }

  const handleItemSelect = (itemName) => {
    const cleanedItemName = itemName.split(',')[0].trim().replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
    setSelectedItemName(cleanedItemName);
  };

  const handleAddItem = async (newItem) => {
    if (user) {
      const itemId = await addItem(user.uid, newItem);
      setItems(prevItems => [...prevItems, { id: itemId, ...newItem }]);
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
        <div className="mb-4">
          <NewItem onAddItem={handleAddItem} />
        </div>
        <div className="flex">
          <div className="w-1/2">
            <ItemList items={items} onItemSelect={handleItemSelect} />
          </div>
          <div className="w-1/2">
            <MealIdeas ingredient={selectedItemName} />
          </div>
        </div>
      </div>
    );
  }
};

