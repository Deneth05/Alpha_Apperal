
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';


import Header from './ItemComponent/header';





import Sidebar from './ItemComponent/sidebar';


import ItemDetails from './ItemComponent/Itemdetails';
import ItemRepoart from './ItemComponent/ItemRepoart';
import UpdateItem from './ItemComponent/UpdateItem';
import ManagerSignUp from './ManagerComponent/ManagerSignUp';
import ManagerSignin from './ManagerComponent/ManagerSignin';
import Product from './ItemComponent/product';
import AddUser from './Users/AddUser';
import UserDetails from './Users/userdetails';
import UpdateUser from './Users/UpdateUser';
import UserSignin from './Users/UserSignin';
import AddTrain from './Train/AddTrain';
import TrainDetails from './Train/Traindetails';
import UpdateTrainer from './Train/UpdateTrain';


function App() {
  return (
    <div className="App">
 <Router>


<div className="app-layout">
 
  <Sidebar />
   
  <Routes>
  <Route path='/' element={<ManagerSignin/>}></Route>
 <Route path='/add-manager' element={<ManagerSignUp/>}></Route>

<Route path='/add-item' element={<Product/>}></Route>
<Route path='/itemdetails' element={<ItemDetails/>}></Route>
<Route path='/itemupdate/:id' element={<UpdateItem/>}></Route>
<Route path='/itemrepoart' element={<ItemRepoart/>}></Route>

<Route path='/add-user' element={<AddUser/>}></Route>
<Route path='/sign-user' element={<UserSignin/>}></Route>
<Route path='/userdetails' element={<UserDetails/>}></Route>
<Route path='/userupdate/:id' element={<UpdateUser/>}></Route>


<Route path='/add-train' element={<AddTrain/>}></Route>

<Route path='/traindetails' element={<TrainDetails/>}></Route>
<Route path='/trainerupdate/:id' element={<UpdateTrainer/>}></Route>
   </Routes>
   </div>
   </Router>
    </div>
  );
}

export default App;
