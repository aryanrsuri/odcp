if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const mongoose = require('mongoose')
const app = express();
const expressLayout = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const sampleRouter = require('./routes/samples')
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayout)
app.use(express.static('public'))

mongoose.connect(process.env.DATABASE_URL, {
});
const db = mongoose.connection
db.on('error', function (err) {console.error(err)});
db.once('open', function () {console.log('connection open')});

app.use('/', indexRouter)
app.use('/samples', sampleRouter)
app.listen(process.env.PORT || 3000)