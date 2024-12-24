'use client';

import { useState, useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import API from '../../utils/api';
import '@/styles/Login.css';

export default function LoginPage() {
    const {login} = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await API.post('/auth/login', {username, password });
            console.log(response.data.access_token);
            login(response.data.access_token);
            window.location.href = '/';
        } catch(err){
            setError('Invalid Credentials here',err );
        }
    };

    return (
        <div className="login-container">
    <h1 className="login-title">Login</h1>
    <form onSubmit={handleSubmit} className="login-form">
        <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="login-input"
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
        {error && <p className="login-error">{error}</p>}
    </form>
</div>

    );
}