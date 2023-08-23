const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDispaly = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#Numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".genrateButton");
const allCheckBox = document.querySelector("input[type=checkbox]");
const Symbols ='!@#$%^&*()_+={[}];:,<.>/?`~\|';


let password = "";
let passwordLength = 10;
let checkCount = 1;
handleSlider();
// strngth valla circle

// password length set krta h 
function handleSlider(){
    inputSlider.value= passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    //shadow
}

function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min)) + min;
}

function genrateRandomNumber(){
    return getRndInteger(0,9);
}

function genrateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123))
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91))
}

function generateSymbol(){
    const randNum = getRndInteger(0 ,Symbols.length);
    return Symbols.charAt[randNum]; // charAt konsa char pda h uss index pr

}

function calcString(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper =  true;
    if (lowercaseCheck.checked) hasUpper =  true;
    if (numbersCheck.checked) hasUpper =  true;
    if (symbolsCheck.checked) hasUpper =  true;

    if (hasUpper && hasLower && (hasNum|| hasSym) && passwordLength >= 8){
        setIndicator("#0f0");
    } else if(
        (hasLower || hasUpper)&&
        (hasNum || hasSym)&&
        passwordLength >= 6
    ){
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDispaly.value);
        copyMsg.innerText="copied";
    }
    catch(e){
        copyMsg.innerText = "failed"
    }
    //to make copy valla span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("actvie");
    },2000);
}


inputSlider.addEventListener('input' , (e) => {
    passwordLength = e.target.value;
    handleSlider();
})