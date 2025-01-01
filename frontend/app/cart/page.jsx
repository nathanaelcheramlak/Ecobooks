'use client'
import { useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      price: 10.99,
      quantity: 1,
    },
    {
      id: 2,
      title: "1984",
      price: 9.99,
      quantity: 2,
    },
  ]);

  // Update quantity
  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {/* Cart Items */}
      {cartItems.length > 0 ? (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-gray-700">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                  className="border border-gray-300 rounded p-2 w-16 text-center"
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}

      {/* Total Price */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
      </div>
      <div className="mt-8">
        {/* <h2 className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</h2> */}
        <button
          onClick={() => (window.location.href = "/checkout")} // Redirect to Checkout Page
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-4"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}


export default Cart;
>>>>>>> fee0c9d70952ffdc047e5ea9c9ec54c4858c06ce
