import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import Loader from "../components/Loader";

const MainLayout = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Simulating data fetching time (adjust as needed)

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader />; // Show loader before rendering anything
    }

    return (
        <div className="bg-[#f7f7f7]">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;
