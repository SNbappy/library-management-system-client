import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Modal from "react-modal";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const BookDetailsPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [borrowDetails, setBorrowDetails] = useState({ returnDate: "", name: "", email: "" });
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser({ name: firebaseUser.displayName, email: firebaseUser.email });
            } else {
                console.error("No user is logged in");
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/books/${id}`);
                const data = await response.json();

                if (data.success) {
                    setBook(data.data);
                } else {
                    console.error("Failed to fetch book details:", data.message);
                }
            } catch (error) {
                console.error("Error fetching book details:", error.message);
            }
        };

        fetchBookDetails();
    }, [id]);

    const openModal = () => {
        if (user) {
            setBorrowDetails({ ...borrowDetails, name: user.name, email: user.email });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleBorrow = async () => {
        if (!borrowDetails.returnDate) {
            alert("Please select a return date.");
            return;
        }

        const borrowData = {
            bookId: id,
            name: borrowDetails.name,
            email: borrowDetails.email,
            returnDate: borrowDetails.returnDate,
        };

        try {
            const response = await fetch("http://localhost:5000/borrow", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(borrowData),
            });

            const result = await response.json();

            if (result.success) {
                alert("Book borrowed successfully!");
                closeModal();
            } else {
                alert(`Failed to borrow book: ${result.message}`);
            }
        } catch (error) {
            console.error("Error borrowing book:", error.message);
            alert("An error occurred. Please try again later.");
        }
    };

    if (!book || !user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl font-bold">Loading...</p>
            </div>
        );
    }

    return (
        <div className="container py-8 mx-auto">
            <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 mb-4 text-white rounded-lg shadow-lg bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700"
            >
                Go Back
            </button>

            <div className="p-6 m-10 bg-white rounded-lg shadow-md">
                <div className="flex flex-col gap-5 md:flex-row">
                    <img
                        src={book.image}
                        alt={book.name}
                        className="object-cover w-full max-w-sm rounded-lg shadow-lg md:mr-6"
                    />
                    <div className="flex-1 mt-4 md:mt-0">
                        <h1 className="mb-4 text-3xl font-extrabold text-gray-800">{book.name}</h1>
                        <p className="mb-2 text-gray-600">
                            <strong>Author:</strong> {book.author}
                        </p>
                        <p className="mb-2 text-gray-600">
                            <strong>Category:</strong> {book.category}
                        </p>
                        <p className="mb-2 text-gray-600">
                            <strong>Quantity:</strong> {book.quantity}
                        </p>
                        <p className="mb-4 text-gray-600">
                            <strong>Description:</strong> {book.description}
                        </p>
                        <div className="mt-4">
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
                            onClick={openModal}
                            className={`px-6 py-3 mt-6 text-white text-lg font-semibold rounded-lg shadow-md transition-transform transform-gpu ${book.quantity > 0
                                    ? "bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-105"
                                    : "bg-gray-400 cursor-not-allowed"
                                }`}
                            disabled={book.quantity === 0}
                        >
                            Borrow
                        </button>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Borrow Book"
                className="w-1/3 p-8 bg-white rounded-lg shadow-xl md:w-1/2"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <h2 className="mb-6 text-2xl font-bold text-gray-800">Borrow Book</h2>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-600">Name</label>
                    <input
                        type="text"
                        value={borrowDetails.name}
                        disabled
                        className="w-full p-3 bg-gray-100 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-600">Email</label>
                    <input
                        type="email"
                        value={borrowDetails.email}
                        disabled
                        className="w-full p-3 bg-gray-100 border rounded-lg"
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-600">Return Date</label>
                    <input
                        type="date"
                        value={borrowDetails.returnDate}
                        onChange={(e) =>
                            setBorrowDetails({ ...borrowDetails, returnDate: e.target.value })
                        }
                        className="w-full p-3 border rounded-lg"
                    />
                </div>
                <button
                    onClick={handleBorrow}
                    className="w-full px-4 py-3 text-white rounded-lg shadow-md bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-600"
                >
                    Confirm Borrow
                </button>
            </Modal>
        </div>
    );
};

export default BookDetailsPage;
