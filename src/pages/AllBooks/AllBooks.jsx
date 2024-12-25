import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [showAvailable, setShowAvailable] = useState(false);
    const [viewMode, setViewMode] = useState("Card");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch("http://localhost:5000/books");
                const data = await response.json();
                const booksData = data.data || [];
                setBooks(booksData);
                setFilteredBooks(booksData);
            } catch (error) {
                console.error("Error fetching books:", error.message);
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

    const handleViewChange = (view) => {
        setViewMode(view);
    };

    const handleUpdate = (id) => {
        navigate(`/update-book/${id}`);
    };

    return (
        <div className="container py-8 mx-auto">
            <h1 className="mb-6 text-3xl font-bold text-center">All Books</h1>

            {/* Filter and View Toggle */}
            <div className="flex items-center justify-between mb-6">
                {/* Filter Button */}
                <button
                    onClick={toggleAvailableFilter}
                    className={`px-4 py-2 rounded text-white ${showAvailable ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {showAvailable ? "Show All Books" : "Show Available Books"}
                </button>

                {/* View Mode Dropdown */}
                <select
                    value={viewMode}
                    onChange={(e) => handleViewChange(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="Card">Card View</option>
                    <option value="Table">Table View</option>
                </select>
            </div>

            {/* Display Books Based on View Mode */}
            {viewMode === "Card" ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredBooks.map((book) => (
                        <div key={book._id} className="p-4 transition-shadow bg-white rounded-lg shadow hover:shadow-lg">
                            {/* Book Cover Image */}
                            <img
                                src={book.image || "https://via.placeholder.com/150"}
                                alt={book.name || "Book Cover"}
                                className="object-cover w-full h-48 rounded"
                            />

                            {/* Book Title */}
                            <h2 className="mt-4 text-lg font-bold text-gray-800 truncate">{book.name || "Unknown Title"}</h2>

                            {/* Book Author */}
                            <p className="mt-1 text-sm text-gray-600">
                                <strong>Author:</strong> {book.author || "Unknown Author"}
                            </p>

                            {/* Book Category */}
                            <p className="mt-1 text-sm text-gray-600">
                                <strong>Category:</strong> {book.category || "N/A"}
                            </p>

                            {/* Book Rating */}
                            <div className="mt-2">
                                <strong>Rating:</strong>
                                <ReactStars
                                    count={5}
                                    value={parseFloat(book.rating) || 0}
                                    size={24}
                                    isHalf={true}
                                    edit={false}
                                    activeColor="#ffd700"
                                />
                            </div>

                            {/* Book Quantity */}
                            <p className="mt-1 text-sm text-gray-600">
                                <strong>Quantity:</strong> {book.quantity || "0"}
                            </p>

                            {/* Update Button */}
                            <button
                                onClick={() => handleUpdate(book._id)}
                                className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
                            >
                                Update
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <table className="w-full border border-collapse border-gray-200 table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Cover</th>
                            <th className="px-4 py-2 border">Title</th>
                            <th className="px-4 py-2 border">Author</th>
                            <th className="px-4 py-2 border">Category</th>
                            <th className="px-4 py-2 border">Rating</th>
                            <th className="px-4 py-2 border">Quantity</th>
                            <th className="px-4 py-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks.map((book) => (
                            <tr key={book._id}>
                                <td className="px-4 py-2 border">
                                    <img
                                        src={book.image || "https://via.placeholder.com/150"}
                                        alt={book.name || "Book Cover"}
                                        className="object-cover w-16 h-16 rounded"
                                    />
                                </td>
                                <td className="px-4 py-2 border">{book.name || "Unknown Title"}</td>
                                <td className="px-4 py-2 border">{book.author || "Unknown Author"}</td>
                                <td className="px-4 py-2 border">{book.category || "N/A"}</td>
                                <td className="px-4 py-2 border">
                                    <ReactStars
                                        count={5}
                                        value={parseFloat(book.rating) || 0}
                                        size={16}
                                        isHalf={true}
                                        edit={false}
                                        activeColor="#ffd700"
                                    />
                                </td>
                                <td className="px-4 py-2 border">{book.quantity || "0"}</td>
                                <td className="px-4 py-2 border">
                                    <button
                                        onClick={() => handleUpdate(book._id)}
                                        className="px-4 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
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
