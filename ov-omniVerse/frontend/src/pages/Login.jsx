import React, { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/auth/login', formData);
            localStorage.setItem('token', data.token); // Simpan token
            alert('Login Berhasil!');
            navigate('/chat'); // Pindah ke halaman chat
        } catch (err) {
            alert(err.response?.data?.message || 'Login Gagal');
        }
    };

    return (
        <div style={containerStyle}>
            <h2>Login ke OmniVerse</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                <button type="submit">Masuk</button>
            </form>
        </div>
    );
}

const containerStyle = { padding: '50px', textAlign: 'center' };
const formStyle = { display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: 'auto', gap: '10px' };
