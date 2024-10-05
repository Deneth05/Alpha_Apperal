import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete, MdSearch } from 'react-icons/md';
import Spinner from '../components/Spinner';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Home = () => {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/inventory')
      .then((response) => {
        setInventory(response.data.data);
        setFilteredInventory(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredInventory(inventory);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = inventory.filter(item =>
        item.itemCode.toLowerCase().includes(query) ||
        item.productName.toLowerCase().includes(query) ||
        item.productCategory.toLowerCase().includes(query)
      );
      setFilteredInventory(filtered);
    }
  }, [searchQuery, inventory]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Alpha Aperal(PVT)LTD', 14, 22);
    doc.text('Inventory Report', 14, 30);

    const columns = [
      { title: 'Item Code', dataKey: 'itemCode' },
      { title: 'Product Name', dataKey: 'productName' },
      { title: 'Product Category', dataKey: 'productCategory' },
      { title: 'Selling Price', dataKey: 'price' },
      { title: 'Quantity', dataKey: 'Quantity' }
    ];

    const data = filteredInventory.map(item => ({
      itemCode: item.itemCode,
      productName: item.productName,
      productCategory: item.productCategory,
      price: item.price,
      Quantity: item.Quantity
    }));

    doc.autoTable(columns, data, { startY: 40 });
    doc.save('inventory_report.pdf');
  };

  const deductQuantity = (itemCode) => {
    const deductionQty = parseInt(prompt('Enter the quantity to deduct:'), 10);
    if (!isNaN(deductionQty) && deductionQty > 0) {
      const updatedInventory = inventory.map(item => {
        if (item.itemCode === itemCode) {
          if (item.Quantity < deductionQty) {
            alert(`Cannot deduct ${deductionQty}. Only ${item.Quantity} items are available.`);
            return item;
          } else {
            return {
              ...item,
              Quantity: item.Quantity - deductionQty
            };
          }
        }
        return item;
      });
      setInventory(updatedInventory);
      setFilteredInventory(updatedInventory);
    } else {
      alert('Please enter a valid quantity.');
    }
  };

  const chartData = {
    labels: filteredInventory.map(item => item.productName),
    datasets: [
      {
        label: 'Quantity',
        data: filteredInventory.map(item => item.Quantity),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Inventory Quantity by Product',
      },
    },
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="brand">
          <img src='src/image/company-logo.png' className='logo-image' alt="Logo" />
        </div>
        <nav>
          <div className='nav-dept'>
            <Link to="/home">
              <img src='src/image/home.png' alt="Home" className="icon" /> Home
            </Link>
          </div>
          {/* Other nav items */}
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header>
          <h1 className='text-3xl font-bold'>Alpha Apperals PVT LTD</h1>
        </header>
        <div className='button-container'>
          <div className='search-container'>
            <div className='search-bar-container'>
              <MdSearch className='search-icon' />
              <input
                type='text'
                placeholder='Search by Item Code, Name, or Category'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='search-bar'
              />
            </div>
          </div>
          <Link to='/inventory/create'>
            <button className='button'>
              <img src='src/image/add.png' alt="add" className='add-icon'/> Add New Item
            </button>
          </Link>
          <button
            onClick={generatePDF}
            className='button generate-report'
          >
            <span className='report-icon'><img src='src/image/pdf.png' alt="PDF" /></span> Generate Report (PDF)
          </button>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className='chart-container'>
              <Bar data={chartData} options={chartOptions} />
            </div>
            <div className='table-container'>
              <table>
                <thead>
                  <tr>
                    <th className='table-heading'>Item Code</th>
                    <th className='table-heading'>Product Name</th>
                    <th className='table-heading max-md:hidden'>Product Category</th>
                    <th className='table-heading max-md:hidden'>Selling Price</th>
                    <th className='table-heading max-md:hidden'>Quantity</th>
                    <th className='table-heading'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map((item) => (
                    <tr key={item.itemCode} className='table-row'>
                      <td className='border border-slate-700 rounded-md text-center'>{item.itemCode}</td>
                      <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{item.productName}</td>
                      <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{item.productCategory}</td>
                      <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{item.price}</td>
                      <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{item.Quantity}</td>
                      <td className='border border-slate-700 rounded-md text-center'>
                        <div className='flex justify-center gap-x-4'>
                          <Link to={`/inventory/details/${item.itemCode}`}>
                            <BsInfoCircle className='text-2xl text-green-800' />
                          </Link>
                          <Link to={`/inventory/edit/${item.itemCode}`}>
                            <AiOutlineEdit className='text-2xl text-yellow-600' />
                          </Link>
                          <Link to={`/inventory/delete/${item.itemCode}`}>
                            <MdOutlineDelete className='text-2xl text-red-600' />
                          </Link>
                          <button
                            onClick={() => deductQuantity(item.itemCode)}
                            className='text-2xl text-blue-600'
                          >
                            Deduct
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
