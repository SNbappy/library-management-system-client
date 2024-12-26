import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryBooks = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:5000/books");
                const data = await response.json();

                const uniqueCategories = [
                    ...new Set(data.data.map((book) => book.category)),
                ].slice(0, 4);
                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Error fetching categories:", error.message);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (category) => {
        navigate(`/books/category/${category.toLowerCase()}`);
    };

    return (
        <div className="container py-8 m-20 mx-auto">
            <h1 className="mb-8 text-4xl font-extrabold text-center text-gray-800">
                Explore Book Categories
            </h1>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {categories.map((category) => (
                    <div
                        key={category}
                        className="relative p-6 mx-12 text-white transition-all rounded-lg shadow-lg cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-xl hover:scale-105"
                        onClick={() => handleCategoryClick(category)}
                    >
                        {/* Background Illustration (Optional) */}
                        {/* <div className="absolute inset-0 bg-opacity-20 bg-[url('https://via.placeholder.com/150')] rounded-lg"></div> */}

                        {/* Category Name */}
                        <h3 className="z-10 mb-2 text-xl font-semibold text-center">
                            {category}
                        </h3>

                        {/* Decorative Line */}
                        <div className="z-10 w-16 h-1 mx-auto my-4 bg-white rounded"></div>

                        {/* Explore Button */}
                        <p className="z-10 text-sm font-medium text-center">
                            Discover books in this category
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryBooks;
