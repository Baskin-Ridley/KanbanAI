import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import Message from '../../components/Message';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, role, name, email }),
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data.user);
                navigate('/login');
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError('Error registering user');
            console.error('Error registering user:', error);
        }
    };

    return (
        <main className="w3-container w3-center">
            <h2>Register</h2>
            {/* {error && <p className="w3-text-red">{error}</p>} */}
            <Message message={error} type="error" />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="w3-input w3-margin-bottom"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    className="w3-input w3-margin-bottom"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    className="w3-input w3-margin-bottom"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    className="w3-input w3-margin-bottom"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <select name="role" id="role" 
                    className="w3-input w3-margin-bottom" 
                    onChange={(e) => setRole(e.target.value)}>
                    <option value="leader">Leader</option>
                    <option value="member">Member</option>
                </select>
                <button type="submit" className="w3-button w3-black">
                    Register
                </button>
            </form>
        </main>
    );
};

export default Login;
