import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    const slides = [
        {
            title: "Welcome to QuillStacks",
            description:
                "A modern library management system to simplify book borrowing and management. Explore a world of books at your fingertips!",
            image: "https://cdn.prod.website-files.com/604a97c70aee09eed25ce991/61897a35583a9b51db018d3e_MartinPublicSeating-97560-Importance-School-Library-blogbanner1.jpg",
        },
        {
            title: "Discover New Arrivals",
            description:
                "Stay updated with the latest additions to our library. New books are added regularly to keep you engaged and inspired.",
            image: "https://www.theinsidepress.com/v1676829811/wp-content/uploads/2023/02/IMG_0753-768x512.jpg",
        },
        {
            title: "Seamless Borrowing",
            description:
                "Borrow and return books effortlessly with our user-friendly interface. QuillStacks makes managing your library experience a breeze.",
            image: "https://www.reganagency.com/wp-content/uploads/2023/10/Important-Cleaning-Procedures-for-Libraries-e1551114194622.jpg",
        },
    ];

    return (
        <div className="mb-20">
            {/* Ensure full width */}
            <div className="overflow-hidden">
                <Slider {...settings}>
                    {slides.map((slide, index) => (
                        <div key={index} className="relative w-screen">
                            {/* Slide Image */}
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="object-cover w-full h-[500px] md:h-[600px] lg:h-[700px] shadow-lg"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 via-transparent to-black/10"></div>

                            {/* Text Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                                <h2 className="mb-4 text-4xl font-bold tracking-wide md:text-5xl">
                                    {slide.title}
                                </h2>
                                <p className="max-w-xl px-4 text-lg font-medium leading-relaxed">
                                    {slide.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Banner;
