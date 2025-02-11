import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import drama from "../../assets/drama.jpg";
import thriller from "../../assets/psychological-thrillers-3-.webp";
import history from "../../assets/History.webp";
import novel from "../../assets/novel.jpg";

const CategoryBooks = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Explore Categories";

        const fetchCategories = async () => {
            try {
                const response = await fetch("https://library-management-system-server-eta.vercel.app/books");
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

    // Map category names to images
    const categoryImages = {
        Drama: drama,
        Thriller: thriller,
        History: history,
        Novel: novel,
    };

    return (
        <div className="mb-20">
            <div className="container max-w-[1250px] mx-auto px-4 md:px-6 lg:px-8 xl:px-0">
                <h1 className="text-4xl font-extrabold text-center text-[#003366] mb-5">
                    Explore Book Categories
                </h1>
                <p className="mb-10 text-lg font-medium text-center text-gray-700">Discover a world of stories! Explore diverse book categories and find your next great read.</p>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {categories.map((category) => (
                        <div
                            key={category}
                            className="relative flex items-center justify-center h-56 overflow-hidden rounded-lg shadow-lg cursor-pointer group"
                            onClick={() => handleCategoryClick(category)}
                        >
                            {/* Background Image */}
                            <img
                                src={categoryImages[category] || novel} // Default to 'novel' image if no match
                                alt={category}
                                className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 transition-all bg-black bg-opacity-50 group-hover:bg-opacity-60"></div>

                            {/* Category Content */}
                            <div className="relative z-10 text-center text-white">
                                <h3 className="text-4xl font-bold">{category}</h3>
                                {/* <div className="w-12 h-1 mx-auto my-2 bg-white rounded"></div> */}
                                {/* <p className="text-sm font-medium opacity-90">
                                    Discover books in this category
                                </p> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryBooks;
