'use client'
import { useState } from 'react'

const ManageBook = () => {
    const [books, setBooks] = useState([
      {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 10.99,
      },
      { id: 2, title: "1984", author: "George Orwell", price: 9.99 },
    ]);
  
    const [newBook, setNewBook] = useState({ title: "", author: "", price: "" });
  
    const handleAddBook = () => {
      if (!newBook.title || !newBook.author || !newBook.price)
        return alert("Please fill all fields");
      setBooks([
        ...books,
        { id: books.length + 1, ...newBook, price: parseFloat(newBook.price) },
      ]);
      setNewBook({ title: "", author: "", price: "" });
    };
  
    const handleDeleteBook = (id) => {
      setBooks(books.filter((book) => book.id !== id));
    };
  
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Manage Books</h1>
  
        {/* Add Book Form */}
        <div className="mb-6 p-4 bg-white shadow rounded">
          <h2 className="text-xl font-bold mb-4">Add New Book</h2>
          <input
            type="text"
            placeholder="Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            className="border border-gray-300 rounded p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            className="border border-gray-300 rounded p-2 w-full mb-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={newBook.price}
            onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
            className="border border-gray-300 rounded p-2 w-full mb-2"
          />
          <button
            onClick={handleAddBook}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add Book
          </button>
        </div>
  
        {/* Books List */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-bold mb-4">Books Inventory</h2>
          {books.map((book) => (
            <div
              key={book.id}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <p className="font-bold">{book.title}</p>
                <p className="text-gray-700">By: {book.author}</p>
                <p>${book.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => handleDeleteBook(book.id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }



export default ManageBook
