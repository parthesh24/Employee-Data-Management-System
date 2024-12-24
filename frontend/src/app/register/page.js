'use client';

import { useContext, useState } from "react";
import API from "@/utils/api";
import { AuthContext } from "@/context/AuthContext";
import '@/styles/Login.css';

export default function RegisterPage() {
    const {login} = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        if(password!==confirmPassword){
            setError("Passwords not matching.");
            return;
        }
        e.preventDefault();
        try{
            const response = await API.post('/auth/register', {username, password });
            alert("New User Created. Now you can login.")
            window.location.href = '/';
        } catch(err){
            setError('Invalid Credentials here',err);
        }
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Register</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) =>setUsername(e.target.value)}
                required
                className="login-input"
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>setPassword(e.target.value)}
                required
                className="login-input"
                />
                <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>setConfirmPassword(e.target.value)}
                required
                className="login-input"
                />
                <button type="submit" className="login-button">Register</button>
                {error && <p className="login-error">{error}</p>}
            </form>
        </div>
    )
}