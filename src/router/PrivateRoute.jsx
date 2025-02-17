import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <span className="loading loading-ring loading-lg"></span>;
    }

    if (user) {
        return children;
    }
    <Helmet>
        <title>Login | QuillStack</title>
    </Helmet>
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
