import React, { useState, useEffect } from 'react';
import LandingPage from './vendorDashboard/pages/LandingPage';
import NoFound from './vendorDashboard/components/NoFound';
import { Routes, Route } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import './App.css';

export default function App() {
  const [loadingApp, setLoadingApp] = useState(true);

  // Simulate loading effect
  useEffect(() => {
    // Simulate an API call or some async task
    const timer = setTimeout(() => {
      setLoadingApp(false);
    }, 1000); // Change this duration as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loadingApp ? (
        <div className="spinner-container">
       <TailSpin
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  />
        </div>
      ) : (
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/*' element={<NoFound />} />
        </Routes>
      )}
    </div>
  );
}
