"use client";

import { use, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const ManageBook = () => {
  const [books, setBooks] = useState([]);
  const [sellerId, setSellerId] = useState("");

  const [newBook, setNewBook] = useState({
    image: null,
    title: "",
    author: "",
    description: "",
    price: "",
    quantity: "",
    genre: "",
  });

  const router = useRouter();

  // Fetch user details and orders
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/auth/verify", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setSellerId(data.user.id);
        } else {
          setSellerId(null);
          // router.push('/manage-book');
        }
      } catch (error) {
        console.log("Error fetching user details: " + error.message);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/books/seller/${sellerId}`);
        if (!response.ok) throw new Error("Failed to fetch books.");
        const data = await response.json();
        setBooks(data.books);
        console.log(data.books);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchBooks();
  }, [sellerId]);

  const handleAddBook = async () => {
    if (
      !newBook.title ||
      !newBook.author ||
      !newBook.price ||
      !newBook.quantity
    ) {
      return alert("Please fill all required fields");
    }
    console.log(newBook);
    const formData = new FormData();
    formData.append("image", newBook.image);
    formData.append("title", newBook.title);
    formData.append("author", newBook.author);
    formData.append("description", newBook.description);
    formData.append("price", newBook.price);
    formData.append("quantity", newBook.quantity);
    formData.append("genre", newBook.genre);
    formData.append("sellerId", sellerId);

    console.log(formData)
    try {
      const response = await fetch("http://localhost:8080/api/v1/books", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("Failed to add book");
        toast.error("Failed to add book.");
        setTimeout(() => {}, 1500);
      }

      const addedBook = await response.json();
      setBooks([...books, addedBook]);
      setNewBook({
        image: null,
        title: "",
        author: "",
        description: "",
        price: "",
        quantity: "",
        genre: "",
      });
      toast.success("Book added successfully!");
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Failed to add book. Catch");
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/books/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Book deleted successfully.");
        setBooks(books.filter((book) => book.id !== id));
        setTimeout(() => {}, 1500);
      }
    } catch (error) {
      console.log("Error deleting book: " + error.message);
      toast.error("Failed to delete book: " + error.message);
      setTimeout(() => {}, 1500);
    }
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
        <textarea
          placeholder="Description"
          value={newBook.description}
          onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
          className="border border-gray-300 rounded p-2 w-full mb-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newBook.price}
          onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
          className="border border-gray-300 rounded p-2 w-full mb-2"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newBook.quantity}
          onChange={(e) => setNewBook({ ...newBook, quantity: e.target.value })}
          className="border border-gray-300 rounded p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Genre"
          value={newBook.genre}
          onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
          className="border border-gray-300 rounded p-2 w-full mb-2"
        />
        <input
          type="file"
          onChange={(e) =>
            setNewBook({ ...newBook, image: e.target.files[0] })
          }
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
              <p>${book.price}</p>
              <p>Quantity: {book.quantity}</p>
              <p>Genre: {book.genre}</p>
              <p>Description: {book.description}</p>
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
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
};

export default ManageBook;
