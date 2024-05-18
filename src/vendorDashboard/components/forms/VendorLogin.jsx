import React, { useState } from 'react';
import { API_URL } from '../../apihelpers/api';
import {CirclesWithBar} from 'react-loader-spinner';

export default function VendorLogin({ showWelcomeHandler }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loadingLogin,setloadingLogin]=useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setloadingLogin(true);
    const payload = {
      email,
      password
    };

    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log(data)

      if (response.ok) {
        setloadingLogin(false);
        alert("Vendor Login successfully");
      
        localStorage.setItem('loginToken', data.jwttoken);
        setEmail('');
        setPassword('');
        showWelcomeHandler();
     
      } else {
        setError(data.message || 'Username or Password is wrong');
      }

      const vendorId = data.vendorId;
   
      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
      window.location.reload();
      const vendorData = await vendorResponse.json();
      if (vendorResponse.ok){
    const vendorFirmId = vendorData.vendorFirmId;
    const vendorFirmName = vendorData.vendor.firm[0].firmName;
    localStorage.setItem('firmId', vendorFirmId);
    localStorage.setItem('firmName', vendorFirmName);
}
    } catch (error) {
      setError('Login Failed');
      alert("Login expired");
      setloadingLogin(false);
    }
  };

  return (
    <div className='loginSection'>
      {loadingLogin ? (
        <div className="spinner-container">
          <CirclesWithBar
            color="#4fa94d"
            width="100"
            visible={true}
            ariaLabel="circles-with-bar-loading"
          />
        </div>
      ) :(
      <form className='AuthForm' onSubmit={handleLogin}>
        <h2>Vendor Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <label className="form-label form-outline mb-4 mt-4">Email address</label>
        <input type="email" name='email' className="form-control w-50" placeholder='Enter email' value={email} onChange={(e) => {
          setEmail(e.target.value);
        }} autoComplete="email" />
        <label className="form-label form-outline mb-4 mt-4">Password</label>
        <input type="password" name='password' className="form-control w-50" placeholder='Enter password' value={password} onChange={(e) => {
          setPassword(e.target.value);
        }}  autoComplete="current-password"/>
        <button type="submit" className="btn btn-primary mt-3 mb-4">Sign in</button>
      </form>
      )}
    </div>
  );
}
