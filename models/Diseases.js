/**
 * Required External Modules
 * mongoose: MongoDB object modeling tool for schema definition
 */
const mongoose = require("mongoose");

/**
 * Disease Schema
 * Defines the structure for plant disease information and treatments
 * @typedef {Object} Disease
 * @property {string} crop_name - Name of the affected crop
 * @property {string} disease_type - Type or name of the disease
 * @property {string} disease_image - URL or path to disease image
 * @property {string} solution - General solution description
 * @property {string} cultural_practices - Recommended farming practices
 * @property {string} fertilizers - Recommended fertilizer treatments
 * @property {string} chemical_treatments - Chemical control methods
 * @property {string} biological_controls - Biological control methods
 */
const diseaseSchema = new mongoose.Schema({
  crop_name: { type: String, required: true },
  disease_type: { type: String, required: true },
  disease_image: { type: String, required: true },
  solution: { type: String, required: true },
  cultural_practices: { type: String, required: true },
  fertilizers: { type: String, required: true },
  chemical_treatments: { type: String, required: true },
  biological_controls: { type: String, required: true },
});

// Create and export the Disease model
const Diseases = mongoose.model("Disease", diseaseSchema);
module.exports = Diseases;
