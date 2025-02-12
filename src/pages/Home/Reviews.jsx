import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

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
        <section className="mx-auto max-w-[1250px] mb-20">
            <div className="container">
                <div className="text-center">
                    {/* <h2 className="mb-2 text-3xl font-bold text-gray-800">What Our Users Say</h2>
                    <p className="text-gray-600">Hear from some of our happy users about their experience with QuillStacks.</p> */}
                    <h1 className="mb-5 text-4xl font-extrabold text-center text-[#003366]">
                        What Our Users Say
                    </h1>
                    <p className="mb-10 text-lg font-medium text-center text-gray-700">Hear from some of our happy users about their experience with QuillStacks.</p>
                </div>
                <Swiper
                    modules={[Autoplay]}
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="pb-10"
                >
                    {reviews.map((review, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex flex-col items-center p-6 text-center bg-white shadow-lg rounded-2xl">
                                <div className="w-16 h-16 overflow-hidden border-4 border-[#003366] rounded-full">
                                    <img src={review.avatar} alt={review.name} className="object-cover w-full h-full" />
                                </div>
                                <FaQuoteLeft className="my-4 text-3xl text-[#003366]" />
                                <p className="text-lg italic text-center text-gray-600">"{review.comment}"</p>
                                <h3 className="mt-3 text-lg font-semibold text-gray-800">{review.name}</h3>
                                <div className="flex mt-2">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <FaStar key={i} className="text-yellow-400 text-xl mx-0.5" />
                                    ))}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="flex">
                <button className="mx-auto text-xl font-bold text-center bg-[#003366] text-white rounded-full px-8 py-2 mt-10">See All Review</button>
            </div>
        </section>
    );
};

export default Reviews;