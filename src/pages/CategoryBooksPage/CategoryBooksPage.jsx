import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const CategoryBooksPage = () => {
    const { category } = useParams();
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooksByCategory = async () => {
            try {
                const response = await fetch(`http://localhost:5000/books/category/${category}`);
                const data = await response.json();
                setBooks(data.data || []);
            } catch (error) {
                console.error("Error fetching books by category:", error.message);
            }
        };

        fetchBooksByCategory();
    }, [category]);

    return (
        <div className="container py-8 mx-auto">
            <h1 className="mb-6 text-3xl font-bold text-center">Books in {category}</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {books.map((book) => (
                    <div key={book._id} className="p-4 bg-white rounded-lg shadow">
                        <img
                            src={book.image}
                            alt={book.name}
                            className="object-cover w-full h-48 rounded"
                        />
                        <h2 className="mt-4 text-lg font-bold">{book.name}</h2>
                        <p>Author: {book.author}</p>
                        <p>Category: {book.category}</p>
                        <p>Quantity: {book.quantity}</p>
                        <ReactStars
                            count={5}
                            value={parseInt(book.rating)}
                            edit={false}
                            size={24}
                            isHalf={true}
                        />
                        <button
                            onClick={() => navigate(`/book/${book._id}`)}
                            className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
                        >
                            Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryBooksPage;
