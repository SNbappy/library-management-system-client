import React from "react";

const WhyChoose = () => {
    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto text-center">
                <h2 className="mb-6 text-3xl font-bold">Why Choose QuillStacks?</h2>
                <p className="mb-8 text-gray-600">
                    QuillStacks revolutionizes the way you manage your library, making it
                    efficient, modern, and hassle-free.
                </p>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {/* Feature 1 */}
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h3 className="mb-4 text-xl font-bold">User-Friendly Interface</h3>
                        <p className="text-gray-600">
                            Our intuitive design ensures you can easily browse, borrow, and
                            return books without any technical hassles.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h3 className="mb-4 text-xl font-bold">Real-Time Updates</h3>
                        <p className="text-gray-600">
                            Get real-time updates on book availability and borrow/return
                            statuses, ensuring a seamless experience.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h3 className="mb-4 text-xl font-bold">Secure and Reliable</h3>
                        <p className="text-gray-600">
                            Your data is protected with industry-standard security measures
                            for worry-free management.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChoose;
