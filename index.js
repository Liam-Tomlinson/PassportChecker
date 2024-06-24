// require stuff
const prompt = require('prompt-sync')();


//declare stuff
const passportNumber = prompt('What is your passport number (second line of the machine readable zone)?');
let gender = ''
let countryCode =''
const countryCoderegex = /^[A-Z]{3}$/;


//check user input
while(gender != 'M' && gender != 'F' && gender != 'X')
    {
        gender = prompt('What is your gender? (M/F/X):')
    };

while(!countryCoderegex.test(countryCode))
    {
        countryCode = prompt('What is your nationality? (Enter a 3-letter country code all uppercase):');
    }; 

checkMachineReadableZone(passportNumber, gender, countryCode)    


//Check passport machine readable zone is valid

function checkMachineReadableZone(passportNumber, gender, countryCode) {

    
    const machineReadableRegex = new RegExp(`^[A-Z0-9]{9}${checkCheckCode(passportNumber, 0, 8)}${countryCode}\\d{6}${checkCheckCode(passportNumber, 13, 18)}${gender}\\d{6}${checkCheckCode(passportNumber, 21, 26)}\\d{1,2}$`);
    const machineReadableRegex2 = new RegExp(`^[A-Z0-9]{9}[0-9][A-Z]{3}\\d{6}[0-9][MFX]\\d{6}[0-9]\\d{1,2}$`);


    if(machineReadableRegex.test(passportNumber))
        {
            console.log(`Based on the information provided this could be a valid passport and the holders gender and natioanlity corresponds correctly to the machine readable zone.`);
        }
    else if(machineReadableRegex2.test(passportNumber))
        {
            console.log("Warning! Based on the information provided this could be a valid passport.  However, the gender and/or country code entered does not match the machine readable zone.")

        }    
    else
    {
        console.log("Warning! This is not a valid passport.");
    }    
}


function checkCheckCode(machineReadableZone, startChar, endChar) {
    const weights = [7, 3, 1];
    let sum = 0;
    let weightIndex = 0;

    for (let i = startChar; i <= endChar; i++) {
        const char = machineReadableZone[i];
        let value;

        if (char >= '0' && char <= '9') {
            value = parseInt(char, 10);
        } else if (char >= 'A' && char <= 'Z') {
            value = char.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
        } else {
            
            value = 0;
        }

        sum += value * weights[weightIndex];
        weightIndex = (weightIndex + 1) % weights.length;
    }

    const checkDigit = sum % 10;
    return checkDigit;
}







