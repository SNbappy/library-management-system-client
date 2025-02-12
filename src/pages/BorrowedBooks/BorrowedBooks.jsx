import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { ScaleLoader } from "react-spinners";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext/AuthProvider";

const BorrowedBooks = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userEmail } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Borrowed Books";

        const fetchBorrowedBooks = async () => {
            try {
                const response = await fetch(`https://library-management-system-server-eta.vercel.app/borrowed?userEmail=${userEmail}`);
                const data = await response.json();
                if (data.success) {
                    setBorrowedBooks(data.data);
                } else {
                    console.error("Failed to fetch borrowed books:", data.message);
                }
            } catch (error) {
                console.error("Error fetching borrowed books:", error.message);
            } finally {
                setTimeout(() => setLoading(false), 1500);
            }
        };

        fetchBorrowedBooks();
    }, [userEmail]);

    const handleReturnBook = async (bookId) => {
        try {
            const confirmation = await Swal.fire({
                title: "Are you sure?",
                text: "Do you really want to return this book?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, return it!",
            });

            if (confirmation.isConfirmed) {
                const response = await fetch(`https://library-management-system-server-eta.vercel.app/return/${bookId}`, {
                    method: "DELETE",
                });

                const result = await response.json();

                if (result.success) {
                    Swal.fire("Returned!", "The book has been returned successfully.", "success");
                    setBorrowedBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
                } else {
                    Swal.fire("Failed!", `Could not return the book: ${result.message}`, "error");
                }
            }
        } catch (error) {
            console.error("Error returning book:", error.message);
            Swal.fire("Error!", "An error occurred. Please try again later.", "error");
        }
    };

    return (
        <div className="max-w-[1250px] mx-auto pt-28 px-4 md:px-6 lg:px-8 xl:px-0">
            <h2 className="text-4xl font-extrabold text-center text-[#003366] pb-10">
                Borrowed Books
            </h2>

            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <ScaleLoader color="#003366" loading={loading} size={100} />
                </div>
            ) : borrowedBooks.length === 0 ? (
                <div className="flex items-center justify-center h-screen px-4">
                    <p className="text-xl font-bold text-center">No borrowed books to display.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8 pb-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {borrowedBooks.map((book) => (
                        <div key={book._id} className="flex flex-col h-full overflow-hidden rounded-lg shadow-lg">
                            <div className="overflow-hidden h-72">
                                <img className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105" src={book.coverImage} alt={book.title} />
                            </div>
                            <div className="flex flex-col flex-grow p-4">
                                <h2 className="py-2 text-xl font-semibold uppercase text-[#003366] text-left">{book.title}</h2>
                                <p><span className="font-bold">Author:</span> {book.author}</p>
                                <p><span className="font-bold">Category:</span> {book.category}</p>
                                <p><span className="font-bold">Borrowed Date:</span> {new Date(book.borrowedDate).toLocaleDateString()}</p>
                                <p><span className="font-bold">Return Date:</span> {new Date(book.returnDate).toLocaleDateString()}</p>
                            </div>
                            <div className="p-2 border-t bg-[#003366]">
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => handleReturnBook(book._id)}
                                    className="w-full text-white"
                                >
                                    Return Book
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BorrowedBooks;
