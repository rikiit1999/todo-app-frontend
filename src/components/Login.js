import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            
            if (response.status === 200) {   
                const token = response.data.token;
                localStorage.setItem('authToken', token);                        
                onLoginSuccess();                
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log("Invalid username or password.");
            } else {
                console.error("Login error:", error);
                console.log("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="input-field"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="input-field"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="submit-button">Login</button>
            </form>
        </div>
    );
}

export default Login;