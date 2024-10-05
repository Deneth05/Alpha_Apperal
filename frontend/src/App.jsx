import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components
import Fundreport from './BudgetComponent/fundreport';
import ManagerSignUp from './ManagerComponent/ManagerSignUp';
import ManagerSignin from './ManagerComponent/ManagerSignin';
import Fund from './BudgetComponent/fund';
import RefundDetails from './BudgetComponent/funddetails';
import Updatefund from './BudgetComponent/Updatefund';
import Header from './BudgetComponent/fundheader';
import Request from './ItemComponent/Request';
import AllTask from './ItemComponent/userviewstRequest';
import UpdateTask from './ItemComponent/completeRequest';

import Sidebar from './BudgetComponent/sidebar';

function App() {
  return (
    <div className="App">
      <Router>
          <Header />

        <div className="app-layout">
         
          <Sidebar />

         
          <div className="main-content">
            <Routes>
              <Route path='/' element={<ManagerSignin />} />
              <Route path='/add-manager' element={<ManagerSignUp />} />
              <Route path='/addfund' element={<Fund />} />
              <Route path='/funddetails' element={<RefundDetails />} />
              <Route path='/Updatefund/:id' element={<Updatefund />} />
              <Route path='/fundreport' element={<Fundreport />} />
              <Route path='/request' element={<Request />} />
              <Route path='/allrequests' element={<AllTask />} />
              <Route path='/update-task/:id' element={<UpdateTask />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
