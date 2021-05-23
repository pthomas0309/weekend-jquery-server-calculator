const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const PORT = 5000; 

const calculationCollection = []

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));
// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended: true}));

// GET & POST Routes go here

//POST route takes input query from client side for calculation
app.post('/calculations', (req,res) => {
    //check the client info
    console.log(req.body);
    //push into the server side array
    calculationCollection.push(req.body);
    //send client good response
    res.sendStatus(201);
});

//GET route grabs our array of calculations (starts off empty)
app.get('/calculations', (req, res) => {
    //lets me know we made it
    console.log('reached /calculation');
    //respond with array of calculations
    res.send(calculationCollection)
});

//port listener
app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
  });