"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

const Header = () => {
  const [Cuser, setCUser] = useState(null); 
  const { user, setUser } = useUser();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/auth/verify", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setCUser(data.user);
          setUser(data.user);
        }
      } catch (error) {
        console.log("Error verifying user." + error.message);
      }
    };

    verifyUser();
  }, []);

  // Define navigation based on role
  const navigationLinks = {
    anonymous: [
      { href: "/", label: "Home" },
      { href: "/free-books", label: "Free Books" },
      { href: "/login", label: "Login" },
    ],
    user: [
      { href: "/", label: "Home" },
      { href: "/free-books", label: "Free Books" },
      { href: "/books", label: "Books" },
      { href: "/cart", label: "Cart" },
      { href: "/profile", label: "Profile" },
    ],
    admin: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/manage-book", label: "Manage Books" },
      { href: "/manage-order", label: "Manage Orders" },
      { href: "/profile", label: "Profile" },
    ],
  };

  // Determine the current navigation links
  const currentLinks =
    user?.role === "SELLER"
      ? navigationLinks.admin
      : user?.role === "CLIENT"
      ? navigationLinks.user
      : navigationLinks.anonymous;

  return (
    <header className="bg-gradient-to-r from-purple-950 via-purple-700 to-pink-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Branding/Logo */}
        <h1 className="text-2xl font-bold flex items-center space-x-2">
          <Link href="/" legacyBehavior>
            <a className="flex items-center space-x-2">
              <Image
                src="/AbrehotLogo.jpeg"
                alt="Abrehot Books"
                width={50}
                height={50}
                className="rounded-xl"
              />
              <span>Abrehot Books</span>
            </a>
          </Link>
        </h1>
        {/* Navigation Links */}
        <nav className="flex space-x-6">
          {currentLinks.map((link) => (
            <Link href={link.href} key={link.label} legacyBehavior>
              <a className="hover:text-yellow-300">{link.label}</a>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
