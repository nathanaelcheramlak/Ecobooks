
import { useRouter } from "next/navigation";

const BookCard = ({ book, handleAddToCart }) => {
  const router = useRouter();
  return (
    <div className="bg-white shadow-md rounded p-4 flex flex-col justify-between">
      {/* Book Image */}
      <img
        src={
          book.imageUrl ||
          "bookPlaceholder.png"
        } // Use book.image or fallback to placeholder
        alt={book.title}
        className="w-full h-48 object-cover rounded mb-4"
        onClick={() => router.push(`/books/${book.id}`)}
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