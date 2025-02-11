import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-white">
            <ScaleLoader color="#003366" loading={true} size={100} />
        </div>
    );
};

export default Loader;
