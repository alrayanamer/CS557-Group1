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
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
              <input placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required /><br /><br />
              <input placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required /><br /><br />
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
              <button type="submit">Register</button>
            </form>  
        </div>
    );
}
export default Register;