'use client';

import { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
}
);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // const router = useRouter();
    
    useEffect(() => {
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoxLCJyb2xlIjoidmlld2VyIiwiaWF0IjoxNzM0NjM3NDIzLCJleHAiOjE3MzQ2NDEwMjN9.QLw23htQAWxAG8k-TAd-NNDu_YbpKJjQseCZ600Hl2E';
            const token = localStorage.getItem('jwt');
            if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);
            }
            else{
                localStorage.removeItem('jwt');
                setUser(null);
            }
          // Clear any invalid token
    },[]);

    const login = (token) => {
        localStorage.setItem('jwt', token);
        const decoded = jwtDecode(token);
        setUser(decoded);
    }

    const logout = () => {
        localStorage.removeItem('jwt');
        setUser(null);
        window.location.href = '/'
    }

    return(
        <AuthContext.Provider value={{user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};