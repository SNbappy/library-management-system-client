import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../firebase/firebase.init";

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout failed: ", error.message);
        }
    };

    return (
        <nav className="p-4 bg-blue-600 shadow-md">
            <div className="container flex items-center justify-between mx-auto">
                <div className="text-2xl font-semibold text-white">
                    <Link to="/">QuillStacks</Link>
                </div>

                {/* Hamburger Menu for Mobile */}
                <div className="block lg:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>

                {/* Navbar Links */}
                <div
                    className={`lg:flex items-center space-x-6 ${isOpen ? "block" : "hidden"} lg:block`}
                >
                    {/* Home Link */}
                    <Link to="/" className="text-white hover:text-gray-300">
                        Home
                    </Link>

                    {/* Protected Routes */}
                    <Link to="/all-books" className="text-white hover:text-gray-300">
                        All Books
                    </Link>
                    <Link to="/add-book" className="text-white hover:text-gray-300">
                        Add Book
                    </Link>
                    <Link to="/borrowed-books" className="text-white hover:text-gray-300">
                        Borrowed Books
                    </Link>
                    {/* Conditional Login/Register */}
                    {!user ? (
                        <>
                            <Link to="/login" className="text-white hover:text-gray-300">
                                Log In
                            </Link>
                            <Link to="/register" className="text-white hover:text-gray-300">
                                Register
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center space-x-4">
                            {/* User Profile */}
                            <div className="relative group">
                                <img
                                    src={user.photoURL}
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full cursor-pointer"
                                />
                                <div className="absolute left-0 hidden p-2 mt-2 text-sm text-white bg-black rounded-md group-hover:block">
                                    {user.displayName}
                                </div>
                            </div>

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="text-white hover:text-gray-300"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu (visible on mobile devices) */}
            {isOpen && (
                <div className="mt-4 space-y-4 text-white lg:hidden">
                    <Link to="/" className="block hover:text-gray-300">
                        Home
                    </Link>
                    {user && (
                        <>
                            <Link to="/all-books" className="block hover:text-gray-300">
                                All Books
                            </Link>
                            <Link to="/add-book" className="block hover:text-gray-300">
                                Add Book
                            </Link>
                            <Link to="/borrowed-books" className="block hover:text-gray-300">
                                Borrowed Books
                            </Link>
                        </>
                    )}
                    {!user ? (
                        <>
                            <Link to="/login" className="block hover:text-gray-300">
                                Log In
                            </Link>
                            <Link to="/register" className="block hover:text-gray-300">
                                Register
                            </Link>
                        </>
                    ) : (
                        <div className="flex flex-col items-start space-y-4">
                            <div className="relative group">
                                <img
                                    src={user.photoURL}
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full cursor-pointer"
                                />
                                <div className="absolute left-0 hidden p-2 mt-2 text-sm text-white bg-black rounded-md group-hover:block">
                                    {user.displayName}
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="block text-white hover:text-gray-300"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
