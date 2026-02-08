import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Untuk animasi
import Sidebar from '../components/Common/Sidebar';
import ChatWindow from '../components/Chat/ChatWindow';

export default function Chat() {
    return (
        <div style={appLayout}>
            {/* Sidebar Kiri - Daftar Teman & Grup */}
            <Sidebar />

            {/* Area Chat Utama */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                style={chatArea}
            >
                <ChatWindow />
            </motion.div>
        </div>
    );
}

const appLayout = {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#1e1e2e', // Tema Gelap Modern
    color: '#fff'
};

const chatArea = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
};
