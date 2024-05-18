import React, { useEffect } from 'react';
import { API_URL } from '../apihelpers/api';
import { FallingLines } from 'react-loader-spinner'

export default function AllProducts() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true); // Added to handle loading state
  

  const productHandler = async () => {
    const firmId = localStorage.getItem('firmId');
    try {
      const res = await fetch(`${API_URL}/product/${firmId}/get-products`);
      
      if (res.ok) {
        const newProductsData = await res.json();
        console.log(newProductsData.products)
        setProducts(newProductsData.products || []); // Ensure products is an array
      }
    } catch (error) {
      console.error('Failed to fetch products', error);
      alert('Failed to fetch products');
    } finally {
      setLoading(false); // Set loading to false after the fetch attempt
    }
  };

  useEffect(() => {
    productHandler();
  }, []);

  const deleteProductHandler = async (id) => {
    const shouldDelete = confirm('Are you sure? You want to delete');
    if (!shouldDelete) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/product/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProducts(products.filter(product => product._id !== id));
        alert('Product deleted successfully');
      } else {
        console.error('Failed to delete product');
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product');
    }
  };

  return (
    <div className="container mt-5 mx-5">
      {loading ? ( <div className="spinner-container">
      <FallingLines
      color="#4fa94d"
      width="100"
      visible={true}
      ariaLabel="falling-circles-loading"
      />
      </div>
      ) : products.length === 0 ? (
        <p>No product added</p>
      ) : (
        <table className='table table-bordered'>
          <thead className='table-primary text-center'>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="text-center">{product.productName}</td>
                <td className="text-center">{product.price}</td>
                <td className="text-center">{product.category.join(',')}</td>
                <td className="d-flex justify-content-center">
                  <img
                    src={`${API_URL}/uploads/${product.image}`}
                    alt={product.productName}
                    style={{ width: '50px', height:'50px'  }}
                  />
                </td>
                <td className="text-center">
                  <button className="btn btn-danger" onClick={() => deleteProductHandler(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
