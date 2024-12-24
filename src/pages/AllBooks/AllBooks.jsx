import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch("http://localhost:5000/books");
                const data = await response.json();
                setBooks(data.data || []);
            } catch (error) {
                console.error("Error fetching books:", error.message);
            }
        };
        fetchBooks();
    }, []);

    const handleUpdate = (id) => {
        navigate(`/update-book/${id}`);
    };

    return (
        <div className="container py-8 mx-auto">
            <h1 className="mb-6 text-3xl font-bold text-center">All Books</h1>
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
                        <p>Rating: {book.rating}/5</p>
                        <button
                            onClick={() => handleUpdate(book._id)}
                            className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
                        >
                            Update
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllBooks;
