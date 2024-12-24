'use client';

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({children}) => {
    const {user} = useContext(AuthContext);

    if(!user) {
        if( typeof window !== "undefined") {
            window.location.href='/login';
        }
        return null;
    }

    return children;
}

export default ProtectedRoute;