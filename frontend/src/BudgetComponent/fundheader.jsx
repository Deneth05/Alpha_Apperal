
import './fundheader.css'
function Header(){
    return(
      <header className="fundheader">
      <h1 className="text-3xl font-bold company-name">
        Alpha Apperals PVT LTD
      </h1>
    
      <div>
        <div class="navbar">
        <a href="/">Home</a>
        <a href="/addfund">Allocate Budget</a>
        <a href="/fundreport"> Budget Dashboard</a>
        <a href="/request"> Payment Request</a>
        <a href="/allrequests"> Request Status</a>
        <a href="/funddetails"> All Details</a>
        </div>
      </div>
      </header>
    )
}
export default Header