import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ScaleLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";

const AddBook = () => {
    useEffect(() => {
        document.title = "Add Book";
    }, []);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        image: "",
        name: "",
        quantity: 1,
        author: "",
        category: "Novel",
        description: "",
        rating: 1,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("https://library-management-system-server-eta.vercel.app/books", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success("Book added successfully!");
                setFormData({
                    image: "",
                    name: "",
                    quantity: 1,
                    author: "",
                    category: "Novel",
                    description: "",
                    rating: 1,
                });
                navigate("/all-books");
            } else {
                toast.error("Failed to add the book.");
            }
        } catch (error) {
            toast.error("An error occurred while adding the book.");
        } finally {
            setTimeout(() => setLoading(false), 1500);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen pt-28">
            <div className="w-full max-w-3xl p-8 border rounded-lg shadow-lg">
                <h2 className="mb-6 text-3xl font-bold text-center text-blue-600">
                    Add a New Book
                </h2>

                {loading ? (
                    <div className="flex justify-center py-10">
                        <ScaleLoader color="#003366" loading={loading} size={100} />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            {/* Book Cover Image URL */}
                            <div>
                                <label className="block font-medium text-gray-700">Book Cover Image URL</label>
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-300"
                                    placeholder="Enter image URL"
                                    required
                                />
                            </div>

                            {/* Book Title */}
                            <div>
                                <label className="block font-medium text-gray-700">Book Title</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-300"
                                    placeholder="Enter book title"
                                    required
                                />
                            </div>

                            {/* Quantity */}
                            <div>
                                <label className="block font-medium text-gray-700">Quantity</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-300"
                                    min="1"
                                    required
                                />
                            </div>

                            {/* Author Name */}
                            <div>
                                <label className="block font-medium text-gray-700">Author Name</label>
                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-300"
                                    placeholder="Enter author's name"
                                    required
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            {/* Category */}
                            <div>
                                <label className="block font-medium text-gray-700">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-300"
                                >
                                    <option value="Novel">Novel</option>
                                    <option value="Thriller">Thriller</option>
                                    <option value="History">History</option>
                                    <option value="Drama">Drama</option>
                                    <option value="Sci-Fi">Sci-Fi</option>
                                </select>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block font-medium text-gray-700">Short Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-300"
                                    placeholder="Enter a brief description of the book"
                                    rows="4"
                                    required
                                />
                            </div>

                            {/* Rating */}
                            <div>
                                <label className="block font-medium text-gray-700">Rating (1-5)</label>
                                <input
                                    type="number"
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-300"
                                    min="1"
                                    max="5"
                                    required
                                />
                            </div>
                        </div>

                        {/* Full-Width Submit Button */}
                        <div className="col-span-2">
                            <button
                                type="submit"
                                className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-blue-300"
                            >
                                Add Book
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AddBook;
