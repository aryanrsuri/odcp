const mongoose = require('mongoose')

const sampleSchema = new mongoose.Schema({
    sample_name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Sample", sampleSchema)