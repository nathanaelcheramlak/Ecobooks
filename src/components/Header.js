import Link from "next/link";
import Image from "next/image";
import { useUser } from "../context/UserContext"; // Import user context for role-based logic
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

const Header = () => {
  const { user } = useUser(); // Access the user's role (e.g., "admin" or "user")

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
              />
              <span>Abrehot Books</span>
            </a>
          </Link>
        </h1>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          {/* Links for All Users */}
          <Link href="/" legacyBehavior>
            <a className="hover:text-yellow-300 flex items-center space-x-2">
              <FontAwesomeIcon icon={faHome} />
              <span>Home</span>
            </a>
          </Link>
          <Link href="/books" legacyBehavior>
            <a className="hover:text-yellow-300 flex items-center space-x-2">
              <FontAwesomeIcon icon={faBook} />
              <span>Books</span>
            </a>
          </Link>

          <Link href="/" legacyBehavior>
            <a className="hover:text-yellow-300 flex items-center space-x-2">
              <FontAwesomeIcon icon={faHome} />
              <span>Free Books</span>
            </a>
          </Link>

          {/* Links for Regular Users */}
          {user.role === "user" && (
            <>
              <Link href="/cart" legacyBehavior>
                <a className="hover:text-yellow-300 flex items-center space-x-2">
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <span>Cart</span>
                </a>
              </Link>
              <Link href="/profile" legacyBehavior>
                <a className="hover:text-yellow-300 flex items-center space-x-2">
                  <FontAwesomeIcon icon={faUser} />
                  <span>Profile</span>
                </a>
              </Link>
            </>
          )}

          {/* Links for Admins */}
          {user.role === "admin" && (
            <>
              <Link href="/admin" legacyBehavior>
                <a className="hover:text-yellow-300 flex items-center space-x-2">
                  <FontAwesomeIcon icon={faTachometerAlt} />
                  <span>Dashboard</span>
                </a>
              </Link>
              <Link href="/admin/books" legacyBehavior>
                <a className="hover:text-yellow-300 flex items-center space-x-2">
                  <FontAwesomeIcon icon={faBookOpen} />
                  <span>Manage Books</span>
                </a>
              </Link>
              <Link href="/admin/orders" legacyBehavior>
                <a className="hover:text-yellow-300 flex items-center space-x-2">
                  <FontAwesomeIcon icon={faClipboardList} />
                  <span>Manage Orders</span>
                </a>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
