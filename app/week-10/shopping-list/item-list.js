"use client";

import React, { useState } from "react";
import Item from "./item";

export default function ItemList({ items, onItemSelect  }) {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  const groupedItems = items.reduce((acc, item) => {
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
      <div>
        <div className="flex p-1 m-2 gap-2">
          <label htmlFor="sort" className="content-center text-center font-bold">Sort by: </label>
          <button
            className={`flex flex-row border-2 border-gray-300 p-2 rounded-lg font-sans hover:bg-black hover:border-black hover:text-white ${sortBy === "name" ? "bg-gray-500" : "bg-orange-400"}`}
            onClick={() => setSortBy("name")}
          >
            Name
          </button>
          <button
            className={`flex flex-row border-2 border-gray-300 p-2 rounded-lg font-sans hover:bg-black hover:border-black hover:text-white ${sortBy === "category" ? "bg-gray-500" : "bg-orange-500"}`}
            onClick={() => setSortBy("category")}
          >
            Category
          </button>
          <button
            className={`flex flex-row border-2 border-gray-300 p-2 rounded-lg font-sans hover:bg-black hover:border-black hover:text-white ${sortBy === "groupByCategory" ? "bg-gray-500" : "bg-orange-600"}`}
            onClick={() => setSortBy("groupByCategory")}
          >
            Group by Category
          </button>
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
                      onSelect={onItemSelect}
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
                onSelect={onItemSelect}
              />
            ))
          )}
        </ul>
      </div>
    );
  }