import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="text-white bg-[#003366] pt-8">
            <div className="mx-auto  max-w-[1250px] px-4 md:px-6 lg:px-8 xl:px-0">
                <div className="container grid justify-between grid-cols-1 gap-8 md:grid-cols-3">
                    {/* About Section */}
                    <div>
                        <h3 className="text-xl font-bold">About QuillStacks</h3>
                        <p className="text-gray-200">
                            QuillStacks is a modern library management system designed to make
                            organizing and borrowing books effortless. Explore, borrow, and
                            enjoy the world of literature with ease.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h3 className="text-xl font-bold">Quick Links</h3>
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
                        <h3 className="space-y-2 text-xl font-bold">Contact Us</h3>
                        <p className="text-gray-200">
                            For inquiries or support, reach out to us:
                        </p>
                        <p>
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
                        <div className="flex py-2 space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebook className="text-xl text-white hover:text-blue-300" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaTwitter className="text-xl text-white hover:text-blue-300" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="text-xl text-white hover:text-blue-300" />
                            </a>
                        </div>
                    </div>
                </div>
                <hr className="my-4" />
                <div className="py-2 text-center text-gray-300">
                    &copy; {new Date().getFullYear()} QuillStacks. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
