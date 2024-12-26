import React, { useEffect, useState } from "react";

const BorrowedBooksPage = () => {
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
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl font-bold">No borrowed books to display.</p>
            </div>
        );
    }

    return (
        <div className="container py-16 mx-12">
            <h1 className="mb-8 text-4xl font-extrabold text-center text-gray-900">Borrowed Books</h1>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {borrowedBooks.map((book) => (
                    <div
                        key={book._id}
                        className="p-6 transition-all duration-300 transform bg-white rounded-lg shadow-xl hover:scale-105 hover:shadow-2xl"
                    >
                        <img
                            src={book.coverImage}
                            alt={book.title}
                            className="object-cover w-full mb-6 rounded-lg"
                        />
                        <h2 className="text-2xl font-semibold text-gray-900">{book.title}</h2>
                        <p className="mt-2 text-gray-600"><strong>Author:</strong> {book.author}</p>
                        <p className="text-gray-600"><strong>Category:</strong> {book.category}</p>
                        <p className="text-gray-600"><strong>Borrowed Date:</strong> {new Date(book.borrowedDate).toLocaleDateString()}</p>
                        <p className="text-gray-600"><strong>Return Date:</strong> {new Date(book.returnDate).toLocaleDateString()}</p>
                        <button
                            onClick={() => handleReturnBook(book._id)}
                            className="w-full px-6 py-3 mt-6 text-white transition-all duration-300 bg-red-600 rounded-lg shadow-md hover:bg-red-700"
                        >
                            Return Book
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BorrowedBooksPage;