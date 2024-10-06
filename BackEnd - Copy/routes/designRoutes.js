import express from 'express';
import { Design } from '../models/designModels.js';
import upload from '../multer/multerConfig.js'; // Import the configured multer

const router = express.Router();

// Route for saving a new design record
router.post('/', upload.single('imageFile'), async (request, response) => { 
  try {
    const {
      designID,
      DesignName,
      description
    } = request.body;

    // Validate that all required fields are present
    if (!designID || !description || !DesignName) {
      return response.status(400).send({
        message: 'DesignID, DesignName and Description are required fields!',
      });
    }

    const newDesignRecord = {
      designID,
      DesignName,
      image: request.file ? {
        data: request.file.buffer, // Access file buffer
        contentType: request.file.mimetype, // Access file MIME type
      } : undefined,
      description,
    };

    const design = await Design.create(newDesignRecord);
    return response.status(201).send(design);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});



// Route for getting all design records from database
router.get('/', async (request, response) => {
  try {
    const designs = await Design.find({});

    // Map through designs and convert image data to a base64 URL
    const formattedDesigns = designs.map(design => {
      const imageUrl = design.image 
      ? `data:${design.image.contentType};base64,${design.image.data.toString('base64')}`
      : null;
    

      return {
        ...design.toObject(), // Convert mongoose document to plain object
        image: imageUrl, // Add base64 image URL
      };
    });

    return response.status(200).json(formattedDesigns);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


// Route to get one design record by ID
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const design = await Design.findById(id);
    if (!design) {
      return response.status(404).json({ message: 'Design not found!' });
    }
    return response.status(200).json(design);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for updating a design record
router.put('/:id', upload.single('image'), async (request, response) => { 
  try {
    const { id } = request.params;
    const updatedFields = request.body;

    if (request.file) {
      updatedFields.image = {
        data: request.file.buffer, // Access file buffer
        contentType: request.file.mimetype, // Access file MIME type
      }; // Update the image field if a new file is uploaded
    }

    const design = await Design.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!design) {
      return response.status(404).json({ message: 'Design not found!' });
    }

    return response.status(200).json({ message: 'Design updated successfully!', design });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Route for deleting a design record
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const results = await Design.findByIdAndDelete(id);

    if (!results) {
      return response.status(404).json({ message: 'Design not found!' });
    }

    return response.status(200).send({ message: 'Design deleted successfully!' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
