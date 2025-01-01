"use client";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [orders, setOrders] = useState([
    {
      id: 1,
      date: "2023-12-20",
      total: 29.97,
      items: [
        { title: "The Great Gatsby", quantity: 1 },
        { title: "1984", quantity: 2 },
      ],
    },
    {
      id: 2,
      date: "2023-12-18",
      total: 10.99,
      items: [{ title: "To Kill a Mockingbird", quantity: 1 }],
    },
  ]);

  const [editing, setEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState(userDetails);

  useEffect(() => {
    // Fetch user details from the endpoint
    fetch("http://localhost:8080/api/v1/auth/verify")
      .then((response) => response.json())
      .then((data) => {
        setUserDetails(data);
        setEditedDetails(data);
      })
      .catch((error) => console.error("Error fetching user details:", error));
  }, []);

  // Handle profile edit input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Save updated profile details
  const handleSave = () => {
    setUserDetails(editedDetails);
    setEditing(false);
  };

  // Handle order cancellation
  const handleCancelOrder = (id) => {
    if (confirm("Are you sure you want to cancel this order?")) {
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
      alert(`Order ${id} has been canceled.`);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      {/* Profile Section */}
      <div className="bg-white shadow-md rounded p-4 mb-8">
        <h2 className="text-2xl font-bold mb-4">User Details</h2>
        {editing ? (
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={editedDetails.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="w-full border border-gray-300 rounded p-2"
            />
            <input
              type="email"
              name="email"
              value={editedDetails.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full border border-gray-300 rounded p-2"
            />
            <input
              type="text"
              name="address"
              value={editedDetails.address}
              onChange={handleInputChange}
              placeholder="Address"
              className="w-full border border-gray-300 rounded p-2"
            />
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            <p>
              <strong>Name:</strong> {userDetails.name}
            </p>
            <p>
              <strong>Email:</strong> {userDetails.email}
            </p>
            <p>
              <strong>Address:</strong> {userDetails.address}
            </p>
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-4"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {/* Order History */}
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-2xl font-bold mb-4">Order History</h2>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-300 rounded p-4 flex justify-between items-start"
              >
                <div>
                  <p>
                    <strong>Order ID:</strong> {order.id}
                  </p>
                  <p>
                    <strong>Date:</strong> {order.date}
                  </p>
                  <p>
                    <strong>Total:</strong> ${order.total.toFixed(2)}
                  </p>
                  <p>
                    <strong>Items:</strong>
                    <ul className="list-disc ml-4">
                      {order.items.map((item, index) => (
                        <li key={index}>
                          {item.title} (x{item.quantity})
                        </li>
                      ))}
                    </ul>
                  </p>
                </div>
                <button
                  onClick={() => handleCancelOrder(order.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Cancel Order
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
}
