require('dotenv').config();
const express = require('express');
const bodyParser= require('body-parser');
const cors= require('cors');
const app = express();
const apiRoutes = require("./routes/api-routes");
const mongoose = require('mongoose');
const uri = process.env.URI;

mongoose.connect(uri, {  useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")


// rates update
const rateDb = require('./rates/ratesdb');
rateDb.newCheckRates();
setInterval(rateDb.newCheckRates, 86400000);

app.use(cors())

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json());

// Import routes
app.get('/', (req, res) => res.send('Hello World with Express'));

app.use('/api', apiRoutes);

app.listen(process.env.PORT || 8080, () => {
    console.log('Server running on port 8080')
})