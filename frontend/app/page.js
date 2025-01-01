import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <header className="bg-blue-600 text-white py-16">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to Abrehot Books!
            </h1>
            <p className="text-lg mb-6">
              Discover the best books and download free books from our vast
              collection.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/books"
                className="bg-white text-blue-600 px-6 py-3 rounded shadow font-semibold"
              >
                Explore Books
              </Link>
              <Link
                href="/free-books"
                className="bg-white text-blue-600 px-6 py-3 rounded shadow font-semibold"
              >
                Free Books
              </Link>
            </div>
          </div>
        </header>

        {/* Featured Sections */}
        <main className="container mx-auto flex-grow p-8">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Featured Books</h2>
            <p>Check out our top picks for the month!</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
              {/* Placeholder for Featured Books */}
              <div className="bg-white shadow rounded p-4">
                <h3 className="font-bold text-lg">Book Title</h3>
                <p>Author Name</p>
              </div>
              <div className="bg-white shadow rounded p-4">
                <h3 className="font-bold text-lg">Book Title</h3>
                <p>Author Name</p>
              </div>
              {/* Add more featured books here */}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Free Books</h2>
            <p>Download free books from our API-powered collection!</p>
            <Link href="/free-books" className="text-blue-600 hover:underline">
              View Free Books
            </Link>
          </section>
        </main>
      </div>
    </>
  );
}
