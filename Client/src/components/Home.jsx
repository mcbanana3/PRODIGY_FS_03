import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header/Header";
import NewsletterSubscribe from "./Newsletter/NewsletterSubscribe";
import ProductCard from "./ProductCard/ProductCard";

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://prodigy-fs-03-htv9.onrender.com/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto p-6 flex-grow">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-extrabold mb-4 text-blue-700">
            Welcome to Bhayya Store
          </h1>
          <p className="text-2xl text-gray-700">
            Your one-stop shop for all your needs
          </p>
        </header>

        <section id="products" className="mb-16">
          <h2 className="text-4xl font-semibold mb-8 text-gray-800">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        </section>

        <NewsletterSubscribe />

        {/* <div className="mt-12 text-center">
          <Link to="/support" className="text-blue-700 underline">
            Need Help? Submit a Support Ticket
          </Link>
        </div> */}
      </main>
    </div>
  );
};

export default Home;
