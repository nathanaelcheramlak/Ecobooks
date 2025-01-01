import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function BookDetailsPage() {
  const router = useRouter();
  const { id } = router.query; // Extract the book ID from the URL
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  // Placeholder data for testing
  const placeholderBooks = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: 10.99,
      image: "https://via.placeholder.com/150",
      description:
        "A classic novel set in the Jazz Age, exploring themes of wealth and love.",
      
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      price: 9.99,
      image: "https://img.freepik.com/free-vector/book_53876-58220.jpg",
      description:
        "A dystopian novel about a totalitarian regime and the suppression of individuality.",
      category: "Dystopian",
    },
  ];

  useEffect(() => {
    if (!id) return;

    // Simulate fetching book details
    const foundBook = placeholderBooks.find((book) => book.id === parseInt(id));
    if (foundBook) {
      setBook(foundBook);
    } else {
      setError("Book not found.");
    }
  }, [id]);

  // Handle adding the book to the cart
  const handleAddToCart = () => {
    alert(`Added "${book.title}" to the cart!`);
    // TODO: Implement cart logic
  };

  if (!book && !error) {
    return <p>Loading book details...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Book Image */}
        <img
          src={book.image || "/placeholder.png"}
          alt={book.title}
          className="w-full md:w-1/3 h-64 object-cover rounded"
        />

        {/* Book Details */}
        <div className="flex flex-col flex-grow">
          <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
          <p className="text-gray-700 text-lg mb-4">By: {book.author}</p>
          <p className="text-blue-600 text-xl font-semibold mb-4">
            ${book.price.toFixed(2)}
          </p>
          <p className="text-gray-600 mb-8">{book.description}</p>
          <p className="text-gray-500 mb-8">Category: {book.category}</p>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}