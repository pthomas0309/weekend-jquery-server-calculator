//call jQuery run readyNow
$(readyNow);
//empty array to hald the calculations
let calcHistory = [];
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
//create an object with the method of calculation
function determineOperator(event){
    //create variable for the operatorType data on button
    let currentOperator = $(this).data('operator');
    console.log('clicked', currentOperator);
    //clear array
    calcHistory.length = 0;
    console.log(calcHistory);
    //create object
    let calculatorInput = {
        //operator is determined by the event data of the click listener
        operator: currentOperator
    }
    calcHistory.push(calculatorInput);
    console.log(calcHistory);
}

function queueCalculation(){
    for (let calculation of calcHistory){
        //create inputOne property and set it equal to the value of the first input
        calculation.inputOne = $('#integerOne').val();
        //create inputTwo property and set it equal to the value of the second input
        calculation.inputTwo = $('#integerTwo').val();
        console.log(calcHistory);
    }
}