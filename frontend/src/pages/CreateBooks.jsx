import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const EditBooks = () => {
  const [itemCode, setItemCode] = useState('');
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // New state for success message
  const navigate = useNavigate();
  const { itemCode: routeItemCode } = useParams(); // Rename to avoid conflict

  useEffect(() => {
    if (!routeItemCode) {
      console.error('No itemCode provided in route parameters.');
      return;
    }

    setLoading(true);
    axios.get(`http://localhost:5555/inventory/${routeItemCode}`)
      .then((response) => {
        const { itemCode, productName, productCategory, Quantity, price } = response.data;
        setItemCode(itemCode);
        setProductName(productName);
        setProductCategory(productCategory);
        setQuantity(Quantity);
        setPrice(price);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console.');
        console.error(error);
      });
  }, [routeItemCode]);

  const handleUpdateBook = () => {
    const data = {
      itemCode,
      productName,
      productCategory,
      Quantity: Number(Quantity), // Convert to number
      price: Number(price) // Convert to number
    };

    setLoading(true);
    axios.post('http://localhost:5555/inventory', data)
      .then(() => {
        setLoading(false);
        setSuccessMessage('Item successfully updated!'); // Set success message
        setTimeout(() => {
          setSuccessMessage(''); // Clear the message after a few seconds
          navigate('/');
        }, 2000); // Redirect after 2 seconds
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console.');
        console.error(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Product</h1>
      {loading && <Spinner />}
      {successMessage && <div className='bg-green-100 text-green-700 p-4 rounded-md mb-4'>{successMessage}</div>} {/* Display success message */}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto bg-gray-100'> {/* Added bg-gray-100 for background color */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Item Code</label>
          <input
            type='text'
            value={itemCode}
            onChange={(e) => setItemCode(e.target.value)}
            className='border-2 border-gray-500 px-4 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Product Name</label>
          <input
            type='text'
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className='border-2 border-gray-500 px-4 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Product Category</label>
          <input
            type='text'
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className='border-2 border-gray-500 px-4 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Quantity</label>
          <input
            type='number'
            value={Quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className='border-2 border-gray-500 px-4 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Price</label>
          <input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='border-2 border-gray-500 px-4 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleUpdateBook}>
          Save+
        </button>
      </div>
    </div>
  );
};

export default EditBooks;
