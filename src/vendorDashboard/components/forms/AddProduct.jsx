import React, { useState } from 'react'
import { API_URL } from '../../apihelpers/api';

export default function AddProduct() {
  const [productName,setproductName]= useState("");
  const [price,setPrice] = useState(0);
  const [category,setCategory] = useState([]);
  const [bestSeller,setBestSeller] = useState(false);
  const [description,setDesription] = useState("")
  const [image,setImage] = useState(null);

  const handleProductSubmit = async (e)=>{
    e.preventDefault();
    const loginToken = localStorage.getItem('loginToken');
    const firmId = localStorage.getItem('firmId');
    console.log(firmId);
    if(!loginToken || firmId === undefined){
      alert("Please login to add product")
    }
    try {
      const productData = new FormData()
      productData.append('productName',productName);
      productData.append('price',price);
      category.forEach((value)=>{
        productData.append('category',value);
      })
      productData.append('bestSeller',bestSeller);
      productData.append('description',description)
      productData.append('image',image)
      const response = await fetch(`${API_URL}/product/add-product/${firmId}`,{
        method:'POST',
        body:productData
      })
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("Product Added Successfully");
        setproductName("");
        setPrice(0);
        setCategory([]);
        setBestSeller(false);
        setDesription("");
        setImage(null);
       
      }
    } catch (error) {
      console.error("Failed to Add Product", error);
      alert("Failed to Add Product");
    }
  }

  const handleBestSeller = (event) => {
    const val = event.target.value === 'true';
    setBestSeller(val);
  };
  const handleCategoryChange = (event) => {
    const val = event.target.value;
    if (category.includes(val)) {
      setCategory(category.filter((item) => item !== val));
    } else {
      setCategory([...category, val]);
    }
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div className='productSection'>
        <form className='producttable' onSubmit={handleProductSubmit}>
       
        <div className="form-outline mb-1 mt-2">
        <h4 className='text-center'>ADD PRODUCT</h4>
            <label className="form-label">Product Name</label>
            <input type='text' className="form-control" placeholder='Enter name of product' value={productName} onChange={(e)=>{setproductName(e.target.value)}}/>
            </div>
            <div className="form-outline mb-1 ">
            <label className="form-label">Price</label>
            <input type="number" className="form-control" placeholder='Enter Price'value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
            </div>
            <div className="form-outline mb-1 ">
            <label className="form-label">Category</label><br/>
            <label><input type="checkbox" name="category" checked={category.includes('veg')}  onChange={handleCategoryChange} value="veg"/> Veg </label>
            <label><input type="checkbox" name="category" checked={category.includes('non-veg')}  onChange={handleCategoryChange} value="non-veg"/> Non Veg</label>
            </div>
           
            <div className="form-outline mb-1">
          <label className="form-label">Best Seller</label><br />
          <label><input type="radio" name="bestSeller" value="true" checked={bestSeller === true} onChange={handleBestSeller} /> Yes </label>
          <label><input type="radio" name="bestSeller" value="false" checked={bestSeller === false} onChange={handleBestSeller} /> No </label>
        </div>
            <div className="form-outline mb-1 ">
            <label className="form-label">Description</label>
            <input type='textarea' className="form-control" placeholder='Enter description' value={description} onChange={(e)=>{setDesription(e.target.value)}}/>
            </div>
            <div className="form-outline mb-1 ">
            <label className="form-label">Product Image</label>
            <input type="file" className="form-control" name="image" onChange={handleImageUpload} />
            </div>
           <button type="submit"  className="btn btn-primary btn-block mb-1 mt-1">Submit</button>
        </form>
    </div>
  )
}
