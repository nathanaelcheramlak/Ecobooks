const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Abrehot Books. All rights reserved.
          </p>
          <p className="text-sm">Built with ❤️ using Next.js and Tailwind CSS.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;