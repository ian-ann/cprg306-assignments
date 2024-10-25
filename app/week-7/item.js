

export default function Item({ name, quantity, category }) {

    return (
        <li className="bg-gray-400 list-none border border-red-500 my-4 p-4 mx-3 grid grid-cols-3 gap-4">
            {/* inline blocks overwrites the margin blocks */}
            <h3>Name: {name}</h3>
            <p>Quantity: {quantity}</p>
            <p>Category: {category}</p>
        </li>
    )


}

