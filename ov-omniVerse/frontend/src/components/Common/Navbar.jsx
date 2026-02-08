import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav style={{ padding: '15px', background: '#333', color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>OmniVerse</Link>
            <div>
                {token ? (
                    <button onClick={logout}>Logout</button>
                ) : (
                    <>
                        <Link to="/login" style={{ color: '#fff', marginRight: '10px' }}>Login</Link>
                        <Link to="/register" style={{ color: '#fff' }}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
