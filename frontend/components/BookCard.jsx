import React from "react";

const BookCard = ({ book }) => {
  const handleAddToCart = () => {
    alert(`Added "${book.title}" to the cart!`);
    // TODO: Implement actual cart logic (e.g., update global cart state)
  };

  return (
    <div className="bg-white shadow-md rounded p-4 flex flex-col justify-between">
      {/* Book Image */}
      <img
        src={
          book.image ||
          "placeholder.png"
        } // Use book.image or fallback to placeholder
        alt={book.title}
        className="w-full h-48 object-cover rounded mb-4"
      />

      {/* Book Title */}
      <h3 className="font-bold text-lg mb-2">{book.title}</h3>

      {/* Book Author */}
      <p className="text-gray-700 mb-2">By: {book.author}</p>

      {/* Book Price */}
      <p className="text-blue-600 font-semibold mb-4">
        ${book.price.toFixed(2)}
      </p>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default BookCard;