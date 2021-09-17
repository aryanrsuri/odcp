const express = require('express');
const Sample = require('../models/sample');
const router = express.Router();
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
router.post('/', async (req, res) => {
    const sample = new Sample({
        sample_name: req.body.compound
    })
    try {
        const newSample = await sample.save()
        //res.redirect(`samples/$newSample.id}`)
        res.redirect('samples')
    } catch {
        res.render('samples/new', {
            sample: sample,
            errorMessage: 'Error creating Author'
        })
    }
})

module.exports = router;