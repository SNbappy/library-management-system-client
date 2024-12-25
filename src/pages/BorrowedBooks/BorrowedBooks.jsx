import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

const BorrowedBooks = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            fetch(`http://localhost:5000/borrowedBooks?userEmail=${user.email}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        setBorrowedBooks(data.data);
                    } else {
                        setError(data.message);
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching borrowed books:", err.message);
                    setError("Failed to fetch borrowed books");
                    setLoading(false);
                });
        } else {
            setError("User not logged in");
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <p>Loading borrowed books...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container py-8 mx-auto">
            <h1 className="text-2xl font-bold">My Borrowed Books</h1>
            {borrowedBooks.length === 0 ? (
                <p className="mt-4">You have not borrowed any books yet.</p>
            ) : (
                <ul className="mt-4">
                    {borrowedBooks.map((book) => (
                        <li key={book._id} className="mb-4">
                            <p><strong>Book Name:</strong> {book.bookName}</p>
                            <p><strong>Borrowed At:</strong> {new Date(book.borrowedAt).toLocaleDateString()}</p>
                            <p><strong>Return By:</strong> {book.returnDate}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BorrowedBooks;
