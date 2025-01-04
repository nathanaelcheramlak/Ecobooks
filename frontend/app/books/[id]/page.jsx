'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BookDetails() {
  const params = useParams(); // Get dynamic route parameters
  const { id } = params; // Extract the `id` parameter
  const [book, setBook] = useState(null); // State to hold book details
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/books/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch book data");
        }
        const data = await response.json();
        setBook(data.book);
      } catch (error) {
        console.log("Error fetching book details:", error);
        setError(error.message);
      }
    };

    fetchBook();
  }, [id]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Book Image */}
        <img
          src={book.imageUrl || "bookPlaceholder.png"}
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
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
