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
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const Symbols ='!@#$%^&*()_+={[}];:,<.>/?`~\|';


let password = "";
let passwordLength = 10;
let checkCount = 0;
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
    return Math.floor(Math.random() * (max-min)) + min;
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
    return Symbols.charAt(randNum); // charAt konsa char pda h uss index pr

}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper =  true;
    if (lowercaseCheck.checked) hasLower =  true;
    if (numbersCheck.checked) hasNum =  true;
    if (symbolsCheck.checked) hasSym =  true;

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

function shufflePassword(array){
    //Fisher Yates Method
    for (let i = array.length-1 ; i>0 ; i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str ="";
    array.forEach((el) => (str += el));
    return str;

}

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    }) ; 

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}


allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

inputSlider.addEventListener('input' , (e) => {
    passwordLength = e.target.value;
    handleSlider();
})


copyBtn.addEventListener('click' , () => {
    if(passwordDispaly.value)
         copyContent();
})

generateBtn.addEventListener('click' , () => {
    if (checkCount ==0 )
     return;

    if (passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    // remove old password
    password = "";

    //if (uppercaseCheck.checked) {
       //password+= generateUpperCase();
    //}

   // if (lowercaseCheck.checked) {
       // password+= generateLowerCase();
    //}

    //if (numbersCheck.checked) {
       // password+= genrateRandomNumber();
   // }

   // if (symbolsCheck.checked) {
   ////     password+= generateSymbol();
   /// }

   let funcArr =[];

   if (uppercaseCheck.checked) 
        funcArr.push(generateUpperCase);

    if (lowercaseCheck.checked)
        funcArr.push(genrateLowerCase);
    
    if (numbersCheck.checked)
        funcArr.push(genrateRandomNumber);
        
    if (symbolsCheck.checked)
        funcArr.push(generateSymbol);
    
    //compulsory addition
    for(let i = 0 ; i<funcArr.length; i++){
        password += funcArr[i]();
    }

    //remainng addition
    for(let i=0 ; i<passwordLength-funcArr.length ; i++){
        let randIndex = getRndInteger(0 , funcArr.length);
        password += funcArr[randIndex]();
    }

    //password shuffle
    password = shufflePassword(Array.from(password));

    //show in ui
    passwordDispaly.value = password;

    //calculate strength
    calcStrength();
})