import React, { useState } from 'react';
import { API_URL } from '../../apihelpers/api';

export default function AddFirm() {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [image, setImage] = useState(null);

  const handleFirmSubmit= async(e)=>{
    e.preventDefault();

try {
    const loginToken = localStorage.getItem('loginToken');
    if(!loginToken){
        console.error("User not authenticated");
    }

    const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      formData.append('offer', offer);
      formData.append('image', image)

      category.forEach((value)=>{
        formData.append('category', value)
      });
      region.forEach((value)=>{
        formData.append('region', value)
      })

      const response = await fetch(`${API_URL}/firm/add-firm`,{
        method:'POST',
        headers:{
          'token': `${loginToken}`
        },
        body: formData
      });
      const data = await response.json()
     
      if(response.ok){
        console.log(data);
        setFirmName("");
        setArea("")
        setCategory([]);
        setRegion([]);
        setOffer("");
        setImage(null)
        alert("Firm added Successfully")
      
      }else if(data.message === "vendor can have only one firm"){
          alert("Firm Exists 🥗. Only 1 firm can be added  ")
      } else{
          alert('Failed to add Firm')
      }
      const mango = data.firmId;
      const vendorRestuarant = data.firmname
      console.log(vendorRestuarant)
      localStorage.setItem('firmId', mango);
      localStorage.setItem('firmName', vendorRestuarant)
     window.location.reload()
     
} catch (error) {
  console.error("failed to add Firm")
  alert("failed to add Firm")
} 
}

  
  

  const handleCategoryChange = (event) => {
    const val = event.target.value;
    if (category.includes(val)) {
      setCategory(category.filter((item) => item !== val));
    } else {
      setCategory([...category, val]);
    }
  };

  const handleRegionChange = (event) => {
    const val = event.target.value;
    if (region.includes(val)) {
      setRegion(region.filter((item) => item !== val));
    } else {
      setRegion([...region, val]);
    }
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div className='firmSection'>
      <form className='firmtable' onSubmit={handleFirmSubmit}>
        <div className="form-outline mb-1 mt-2">
          <h4 className='text-center'>ADD RESTAURANT</h4>
          <label className="form-label">Restaurant Name</label>
          <input type='text' className="form-control" name="firmName" placeholder='Enter name of restaurant' value={firmName} onChange={(e) => {
            setFirmName(e.target.value);
          }} />
        </div>
        <div className="form-outline mb-1 ">
          <label className="form-label">Area</label>
          <input type="text" name='area' className="form-control" placeholder='Enter Area' value={area} onChange={(e) => {
            setArea(e.target.value);
          }} />
        </div>
        <div className="form-outline mb-1 ">
          <label className="form-label">Category</label><br />
          <label><input type="checkbox" checked={category.includes('veg')} value='veg' onChange={handleCategoryChange} /> Veg </label>
          <label><input type="checkbox" checked={category.includes('non-veg')} value='non-veg' onChange={handleCategoryChange} /> Non Veg</label>
        </div>
        <div className="form-outline mb-1 ">
          <label className="form-label">Region</label><br />
          <label><input type="checkbox" checked={region.includes('North Indian')} onChange={handleRegionChange} value='North Indian' /> North Indian </label>
          <label><input type="checkbox" checked={region.includes('South Indian')} onChange={handleRegionChange} value='South Indian' /> South Indian</label>
          <label><input type="checkbox" checked={region.includes('chinese')} onChange={handleRegionChange} value='chinese' /> Chinese</label>
          <label><input type="checkbox" checked={region.includes('bakery')} onChange={handleRegionChange} value='bakery' /> Bakery</label>
        </div>
        <div className="form-outline mb-1 ">
          <label className="form-label">Offer</label>
          <input type='text' className="form-control" name="offer" placeholder='Enter offer' value={offer} onChange={(e) => {
            setOffer(e.target.value);
          }} />
        </div>
        <div className="form-outline mb-1 ">
          <label className="form-label">Restaurant Photo</label>
          <input type="file" className="form-control" name="image"  onChange={handleImageUpload} />
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-1 mt-1">Submit</button>
      </form>
    </div>
  );
}
