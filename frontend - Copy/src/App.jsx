import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DesignHome from './pages/DesignHome.jsx';
import CreateDesign from './pages/CreateDesign.jsx';
import EditDesign from './pages/EditDesign.jsx';
import DeleteDesign from './pages/DeleteDesign.jsx';
import ShowDesign from './pages/ShowDesign.jsx';
import SizeHome from './pages/SizeHome.jsx';
import CreateSize from './pages/CreateSize.jsx';
import EditSize from './pages/EditSize.jsx';
import DeleteSize from './pages/DeleteSize.jsx';
import ShowSize from './pages/ShowSize.jsx';
import Home from './pages/Home.jsx';
import CreateBooks from './pages/CreateBooks.jsx';
import ShowBooks from './pages/ShowBooks.jsx';
import EditBooks from './pages/EditBooks.jsx';
import DeleteBooks from './pages/DeleteBooks.jsx';
import CreateMaterialReq from './pages/CreateMaterialReq.jsx'
import DeleteMaterialReq from './pages/DeleteMaterialReq.jsx'
import EditMaterialReq from './pages/EditMaterialReq.jsx'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<DesignHome />} />
      <Route path='/designs/create' element={<CreateDesign />} />
      <Route path='/designs/details/:id' element={<ShowDesign />} />
      <Route path='/designs/edit/:id' element={<EditDesign />} />
      <Route path='/designs/delete/:id' element={<DeleteDesign />} />

      <Route path='/sizes/home' element={<SizeHome />} />
      <Route path='/sizes/create' element={<CreateSize />} />
      <Route path='/sizes/details/:id' element={<ShowSize />} />
      <Route path='/sizes/edit/:id' element={<EditSize />} />
      <Route path='/sizes/delete/:id' element={<DeleteSize />} />

      <Route path='/inventory/home' element={<Home />} />
      <Route path='/inventory/create' element={<CreateBooks />} />
      <Route path='/inventory/details/:itemCode' element={<ShowBooks />} />
      <Route path='/inventory/edit/:itemCode' element={<EditBooks />} />
      <Route path='/inventory/delete/:itemCode' element={<DeleteBooks />} />

      <Route path='/materialReq/create' element={<CreateMaterialReq />} />
      <Route path='/materialReq/edit/:id' element={<EditMaterialReq />} />
      <Route path='/materialReq/delete/:id' element={<DeleteMaterialReq />} />

    </Routes>
  );
};

export default App;
