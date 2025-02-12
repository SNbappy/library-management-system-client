import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewsPage = () => {
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
            comment: "Great features and very user-friendly. The borrowing process is seamless.",
        },
        {
            name: "Emily Brown",
            avatar: "https://i.pravatar.cc/100?img=3",
            rating: 5,
            comment: "I love the real-time updates! It keeps everything organized and efficient.",
        },
        {
            name: "David Wilson",
            avatar: "https://i.pravatar.cc/100?img=4",
            rating: 4,
            comment: "Very useful for keeping track of borrowed books. Simple and effective!",
        },
        {
            name: "Sophia Martinez",
            avatar: "https://i.pravatar.cc/100?img=5",
            rating: 5,
            comment: "A must-have for any library. It saves so much time and effort!",
        },
        {
            name: "James Anderson",
            avatar: "https://i.pravatar.cc/100?img=6",
            rating: 5,
            comment: "Fantastic system! It has revolutionized the way we manage books.",
        },
    ];

    return (
        <section className="mx-auto max-w-[1250px] pt-28 pb-20">
            <div className="container">
                <h1 className="mb-5 text-4xl font-extrabold text-center text-[#003366]">What Our Users Say</h1>
                <p className="mb-10 text-lg font-medium text-center text-gray-700">Hear from some of our happy users about their experience with QuillStacks.</p>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                    {reviews.map((review, index) => (
                        <div key={index} className="flex flex-col items-center p-6 text-center bg-white shadow-lg rounded-2xl">
                            <div className="w-16 h-16 overflow-hidden border-4 border-[#003366] rounded-full">
                                <img src={review.avatar} alt={review.name} className="object-cover w-full h-full" />
                            </div>
                            <p className="text-lg italic text-center text-gray-600">"{review.comment}"</p>
                            <h3 className="mt-3 text-lg font-semibold text-gray-800">{review.name}</h3>
                            <div className="flex mt-2">
                                {[...Array(review.rating)].map((_, i) => (
                                    <FaStar key={i} className="text-yellow-400 text-xl mx-0.5" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReviewsPage;
