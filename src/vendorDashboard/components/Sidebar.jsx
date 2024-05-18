import React from 'react';

export default function Sidebar({ showFirmHandler, showProductHandler, showAllProductsHandler, showFirmTitle }) {
  return (
    <div className='sideBarSection'>
      <ul>
        {showFirmTitle ? (<li onClick={showFirmHandler}>ADD FIRM</li>) : " "}
        <li onClick={showProductHandler}>ADD PRODUCTS</li>
        <li onClick={showAllProductsHandler}>ALL PRODUCTS</li>
      </ul>
    </div>
  );
}
