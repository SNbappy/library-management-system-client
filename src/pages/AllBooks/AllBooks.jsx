import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { ScaleLoader } from "react-spinners";
import { Button } from "@mui/material";

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "All Books";
        setLoading(true);
        const fetchBooks = async () => {
            try {
                const response = await fetch("https://library-management-system-server-eta.vercel.app/books");
                const data = await response.json();
                const booksData = data.data || [];
                setBooks(booksData);
            } catch (error) {
                console.error("Error fetching books:", error.message);
            } finally {
                setTimeout(() => setLoading(false), 1500);
            }
        };
        fetchBooks();
    }, []);

    return (
        <div className="max-w-[1250px] mx-auto pt-28 px-4 md:px-6 lg:px-8 xl:px-0">
            <h2 className="text-4xl font-extrabold text-center text-[#003366] pb-10">
                All Books
            </h2>

            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <ScaleLoader color="#003366" loading={loading} size={100} />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8 pb-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {books.map((book) => (
                        <div key={book._id} className="flex flex-col h-full overflow-hidden rounded-lg shadow-lg">
                            <div className="overflow-hidden h-72">
                                <img className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105" src={book.image} alt={book.name} />
                            </div>
                            <div className="flex flex-col flex-grow p-4">
                                <button onClick={() => navigate(`/book/${book._id}`)} className="py-2 text-xl font-semibold uppercase text-[#003366] text-left">{book.name}</button>
                                <p><span className="font-bold">Author:</span> {book.author}</p>
                                <p><span className="font-bold">Category:</span> {book.category}</p>
                                <p><span className="font-bold">Quantity:</span> {book.quantity}</p>
                                <div className="mt-auto">
                                    <ReactStars
                                        count={5}
                                        value={parseInt(book.rating)}
                                        edit={false}
                                        size={24}
                                        isHalf={true}
                                        activeColor="#ffd700"
                                    />
                                </div>
                            </div>
                            <div className="p-2 border-t bg-[#003366]">
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => navigate(`/update-book/${book._id}`)}
                                    className="w-full "
                                >
                                    <span className="font-bold text-white">Update</span>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllBooks;
