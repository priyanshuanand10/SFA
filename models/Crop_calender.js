const mongoose = require('mongoose');

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

const CropCalendar = mongoose.model('CropCalendar', cropCalendarSchema);

module.exports = CropCalendar;
