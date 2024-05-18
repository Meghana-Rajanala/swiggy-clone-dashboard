import React from 'react'

export default function Navbar({showLoginHandler,showRegisterHandler,showWelcomeHandler,showLogOut,logOutHandler}) {
    const firmName = localStorage.getItem('firmName');
  return (
    <>
      <div className='navSection'>
        <div className='company' onClick={showWelcomeHandler}>
            Vendor Dashboard
        </div>
        <div >
             <h4>Restaurant : {firmName}</h4> 
        </div>
        <div className="userAuth">
        { showLogOut ? (
        <span onClick={logOutHandler}>Logout</span>
      ) : (
        <>
          <span onClick={showLoginHandler}>Login /</span>
          <span onClick={showRegisterHandler}>Register</span>
        </>
      )}
            
           
        </div>
      </div>
    </>
  )
}
