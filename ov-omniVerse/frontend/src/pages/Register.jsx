import React, { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', formData);
            alert('Pendaftaran Berhasil! Silakan Login.');
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || 'Pendaftaran Gagal');
        }
    };

    return (
        <div style={containerStyle}>
            <h2>Daftar Akun Baru</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <input type="text" placeholder="Username" onChange={(e) => setFormData({...formData, username: e.target.value})} required />
                <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                <button type="submit">Daftar</button>
            </form>
        </div>
    );
}

const containerStyle = { padding: '50px', textAlign: 'center' };
const formStyle = { display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: 'auto', gap: '10px' };
