import mongoose from 'mongoose';

const materialRequirementSchema = mongoose.Schema(
  {
    designID: {
      type: String,
      required: true,
    },
    sizeID: {  
      type: String,
      required: true,
    },
    materialID1: String, 
    qtyRequired1: {
      type: Number,
      default: 0,
      validate: {
        validator: function (v) {
          return !this.materialID1 || v > 0;
        },
        message: 'Quantity for Material 1 must be greater than 0 if MaterialID1 is present',
      },
    },
    materialID2: String, 
    qtyRequired2: {
      type: Number,
      default: 0,
    },
    materialID3: String, 
    qtyRequired3: {
      type: Number,
      default: 0,
    },
    materialID4: String, 
    qtyRequired4: {
      type: Number,
      default: 0,
    },
    materialID5: String, 
    qtyRequired5: {
      type: Number,
      default: 0,
    },
    materialID6: String, 
    qtyRequired6: {
      type: Number,
      default: 0,
    },
    materialID7: String, 
    qtyRequired7: {
      type: Number,
      default: 0,
    },
    materialID8: String, 
    qtyRequired8: {
      type: Number,
      default: 0,
    },
    materialID9: String, 
    qtyRequired9: {
      type: Number,
      default: 0,
    },
    materialID10: String, 
    qtyRequired10: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const MaterialRequirement = mongoose.model('MaterialRequirement', materialRequirementSchema);
