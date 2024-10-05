import express from 'express';
import { Customer } from '../models/RegisteredCustomerModel.js';

const router = express.Router();

// Route for saving a new customer record
router.post('/', async (request, response) => {
  try {
    const { CustomerID, CustomerName, Address, City, Country, CountryCode, ContactNo1, ContactNo2, Email } = request.body;

    // Validate required fields
    if (!CustomerID || !CustomerName || !Address || !City || !Country || !CountryCode || !ContactNo1 || !ContactNo2 || !Email) {
      return response.status(400).send({ message: 'All fields are required.' });
    }

    // Create a new customer
    const newCustomer = { CustomerID, CustomerName, Address, City, Country, CountryCode, ContactNo1, ContactNo2, Email };
    
    // Attempt to create the customer and handle potential duplicate CustomerID error
    try {
      const customer = await Customer.create(newCustomer);
      return response.status(201).send(customer);
    } catch (error) {
      if (error.code === 11000) { // Duplicate key error
        return response.status(409).send({ message: 'CustomerID has already been taken. Please choose a different one.' });
      }
      throw error; // For other errors, throw them again to be caught in the outer try-catch
    }
  } catch (error) {
    console.error('Error:', error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting all customers
router.get('/', async (request, response) => {
  try {
    const customers = await Customer.find({});
    return response.status(200).json(customers);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get one customer by ID
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const customer = await Customer.findById(id);

    if (!customer) {
      return response.status(404).send({ message: 'Customer not found!' });
    }

    return response.status(200).json(customer);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for updating a customer
router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { CustomerID, CustomerName, Address, City, Country, CountryCode, ContactNo1, ContactNo2, Email } = request.body;

    // Validate required fields
    if (!CustomerID || !CustomerName || !Address || !City || !Country || !CountryCode || !ContactNo1 || !ContactNo2 || !Email) {
      return response.status(400).send({ message: 'Send all required fields!' });
    }

    // Attempt to update the customer and handle potential duplicate CustomerID error
    try {
      const results = await Customer.findByIdAndUpdate(id, request.body, { new: true });

      if (!results) {
        return response.status(404).json({ message: 'Customer not found!' });
      }

      return response.status(200).send({ message: 'Customer updated successfully!' });
    } catch (error) {
      if (error.code === 11000) { // Duplicate key error
        return response.status(409).send({ message: 'CustomerID has already been taken. Please choose a different one.' });
      }
      throw error; // For other errors, throw them again to be caught in the outer try-catch
    }
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Route for deleting a customer
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const results = await Customer.findByIdAndDelete(id);

    if (!results) {
      return response.status(404).json({ message: 'Customer not found!' });
    }

    return response.status(200).send({ message: 'Customer deleted successfully!' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
