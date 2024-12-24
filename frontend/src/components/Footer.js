'use client';

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '@/styles/Footer.css';

export default function Footer(){
    const {user} = useContext(AuthContext);

    return(
        <div className='footer'>
        { user!=null ? (
            <h3>Current User: {user.username}</h3>    
        ) : (
            <h3></h3>
        )}
            
        </div>
    )
}