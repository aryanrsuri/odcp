const mongoose = require('mongoose')

const sampleSchema = new mongoose.Schema({
    sample_name: {
        type: String,
        required: true
    },
    sample_description: {
        type: Buffer,
        required: false
    }
})

module.exports = mongoose.model("Sample", sampleSchema)