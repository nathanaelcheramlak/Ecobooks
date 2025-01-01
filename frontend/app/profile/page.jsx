"use client";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function ProfilePage() {
  const [userDetails, setUserDetails] = useState({});
  const [userOrders, setUserOrders] = useState([]);
  const [editing, setEditing] = useState(false);

  // Fetch user details and orders
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/auth/verify", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUserDetails(data.user);
        } else {
          setUserDetails(null);
        }
      } catch (error) {
        console.error("Error fetching user details: " + error.message);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userDetails.id) {
      const fetchOrders = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/v1/orders/client/${userDetails.id}`, {
            credentials: "include",
          });
          if (response.ok) {
            const data = await response.json();
            setUserOrders(data.orders);
          }
        } catch (error) {
          console.error("Error fetching user orders: " + error.message);
        }
      };

      fetchOrders();
    }
  }, [userDetails.id]);

  // Handle profile edit input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Save updated profile details
  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/users/${userDetails.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
      if (response.ok) {
        toast.success("Profile updated successfully.");
      }
    } catch (error) {
      console.error("Error updating user profile: " + error.message);
      toast.error("Failed to update profile: " + error.message);
    }
    setEditing(false);
  };

  // Handle order cancellation
  const handleCancelOrder = (id) => {
    if (confirm("Are you sure you want to cancel this order?")) {
      setUserOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
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
              value={userDetails.name || ""}
              onChange={handleInputChange}
              placeholder="Name"
              className="w-full border border-gray-300 rounded p-2"
            />
            <input
              type="email"
              name="email"
              value={userDetails.email || ""}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full border border-gray-300 rounded p-2"
            />
            <input
              type="text"
              name="phoneNumber"
              value={userDetails.phoneNumber || ""}
              onChange={handleInputChange}
              placeholder="Phone Number"
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
              <strong>Phone Number:</strong> {userDetails.phoneNumber}
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
        {userOrders && userOrders.length > 0 ? (
          <div className="space-y-4">
            {userOrders.map((order) => (
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
                  <strong>Items:</strong>
                  <ul className="list-disc ml-4">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.title} (x{item.quantity})
                      </li>
                    ))}
                  </ul>
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
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
}
