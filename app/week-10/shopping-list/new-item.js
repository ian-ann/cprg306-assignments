"use client";

import { useState } from 'react';

export default function NewItem({ onAddItem }) {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState('');

    const increment = () => {
        setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 20));
    };

    const decrement = () => {
        setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const item = { id: Math.random().toString(36).substr(2, 9), name, quantity, category };
        onAddItem(item);
        setName('');
        setQuantity(1);
        setCategory('');
    };

    return (
        <div className="flex justify-center items-start">
            <form onSubmit={handleSubmit} className="p-2 m-4 bg-gray-600 text-black max-w-sm w-full">
                <div className="mb-2">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        spellCheck="false"
                        placeholder="Item Name"
                        className="w-full mt-1 border-2 border-gray-300 p-2 rounded-lg font-sans"
                    />
                </div>
                <div className="flex justify-between">
                    <div className="p-2 mt-1 mb-1 rounded-md  bg-white text-white w-36">
                        <div className="flex justify-between">
                            <span className="text-black">{quantity}</span>
                            <div className="flex">
                                <button
                                    type="button"
                                    onClick={decrement}
                                    disabled={quantity === 1}
                                    className="w-8 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 disabled:bg-gray-400 focus:ring-blue-400 focus:ring-opacity-75"
                                >
                                    -
                                </button>
                                <button
                                    type="button"
                                    onClick={increment}
                                    disabled={quantity === 20}
                                    className="w-8 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400  disabled:bg-gray-400 focus:ring-opacity-75 ml-1"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="ml-1 border-2 border-gray-300 p-2 rounded-lg font-sans"
                    >
                        <option value="" disabled>Category</option>
                        <option value="produce">Produce</option>
                        <option value="dairy">Dairy</option>
                        <option value="bakery">Bakery</option>
                        <option value="meat">Meat</option>
                        <option value="frozen foods">Frozen Foods</option>
                        <option value="canned goods">Canned Goods</option>
                        <option value="dry goods">Dry Goods</option>
                        <option value="beverages">Beverages</option>
                        <option value="snacks">Snacks</option>
                        <option value="household">Household</option>
                        <option value="other">Other</option>
                    </select>

                </div>
                <button
                    type="submit"
                    className="w-full mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}