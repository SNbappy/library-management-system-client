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
        <section className="py-12 bg-blue-50">
            <div className="container mx-auto text-center">
                <h2 className="mb-6 text-3xl font-bold">What Our Users Say</h2>
                <p className="mb-8 text-gray-600">
                    Hear from some of our happy users about their experience with
                    QuillStacks.
                </p>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md"
                        >
                            <img
                                src={review.avatar}
                                alt={review.name}
                                className="w-16 h-16 mb-4 rounded-full"
                            />
                            <h3 className="text-lg font-bold">{review.name}</h3>
                            <div className="flex mt-2 mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-5 h-5 text-yellow-500"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 15l-5.878 3.09L5.486 10 0 6.09 6.121 5.454 10 0l3.879 5.454L20 6.09 14.514 10l1.364 8.09z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-sm text-center text-gray-600">
                                "{review.comment}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
