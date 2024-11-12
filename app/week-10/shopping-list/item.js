import React from 'react';

export default function Item({ item, onSelect, onDeleteItem }) {
  const { id, name, quantity, category } = item; // Destructure fields from item

  return (
    <li
      className="bg-gray-400 list-none border border-red-500 my-4 p-4 mx-3"
      onClick={() => onSelect(name)}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-bold">ID: {id}</h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteItem(id);
          }}
          className="px-2 py-1 bg-red-500 text-white rounded"
        >
          x
        </button>
      </div>
      <div className="bg-gray-400 list-none border my-4 p-4 mx-3 grid grid-cols-3 gap-4">
        <h3 className="font-bold">Name: {name}</h3>
        <p>Quantity: {quantity}</p>
        <p>Category: {category}</p>
      </div>
    </li>
  );
}