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

  const [cart, setCart] = useState([]);

  // Fetch books from the backend API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/books");
        const data = await response.json();

        setBooks(data.books);
        setFilteredBooks(data.books);
      } catch (error) {
        console.error("Failed to fetch books: ", error);
      }
    }

    fetchBooks();
  }, []);


  // Filter books based on search and filters
  // useEffect(() => {
  //   let result = books;

  //   // Search filter
  //   if (searchQuery) {
  //     result = result.filter(
  //       (book) =>
  //         book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         book.author.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //   }

  //   // Category filter
  //   if (filters.category) {
  //     result = result.filter((book) => book.category === filters.category);
  //   }

  //   // Price range filter
  //   if (filters.priceRange) {
  //     const [min, max] = filters.priceRange.split("-").map(Number);
  //     result = result.filter((book) => book.price >= min && book.price <= max);
  //   }

  //   setFilteredBooks(result);
  // }, [searchQuery, filters, books]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    console.log()
  };

  const handleAddToCart = (book) => {
    alert("Book added to cart" + book.title);
    setCart([...cart, book]);
    console.log(cart);
  }

  const handleSearch = () => {}

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
        <button className="font-bold py-4 px-8 border border-black rounded-md hover:bg-yellow-500 hover:text-white" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks && filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
              <BookCard book={book} handleAddToCart={() => handleAddToCart(book)}/>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
}