import react from "react";
import "./navBar.css";
import logo from "./images/logo.png";
function NavBar() {
  return (
    <div>
      <div class="navbar1">
        <img src={logo} alt="Logo2" width="100px"></img>
        <br></br>
        <h3 className="topic">Alpha Apparels (PVT)</h3>
        {/* <a href="/count">Dash Board</a> */}
          {/* <a href="/adduser">Add New Supplier</a> */}
        <a href="/suppliers/home">All Suppliers</a>
        <a href="/allorders">Placed Orders</a>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <button className="logoutBtn">Logout</button>
      </div>
    </div>
  );
}
export default NavBar;
