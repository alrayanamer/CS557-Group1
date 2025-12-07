import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            const user = response.data;
            localStorage.setItem('currentUser', JSON.stringify(user));
            if(user.role==='admin') navigate('/admin');
            else navigate('/user');
        } catch (error) {
            alert('Login failed');
            console.error(error);
        }
    };
    return (
        <div className="app-container">
            <div className="app-header"><div className="brand"><h1>Library Login</h1></div></div>
            <div className="card">
            <h2 className="muted">Login</h2>
            <form onSubmit={handleLogin} className="auth-form">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br /><br />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <br /><br />
              <button className="btn-primary" type="submit">Login</button>
            </form>
            </div>
        </div>
    );
}
export default Login;