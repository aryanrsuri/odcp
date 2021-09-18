const express = require('express');
const Sample = require('../models/sample');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const upload_path = path.join('public', Sample.sample_file_path)
const image_upload_path = path.join('public', Sample.sample_image_path)
const router = express.Router();
const upload_types = ['text/csv','text/plain', 'application/msword']
const image_upload_types = ['image/jpeg', 'image/jpg', 'image/png']
const upload = multer({
    dest: upload_path,
    fileFilter: (req, file, callback) => {
        callback(null, upload_types.includes(file.mimetype))
    }
})

const imageUpload = multer({
    dest: image_upload_path,
    fileFilter: (req, file, callback) => {
        callback(null, image_upload_types.includes(file.mimetype))
    }
})

// All samples route
router.get('/',  async (req, res) => {
    let searchOptions = {}
    // Use query for get, bc thats a ?= query
    if(req.query.compound != null && req.query.compound !== '') {
        searchOptions.sample_name = new RegExp(req.query.compound, 'i')
    }
    try {
        const samples = await Sample.find(searchOptions)
        res.render('samples/index', {
            samples: samples,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

// New sample router
router.get('/new', (req, res) => {
    res.render('samples/new', { sample: new Sample()})
})

// Create sample Router
router.post('/', fileUpload, async (req, res) => {
    const file_name = req.file != null ? req.file.filename : null
    const sample = new Sample({
        sample_name: req.body.compound,
        sample_description: file_name,
        sample_image: file_name
    })
    try {
        const newSample = await sample.save()
        //res.redirect(`samples/$newSample.id}`)
        res.redirect('samples')
    } catch {
        if (sample.sample_description != null) {remove_file(sample.sample_description) }
        res.render('samples/new', {
            sample: sample,
            errorMessage: 'Error creating Author'
        })
    }
})

function fileUpload(req, res, next) {
    upload.single('upload')(req, res, next);
    imageUpload.single('imgUpload')(req, res, next);
    next();
}

function remove_file(fileName){
    fs.unlink(path.join(upload_path, fileName), error => {
        if(error) console.error(error)
    })
}
module.exports = router;