'use client'
import Link from "next/link";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    // Simulate fetching admin stats (replace with API call later)
    const fetchStats = async () => {
      const placeholderStats = {
        totalBooks: 120,
        totalOrders: 45,
        totalRevenue: 899.99,
      };
      setStats(placeholderStats);
    };

    fetchStats();
  }, []);

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
          href="/admin/books"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Manage Books
        </Link>
        <Link
          href="/admin/orders"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
        >
          Manage Orders
        </Link>
      </div>
    </div>
  );

}

export default Dashboard;