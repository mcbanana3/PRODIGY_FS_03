import React, { useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import AdminSettings from "../Settings/AdminSettings";
import UploadProduct from "../Product/UploadProduct";
import ManageProducts from "../Product/ManageProducts";
import EditProduct from "../Product/EditProduct";
import ManageTickets from "../Support/ManageTickets";

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-purple-200 to-blue-200">
      <aside className="bg-blue-500 text-white w-64 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center">Bhayya Store</h1>
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <Link
                to="/admin-dashboard"
                className="block py-2 px-4 rounded hover:bg-blue-600"
              >
                Dashboard
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/admin-dashboard/products"
                className="block py-2 px-4 rounded hover:bg-blue-600"
              >
                Manage Products
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/admin-dashboard/upload-product"
                className="block py-2 px-4 rounded hover:bg-blue-600"
              >
                Upload Product
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/admin-dashboard/tickets"
                className="block py-2 px-4 rounded hover:bg-blue-600"
              >
                Manage Tickets
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/admin-dashboard/settings"
                className="block py-2 px-4 rounded hover:bg-blue-600"
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-10">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h1 className="text-3xl font-bold mb-4">Welcome, Admin</h1>
                  <div
                    className="bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-4 py-3 shadow-md mb-6"
                    role="alert"
                  >
                    <div className="flex items-center">
                      <svg
                        className="w-6 h-6 text-blue-500 mr-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.999 6.999a1 1 0 112 0 1 1 0 01-2 0zM10 13a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <p className="font-bold">Admin Tip of the Day</p>
                        <p className="text-sm">
                          Remember to check the new product uploads regularly to
                          ensure they meet our quality standards.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="/settings" element={<AdminSettings />} />
            <Route path="/upload-product" element={<UploadProduct />} />
            <Route path="/products" element={<ManageProducts />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/tickets" element={<ManageTickets />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
