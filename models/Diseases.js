const mongoose = require('mongoose');

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
  
const Diseases = mongoose.model('Disease', diseaseSchema);

module.exports = Diseases;
