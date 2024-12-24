import React from "react";

const Footer = () => {
    return (
        <footer className="text-white bg-blue-700">
            <div className="container grid grid-cols-1 gap-8 px-4 py-8 mx-auto md:grid-cols-3">
                {/* About Section */}
                <div>
                    <h3 className="mb-4 text-xl font-bold">About QuillStacks</h3>
                    <p className="text-gray-200">
                        QuillStacks is a modern library management system designed to make
                        organizing and borrowing books effortless. Explore, borrow, and
                        enjoy the world of literature with ease.
                    </p>
                </div>

                {/* Navigation Links */}
                <div>
                    <h3 className="mb-4 text-xl font-bold">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <a href="/" className="hover:underline">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/all-books" className="hover:underline">
                                All Books
                            </a>
                        </li>
                        <li>
                            <a href="/add-book" className="hover:underline">
                                Add Book
                            </a>
                        </li>
                        <li>
                            <a href="/borrowed-books" className="hover:underline">
                                Borrowed Books
                            </a>
                        </li>
                        <li>
                            <a href="/login" className="hover:underline">
                                Log In
                            </a>
                        </li>
                        <li>
                            <a href="/register" className="hover:underline">
                                Register
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div>
                    <h3 className="mb-4 text-xl font-bold">Contact Us</h3>
                    <p className="text-gray-200">
                        For inquiries or support, reach out to us:
                    </p>
                    <p className="mt-2">
                        <span className="font-bold">Email:</span>{" "}
                        <a href="mailto:support@quillstacks.com" className="hover:underline">
                            support@quillstacks.com
                        </a>
                    </p>
                    <p>
                        <span className="font-bold">Phone:</span>{" "}
                        <a href="tel:+1234567890" className="hover:underline">
                            +1 234 567 890
                        </a>
                    </p>
                    <div className="flex mt-4 space-x-4">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-300"
                        >
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-300"
                        >
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-300"
                        >
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div className="py-4 mt-8 text-center text-gray-300 bg-blue-800">
                &copy; {new Date().getFullYear()} QuillStacks. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
