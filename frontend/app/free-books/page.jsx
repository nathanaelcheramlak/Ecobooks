"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function FreeBooksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [freeBooks, setFreeBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFreeBooks = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=12&printType=books`
      );
      setFreeBooks(response.data.items || []);
    } catch (err) {
      console.error("Error fetching free books:", err);
      setError("Failed to fetch free books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch recommended books on initial load
    fetchFreeBooks("recommended");
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchFreeBooks(searchQuery);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Free Books</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="mb-8 flex">
        <input
          type="text"
          placeholder="Search free books..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-l p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {/* Loading State */}
      {loading && <p>Loading free books...</p>}

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {freeBooks.length > 0
          ? freeBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white shadow-md rounded p-4 flex flex-col"
              >
                {/* Book Image */}
                <img
                  src={
                    book.volumeInfo.imageLinks?.thumbnail || "/placeholder.png"
                  }
                  alt={book.volumeInfo.title}
                  className="w-full h-48 object-contain rounded mb-4"
                />

                {/* Book Title */}
                <h3 className="font-bold text-lg mb-2">
                  {book.volumeInfo.title}
                </h3>

                {/* Book Author */}
                <p className="text-gray-700 mb-4">
                  By: {book.volumeInfo.authors?.join(", ") || "Unknown"}
                </p>

                {/* View/Download Button */}
                <a
                  href={book.volumeInfo.previewLink} // Google Books preview link
                  target="_blank"
                  rel="noopener noreferrer"
                  // Add download attribute if you have direct download links
                  // download={book.volumeInfo.title}
                  className="bg-blue-600 text-white px-4 py-2 text-center rounded hover:bg-blue-700 transition"
                >
                  View/Download
                </a>
              </div>
            ))
          : !loading && (
              <p>No books found. Try searching for something else!</p>
            )}
      </div>
    </div>
  );
}
