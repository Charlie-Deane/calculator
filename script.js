
//converts an array to a numerical value
function arrayToNumber(arr)
{
    let str = '0';
    for(let i = 0; i < arr.length; i++)
    {
        str += arr[i];
    }
    return Number(str);
}

//converts a numerical value to an array of characters
function numberToArray(num)
{
    let arr = ['0','0','0','0','0','0','0','0','0','0'];
    if(num > 9999999999)
    {
        return arr;
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

//operates with array a, string operand, and array b
function operate(a, operand, b)
{
    //cast variable types
    a = arrayToNumber(a);
    console.log(a);
    b = arrayToNumber(b);
    console.log(b);

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
                return ['e','r','r','o','r','E','r','r','o','r']
            }
            c = a / b;
            break;
        case '*':
            c = a * b;
            break;
    }
    return numberToArray(c);
}

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

//gather numpad variables
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

//gather operand variables
const super_equals = document.getElementById("super_equals");
const super_clear = document.getElementById("super_clear");
const super_backspace = document.getElementById("super_backspace"); 

let a = 24;
let aArr = numberToArray(a);
a = arrayToNumber(aArr);
console.log(aArr)

let b = 22;
let bArr = numberToArray(b);
b = arrayToNumber(bArr);
console.log(bArr);

let c = '-';
console.log(c);

console.log(operate(aArr,c,bArr));

//note to self: you still need to fix division!
//note to self: you need to fix negative numbers on subtraction!

