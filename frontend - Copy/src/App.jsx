
import CustomerHome from "./pages/CustomerHome.jsx";
import CreateCustomer from "./pages/CreateCustomer.jsx";
import ShowCustomer from "./pages/ShowCustomer.jsx";
import EditCustomer from "./pages/EditCustomer.jsx";
import DeleteCustomer from "./pages/DeleteCustomer.jsx";
import OrderHome from "./pages/OrderHome.jsx";
import CreateOrder from "./pages/CreateOrder.jsx";
import EditOrder from "./pages/EditOrder.jsx";
import DeleteOrder from "./pages/DeleteOrder.jsx";
import DisplayItemHome from './pages/DisplayItemHome.jsx'; // Import DisplayItemHome
import CreateDisplayItem from './pages/CreateDisplayItem.jsx'; // Import CreateItem
import ShowDisplayItem from './pages/ShowDisplayItem.jsx'; // Import ShowItem
import EditDisplayItem from './pages/EditDisplayItem.jsx'; // Import EditItem
import DeleteDisplayItem from './pages/DeleteDisplayItem.jsx'; 
import CustomerItemHome from './pages/CustomerItemsHome.jsx'; 


const App = () => {
  return (
    <Routes>
      

      <Route path="/customers/home" element={<CustomerHome />} />
      <Route path="/customers/create" element={<CreateCustomer />} />
      <Route path="/customers/details/:id" element={<ShowCustomer />} />
      <Route path="/customers/edit/:id" element={<EditCustomer />} />
      <Route path="/customers/delete/:id" element={<DeleteCustomer />} />

      <Route path="/orders/home" element={<OrderHome />} />
      <Route path="/orders/create" element={<CreateOrder />} />
      <Route path="/orders/edit/:id" element={<EditOrder />} />
      <Route path="/orders/delete/:id" element={<DeleteOrder />} />

      {/* New routes for item display */}
      <Route path='/items/home' element={<DisplayItemHome />} />
      <Route path='/items/create' element={<CreateDisplayItem />} />
      <Route path='/items/details/:id' element={<ShowDisplayItem />} />
      <Route path='/items/edit/:id' element={<EditDisplayItem />} />
      <Route path='/items/delete/:id' element={<DeleteDisplayItem />} />

      <Route path='/items/customer/home' element={<CustomerItemHome />} />
    </Routes>
  );
};

export default App;
