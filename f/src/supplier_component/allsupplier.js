import { useState, useEffect } from "react";
import axios from "axios";
import "./allSuppliers.css";

function AllSupplier() {
  const [supplierlist, setSupplierList] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [searchbtn, setSearchBtn] = useState("");

  // Fetch supplier details
  const getfetchdetails = async () => {
    try {
      const data = await axios.get("http://localhost:8060/supplier");
      if (data.data.success) {
        setSupplierList(data.data.data);
        setFilteredSuppliers(data.data.data); // Initialize with all data
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getfetchdetails();
  }, []);

  // Auto-search functionality
  useEffect(() => {
    if (searchbtn.trim() === "") {
      // If search input is empty, show the full list
      setFilteredSuppliers(supplierlist);
    } else {
      // Filter suppliers by phone number
      const filteredData = supplierlist.filter((supplier) =>
        supplier.phone.toLowerCase().includes(searchbtn.toLowerCase())
      );
      setFilteredSuppliers(filteredData);
    }
  }, [searchbtn, supplierlist]); // Runs every time search input or supplier list changes

  // Delete supplier
  const handledelete = async (id) => {
    const data = await axios.delete(
      "http://localhost:8060/delete_supplier/" + id
    );
    if (data.data.success) {
      getfetchdetails();
      alert("User deleted successfully");
    }
  };

  return (
    <div>
      {/* <span style={{marginLeft:'10%', fontSize:"28px"}}>All Suppliers</span> */}
      <div className="container">
        <input
          className="srchinput"
          type="search"
          value={searchbtn} // Bind input value to state
          onChange={(e) => setSearchBtn(e.target.value)}
          placeholder="Search by Phone"
          aria-label="Search"
        />
      </div>

      <div style={{ width: "100%" }}>
        {filteredSuppliers.length === 0 ? (
          // Show "No data found" message if no suppliers match the search
          <p style={{textAlign:"center"}}>No data found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>NIC</th>
                <th>Phone Number</th>
                <th>Product</th>
                <th>Type</th>
                <th>Unit Price</th>
                <th>Contract Start</th>
                <th>Contract End</th>
                <th>Place Orders</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((e1) => (
                <tr key={e1._id}>
                  <td>{e1.name}</td>
                  <td>{e1.nic}</td>
                  <td>{e1.phone}</td>
                  <td>{e1.product}</td>
                  <td>{e1.type}</td>
                  <td>{e1.unitPrice}</td>
                  <td>{e1.contractStart}</td>
                  <td>{e1.contractEnd}</td>
                  <td>
                    <a href={`/order/${e1._id}`} className="btn1">
                      Order
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AllSupplier;
