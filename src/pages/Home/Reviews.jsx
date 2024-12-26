import React from "react";

const Reviews = () => {
    const reviews = [
        {
            name: "Alice Johnson",
            avatar: "https://i.pravatar.cc/100?img=1",
            rating: 5,
            comment: "QuillStacks made managing our library a breeze! Highly recommend it.",
        },
        {
            name: "Michael Smith",
            avatar: "https://i.pravatar.cc/100?img=2",
            rating: 4,
            comment:
                "Great features and very user-friendly. The borrowing process is seamless.",
        },
        {
            name: "Emily Brown",
            avatar: "https://i.pravatar.cc/100?img=3",
            rating: 5,
            comment:
                "I love the real-time updates! It keeps everything organized and efficient.",
        },
    ];

    return (
        <section className="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
            <div className="container mx-auto text-center text-white">
                <h2 className="mb-8 text-4xl font-extrabold">What Our Users Say</h2>
                <p className="mb-16 text-lg font-medium text-gray-300">
                    Hear from some of our happy users about their experience with
                    QuillStacks.
                </p>
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center p-8 m-10 transition-all duration-300 transform bg-white shadow-xl rounded-xl hover:scale-105 hover:shadow-2xl"
                        >
                            <img
                                src={review.avatar}
                                alt={review.name}
                                className="w-20 h-20 mb-6 border-4 border-indigo-600 rounded-full"
                            />
                            <h3 className="mb-4 text-2xl font-semibold text-gray-900">{review.name}</h3>
                            <div className="flex mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-6 h-6 text-yellow-400"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 15l-5.878 3.09L5.486 10 0 6.09 6.121 5.454 10 0l3.879 5.454L20 6.09 14.514 10l1.364 8.09z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-lg italic text-gray-600">"{review.comment}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
