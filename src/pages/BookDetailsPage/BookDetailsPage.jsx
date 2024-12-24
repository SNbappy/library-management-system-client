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
            alert("Please specify a return date.");
            return;
        }

        console.log("Borrow details:", {
            returnDate: borrowDetails.returnDate,
            userName: borrowDetails.name,
            userEmail: borrowDetails.email,
        });

        try {
            const response = await fetch(`http://localhost:5000/books/borrow/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    returnDate: borrowDetails.returnDate,
                    userName: borrowDetails.name,
                    userEmail: borrowDetails.email,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setBook((prevBook) => ({ ...prevBook, quantity: data.data.quantity }));
                closeModal();
                alert("Book borrowed successfully!");
            } else {
                alert(data.message); // Show an error message from the backend
                console.error("Failed to borrow book:", data.message);
            }
        } catch (error) {
            console.error("Error borrowing book:", error.message);
            alert("An error occurred while trying to borrow the book.");
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
                className="px-4 py-2 mb-4 text-white bg-gray-600 rounded hover:bg-gray-700"
            >
                Go Back
            </button>
            <div className="p-6 bg-white rounded-lg shadow">
                <div className="flex flex-col md:flex-row">
                    <img
                        src={book.image}
                        alt={book.name}
                        className="object-cover w-full h-64 max-w-sm rounded md:mr-6"
                    />
                    <div className="flex-1 mt-4 md:mt-0">
                        <h1 className="mb-4 text-3xl font-bold">{book.name}</h1>
                        <p><strong>Author:</strong> {book.author}</p>
                        <p><strong>Category:</strong> {book.category}</p>
                        <p><strong>Quantity:</strong> {book.quantity}</p>
                        <p><strong>Description:</strong> {book.description}</p>
                        <div className="mt-4">
                            <ReactStars
                                count={5}
                                value={parseInt(book.rating)}
                                edit={false}
                                size={24}
                                isHalf={true}
                            />
                        </div>
                        <button
                            onClick={openModal}
                            className={`px-4 py-2 mt-4 text-white rounded ${book.quantity > 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
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
                className="p-6 bg-white rounded-lg shadow-lg"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <h2 className="mb-4 text-xl font-bold">Borrow Book</h2>
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-semibold">Name</label>
                    <input
                        type="text"
                        value={borrowDetails.name}
                        disabled
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-semibold">Email</label>
                    <input
                        type="email"
                        value={borrowDetails.email}
                        disabled
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-semibold">Return Date</label>
                    <input
                        type="date"
                        value={borrowDetails.returnDate}
                        onChange={(e) => setBorrowDetails({ ...borrowDetails, returnDate: e.target.value })}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button
                    onClick={handleBorrow}
                    className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                    Confirm Borrow
                </button>
            </Modal>
        </div>
    );
};

export default BookDetailsPage;
