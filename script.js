//gather screen variables
const digit_0 = document.getElementById("digit_0");
const digit_1 = document.getElementById("digit_1");
const digit_2 = document.getElementById("digit_2");
const digit_3 = document.getElementById("digit_3");
const digit_4 = document.getElementById("digit_4");
const digit_5 = document.getElementById("digit_5");
const digit_6 = document.getElementById("digit_6");
const digit_7 = document.getElementById("digit_7");
const digit_8 = document.getElementById("digit_8");
const digit_9 = document.getElementById("digit_9");

//append screen variables to array
const screenArray = [digit_0, digit_1, digit_2, digit_3, digit_4, digit_5, digit_6, digit_7, digit_8, digit_9]

//define initArray
const initArray = [];

//define active array for gathering input
let activeArray = [];

//define previous array
let previousArray = [];

//define operand
let operand = ' ';

//checks to see if operand has already been given in the expression -- if it has then operands will evaluate the function
let operandCheckSum = 0;

//set iterant for new expression or continuing (iterating) expression
let iterant = false;

//gather numpad buttons
const numpad_0 = document.getElementById("numpad_0");
const numpad_1 = document.getElementById("numpad_1");
const numpad_2 = document.getElementById("numpad_2");
const numpad_3 = document.getElementById("numpad_3");
const numpad_4 = document.getElementById("numpad_4");
const numpad_5 = document.getElementById("numpad_5");
const numpad_6 = document.getElementById("numpad_6");
const numpad_7 = document.getElementById("numpad_7");
const numpad_8 = document.getElementById("numpad_8");
const numpad_9 = document.getElementById("numpad_9");
const numpad_decimal = document.getElementById("numpad_decimal");

//gather operand buttons
const operand_subtract = document.getElementById("operand_subtract");
const operand_add = document.getElementById("operand_add");
const operand_divide = document.getElementById("operand_divide");
const operand_multiply = document.getElementById("operand_multiply");


//gather super buttons
const super_equals = document.getElementById("super_equals");
const super_clear = document.getElementById("super_clear");
const super_backspace = document.getElementById("super_backspace"); 

//converts an array to a numerical value
function arrayToNumber(arr)
{
    let isNegative;
    //handle negative numbers
    if (arr.includes('-',0))
    {
        isNegative = true;
        const negativeIndex = arr.indexOf('-');
        if (negativeIndex > -1) 
        {
            arr.splice(negativeIndex, 1); // 2nd parameter means remove one item only
        }
    }
    else
    {
        isNegative = false;
    }

    //initialize str var
    let str = '0';

    //create a string with values from array
    for(let i = 0; i < arr.length; i++)
    {
        if(arr[i] != ' ') //checks for formatting spaces from writeArray()
        {
            str += arr[i];
        }
    }

    if(isNegative == true)
    {
        return (Number(str) * -1);
    }
    else
    {
        return Number(str);
    }
}

//converts a numerical value to an array of characters
function numberToArray(num)
{
    let arr = ['0','0','0','0','0','0','0','0','0','0'];
    if(num > 9999999999)
    {
        return ['O','V','E','R','F','L','0','0','0','W'];
    }

    let numString = num.toString();
    let n = 0
    for(let i = (10 - numString.length); i < 10; i++)
    {
        arr[i] = numString[n];
        n++;
    }
    return arr;
}

//format number output to fit on the screen
function truncuateAndRound(num)
{
    //truncuate the number and take absolute value
    let truncuated = Math.abs(Math.trunc(num)); 

    //find how many digits to the left side of the decimal (including decimal)
    if(truncuated < 1 && truncuated > -1) //avoid taking log(0)
    {
        digits = 2;
    }
    else
    {
        digits = Math.trunc(Math.log(truncuated)) + 2; 
    }

    //add a digit for the negative sign if number is less than 0
    if (num < 0)
    {
        digits += 1; 
    }

    return Number(num.toFixed(10-digits));
}

//operates with array a, string operand, and array b >> returns an array
function operate(a, operand, b)
{
    //cast variable types
    a = arrayToNumber(a);
    b = arrayToNumber(b);

    //create resultant pointer
    let c;

    //switch for actual operation
    switch(operand)
    {
        case '+':
            c = a + b;
            break;
        case '-':
            c = a - b;
            break;
        case '/':
            //check for divide by 0 error
            if(b == 0) 
            {
                return ['I','D','1','0','T','E','r','r','o','r']
            }
            c = a / b;
            break;
        case '*':
            c = a * b;
            break;
    }
    c = truncuateAndRound(c);
    return numberToArray(c);
}

//writes array to calculator screen
function writeArray(arr)
{
    //remove zeroes from the beginning of potential array
    for(let i = 0; i < arr.length && arr[i] == 0 && arr[i+1] != '.'; i++)
    {
        arr[i] = ' ';
    }
    for(let i = 0; i < arr.length; i++)
    {
        screenArray[i].textContent = arr[i];
    }
}
function returnInitArray()
{
    digit_0.textContent = ' ';
    digit_1.textContent = ' ';
    digit_2.textContent = ' ';
    digit_3.textContent = ' ';
    digit_4.textContent = ' ';
    digit_5.textContent = ' ';
    digit_6.textContent = ' ';
    digit_7.textContent = ' ';
    digit_8.textContent = ' ';
    digit_9.textContent = ' ';
}

//writes a specified value to specified index of screen
function numpadType(char)
{
    if (activeArray.length < 10) //do not allow overflow
    {
        activeArray += char;
        writeArray(activeArray);
    }
}

function assignOperand(char)
{
    if(operandCheckSum == 0) 
    {
        if(iterant == false)
        {
            previousArray = activeArray;
        }
        activeArray = [];
        returnInitArray();
        operand = char;
        operandCheckSum = 1;
    }
    else
    {
        evaluateOperation();
    }
}

function evaluateOperation()
{
    previousArray = operate(previousArray, operand, activeArray);
    activeArray = [];
    writeArray(previousArray);
    iterant = true;
    operandCheckSum = 0;
}

function clear()
{
    previousArray = [];
    activeArray = [];
    returnInitArray();
    iterant = false;
}

function backspace()
{
    if(activeArray.length > 0)
    {
        activeArray = activeArray.slice(1);
        returnInitArray();
        writeArray(activeArray);
    }
}

//add click event listeners to numpad
numpad_0.addEventListener('click', () => {
    numpadType('0');
  });
numpad_1.addEventListener('click', () => {
  numpadType('1');
});
numpad_2.addEventListener('click', () => {
  numpadType('2');
});
numpad_3.addEventListener('click', () => {
  numpadType('3');
});
numpad_4.addEventListener('click', () => {
  numpadType('4');
});
numpad_5.addEventListener('click', () => {
  numpadType('5');
});
numpad_6.addEventListener('click', () => {
  numpadType('6');
});
numpad_7.addEventListener('click', () => {
  numpadType('7');
});
numpad_8.addEventListener('click', () => {
  numpadType('8');
});
numpad_9.addEventListener('click', () => {
    numpadType('9');
  });
numpad_decimal.addEventListener('click', () => {
  numpadType('.');
});

//add click event listeners to operands
operand_add.addEventListener('click', () => {
    assignOperand('+');
  });
operand_divide.addEventListener('click', () => {
    assignOperand('/');
  });
operand_multiply.addEventListener('click', () => {
    assignOperand('*');
  });
operand_subtract.addEventListener('click', () => {
    assignOperand('-');
  });

// add click event listeners to supers
super_equals.addEventListener('click', () => {
    evaluateOperation();
  });
super_clear.addEventListener('click', () => {
    clear();
  });
super_backspace.addEventListener('click', () => {
    backspace();
  });