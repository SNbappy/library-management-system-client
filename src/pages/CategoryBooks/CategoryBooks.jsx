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
        <div className="container py-8 mx-auto">
            <h1 className="mb-6 text-3xl font-bold text-center">Book Categories</h1>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {categories.map((category) => (
                    <div
                        key={category}
                        className="p-4 bg-gray-100 rounded-lg shadow cursor-pointer"
                        onClick={() => handleCategoryClick(category)}
                    >
                        <h3 className="mb-2 text-lg font-bold text-center">{category}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryBooks;
