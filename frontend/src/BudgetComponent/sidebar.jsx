import React from 'react';
import { Link } from 'react-router-dom'; 

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="brand">
        <img src='/company-logo.png' className='logo' alt='company-logo' />
      </div>
      <nav>
        <div className='nav-dept'><Link to="/home"><img src='/home.png' className='icon' alt='home' />Home</Link></div>
        <div className='nav-dept'><Link to="/inventory"><img src='/inventory.png' className='icon' alt='inventory' />Inventory</Link></div>
        <div className='nav-dept'><Link to="/"><img src='/tshirt.png' className='icon' alt='design' />Design</Link></div>
        <div className='nav-dept'><Link to="/orders"><img src='/orders.png' className='icon' alt='orders' />Orders</Link></div>
        <div className='nav-dept'><Link to="/supplier"><img src='/supplier.png' className='icon' alt='supplier' />Supplier</Link></div>
        <div className='nav-dept'><Link to="/marketing"><img src='/marketing.png' className='icon' alt='marketing' />Marketing</Link></div>
        <div className='nav-dept'><Link to="/hr"><img src='/human-resource.png' className='icon' alt='hr' />Human Resource</Link></div>
        <div className='nav-dept'><Link to="/financial"><img src='/financial.png' className='icon' alt='financial' />Financial</Link></div>
        <div className='nav-dept'><Link to="/transport"><img src='/transport.png' className='icon' alt='transport' />Transport</Link></div>
      </nav>
    </div>
  );
}

export default Sidebar;
