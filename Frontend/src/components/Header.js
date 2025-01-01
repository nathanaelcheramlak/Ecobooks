import Link from 'next/link';
import Image from "next/image";
import { useUser } from '../context/UserContext'; // Import user context for role-based logic

const Header = () => {
  const { user } = useUser(); // Access the user's role (e.g., "admin" or "user")

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Branding/Logo */}
        <h1 className="text-xl font-bold">
         
          <Link href="/">
          <Image src="/AbrehotLogo.jpeg" 
           alt="Abrehot Books" width={50}  height={50} />
          Abrehot Books
          </Link>
        </h1>

        {/* Navigation Links */}
        <nav className="flex space-x-4">
          {/* Links for All Users */}
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/books" className="hover:underline">
            Books
          </Link>

          {/* Links for Regular Users */}
          {user.role === 'user' && (
            <>
              <Link href="/cart" className="hover:underline">
                Cart
              </Link>
              <Link href="/profile" className="hover:underline">
                Profile
              </Link>
            </>
          )}

          {/* Links for Admins */}
          {user.role === 'admin' && (
            <>
              <Link href="/admin" className="hover:underline">
                Dashboard
              </Link>
              <Link href="/admin/books" className="hover:underline">
                Manage Books
              </Link>
              <Link href="/admin/orders" className="hover:underline">
                Manage Orders
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
