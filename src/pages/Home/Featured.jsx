import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { ScaleLoader } from "react-spinners";
import { Button } from "@mui/material";

const Featured = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Home";
        setLoading(true);
        const fetchBooks = async () => {
            try {
                const response = await fetch("https://library-management-system-server-eta.vercel.app/books");
                const data = await response.json();
                const booksData = data.data || [];
                setBooks(booksData.slice(-4)); // Get the latest 4 books
            } catch (error) {
                console.error("Error fetching books:", error.message);
            } finally {
                setTimeout(() => setLoading(false), 1500);
            }
        };
        fetchBooks();
    }, []);

    return (
        <div className="max-w-[1250px] mx-auto px-4 md:px-6 lg:px-8 xl:px-0">
            <h2 className="text-4xl font-extrabold text-center text-[#003366] pb-5 dark:text-blue-400">
                Latest Books
            </h2>
            <p className="mb-10 text-lg font-medium text-center">
                Discover a world of stories! Explore diverse book categories and find your next great read.
            </p>
            {loading ? (
                <div className="flex items-center justify-center h-96">
                    <ScaleLoader
                        color={document.documentElement.classList.contains("dark") ? "#60A5FA" : "#003366"}
                        loading={loading}
                        size={100}
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {books.map((book) => (
                        <div key={book._id} className="flex flex-col h-full overflow-hidden rounded-lg shadow-lg dark:bg-black">
                            <div className="overflow-hidden h-72">
                                <img className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105" src={book.image} alt={book.name} />
                            </div>
                            <div className="flex flex-col flex-grow p-4">
                                <button onClick={() => navigate(`/book/${book._id}`)} className="py-2 text-xl font-semibold uppercase text-[#003366] text-left dark:text-blue-400">{book.name}</button>
                                <p><span className="font-bold">Author:</span> {book.author}</p>
                                <p><span className="font-bold">Category:</span> {book.category}</p>
                                <p><span className="font-bold">Quantity:</span> {book.quantity}</p>
                                <div className="mt-auto">
                                    <ReactStars
                                        count={5}
                                        value={parseFloat(book.rating) || 0}
                                        edit={false}
                                        size={24}
                                        isHalf={true}
                                        activeColor="#ffd700"
                                    />
                                </div>
                            </div>
                            <div className="p-2 bg-[#003366]">
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => navigate(`/book/${book._id}`)}
                                    className="w-full"
                                >
                                    <span className="font-bold text-white">View Details</span>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="flex mb-20">
                <NavLink to="all-books" className="mx-auto text-xl font-bold text-center bg-[#003366] text-white rounded-full px-8 py-2 mt-10">See All Books</NavLink>
            </div>
        </div>
    );
};

export default Featured;
