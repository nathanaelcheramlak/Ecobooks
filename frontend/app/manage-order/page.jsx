'use client'
import { useState } from 'react'

const ManageOrder = () => {
    const [orders, setOrders] = useState([
      {
        id: 1,
        customer: "John Doe",
        date: "2023-12-20",
        total: 29.97,
        status: "Pending",
      },
      {
        id: 2,
        customer: "Jane Smith",
        date: "2023-12-18",
        total: 10.99,
        status: "Shipped",
      },
    ]);
  
    const updateOrderStatus = (id, status) => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status } : order
        )
      );
    };
  
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
  
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-bold mb-4">Orders List</h2>
          {orders.map((order) => (
            <div key={order.id} className="border-b py-4">
              <p>
                <strong>Order ID:</strong> {order.id}
              </p>
              <p>
                <strong>Customer:</strong> {order.customer}
              </p>
              <p>
                <strong>Date:</strong> {order.date}
              </p>
              <p>
                <strong>Total:</strong> ${order.total.toFixed(2)}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <div className="flex space-x-4 mt-2">
                <button
                  onClick={() => updateOrderStatus(order.id, "Shipped")}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Mark as Shipped
                </button>
                <button
                  onClick={() => updateOrderStatus(order.id, "Delivered")}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Mark as Delivered
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }


export default ManageOrder
