const mongoose = require('mongoose')
const sample_file_path = 'uploads/files'
const sample_image_path = 'uploads/images'
const sampleSchema = new mongoose.Schema({
    sample_name: {
        type: String,
        required: true
    },
    sample_description: {
        type: String,
        required: true
    },
    sample_image: {
        type: String,
        required: true
    }
})
// sampleSchema.virtual('sample_file_path').get(function() {
//     if(this.sample_description != null){
         
//     }
// });


module.exports = mongoose.model("Sample", sampleSchema);
module.exports.sample_file_path = sample_file_path;
module.exports.sample_image_path = sample_image_path;