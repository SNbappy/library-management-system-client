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
        <div className="bg-[#003366] bg-opacity-100 shadow-md top-0 left-0 right-0 fixed z-10">
            <nav>
                <div className="max-w-[1250px] mx-auto flex items-center justify-between py-2 px-4 md:px-6 lg:px-8 xl:px-0">
                    <div className="text-4xl font-extrabold text-white">
                        <Link to="/"><img src="/src/assets/logo-updated_enhanced.png" alt="" className="w-40" /></Link>
                    </div>
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

                    <div className={`lg:flex items-center space-x-8 ${isOpen ? "block" : "hidden"} lg:block text-lg font-semibold`}>
                        <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                        <Link to="/all-books" className="text-white hover:text-gray-300">All Books</Link>
                        <Link to="/add-book" className="text-white hover:text-gray-300">Add Book</Link>
                        <Link to="/borrowed-books" className="text-white hover:text-gray-300">Borrowed Books</Link>
                        {!user ? (
                            <>
                                <Link to="/login" className="text-white hover:text-gray-300">Log In</Link>
                                <Link to="/register" className="text-white hover:text-gray-300">Register</Link>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
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

                {isOpen && (
                    <div className="text-white lg:hidden">
                        <Link to="/" className="block hover:text-gray-300">Home</Link>
                        {user && (
                            <>
                                <Link to="/all-books" className="block hover:text-gray-300">All Books</Link>
                                <Link to="/add-book" className="block hover:text-gray-300">Add Book</Link>
                                <Link to="/borrowed-books" className="block hover:text-gray-300">Borrowed Books</Link>
                            </>
                        )}
                        {!user ? (
                            <>
                                <Link to="/login" className="block hover:text-gray-300">Log In</Link>
                                <Link to="/register" className="block hover:text-gray-300">Register</Link>
                            </>
                        ) : (
                            <div className="flex flex-col items-start">
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
        </div>
    );
};

export default Navbar;