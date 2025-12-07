import React, { useState } from 'react';
import { register } from '../services/auth';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register({ first_name: firstName, last_name: lastName, email, password });
            alert('Registration successful');
        } catch (error) {
            alert('Registration failed');
            console.error(error);
        }
    };
    return (
        <div className="app-container">
            <div className="app-header"><div className="brand"><h1>Create an Account</h1></div></div>
            <div className="card">
            <form onSubmit={handleRegister} className="auth-form">
              <input placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
              <input placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div style={{marginTop:10}}>
                <button className="btn-primary" type="submit">Register</button>
              </div>
            </form>
            </div>
        </div>
    );
}
export default Register;