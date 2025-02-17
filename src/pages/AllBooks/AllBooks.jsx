import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { ScaleLoader } from "react-spinners";
import { Button, MenuItem, Select } from "@mui/material";
import { Helmet } from "react-helmet";

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("name");
    const [order, setOrder] = useState("asc");
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "All Books";
        setLoading(true);
        const fetchBooks = async () => {
            try {
                const response = await fetch("https://library-management-system-server-eta.vercel.app/books");
                const data = await response.json();
                const booksData = data.data || [];
                setBooks(booksData);
            } catch (error) {
                console.error("Error fetching books:", error.message);
            } finally {
                setTimeout(() => setLoading(false), 1500);
            }
        };
        fetchBooks();
    }, []);

    // Sorting function
    const sortedBooks = [...books].sort((a, b) => {
        if (order === "asc") {
            return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
            return a[sortBy] < b[sortBy] ? 1 : -1;
        }
    });

    return (
        <div className="max-w-[1250px] mx-auto pt-28 px-4 md:px-6 lg:px-8 xl:px-0">
            <Helmet>
                <title>All Books | QuillStack</title>
            </Helmet>
            <h2 className="text-4xl font-extrabold text-center text-[#003366] pb-10 dark:text-blue-400">
                All Books
            </h2>

            {/* Sorting Controls */}
            <div className="flex items-center justify-end gap-4 mb-6 dark:text-white">
                <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    displayEmpty
                    variant="outlined"
                    size="small"
                    sx={{
                        backgroundColor: "white",
                        color: "black",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#003366",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#0055AA",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#60A5FA",
                        },
                        "&.dark": {
                            backgroundColor: "#1E293B",
                            color: "white",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "white",
                            },
                        },
                    }}
                >
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="author">Author</MenuItem>
                    <MenuItem value="category">Category</MenuItem>
                    <MenuItem value="quantity">Quantity</MenuItem>
                    <MenuItem value="rating">Rating</MenuItem>
                </Select>

                <Select
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    displayEmpty
                    variant="outlined"
                    size="small"
                    sx={{
                        backgroundColor: "white",
                        color: "black",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#003366",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#0055AA",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#60A5FA",
                        },
                        "&.dark": {
                            backgroundColor: "#1E293B",
                            color: "white",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "white",
                            },
                        },
                    }}
                >
                    <MenuItem value="asc">Ascending</MenuItem>
                    <MenuItem value="desc">Descending</MenuItem>
                </Select>

            </div>

            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <ScaleLoader
                        color={document.documentElement.classList.contains("dark") ? "#60A5FA" : "#003366"}
                        loading={loading}
                        size={100}
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8 pb-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {sortedBooks.map((book) => (
                        <div key={book._id} className="flex flex-col h-full overflow-hidden bg-white rounded-lg shadow-lg dark:bg-black">
                            <div className="overflow-hidden h-72">
                                <img className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105" src={book.image} alt={book.name} />
                            </div>
                            <div className="flex flex-col flex-grow p-4">
                                <button onClick={() => navigate(`/book/${book._id}`)} className="py-2 text-xl font-semibold uppercase text-[#003366] text-left dark:text-blue-400">{book.name}</button>
                                <p><span className="font-bold">Author:</span> {book.author}</p>
                                <p><span className="font-bold">Category:</span> {book.category}</p>
                                <p><span className="font-bold">Quantity:</span> {book.quantity}</p>
                                <div className="mt-auto">
                                    <ReactStars
                                        count={5}
                                        value={parseFloat(book.rating)}
                                        edit={false}
                                        size={24}
                                        isHalf={true}
                                        activeColor="#ffd700"
                                    />
                                </div>
                            </div>
                            <div className="p-2 bg-[#003366]">
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => navigate(`/update-book/${book._id}`)}
                                    className="w-full"
                                >
                                    <span className="font-bold text-white">Update</span>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllBooks;
