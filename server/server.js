const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const PORT = 5000;

//storage for user calculation history
const calculationCollection = [];
//take the object values and decide what to do with them
function calculateNumbers() {
    //conditional accounts for the operator property of the new object being + (addition)
    if (calculationCollection[0].operator === '+') {
        let answer = Number(calculationCollection[0].inputOne) + Number(calculationCollection[0].inputTwo);
        console.log(answer);
        calculationCollection[0].calcAnswer = answer;
    }
    //repeat for subtraction (-)
    if (calculationCollection[0].operator === '-') {
        let answer = Number(calculationCollection[0].inputOne) - Number(calculationCollection[0].inputTwo);
        console.log(answer);
        calculationCollection[0].calcAnswer = answer;
    }
    //repeat for multiplication (*)
    if (calculationCollection[0].operator === '*') {
        let answer = Number(calculationCollection[0].inputOne) * Number(calculationCollection[0].inputTwo);
        console.log(answer);
        calculationCollection[0].calcAnswer = answer;
    }
    //repeat for division (/)
    if (calculationCollection[0].operator === '/') {
        let answer = Number(calculationCollection[0].inputOne) / Number(calculationCollection[0].inputTwo);
        console.log(answer);
        calculationCollection[0].calcAnswer = answer;
    }
}

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));
// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({ extended: true }));

// GET & POST Routes go here

//POST route takes input query from client side for calculation
app.post('/calculations', (req, res) => {
    //check the client info
    console.log(req.body);
    //push into the server side array
    calculationCollection.unshift(req.body);
    //send client good response
    res.sendStatus(201);
});

//GET route grabs our array of calculations (starts off empty)
app.get('/calculations', (req, res) => {
    //lets me know we made it
    console.log('reached /calculation');
    //do the calculation on the object values
    calculateNumbers();
    //respond with array of calculations
    res.send(calculationCollection);
});

//port listener
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});