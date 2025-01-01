"use client";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faTwitter,
  faFacebook,
} from "@fortawesome/free-solid-svg-icons";
import "tailwindcss/tailwind.css";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 shadow-lg mt-10 relative bottom-0">
      <div className="container mx-auto flex justify-between items-center">
        {/* Branding/Logo and Description */}
        <div className="flex items-center space-x-2">
          <Image
            src="/AbrehotLogo.jpeg"
            alt="Abrehot Books"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="text-left">
            <span className="text-xl font-bold">Abrehot Books</span>
            <p className="text-sm mt-2">
              Discover a world of books at Abrehot Books. <br />
              From bestsellers to timeless classics, we offer a wide range of
              titles to suit every reader.
              <br />
              Enjoy a seamless browsing and purchasing experience, and join our
              community of book lovers today!
            </p>
          </div>
        </div>
        {/* Social Media Links */}
        <div className="flex space-x-4">
          <Link
            href="https://github.com/nathanaelcheramlak/Ecobooks"
            legacyBehavior
          >
            <a className="hover:text-yellow-300 flex items-center space-x-2">
              <FontAwesomeIcon icon={faGithub} />
              <span>GitHub</span>
            </a>
          </Link>
          <Link href="https://twitter.com/yididiabera" legacyBehavior>
            <a className="hover:text-yellow-300 flex items-center space-x-2">
              <FontAwesomeIcon icon={faTwitter} />
              <span>Twitter</span>
            </a>
          </Link>
          <Link href="https://facebook.com/your-facebook" legacyBehavior>
            <a className="hover:text-yellow-300 flex items-center space-x-2">
              <FontAwesomeIcon icon={faFacebook} />
              <span>Facebook</span>
            </a>
          </Link>
        </div>
      </div>
      <div className="container mx-auto mt-4 text-center">
        <p className="text-sm mt-2">
          &copy; {new Date().getFullYear()} Abrehot Books. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
