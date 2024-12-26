import React, { useState, useContext, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext/AuthProvider";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import auth from "../../firebase/firebase.init";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {

    useEffect(() => {
        document.title = "Login";
    }, []);

    
    const { user, loading } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate(); // Initialize the navigate function

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            toast.success("Logged in successfully!");
            navigate("/"); // Redirect to the dashboard or another page
        } catch (error) {
            toast.error(error.message || "Login failed.");
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            toast.success("Logged in with Google!");
            navigate("/dashboard"); // Redirect after Google login
        } catch (error) {
            toast.error(error.message || "Google login failed.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="mb-6 text-2xl font-bold text-center text-blue-600">
                    Log In to QuillStacks
                </h2>

                {/* Email and Password Form */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block mb-2 font-medium text-gray-700"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block mb-2 font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        Log In
                    </button>
                </form>

                {/* Google Login */}
                <div className="my-4 text-center">
                    <span className="text-gray-500">OR</span>
                </div>
                <button
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center w-full py-3 mb-4 text-white transition bg-red-500 rounded-lg hover:bg-red-600"
                >
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path d="M23.492 12.282c0-.816-.066-1.605-.19-2.365H12.245v4.48h6.331c-.273 1.468-1.092 2.71-2.338 3.547v2.94h3.77c2.21-2.037 3.484-5.042 3.484-8.602z" />
                        <path d="M12.244 24c3.159 0 5.812-1.043 7.75-2.826l-3.77-2.94c-1.043.7-2.37 1.114-3.98 1.114-3.062 0-5.662-2.07-6.589-4.847H2.587v3.043C4.516 21.26 8.065 24 12.244 24z" />
                        <path d="M5.655 14.501c-.241-.7-.379-1.448-.379-2.221s.138-1.52.379-2.22V7.217H2.587C1.935 8.539 1.594 10.12 1.594 11.78s.34 3.241.993 4.562l3.068-2.841z" />
                        <path d="M12.244 4.845c1.72 0 3.263.592 4.476 1.76l3.358-3.358C17.833 1.215 15.18 0 12.244 0 8.065 0 4.516 2.74 2.587 6.217l3.068 2.841c.927-2.777 3.527-4.847 6.589-4.847z" />
                    </svg>
                    Log In with Google
                </button>

                {/* Redirect to Register */}
                <div className="text-center">
                    <p className="text-gray-600">
                        Don’t have an account?{" "}
                        <a
                            href="/register"
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Register here
                        </a>
                    </p>
                </div>
            </div>

            {/* Toast Notifications */}
            <ToastContainer />
        </div>
    );
};

export default Login;
