import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext/AuthProvider";
import { DarkModeContext } from "../components/DarkModeContext";
import { signOut } from "firebase/auth";
import auth from "../firebase/firebase.init";

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const { darkMode, setDarkMode } = useContext(DarkModeContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout failed: ", error.message);
        }
    };

    return (
        <div className="bg-[#003366] shadow-md top-0 left-0 right-0 fixed z-10">
            <nav>
                <div className="max-w-[1250px] mx-auto flex items-center justify-between py-2 px-4 md:px-6 lg:px-8 xl:px-0">
                    {/* Logo */}
                    <div className="text-4xl font-extrabold text-white">
                        <Link to="/">
                            <img src="/logo-updated_enhanced.png" alt="Logo" className="w-40" />
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    {/* Mobile Menu Toggle */}
                    <div className="block lg:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white dark:text-gray-300">
                            {isOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Navigation Links (Desktop) */}
                    <div className="items-center hidden space-x-8 text-lg font-semibold lg:flex">
                        <Link to="/" className="text-white dark:text-gray-300 hover:text-gray-300 dark:hover:text-gray-400">Home</Link>
                        <Link to="/all-books" className="text-white dark:text-gray-300 hover:text-gray-300 dark:hover:text-gray-400">All Books</Link>
                        <Link to="/add-book" className="text-white dark:text-gray-300 hover:text-gray-300 dark:hover:text-gray-400">Add Book</Link>
                        <Link to="/borrowed-books" className="text-white dark:text-gray-300 hover:text-gray-300 dark:hover:text-gray-400">Borrowed Books</Link>
                        <Link to="/reviews" className="text-white dark:text-gray-300 hover:text-gray-300 dark:hover:text-gray-400">Users Review</Link>

                        {/* Dark Mode Toggle */}
                        <button onClick={() => setDarkMode(!darkMode)} className="text-white dark:text-gray-300">
                            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                        </button>

                        {/* Authentication Links */}
                        {!user ? (
                            <>
                                <Link to="/login" className="text-white dark:text-gray-300 hover:text-gray-300 dark:hover:text-gray-400">Log In</Link>
                                <Link to="/register" className="text-white dark:text-gray-300 hover:text-gray-300 dark:hover:text-gray-400">Register</Link>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                {/* User Avatar */}
                                <div className="relative group">
                                    <img
                                        src={user.photoURL}
                                        alt="User Avatar"
                                        className="w-10 h-10 rounded-full cursor-pointer"
                                    />
                                    <div className="absolute left-0 hidden p-2 text-sm text-white bg-black rounded-md group-hover:block">
                                        {user.displayName}
                                    </div>
                                </div>
                                {/* Logout Button */}
                                <button onClick={handleLogout} className="text-white dark:text-gray-300 hover:text-gray-300 dark:hover:text-gray-400">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="lg:hidden text-white dark:text-gray-300 bg-[#003366] dark:bg-gray-900 py-2">
                        <Link to="/" className="block px-4 py-2 hover:text-gray-300 dark:hover:text-gray-400" onClick={() => setIsOpen(false)}>Home</Link>
                        <Link to="/all-books" className="block px-4 py-2 hover:text-gray-300 dark:hover:text-gray-400" onClick={() => setIsOpen(false)}>All Books</Link>
                        <Link to="/add-book" className="block px-4 py-2 hover:text-gray-300 dark:hover:text-gray-400" onClick={() => setIsOpen(false)}>Add Book</Link>
                        <Link to="/borrowed-books" className="block px-4 py-2 hover:text-gray-300 dark:hover:text-gray-400" onClick={() => setIsOpen(false)}>Borrowed Books</Link>
                        <Link to="/reviews" className="block px-4 py-2 hover:text-gray-300 dark:hover:text-gray-400" onClick={() => setIsOpen(false)}>Users Review</Link>

                        {/* Dark Mode Toggle for Mobile */}
                        <button onClick={() => { setDarkMode(!darkMode); setIsOpen(false); }} className="block px-4 py-2 hover:text-gray-300 dark:hover:text-gray-400">
                            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                        </button>

                        {/* Authentication Links for Mobile */}
                        {!user ? (
                            <>
                                <Link to="/login" className="block px-4 py-2 hover:text-gray-300 dark:hover:text-gray-400" onClick={() => setIsOpen(false)}>Log In</Link>
                                <Link to="/register" className="block px-4 py-2 hover:text-gray-300 dark:hover:text-gray-400" onClick={() => setIsOpen(false)}>Register</Link>
                            </>
                        ) : (
                            <div className="flex flex-col items-start px-4 py-2">
                                <div className="relative group">
                                    <img src={user.photoURL} alt="User Avatar" className="w-10 h-10 rounded-full cursor-pointer" />
                                    <div className="absolute left-0 hidden p-2 text-sm text-white bg-black rounded-md group-hover:block">
                                        {user.displayName}
                                    </div>
                                </div>
                                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block px-4 py-2 hover:text-gray-300 dark:hover:text-gray-400">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                )}
            </nav>
        </div>
    );
};

export default Navbar;
