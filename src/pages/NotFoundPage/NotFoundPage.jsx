import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {

    useEffect(() => {
        document.title = "404 Not Found";
    }, []);

    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-lg p-8 text-center rounded-lg shadow-lg bg-white/90 backdrop-blur-md">
                <h1 className="font-bold text-transparent text-8xl bg-clip-text bg-[#003366]">
                    404
                </h1>
                <p className="mt-4 text-lg text-gray-700">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <p className="mt-2 text-sm text-gray-500">
                    It seems you’ve wandered off the map.
                </p>
                <div className="mt-6">
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-3 text-white transition transform bg-[#003366] rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105"
                    >
                        Go Home
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 ml-4 text-[#003366] transition transform bg-white border border-[#003366] rounded-lg shadow-lg hover:bg-blue-300 hover:scale-105"
                    >
                        Back
                    </button>
                </div>
                <img
                    src="https://i.imgur.com/qIufhof.png"
                    alt="Lost in Space"
                    className="w-64 mx-auto mt-8 opacity-80"
                />
            </div>
        </div>
    );
};

export default NotFoundPage;
