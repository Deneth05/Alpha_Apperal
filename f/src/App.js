import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import AddSupplier from "./supplier_component/addSupplier";
import AllSupplier from "./supplier_component/allsupplier";
import UpdateSupplier from "./supplier_component/updatesupplier";

import SupplierDashBoard from "./supplier_component/supplierDashBoard";
import PlaceOrder from "./supplier_order_comonent/placeOrder";
import AllOrders from "./supplier_order_comonent/allOrders";
import UpdateOrder from "./supplier_order_comonent/updateOrder";
import NavBar from "./supplier_component/NavBar";

function App() {
  return (
    <Router>
      <div className="flex">
        <NavBar />
        <Routes>
          {/* <Route path="/adduser" element={<AddSupplier />}></Route> */}
          {/* <Route path="/count" element={<SupplierDashBoard/>}></Route> */}
          <Route path="/" element={<AllSupplier />}></Route>
          <Route path="/update/:id" element={<UpdateSupplier />}></Route>
          <Route path="/order/:id" element={<PlaceOrder />}></Route>
          <Route path="/allorders" element={<AllOrders />}></Route>
          <Route path="/updateorder/:id" element={<UpdateOrder />}></Route>
        </Routes>
      </div>
      
    </Router>
  );
}

export default App;
