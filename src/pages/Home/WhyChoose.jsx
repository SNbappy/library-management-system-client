import React from "react";

const WhyChoose = () => {
    return (
        <section className="mb-20">
            <div className="container mx-auto text-center max-w-[1250px] px-4 md:px-6 lg:px-8 xl:px-0">
                {/* <h2 className="text-4xl font-extrabold text-[#003366]">Why Choose QuillStacks?</h2>
                <p className="text-lg">
                    QuillStacks transforms library management into a seamless, modern experience with intuitive features and real-time updates.
                </p> */}
                <h1 className="text-4xl font-extrabold text-center text-[#003366] mb-5">
                    Why Choose QuillStacks?
                </h1>
                <p className="mb-10 text-lg font-medium text-center text-gray-700">QuillStacks transforms library management into a seamless, modern experience with intuitive features and real-time updates.</p>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-3">
                    {/* Feature 1 */}
                    <div className="px-4 py-12 transition-transform duration-300 transform bg-white shadow-xl rounded-xl hover:scale-105 hover:shadow-2xl">
                        <div className="flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#003366]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h3m0 0h3m-3 0v3m-3-3v-3m-4 6h16M4 6h16" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">User-Friendly Interface</h3>
                        <p className="text-gray-600">
                            Navigate through a simple and intuitive design, making the process of browsing, borrowing, and returning books effortless.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="px-4 py-12 transition-transform duration-300 transform bg-white shadow-xl rounded-xl hover:scale-105 hover:shadow-2xl">
                        <div className="flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l2 2-2 2m4-4l2 2-2 2m-8 4h5l-2 2m-5-2H5l2-2m3 3V3" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Real-Time Updates</h3>
                        <p className="text-gray-600">
                            Receive instant notifications on the availability of books, and track your borrowing and returning status with ease.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="px-4 py-12 transition-transform duration-300 transform bg-white shadow-xl rounded-xl hover:scale-105 hover:shadow-2xl">
                        <div className="flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12h-6m0 0H7m12 0l-2 2m0 0l2 2m-6-4V7l-2-2M9 9l-2-2m0 0v5a5 5 0 014 4m0 0a5 5 0 01-5 5" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Secure and Reliable</h3>
                        <p className="text-gray-600">
                            Enjoy a worry-free experience with top-notch security protocols to ensure that your data and transactions are safe at all times.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChoose;
