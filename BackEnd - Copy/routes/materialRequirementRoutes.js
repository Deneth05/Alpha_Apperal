import express from 'express';
import { MaterialRequirement } from '../models/materialRequirementModel.js';

const router = express.Router();

// Route for saving a new design record
router.post('/', async (request, response) => {
  try {
    const {
      designID,
      sizeID,
      materialID1,
      qtyRequired1,
      materialID2,
      qtyRequired2,
      materialID3,
      qtyRequired3,
      materialID4,
      qtyRequired4,
      materialID5,
      qtyRequired5,
      materialID6,
      qtyRequired6,
      materialID7,
      qtyRequired7,
      materialID8,
      materialID9,
      materialID10
    } = request.body;

    // Validate that all required fields are present
    if (!designID || !sizeID || !DesignName) {
      return response.status(400).send({
        message: 'DesignID, sizeID, and DesignName are required fields!',
      });
    }

    const newDesignRecord = {
      designID,
      sizeID,
      materialID1,
      qtyRequired1,
      materialID2,
      qtyRequired2,
      materialID3,
      qtyRequired3,
      materialID4,
      qtyRequired4,
      materialID5,
      qtyRequired5,
      materialID6,
      qtyRequired6,
      materialID7,
      qtyRequired7,
      materialID8,
      materialID9,
      materialID10
    };

    const createdMaterialRequirement = await MaterialRequirement.create(newDesignRecord);
    return response.status(201).send(createdMaterialRequirement);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});



// Route for getting all MaterialRequirement records from database
router.get('/', async (request, response) => {
  try {
    const materialRequirements = await MaterialRequirement.find({});
    return response.status(200).json(materialRequirements);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


// Route to get one design record by ID
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const MaterialRequirement = await MaterialRequirement.findById(id);
    if (!MaterialRequirement) {
      return response.status(404).json({ message: 'Material Requirement not found!' });
    }
    return response.status(200).json(MaterialRequirement);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for updating a design record
router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const updatedFields = request.body;

    if (request.file) {
      updatedFields.image = {
        data: request.file.buffer, // Access file buffer
        contentType: request.file.mimetype, // Access file MIME type
      }; // Update the image field if a new file is uploaded
    }

    const MaterialRequirement = await MaterialRequirement.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!design) {
      return response.status(404).json({ message: 'Material Requirement not found!' });
    }

    return response.status(200).json({ message: 'Material Requirement updated successfully!', design });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Route for deleting a design record
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const results = await MaterialRequirement.findByIdAndDelete(id);

    if (!results) {
      return response.status(404).json({ message: 'Material Requirement not found!' });
    }

    return response.status(200).send({ message: 'Material Requirement deleted successfully!' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
