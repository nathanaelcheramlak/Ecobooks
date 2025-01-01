'use client'

import { useState, useEffect } from "react";
import BookCard from "../../components/BookCard"; // Import the BookCard component
import Link from "next/link";
// import axios from "axios"; // For API calls

export default function BooksPage() {
  const [books, setBooks] = useState([]); // Store the list of books
  const [searchQuery, setSearchQuery] = useState(""); // Store the search input
  const [filters, setFilters] = useState({ category: "", priceRange: "" }); // Store filter options
  const [filteredBooks, setFilteredBooks] = useState([]); // Books after filtering

  // Fetch books from the backend API
  useEffect(() => {
    const placeholderBooks = [
      {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 10.99,
        image: "https://via.placeholder.com/150",
        category: "Fiction",
      },
      {
        id: 2,
        title: "1984",
        author: "George Orwell",
        price: 9.99,
        image: "https://img.freepik.com/free-vector/book_53876-58220.jpg",
      },
    ];
    setBooks(placeholderBooks);
    setFilteredBooks(placeholderBooks);
  }, []);


  // Filter books based on search and filters
  useEffect(() => {
    let result = books;

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      result = result.filter((book) => book.category === filters.category);
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      result = result.filter((book) => book.price >= min && book.price <= max);
    }

    setFilteredBooks(result);
  }, [searchQuery, filters, books]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Books</h1>

      {/* Search and Filters */}
      <div className="mb-8 flex flex-wrap gap-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded p-2 w-full sm:w-1/3"
        />

        {/* Category Filter */}
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded p-2 w-full sm:w-1/4"
        >
          <option value="">All Categories</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
        </select>

        {/* Price Range Filter */}
        <select
          name="priceRange"
          value={filters.priceRange}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded p-2 w-full sm:w-1/4"
        >
          <option value="">All Prices</option>
          <option value="0-10">0 - 10 USD</option>
          <option value="10-20">10 - 20 USD</option>
          <option value="20-50">20 - 50 USD</option>
          <option value="50-100">50 - 100 USD</option>
        </select>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Link href={`/books/${book.id}`} key={book.id}>
              <BookCard book={book} />
            </Link> // Pass the full book object
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
}