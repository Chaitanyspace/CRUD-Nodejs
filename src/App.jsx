// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import UploadForm from "./components/UploadForm";
import UploadList from "./components/UploadList";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Navbar */}
        <nav className="bg-blue-600 text-white p-4 shadow">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-semibold">🚚 TransLoad Secure Lite</h1>
            <div className="space-x-4">
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/upload" className="hover:underline">Upload</Link>
              <Link to="/uploads" className="hover:underline">My Uploads</Link>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-3xl p-6">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="text-center text-gray-700">
                    <h2 className="text-2xl font-semibold mb-2">
                      Welcome to TransLoad Secure Lite
                    </h2>
                    <p>
                      A secure file transfer app built with Node.js, MySQL, and AWS S3.
                    </p>
                    <p className="mt-4">
                      <Link
                        to="/login"
                        className="text-blue-600 hover:underline font-medium"
                      >
                        Login
                      </Link>{" "}
                      to get started.
                    </p>
                  </div>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/upload" element={<UploadForm />} />
              <Route path="/uploads" element={<UploadList />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 text-center py-3 text-sm text-gray-500">
          © {new Date().getFullYear()} TransLoad Secure Lite
        </footer>
      </div>
    </Router>
  );
}
