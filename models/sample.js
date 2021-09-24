const mongoose = require('mongoose');
const path = require('path')
const sample_file_path = 'uploads/files'
const sampleSchema = new mongoose.Schema({
    sample_name: {
        type: String,
        required: true
    },
    sample_description: {
        type: String,
        required: true
    },
    sample_pdf: {
        type: String,
        required: false
    },
    sample_image: {
        type: String,
        required: true
    }
})
sampleSchema.virtual('sample_image_path').get(function() {
    if(this.sample_image != null){
        return path.join('/', sample_file_path, this.sample_image)
    }
});

sampleSchema.virtual('sample_pdf_path').get(function() {
    if(this.sample_pdf != null){
        return path.join('/', sample_file_path, this.sample_pdf)
    }
});


module.exports = mongoose.model("Sample", sampleSchema);
module.exports.sample_file_path = sample_file_path;