import React from 'react'
import {Link} from 'react-router-dom'

export default function NoFound() {
  return (
    <>
    
    <div className='errorSection'>
    <Link to='/'><p style={{fontSize:'1.5rem',color:'blue',textDecorationColor:'blue',textDecorationLine:"underline"}}>Go Back</p></Link>
        <h1>404</h1>
        <div>Page not Found</div>
    </div>
    </>
  )
}
