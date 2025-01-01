"use client";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBook,
  faShoppingCart,
  faUser,
  faTachometerAlt,
  faBookOpen,
  faClipboardList,
  faBookOpenReader,
} from "@fortawesome/free-solid-svg-icons";
import "tailwindcss/tailwind.css";
import { useEffect, useState } from "react";

const Header = () => {
  const [user, setUser] = useState(null); 
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/auth/verify', {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          console.log(data.user);
        }
      } catch (error) {
        console.log("Error verifying user." + error.message);
      }
    }

    verifyUser();
  }, [])

  // Define navigation based on role
  const navigationLinks = {
    anonymous: [
      { href: "/", label: "Home", icon: faHome },
      { href: "/free-books", label: "Free Books", icon: faBookOpenReader },
      { href: "/login", label: "Login", icon: faUser },
    ],
    user: [
      { href: "/", label: "Home", icon: faHome },
      { href: "/free-books", label: "Free Books", icon: faBookOpenReader },
      { href: "/books", label: "Books", icon: faBook },
      { href: "/cart", label: "Cart", icon: faShoppingCart },
      { href: "/profile", label: "Profile", icon: faUser },
    ],
    admin: [
      { href: "/dashboard", label: "Dashboard", icon: faTachometerAlt },
      { href: "/manage-book", label: "Manage Books", icon: faBookOpen },
      { href: "/manage-order", label: "Manage Orders", icon: faClipboardList },
      { href: "/profile", label: "Profile", icon: faUser },
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
              <a className="hover:text-yellow-300 flex items-center space-x-2">
                <FontAwesomeIcon icon={link.icon} />
                <span>{link.label}</span>
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
