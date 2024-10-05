import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ShowBooks from './pages/ShowBooks';
import EditBooks from './pages/EditBooks';
import DeleteBooks from './pages/DeleteBooks';
import CreateBooks from './pages/CreateBooks';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/inventory/create' element={<CreateBooks />} />
      <Route path='/inventory/details/:itemCode' element={<ShowBooks />} />
      <Route path='/inventory/edit/:itemCode' element={<EditBooks />} />
      <Route path='/inventory/delete/:itemCode' element={<DeleteBooks />} />
    </Routes>
  );
};

export default App;
