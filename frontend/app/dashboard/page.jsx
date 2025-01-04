"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [sellerId, setSellerId] = useState(null);
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

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
        }
      } catch (error) {
        console.log("Error fetching user details: " + error.message);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/orders/seller/${sellerId}`
        );
        const data = await response.json();
        console.log(data)
        // Extract useful information
        const totalOrders = data.orders?.length || 0;
        const totalRevenue = data.orders?.reduce(
          (acc, order) => acc + order.totalPrice,
          0
        ) || 0;
        const totalBooks = data.orders?.reduce(
          (acc, order) =>
            acc +
            order.orderItems.reduce((sum, item) => sum + item.quantity, 0),
          0
        ) || 0;

        setStats({
          totalBooks,
          totalOrders,
          totalRevenue,
        });
      } catch (error) {
        console.log("Error fetching admin stats:", error);
      }
    };

    fetchStats();
  }, [sellerId]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-600 text-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Total Books</h2>
          <p className="text-3xl">{stats.totalBooks}</p>
        </div>
        <div className="bg-green-600 text-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Total Orders</h2>
          <p className="text-3xl">{stats.totalOrders}</p>
        </div>
        <div className="bg-yellow-600 text-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Total Revenue</h2>
          <p className="text-3xl">${stats.totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-4">
        <Link
          href="/manage-order"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Manage Books
        </Link>
        <Link
          href="/manage-book"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
        >
          Manage Orders
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
