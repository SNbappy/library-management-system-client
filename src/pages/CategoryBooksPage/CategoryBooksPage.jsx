import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import ReactStars from "react-rating-stars-component";
import { ScaleLoader } from "react-spinners";

const CategoryBooksPage = () => {
    const { category } = useParams();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = `Books in ${category}`;

        const fetchBooksByCategory = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://library-management-system-server-eta.vercel.app/books/category/${category}`);
                const data = await response.json();
                setTimeout(() => {
                    setBooks(data.data || []);
                    setLoading(false);
                }, 1500);
            } catch (error) {
                console.error("Error fetching books by category:", error.message);
                setLoading(false);
            }
        };

        fetchBooksByCategory();
    }, [category]);

    return (
        <div className="max-w-[1250px] mx-auto pt-28 px-4 md:px-6 lg:px-8 xl:px-0">
            <h2 className="text-4xl font-extrabold text-center text-[#003366] pb-10">
                Books in {category}
            </h2>

            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <ScaleLoader color="#003366" loading={loading} size={100} />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8 pb-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {books.map((book) => (
                        <div key={book._id} className="flex flex-col h-full overflow-hidden rounded-lg shadow-lg">
                            {/* Image */}
                            <div className="overflow-hidden h-72">
                                <img className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105" src={book.image} alt={book.name} />
                            </div>

                            {/* Content (flex-grow ensures equal height) */}
                            <div className="flex flex-col flex-grow p-4">
                                <button onClick={() => navigate(`/book/${book._id}`)} className="py-2 text-xl font-semibold uppercase text-[#003366] text-left">{book.name}</button>
                                <Typography variant="body2" className="">
                                    <span className="font-bold">Author:</span> {book.author}
                                </Typography>
                                <Typography variant="body2" className="">
                                    <span className="font-bold">Category:</span> {book.category}
                                </Typography>
                                <Typography variant="body2" className="">
                                    <span className="font-bold">Quantity:</span> {book.quantity}
                                </Typography>
                                
                                {/* Rating */}
                                <div className="t-auto ">
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

                            {/* Buttons (Always at bottom) */}
                            <div className="p-2 border-t bg-[#003366]">
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => navigate(`/book/${book._id}`)}
                                    className="w-full "
                                >
                                    <span className="font-bold text-white">View Details</span>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryBooksPage;
