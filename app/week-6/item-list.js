"use client";

import Item from "./item";
import React, { useState } from "react";
import items from "./items";

export default function ItemList() {
  const [sortBy, setSortBy] = useState("name");
  const arrShoppinglist = items;

  const sortedItems = [...arrShoppinglist].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  const groupedItems = arrShoppinglist.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const sortedGroupedItems = Object.keys(groupedItems)
    .sort()
    .reduce((acc, category) => {
      acc[category] = groupedItems[category].sort((a, b) => a.name.localeCompare(b.name));
      return acc;
    }, {});

  return (
    <div >
      <div className="flex p-1 m-2 ">
        <label for="sort" className="content-center text-center">Sort by: </label>
        <button
          className={`flex flex-row border-2 border-gray-300 p-1 m-2 rounded-lg font-sans hover:bg-black hover:border-black hover:text-white ${sortBy === "name" ? "bg-gray-500" : "bg-white"}`}
          onClick={() => setSortBy("name")}
        >
          Name
        </button>
        <button
          className={`flex flex-row border-2 border-gray-300 p-1 m-2 rounded-lg font-sans hover:bg-black hover:border-black hover:text-white ${sortBy === "category" ? "bg-gray-500" : "bg-white"}`}
          onClick={() => setSortBy("category")}
        >
          Category
        </button>
        <button
          class="bg-orange-700 p-1 m-2"
          onClick={() => setSortBy("groupByCategory")}
        >
          Grouped Category</button>
      </div>
      <ul className="mx-3 bg-gray-600 flex-row p-10">
        {sortBy === "groupByCategory" ? (
          Object.keys(sortedGroupedItems).map(category => (
            <li key={category} className="capitalize">
              <h3 className="font-bold">{category}</h3>
              <ul>
                {sortedGroupedItems[category].map(item => (
                  <Item
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    category={item.category}
                  />
                ))}
              </ul>
            </li>
          ))
        ) : (
          sortedItems.map(item => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))
        )}
      </ul>
    </div>
  );
}