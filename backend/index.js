import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Transport } from './models/transportModel.js';
import { Vehicle } from './models/vehicleModel.js';
import transportRoute from './routes/TransportRoute.js';
import vehicleRoute from './routes/VehicleRoute.js';
import cors from 'cors';


const app = express();



// middleware for parsing request body
app.use(express.json());

//middleware for handling CORS POLICY
//option 1: Allow all origins with default of cors (*)
       app.use(cors());
//option 2: Allow custom origins
//app.use(cors({
  //  origin: 'http://localhost:3000',
    //methods: ['GET', 'POST', 'PUT', 'DELETE'],
    //allowedHeaders: ['Content-Type']
//}));



app.get('/', (request, response) => {
    console.log(request)
    return response.status(200).send('Welcome to MERN stack tutorial');
});

app.use('/transport',transportRoute);

app.use('/vehicle',vehicleRoute);

mongoose.connect(mongoDBURL)
  .then(() =>{
      console.log('App connected to database');
      app.listen(PORT,() =>{
        console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  }); 