import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { ScaleLoader } from "react-spinners";

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [showAvailable, setShowAvailable] = useState(false);
    const [viewMode, setViewMode] = useState("Card");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);

        const fetchBooks = async () => {
            try {
                const response = await fetch("http://localhost:5000/books");
                const data = await response.json();
                const booksData = data.data || [];
                setBooks(booksData);
                setFilteredBooks(booksData);
            } catch (error) {
                console.error("Error fetching books:", error.message);
            } finally {
                setTimeout(() => setLoading(false), 1500);
            }
        };

        fetchBooks();
    }, []);

    const toggleAvailableFilter = () => {
        setShowAvailable((prev) => !prev);
        if (!showAvailable) {
            setFilteredBooks(books.filter((book) => parseInt(book.quantity) > 0));
        } else {
            setFilteredBooks(books);
        }
    };

    const handleViewChange = (event) => {
        setViewMode(event.target.value);
    };

    const handleUpdate = (id) => {
        navigate(`/update-book/${id}`);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <ScaleLoader color="#4fa94d" loading={loading} size={50} />

            </div>
        );
    }

    return (
        <div className="m-4">
            {/* Filter and View Mode Controls */}
            <div className="flex justify-between mb-4">
                <button
                    onClick={toggleAvailableFilter}
                    className={`px-4 py-2 rounded-md transition-all ${showAvailable
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                        }`}
                >
                    {showAvailable ? "Show All Books" : "Show Available Books"}
                </button>

                <select
                    value={viewMode}
                    onChange={handleViewChange}
                    className="px-4 py-2 border border-gray-300 rounded-md"
                >
                    <option value="Card">Card View</option>
                    <option value="Table">Table View</option>
                </select>
            </div>

            {/* Conditional Rendering Based on View Mode */}
            {viewMode === "Card" ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredBooks.map((book) => (
                        <div
                            key={book._id}
                            className="p-6 transition-all bg-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            <div className="relative rounded-lg w-overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 w-[60%] mx-auto">
                                <img
                                    src={book.image || "https://via.placeholder.com/150"}
                                    alt={book.name || "Book Cover"}
                                    className="object-cover w-full"
                                />
                            </div>
                            <h2 className="mt-4 text-lg font-bold text-gray-800 truncate">
                                {book.name || "Unknown Title"}
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">
                                <strong>Author:</strong> {book.author || "Unknown Author"}
                            </p>
                            <p className="mt-1 text-sm text-gray-600">
                                <strong>Category:</strong> {book.category || "N/A"}
                            </p>
                            <div className="flex items-center mt-3">
                                <strong className="mr-2">Rating:</strong>
                                <ReactStars
                                    count={5}
                                    value={parseFloat(book.rating) || 0}
                                    size={20}
                                    isHalf={true}
                                    edit={false}
                                    activeColor="#ffd700"
                                />
                            </div>
                            <p className="mt-2 text-sm text-gray-600">
                                <strong>Quantity:</strong> {book.quantity || "0"}
                            </p>
                            <button
                                onClick={() => handleUpdate(book._id)}
                                className="w-full px-4 py-2 mt-6 text-white transition-all rounded-md bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
                            >
                                Update
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <table className="w-full border border-collapse border-gray-300 table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 border border-gray-300">Title</th>
                            <th className="px-4 py-2 border border-gray-300">Author</th>
                            <th className="px-4 py-2 border border-gray-300">Category</th>
                            <th className="px-4 py-2 border border-gray-300">Rating</th>
                            <th className="px-4 py-2 border border-gray-300">Quantity</th>
                            <th className="px-4 py-2 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks.map((book) => (
                            <tr key={book._id}>
                                <td className="px-4 py-2 border border-gray-300">{book.name}</td>
                                <td className="px-4 py-2 border border-gray-300">{book.author}</td>
                                <td className="px-4 py-2 border border-gray-300">{book.category}</td>
                                <td className="px-4 py-2 border border-gray-300">
                                    <ReactStars
                                        count={5}
                                        value={parseFloat(book.rating) || 0}
                                        size={20}
                                        isHalf={true}
                                        edit={false}
                                        activeColor="#ffd700"
                                    />
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {book.quantity || "0"}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    <button
                                        onClick={() => handleUpdate(book._id)}
                                        className="px-2 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllBooks;