import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>Selamat Datang di OmniVerse! 🚀</h1>
      <p>Ini adalah halaman utama aplikasi Anda yang sudah berhasil online.</p>
      
      <div style={{ marginTop: '20px' }}>
        <Link to="/login" style={buttonStyle}>Login</Link>
        <Link to="/register" style={buttonStyle}>Daftar Sekarang</Link>
      </div>
    </div>
  );
}

const buttonStyle = {
  margin: '10px',
  padding: '10px 20px',
  backgroundColor: '#0070f3',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '5px',
  display: 'inline-block'
};
