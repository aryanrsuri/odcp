const express = require('express');
const Sample = require('../models/sample');
const router = express.Router();
// All samples route
router.get('/',  (req, res) => {
    res.render('samples/index');
})

// New sample router
router.get('/new', (req, res) => {
    res.render('samples/new', { sample: new Sample()})
})

// Create sample Router
router.post('/', (req, res) => {
    res.send('Create ')
})

module.exports = router;