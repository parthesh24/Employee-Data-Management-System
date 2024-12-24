'use client';

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';
import '@/styles/Navbar.css' 

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    return (
        <nav className='navbar'>
            <a href='/'><button className='logout-btn'>Home</button></a>
            {/* <span className='nav-seperator'>|</span> */}
            {user!=null ? (
                <button onClick={logout} className='logout-btn'>Logout</button>
            ) : (
                <a href="/login" className='nav-link'>Login</a>
            )}
        </nav>
    );
}
