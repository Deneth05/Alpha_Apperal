import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, URL } from "./config.js";

import RegisteredCustomerRoute from'./routes/registeredcustomerRoute.js'
import orderRoutes from'./routes/orderRoutes.js'
import DisplayItemRoute from'./routes/DisplayItemRoute.js'

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to handle CORS
app.use(cors()); 
// Route for the root endpoint
app.get('/', (req, res) => {
  console.log(req);
  return res.status(200).send('Welcome to MERN Stack');
});

// Sales routes

app.use("/customers", RegisteredCustomerRoute);
app.use("/orders", orderRoutes);
app.use("/items", DisplayItemRoute);

app.use('/uploads', express.static('uploads'));


// MongoDB connection and server start
mongoose.connect(URL)
  .then(() => {
    console.log('App connected successfully to MongoDB');
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
