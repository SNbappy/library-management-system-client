import React, { useEffect, useState } from "react";

const BorrowedBooks = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);

    useEffect(() => {
        const fetchBorrowedBooks = async () => {
            try {
                const response = await fetch("http://localhost:5000/borrowed");
                const data = await response.json();

                if (data.success) {
                    setBorrowedBooks(data.data);
                } else {
                    console.error("Failed to fetch borrowed books:", data.message);
                }
            } catch (error) {
                console.error("Error fetching borrowed books:", error.message);
            }
        };

        fetchBorrowedBooks();
    }, []);

    const handleReturnBook = async (bookId) => {
        try {
            const response = await fetch(`http://localhost:5000/return/${bookId}`, {
                method: "DELETE",
            });

            const result = await response.json();

            if (result.success) {
                alert("Book returned successfully!");
                setBorrowedBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
            } else {
                alert(`Failed to return book: ${result.message}`);
            }
        } catch (error) {
            console.error("Error returning book:", error.message);
            alert("An error occurred. Please try again later.");
        }
    };

    if (borrowedBooks.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen px-4">
                <p className="text-xl font-bold text-center">No borrowed books to display.</p>
            </div>
        );
    }

    return (
        <div className="container px-4 py-16 mx-auto">
            <h1 className="mb-8 text-3xl font-extrabold text-center text-gray-900 sm:text-4xl">
                Borrowed Books
            </h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {borrowedBooks.map((book) => (
                    <div
                        key={book._id}
                        className="p-6 transition-transform duration-300 transform bg-white rounded-lg shadow hover:scale-105 hover:shadow-xl"
                    >
                        <img
                            src={book.coverImage}
                            alt={book.title}
                            className="object-cover w-full mb-4 rounded-lg h-52 sm:h-64"
                        />
                        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">{book.title}</h2>
                        <p className="mt-2 text-sm text-gray-600 sm:text-base">
                            <strong>Author:</strong> {book.author}
                        </p>
                        <p className="text-sm text-gray-600 sm:text-base">
                            <strong>Category:</strong> {book.category}
                        </p>
                        <p className="text-sm text-gray-600 sm:text-base">
                            <strong>Borrowed Date:</strong> {new Date(book.borrowedDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600 sm:text-base">
                            <strong>Return Date:</strong> {new Date(book.returnDate).toLocaleDateString()}
                        </p>
                        <button
                            onClick={() => handleReturnBook(book._id)}
                            className="w-full px-4 py-2 mt-6 text-sm text-white transition-colors duration-300 bg-red-600 rounded hover:bg-red-700 sm:text-base"
                        >
                            Return Book
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BorrowedBooks;
