import React, { useState } from 'react';
import { API_URL } from '../../apihelpers/api';


export default function VendorRegister({showLoginHandler}) {

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        setError('');

        const payload = {
            username,
            email,
            password
        };


        try {
            const response = await fetch(`${API_URL}/vendor/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            
            const data = await response.json();

            if (response.ok) {
               
                alert("Vendor Registered successfully");
                setUserName('');
                setEmail('');
                setPassword('');
                showLoginHandler();
            } else {
             
                setError(data.message || 'Unable to do register');
            }
        } catch (error) {
          
            setError('Registration Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='registerSection'>
            <form className='AuthForm' onSubmit={handleSubmit}>
                <h2>Vendor Register</h2>
                
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
                <label className="form-label form-outline mb-4 mt-4">Username</label>
                <input 
                    type="text"  
                    className="form-control w-50" 
                    name="userName" 
                    placeholder='Enter username' 
                    value={username} 
                    onChange={(e) => setUserName(e.target.value)} 
                />

                <label className="form-label form-outline mb-4 mt-4">Email address</label>
                <input 
                    type="email"  
                    className="form-control w-50" 
                    name="email" 
                    placeholder='Enter email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />

                <label className="form-label form-outline mb-4 mt-4">Password</label>
                <input 
                    type="password"  
                    className="form-control w-50" 
                    name='password' 
                    placeholder='Enter password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />

                <button type="submit" className="btn btn-primary mb-4 mt-3 mx-2" disabled={loading} >
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
}
