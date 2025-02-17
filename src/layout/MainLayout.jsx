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
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="bg-[rgba(255,255,255,1)] dark:bg-gray-900 dark:text-gray-300">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;
