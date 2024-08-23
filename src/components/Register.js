import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = ({ onRegisterSuccess, switchToLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                username,
                password
            });

            if (response.status === 200) {
                onRegisterSuccess();
            }
        } catch (err) {
            setError('Register failed. Pls try again.');
            console.error(err);
        }
    };

    return (
        <div className="register-form">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    className="input-field"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    className="input-field"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className="submit-button">Register</button>
            </form>
            <div className="login-link">
                <p>Already have an account? 
                    <button onClick={switchToLogin} className="link-button">Login here.</button>
                </p>
            </div>
        </div>
    );
};

export default Register;