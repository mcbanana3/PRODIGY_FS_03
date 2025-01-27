import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ModalImage from "react-modal-image";

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [review, setReview] = useState({ rating: "", comment: "" });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setProduct(response.data);
        setReviews(response.data.reviews);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch product");
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, user may not be logged in.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/products/${id}/review`,
        review,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReviews([...reviews, response.data]);
      setReview({ rating: "", comment: "" });
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="product-detail container mx-auto p-6">
      {product && (
        <>
          <ModalImage
            small={product.image}
            large={product.image}
            alt={product.name}
            className="w-full h-96 object-cover mb-4"
          />
          <h2 className="text-4xl font-bold mb-4">{product.name}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-4">${product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
          >
            Add to Cart
          </button>

          <div className="reviews mt-8">
            <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
            {reviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet.</p>
            ) : (
              reviews.map((review, index) => (
                <div key={index} className="review border-t pt-4 mt-4">
                  <p className="font-semibold">
                    {review.user?.username ||
                      review.user?.email ||
                      "Unknown User"}
                  </p>
                  <p className="text-gray-600">{review.comment}</p>
                  <p className="text-yellow-500">
                    {Array(review.rating).fill("⭐")}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {new Date(review.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleReviewSubmit} className="mt-8">
            <h4 className="text-xl font-semibold mb-4">Write a Review</h4>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="rating">
                Rating
              </label>
              <select
                id="rating"
                className="w-full border rounded p-2"
                value={review.rating}
                onChange={(e) =>
                  setReview({ ...review, rating: e.target.value })
                }
                required
              >
                <option value="">Select Rating</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="comment">
                Comment
              </label>
              <textarea
                id="comment"
                className="w-full border rounded p-2"
                value={review.comment}
                onChange={(e) =>
                  setReview({ ...review, comment: e.target.value })
                }
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
            >
              Submit Review
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
