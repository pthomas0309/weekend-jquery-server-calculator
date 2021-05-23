//call jQuery run readyNow
$(readyNow);
//empty array to hald the calculations
let calcQuery = [];
//ready now handles click listeners
function readyNow(){
    console.log('jQ');
    //click listener for the submit/equals button
    $('#addition').on('click', determineOperator);
    $('#subtraction').on('click', determineOperator);
    $('#division').on('click', determineOperator);
    $('#multiplication').on('click', determineOperator);
    $('#doMath').on('click', queueCalculation)
}

function serveCalculations(){
    //plan a GET route from the server to pull the array of calculations to client side
    $.ajax({
        method: 'GET',
        url: '/calculations'
    }).then(response => {
        //check the res.send
        console.log(response);
    });
}

//create an object with the method of calculation
function determineOperator(){
    //create variable for the operatorType data on button
    let currentOperator = $(this).data('operator');
    console.log('clicked', currentOperator);
    //clear array
    calcQuery.length = 0;
    console.log(calcQuery);
    //create object
    let calculatorInput = {
        //operator is determined by the event data of the click listener
        operator: currentOperator
    }
    calcQuery.push(calculatorInput);
    console.log(calcQuery);
}

function queueCalculation(){
    for (let calculation of calcQuery){
        //create inputOne property and set it equal to the value of the first input
        calculation.inputOne = $('#integerOne').val();
        //create inputTwo property and set it equal to the value of the second input
        calculation.inputTwo = $('#integerTwo').val();
        console.log(calcQuery);
    }
    //var to access the calcQuery
    const calculation = calcQuery[0];
     //post the calculation query to the server side container
    $.ajax({
        method: 'POST',
        //route to server
        url: '/calculations',
        //data to send
        data: calculation
    }).then(response => {
        //check response
        console.log(response);
    })
     //make a promise to the server
     serveCalculations();
}