// const
const inputField = document.getElementById("input-field");
const reverseBtn = document.getElementById("reverse-btn");
const resField = document.getElementById("res-text");
const convertBtn = document.getElementById("convertBtn");

// from currency selection
const fromCurrency = document.getElementById("select-from-currency");
// to currency selection
const toCurrency = document.getElementById("select-to-currency");

const fromImage = document.getElementById("from-image");
const toImage = document.getElementById("to-image");

// CHANGE COUNTRY-CURRENCY ICON 
function iconChange(){

    let currentFromCurrency = fromCurrency.value;
    let currentToCurrency = toCurrency.value;
    
    let fromCode = currencyToFlagCode[fromCurrency.value].toLowerCase();
    let toCode = currencyToFlagCode[toCurrency.value].toLowerCase();

    fromImage.src = `https://flagcdn.com/w80/${fromCode}.png`;
    toImage.src = `https://flagcdn.com/w80/${toCode}.png`;
}

async function convert(){
    const inputMoney = inputField.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;
    
    const convertRes = await fetch(`https://open.er-api.com/v6/latest/${from}`);
    const convertData = await convertRes.json();

    console.log("Curreency data: ", convertData);
    
    if(convertData.result === "success"){
        let rate = convertData.rates[to];
        let resAmount = inputMoney * rate;

        resField.textContent = inputMoney + from + " = " + resAmount.toFixed(2) + to;
    } else{
        resField.textContent = "Error!";
    }
}

convertBtn.addEventListener("click", convert);
reverseBtn.addEventListener("click", function(){
    let tempImage = fromImage.src;
    let tempCurrency = fromCurrency.value;

    fromImage.src = toImage.src;
    toImage.src = tempImage;

    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCurrency;

    convert();
})

fromCurrency.addEventListener("change", iconChange);
toCurrency.addEventListener("change", iconChange);

iconChange();