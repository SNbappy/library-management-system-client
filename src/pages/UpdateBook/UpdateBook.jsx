import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        image: "",
        name: "",
        author: "",
        category: "Novel",
        rating: 0,
    });

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`https://library-management-system-server-eta.vercel.app/books/${id}`);
                const book = await response.json();
                setFormData(book.data || {});
            } catch (error) {
                console.error("Error fetching book details:", error.message);
            }
        };
        fetchBook();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://library-management-system-server-eta.vercel.app/books/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success("Book updated successfully!");
                navigate("/all-books");
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Failed to update the book.");
            }
        } catch (error) {
            console.error("Error updating book:", error.message);
            toast.error("An error occurred while updating the book.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 pb-20 pt-28">
            <div className="w-full max-w-2xl p-8 bg-white shadow-lg dark:bg-black rounded-xl">
                <h2 className="mb-6 text-3xl font-bold text-center text-[#003366] dark:text-blue-400">
                    Update Book Details
                </h2>
                <form onSubmit={handleSubmit} className="grid gap-5">
                    {/* Image URL */}
                    <div>
                        <label htmlFor="image" className="block mb-2 font-medium text-gray-700">
                            Book Cover Image URL
                        </label>
                        <input
                            type="url"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400 dark:bg-blue-200 dark:text-black"
                            placeholder="Enter image URL"
                            required
                        />
                    </div>

                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
                            Book Title
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400 dark:bg-blue-200 dark:text-black"
                            required
                        />
                    </div>

                    {/* Author */}
                    <div>
                        <label htmlFor="author" className="block mb-2 font-medium text-gray-700">
                            Author Name
                        </label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400 dark:bg-blue-200 dark:text-black"
                            required
                        />
                    </div>

                    {/* Category & Rating (Side by Side) */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Category */}
                        <div>
                            <label htmlFor="category" className="block mb-2 font-medium text-gray-700">
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400 dark:bg-blue-200 dark:text-black"
                            >
                                <option value="Novel">Novel</option>
                                <option value="Thriller">Thriller</option>
                                <option value="History">History</option>
                                <option value="Drama">Drama</option>
                                {/* <option value="Sci-Fi">Sci-Fi</option> */}
                            </select>
                        </div>

                        {/* Rating */}
                        <div>
                            <label htmlFor="rating" className="block mb-2 font-medium text-gray-700">
                                Rating (1-5)
                            </label>
                            <input
                                type="number"
                                id="rating"
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400 dark:bg-blue-200 dark:text-black"
                                min="1"
                                max="5"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 text-lg text-white transition-all rounded-lg bg-[#003366] hover:bg-[#004477]"
                    >
                        Update Book
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateBook;
