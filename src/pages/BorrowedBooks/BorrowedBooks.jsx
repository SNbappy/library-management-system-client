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
        <div className="container py-8 mx-auto">
            <h1 className="mb-6 text-3xl font-bold text-center">Borrowed Books</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {borrowedBooks.map((book) => (
                    <div
                        key={book._id}
                        className="p-4 bg-white rounded-lg shadow-md"
                    >
                        <img
                            src={book.coverImage}
                            alt={book.title}
                            className="object-cover w-full h-48 rounded"
                        />
                        <h2 className="mt-4 text-xl font-bold">{book.title}</h2>
                        <p><strong>Author:</strong> {book.author}</p>
                        <p><strong>Category:</strong> {book.category}</p>
                        <p><strong>Borrowed Date:</strong> {new Date(book.borrowedDate).toLocaleDateString()}</p>
                        <p><strong>Return Date:</strong> {new Date(book.returnDate).toLocaleDateString()}</p>
                        <button
                            onClick={() => handleReturnBook(book._id)}
                            className="w-full px-4 py-2 mt-4 text-white bg-red-600 rounded hover:bg-red-700"
                        >
                            Return
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BorrowedBooksPage;
