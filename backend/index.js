import express from "express";
import cors from "cors";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import inventoryRoute from './routes/bookRoute.js';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy
app.use(cors()); // Allows all origins by default

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Inventory System');
});

app.use('/inventory', inventoryRoute);

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('Connected to database');
        app.listen(PORT, () => {
            console.log(`Server is listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to database:', error.message);
    });
