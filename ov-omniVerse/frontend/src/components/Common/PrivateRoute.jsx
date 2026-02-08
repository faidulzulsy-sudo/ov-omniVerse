import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Sesuaikan jalur ini dengan letak AuthContext Anda

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Tampilan saat mengecek status login
    }

    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
