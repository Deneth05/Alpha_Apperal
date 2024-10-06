import mongoose from 'mongoose';


const designSchema = mongoose.Schema(
  {
    designID: {
      type: String,
      required: true,
    },
    DesignName: {
      type: String,
      required: true,
    },
    image: { 
      data: Buffer, 
      contentType: String,
    },
    description: { 
      type: String,
      required: true,
    },
  }, {
    timestamps: true,
  }
);



export const Design = mongoose.model('Design', designSchema);
