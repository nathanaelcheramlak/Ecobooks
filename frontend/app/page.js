import Link from "next/link";

export default function HomePage() {
  const featuredBooks = [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      image:
        "https://th.bing.com/th/id/OIP.Ya_wZbqpoMfLYpshpR12WAHaKa?rs=1&pid=ImgDetMain",
      category: "Classic",
    },
    {
      title: "1984",
      author: "George Orwell",
      image: "https://miro.medium.com/v2/resize:fit:625/0*1RTFlrLREY5zeO-I.jpg",
      category: "Dystopian",
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      image:
        "https://cdn11.bigcommerce.com/s-gibnfyxosi/images/stencil/2560w/products/114990/116752/51IXWZzlgSL__41945.1615559130.jpg?c=1",
      category: "Historical Fiction",
    },
    {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      image:
        "https://th.bing.com/th/id/R.c3908810d82aadad3e192aa30d2646e9?rik=6rH30k%2fgfq6bVA&pid=ImgRaw&r=0",
      category: "Coming of Age",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <header
        className="bg-cover bg-center text-white py-16"
        style={{
          backgroundImage:
            "url(https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <div className="container mx-auto text-center bg-black bg-opacity-50 p-8 rounded-lg">
          <h1 className="text-5xl font-extrabold mb-4">
            Welcome to Abrehot Books!
          </h1>
          <p className="text-xl mb-6">
            Discover the best books and download free books from our vast
            collection.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/books"
              className="bg-white text-blue-600 px-6 py-3 rounded-full shadow-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Explore Books
            </Link>
            <Link
              href="/free-books"
              className="bg-white text-blue-600 px-6 py-3 rounded-full shadow-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Free Books
            </Link>
          </div>
        </div>
      </header>

      {/* Featured Sections */}
      <main className="flex-grow p-2 bg-black opacity-90">
        <section
          className="mb-12 bg-cover bg-center w-full"
          style={{
            backgroundImage:
              "url(https://th.bing.com/th/id/OIP.gfcYEj75hne3MkNIJjkXpgHaEc?rs=1&pid=ImgDetMain)",
          }}
        >
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-200">
              Featured Books
            </h2>
            <p className="text-lg text-gray-300 mb-4">
              Check out our top picks for the month!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
              {featuredBooks.map((book, index) => (
                <div
                  key={index}
                  className="bg-gray-300 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 relative"
                >
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-80 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">{book.title}</h3>
                    <p className="text-gray-600 mb-2">{book.author}</p>
                    <span className="text-sm bg-blue-100 text-blue-600 py-1 px-2 rounded-full">
                      {book.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-100">Free Books</h2>
          <p className="text-lg text-gray-200 mb-4">
            Download free books from our API-powered collection!
          </p>
          <Link
            href="/free-books"
            className="text-blue-600 hover:underline text-lg"
          >
            View Free Books
          </Link>
        </section>
      </main>
    </div>
  );
}
