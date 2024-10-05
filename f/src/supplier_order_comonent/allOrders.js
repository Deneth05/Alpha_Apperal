import { useState, useEffect, useRef } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";

function AllOrders() {
  const [orderlist, setOrderlist] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]); // For filtered data
  const [searchbtn, setSearchBtn] = useState("");
  const componentPDF = useRef();

  // Fetch all order details
  const getfetchdetails = async () => {
    try {
      const response = await axios.get("http://localhost:8060/order_supplier");
      if (response.data.success) {
        setOrderlist(response.data.data);
        setFilteredOrders(response.data.data); // Initialize with all data
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    getfetchdetails();
  }, []);

  // Filter data automatically as search input changes
  useEffect(() => {
    if (searchbtn.trim() === "") {
      // If search input is empty, show the full list
      setFilteredOrders(orderlist);
    } else {
      // Filter orders by NIC
      const filteredData = orderlist.filter((order) =>
        order.nic.toLowerCase().includes(searchbtn.toLowerCase())
      );
      setFilteredOrders(filteredData);
    }
  }, [searchbtn, orderlist]); // Runs every time search input or order list changes

  // Delete order
  const handledelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8060/delete_order_supplier/${id}`
      );
      if (response.data.success) {
        getfetchdetails();
        alert("Order deleted successfully");
      }
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  // Generate PDF report
  const generatePDF = () => {
    const opt = {
      margin: 1,
      filename: "AllOrders_report.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a2", orientation: "portrait" },
    };

    html2pdf().from(componentPDF.current).set(opt).save();
  };

  return (
    <div>
      <div className="container">
        <input
          className="srchinput"
          type="search"
          value={searchbtn} // Bind value to input
          onChange={(e) => setSearchBtn(e.target.value)}
          placeholder="Search by NIC"
          aria-label="Search"
        />
      </div>

      {filteredOrders.length === 0 ? (
        // Show message if no data found
        <p style={{textAlign:"center"}}>No data found</p>
      ) : (
        <>
          {/* Render table if data exists */}
          <table ref={componentPDF}>
            <thead>
              <tr>
                <th>Supplier Name</th>
                <th>NIC</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Date</th>
                <th>Edit Order</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order.name}</td>
                  <td>{order.nic}</td>
                  <td>{order.product}</td>
                  <td>{order.quantity}</td>
                  <td>{order.date}</td>
                  <td>
                    <a href={`/update/${order._id}`} className="btn1">
                      Edit
                    </a>
                  </td>
                  <td>
                    <button
                      onClick={() => handledelete(order._id)}
                      className="deleteBtn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Render "Generate Report" button only if there is data */}
          {filteredOrders.length > 0 && (
            <button onClick={generatePDF} className="reportbtn" type="button">
              Generate Report
              <img style={{height:"20px", marginLeft:"5px"}} src="pdf.png"></img>
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default AllOrders;
