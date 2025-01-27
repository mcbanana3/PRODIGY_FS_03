import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser, cart }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const handleCategoryMouseEnter = () => {
    setIsCategoryOpen(true);
  };

  const handleCategoryMouseLeave = () => {
    setIsCategoryOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <nav className="bg-gray-900 p-4 shadow-lg text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold tracking-wide">
          <Link to="/" className="hover:text-gray-400">
            Bhayya Store
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500 transition duration-300 text-white"
            >
              Search
            </button>
          </form>
          <div
            className="relative"
            onMouseEnter={handleCategoryMouseEnter}
            onMouseLeave={handleCategoryMouseLeave}
          >
            <button className="bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 text-white">
              Categories
            </button>
            {isCategoryOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                <Link
                  to="/category/helmets"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Helmets
                </Link>
                <Link
                  to="/category/SuperSports"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  SuperSports
                </Link>
                <Link
                  to="/category/Streetfighter"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Streetfighter
                </Link>
                <Link
                  to="/category/Track-Bike"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Track-Bike
                </Link>
              </div>
            )}
          </div>
          <Link
            to="/cart"
            className="relative px-4 py-2 bg-yellow-600 rounded-md hover:bg-yellow-500 transition duration-300 text-white"
          >
            Cart ({cart.length})
          </Link>
          {user ? (
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 text-white">
                {user.username}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                  {user.role === "admin" && (
                    <Link
                      to="/admin-dashboard"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    User Profile
                  </Link>
                  <Link
                    to="/order-history"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Order History
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500 transition duration-300 text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-500 transition duration-300 text-white"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
