import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 
import BackButton from '../../components/InventoryBackButton';
import Spinner from '../../components/Spinner';

const ShowBooks = () => {
  const [inventory, setInventory] = useState({});
  const [loading, setLoading] = useState(false);
  const { itemCode } = useParams();
  const [user, setUser] = useState(null); // State to store logged-in user
  const [orderAmount, setOrderAmount] = useState(0); // State for order quantity
  const [orderUnit, setOrderUnit] = useState('cm'); // State for order unit, default to 'cm'

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); // Assuming user info is stored as JSON
    }

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



  const handleGenerateReport = () => {
    if (orderAmount <= 0 || !orderUnit) {
      alert('Please enter a valid quantity and unit for the reorder.');
      return;
    }
    
    const doc = new jsPDF();
    
    // Setting the header font and title
    doc.setFontSize(18);
    doc.text('Alpha Apparel (PVT) LTD', 14, 22);
    doc.setFontSize(15);
    doc.text('Re-Order Item Report', 14, 35);
    
    // Adding product details as a card view style
    doc.setFontSize(15);
    
    // Drawing a card-like rectangle
    doc.setDrawColor(0); // Set border color
    doc.setFillColor(240, 240, 240); // Light gray background for the card
    doc.rect(14, 40, 200, 80, 'FD'); // x, y, width, height, style (FD = fill and draw)
    
    // Content inside the card (left-aligned text)
    doc.setTextColor(0, 0, 0); // Black text
    doc.text(`Item Code: ${inventory.itemCode}`, 20, 50);
    doc.text(`Product Name: ${inventory.productName}`, 20, 60);
    doc.text(`Product Category: ${inventory.productCategory}`, 20, 70);
    doc.text(`Quantity to Order: ${orderAmount}`, 20, 80);
    doc.text(`Unit: ${orderUnit}`, 20, 90);
    
    // Adding a footer or signature space
    doc.setFontSize(13);
    doc.text('Prepared by:', 20, 110);
    doc.text(user ? user.name : 'Inventory Manager', 60, 110);

    
    // Save the document as PDF
    doc.save(`reorder_report_${inventory.itemCode}.pdf`);
  };
  
  
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="brand">
          <img src='/company-logo.png' className='company-logo' alt='company-logo'></img>
        </div>
        <nav>
        <div className='nav-dept'><Link to="/"><img src='/public/home.png' className='icon' alt='Home' /> Home</Link></div>
          <div className='nav-dept'><Link to="/inventory/home"><img src='/public/inventory.png' className='icon' alt='Inventory' /> Inventory</Link></div>
          <div className='nav-dept'><Link to=""><img src='/public/tshirt.png' className='icon' alt='Design' /> Design</Link></div>
          <div className='nav-dept'><Link to=""><img src='/public/orders.png' className='icon' alt='Orders' /> Orders</Link></div>
          <div className='nav-dept'><Link to=""><img src='/public/supplier.png' className='icon' alt='Supplier' /> Supplier</Link></div>
          <div className='nav-dept'><Link to=""><img src='/public/marketing.png' className='icon' alt='Marketing' /> Marketing</Link></div>
          <div className='nav-dept'><Link to=""><img src='/public/human-resource.png' className='icon' alt='Human Resource' /> Human Resource</Link></div>
          <div className='nav-dept financial'>
            <Link to="">
              <img src='/public/financial.png' className='icon' alt='Financial' /> Financial
            </Link>
            <div className='dropdown'>
              <Link to="/fundRequests/create">Request Fund</Link>
              <Link to="">Finance Dashboard</Link>
            </div>
          </div>
          <div className='nav-dept'><Link to="/transport/home"><img src='/public/transport.png' className='icon' alt='Transport' /> Transport</Link></div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="flex justify-between items-center p-4">
          <h1 className='text-3xl font-bold company-name'>Alpha Apperals PVT LTD</h1>
          {user && (
            <div className="user-info">
              <span className="text-lg text-gray-700">Logged in as: {user.name}</span>
            </div>
          )}
        </header>
        <div className='button-container'></div>
        <div className='main-content p-4'>
          <BackButton />
          <h1 className='text-3xl my-4 text-center'>View Product</h1>

          {loading ? (
            <Spinner />
          ) : (
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4 max-w-md'>
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
                  <span className='text-xl mr-4 text-gray-500'>Product Description:</span>
                  <span>{inventory.productDescription}</span>
                </div>
                <div className='my-4'>
                  <span className='text-xl mr-4 text-gray-500'>Selling Price:</span>
                  <span>{inventory.price}</span>
                </div>
                <div className='my-4'>
                  <span className='text-xl mr-4 text-gray-500'>Quantity Available:</span>
                  <span>{inventory.Quantity} {inventory.unit}</span>
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
              {/* Reorder Section */}
              <div className='my-4'>
                <h2 className='text-2xl mb-2'>Reorder Section</h2>
                <input
                  type='number'
                  value={orderAmount}
                  onChange={(e) => setOrderAmount(e.target.value)}
                  placeholder='Enter quantity to order'
                  className='border p-2 rounded w-full'
                />
                <select
                  value={orderUnit}
                  onChange={(e) => setOrderUnit(e.target.value)}
                  className='border p-2 rounded w-full mt-2'
                >
                  <option value='cm'>cm</option>
                  <option value='m'>m</option>
                  <option value='yards'>yards</option>
                  <option value='items'>items</option>
                </select>
                <button
                  onClick={handleGenerateReport}
                  className='bg-blue-500 text-white p-2 rounded mt-2 w-full'
                >
                  Generate Reorder Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowBooks;
