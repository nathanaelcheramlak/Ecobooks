"use client";

import { useState, useEffect } from "react";

export default function FreeBooksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [freeBooks, setFreeBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFreeBooks = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}&limit=12`
      );
      if (response.ok) {
        const data = await response.json();
        setFreeBooks(data.docs || []); // Use Open Library's `docs` property
      } else {
        setError("Failed to fetch free books. Please try again.");
      }
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
                key={book.key}
                className="bg-white shadow-md rounded p-4 flex flex-col"
              >
                {/* Book Title */}
                <h3 className="font-bold text-lg mb-2">
                  {book.title || "No Title"}
                </h3>

                {/* Book Author */}
                <p className="text-gray-700 mb-4">
                  By: {book.author_name?.join(", ") || "Unknown"}
                </p>

                {/* View/Download Button */}
                <a
                  href={`https://openlibrary.org${book.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
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
