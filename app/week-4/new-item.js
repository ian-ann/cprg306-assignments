// /app/week-4/new-item.js
"use client";

import { useState } from 'react';

export default function NewItem() {
    const [quantity, setQuantity] = useState(1);

    const increment = () => {
        setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 20));
    };

    const decrement = () => {
        setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
    };

    return (
        <div class="flex bg-white w-1/2 m-4 justify-center items-center">
            <div class="flex flex-row gap-4 m-4 w-full justify-center items-center">
                <p class="text-teal-950 content-center flex-auto">New Item {quantity}</p>
                <p class="text-teal-950 content-center flex-auto">Quantity: {quantity}</p>
                <p class="text-teal-950 content-center flex-auto">Category</p>
                <div class="flex flex-row gap-4 w-auto">
                    <button onClick={decrement} disabled={quantity === 1} class="bg-teal-950 hover:bg-teal-200 hover:text-teal-950 text-white font-bold py-2 px-4 rounded">
                        Decrement -
                    </button>
                    <button onClick={increment} disabled={quantity === 20} class="bg-teal-950 hover:bg-teal-200 hover:text-teal-950 text-white font-bold py-2 px-4 rounded">
                        Increment +
                    </button></div>

            </div>
        </div>

    );
}
