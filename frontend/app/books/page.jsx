'use client';

import { useState, useEffect } from "react";
import BookCard from "../../components/BookCard"; // Import the BookCard component
import { useCart } from "@/context/CartContext";

export default function BooksPage() {
  const [books, setBooks] = useState([]); // Store the list of books
  const [searchQuery, setSearchQuery] = useState(""); // Store the search input
  const [filters, setFilters] = useState({ category: "", priceRange: "" }); // Store filter options
  const [filteredBooks, setFilteredBooks] = useState([]); // Books after filtering
  const { addToCart } = useCart();

  // Fetch books from the backend API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/books");
        if (!response.ok) throw new Error("Failed to fetch books.");
        const data = await response.json();
        setBooks(data.books);
        setFilteredBooks(data.books);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchBooks();
  }, []);

  // Filter books based on search and filters
  useEffect(() => {
    let filtered = books;

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter((book) => book.category === filters.category);
    }

    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange.split("-").map(Number);
      filtered = filtered.filter(
        (book) => book.price >= minPrice && book.price <= maxPrice
      );
    }

    setFilteredBooks(filtered);
  }, [searchQuery, filters, books]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Add book to cart
  const handleAddToCart = (book) => {
    addToCart(book);
    alert(`"${book.title}" has been added to your cart.`);
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
          onChange={(e) => setSearchQuery(e.target.value)}
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
            <BookCard
              key={book.id}
              book={book}
              handleAddToCart={() => handleAddToCart(book)}
            />
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
}
