import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBook = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        image: "",
        name: "",
        quantity: 0,
        author: "",
        category: "Novel",
        description: "",
        rating: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://library-management-system-server-eta.vercel.app/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success("Book added successfully!");
                setFormData({
                    image: "",
                    name: "",
                    quantity: 0,
                    author: "",
                    category: "Novel",
                    description: "",
                    rating: 0,
                });
                navigate("/all-books");
            } else {
                toast.error("Failed to add the book.");
            }
        } catch (error) {
            toast.error("An error occurred while adding the book.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
            <div className="w-full max-w-lg p-6 m-10 bg-white rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-center text-blue-600">
                    Add a New Book
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Image Upload */}
                    <div className="mb-4">
                        <label
                            htmlFor="image"
                            className="block mb-2 font-medium text-gray-700"
                        >
                            Book Cover Image URL
                        </label>
                        <input
                            type="url"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter image URL"
                            required
                        />
                    </div>

                    {/* Name */}
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block mb-2 font-medium text-gray-700"
                        >
                            Book Title
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter book title"
                            required
                        />
                    </div>

                    {/* Quantity */}
                    <div className="mb-4">
                        <label
                            htmlFor="quantity"
                            className="block mb-2 font-medium text-gray-700"
                        >
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter quantity"
                            min="1"
                            required
                        />
                    </div>

                    {/* Author */}
                    <div className="mb-4">
                        <label
                            htmlFor="author"
                            className="block mb-2 font-medium text-gray-700"
                        >
                            Author Name
                        </label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter author's name"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div className="mb-4">
                        <label
                            htmlFor="category"
                            className="block mb-2 font-medium text-gray-700"
                        >
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            <option value="Novel">Novel</option>
                            <option value="Thriller">Thriller</option>
                            <option value="History">History</option>
                            <option value="Drama">Drama</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block mb-2 font-medium text-gray-700"
                        >
                            Short Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter a brief description of the book"
                            rows="4"
                            required
                        />
                    </div>

                    {/* Rating */}
                    <div className="mb-4">
                        <label
                            htmlFor="rating"
                            className="block mb-2 font-medium text-gray-700"
                        >
                            Rating (1-5)
                        </label>
                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter rating"
                            min="1"
                            max="5"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
                    >
                        Add Book
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBook;