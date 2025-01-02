'use client'
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from "react-toastify";

const ManageOrder = () => {
    const [seller, setSeller] = useState(null);
    const [orders, setOrders] = useState([]);

    // Fetch user details and orders
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/v1/auth/verify", {
            credentials: "include",
          });
          if (response.ok) {
            const data = await response.json();
            setSeller(data.user.id);
          } else {
            setSeller(null);
            // router.push('/manage-book');
          }
        } catch (error) {
          console.log("Error fetching user details: " + error.message);
        }
      };

      fetchUser();
    }, []);

    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/v1/orders/seller/${seller}`);
          if (!response.ok) {
            console.log("Failed to fetch orders.");
            toast.error("An error occurred while fetching orders. Refresh the page.");
          }
          const data = await response.json();
          setOrders(data.orders);
          console.log(data.orders);
          setTimeout(() => {}, 1500);
        } catch (error) {
          console.log("An error occurred while fetching orders: ", error);
          toast.error("An error occurred while fetching orders. Refresh the page.");
        }
      }

      fetchOrders();
    }, [seller]);
  
    const updateOrderStatus = async (id, status) => {
      status = status.toUpperCase();
      console.log(status);
      try {
        const response = await fetch(`http://localhost:8080/api/v1/orders/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status }),
        });
        if (!response.ok) {
          console.log("Failed to update order status." + response.status);
          toast.error("An error occurred while updating order status.");
          return;
        }
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === id ? { ...order, status } : order
          )
        );
        setTimeout(() => {}, 1500);
      } catch (error) {
        console.log("Error updating order status: ", error);
        toast.error("An error occurred while updating order status  " + error.message);
      }     
    };
  
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
  
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-bold mb-4">Orders List</h2>
          {orders ? (orders.map((order) => (
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
                <strong>Total:</strong> ${order.totalPrice}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              { order.status !== 'COMPLETED' && (
              <div className="flex space-x-4 mt-2">
                <button
                  onClick={() => updateOrderStatus(order.id, "SHIPPING")}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Mark as Shipped
                </button>
                <button
                  onClick={() => updateOrderStatus(order.id, "COMPLETED")}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Mark as Delivered
                </button>
              </div>
              )}
            </div>
          ))) : (
            <p>No orders available.</p>
          )}
        </div>
        <ToastContainer position="bottom-right" autoClose={2000} />
      </div>
    );
  }


export default ManageOrder
