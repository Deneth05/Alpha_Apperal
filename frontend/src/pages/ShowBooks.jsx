import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBooks = () => {
  const [inventory, setInventory] = useState({});
  const [loading, setLoading] = useState(false);
  const { itemCode } = useParams();

  useEffect(() => {
    if (!itemCode) {
      console.error("No itemCode provided in route parameters.");
      return;
    }

    setLoading(true);
    axios.get(`http://localhost:5555/inventory/${itemCode}`)
      .then((response) => {
        setInventory(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [itemCode]);

  return (
    <div className='p-4 flex justify-center items-center min-h-screen'>
      <BackButton />
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4 max-w-md'>
        <h1 className='text-3xl my-4 text-center'>View Product</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className='flex flex-col'>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Item Code:</span>
              <span>{inventory.itemCode}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Product Name:</span>
              <span>{inventory.productName}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Product Category:</span>
              <span>{inventory.productCategory}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Selling Price:</span>
              <span>{inventory.price}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Quantity:</span>
              <span>{inventory.Quantity}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Create Time:</span>
              <span>{inventory.createdAt ? new Date(inventory.createdAt).toString() : 'N/A'}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Last Update Time:</span>
              <span>{inventory.updatedAt ? new Date(inventory.updatedAt).toString() : 'N/A'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowBooks;
