/**
 * Required External Modules
 * mongoose: MongoDB object modeling tool for schema definition
 */
const mongoose = require("mongoose");

/**
 * Crop Calendar Schema
 * Defines the structure for crop planting and management information
 * @typedef {Object} CropCalendar
 * @property {string} region - Geographical region for the crop calendar
 * @property {string} state - State where the crop is grown
 * @property {string} crop - Name of the crop
 * @property {Object} sowingDates - Primary and secondary planting periods
 * @property {Array} lifecycleStages - Growth stages and care instructions
 * @property {Array} diseases - Common diseases and prevention measures
 */
const cropCalendarSchema = new mongoose.Schema({
  region: { type: String, required: true },
  state: { type: String, required: true },
  crop: { type: String, required: true },

  sowingDates: {
    primary: { type: String, required: true },
    secondary: { type: String, required: false },
  },

  lifecycleStages: [
    {
      title: { type: String, required: true },
      duration: { type: String, required: true },
      recommendations: { type: [String], required: true },
    },
  ],

  diseases: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      prevention: { type: [String], required: true },
    },
  ],

  additionalRecommendations: { type: [String], required: false },
});

// Create and export the model
const CropCalendar = mongoose.model("CropCalendar", cropCalendarSchema);
module.exports = CropCalendar;
