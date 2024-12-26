import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const CategoryBooksPage = () => {
    const { category } = useParams();
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        document.title = `Books in ${category}`;
        
        const fetchBooksByCategory = async () => {
            try {
                const response = await fetch(`https://library-management-system-server-eta.vercel.app/books/category/${category}`);
                const data = await response.json();
                setBooks(data.data || []);
            } catch (error) {
                console.error("Error fetching books by category:", error.message);
            }
        };

        fetchBooksByCategory();
    }, [category]);

    return (
        <div className="container px-6 py-12 mx-auto">
            <h1 className="mb-8 text-4xl font-semibold text-center text-gray-800">
                Books in <span className="text-blue-600">{category}</span>
            </h1>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {books.map((book) => (
                    <div key={book._id} className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-2xl">
                        <img
                            src={book.image}
                            alt={book.name}
                            className="object-cover w-full h-64 transition-transform duration-300 transform hover:scale-105"
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gray-900 truncate">{book.name}</h2>
                            <p className="mt-2 text-gray-600">Author: <span className="font-medium text-gray-800">{book.author}</span></p>
                            <p className="mt-1 text-gray-600">Category: <span className="font-medium text-gray-800">{book.category}</span></p>
                            <p className="mt-1 text-gray-600">Quantity: <span className="font-medium text-gray-800">{book.quantity}</span></p>
                            <div className="mt-3">
                                <ReactStars
                                    count={5}
                                    value={parseInt(book.rating)}
                                    edit={false}
                                    size={24}
                                    isHalf={true}
                                    activeColor="#ffd700"
                                />
                            </div>
                            <button
                                onClick={() => navigate(`/book/${book._id}`)}
                                className="w-full py-2 mt-4 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryBooksPage;