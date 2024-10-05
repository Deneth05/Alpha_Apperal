import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateTransportation from './pages/CreateTransportation';
import ShowTransportation from './pages/ShowTransportation';
import EditTransportation from './pages/EditTransportation';
import DeleteTransportation from './pages/DeleteTransportation';
import VehicleHome from './pages/VehicleHome';
import CreateVehicle from './pages/CreateVehicle';
import ShowVehicle from './pages/ShowVehicle';
import EditVehicle from './pages/EditVehicle';
import DeleteVehicle from './pages/DeleteVehicle';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/transport/create" element={<CreateTransportation />} />
      <Route path="/transport/details/:id" element={<ShowTransportation />} />
      <Route path="/transport/edit/:id" element={<EditTransportation />} />
      <Route path="/transport/delete/:id" element={<DeleteTransportation />} />
      <Route path="/vehicle" element={<VehicleHome />} />
      <Route path="/vehicle/create" element={<CreateVehicle/>} />
      <Route path="/vehicle/details/:id" element={<ShowVehicle/>} />
      <Route path="/vehicle/edit/:id" element={<EditVehicle/>} />
      <Route path="/vehicle/delete/:id" element={<DeleteVehicle/>} />
    </Routes>
  );
};

export default App;
