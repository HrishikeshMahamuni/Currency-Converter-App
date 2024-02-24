const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

let dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
   let amntVal = amount.value;
   
   if(amntVal === "" || amntVal < 0)
   {
        amntVal = 1;
        amount.value = "1";
   }

   const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
   let response = await fetch(URL);
   let data = await response.json();
   let rate = data[toCurr.value.toLowerCase()]
   console.log(rate);

   let finalAmount = amntVal * rate;
   msg.innerText = `${amntVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}



for(let select of dropdowns){
    for(Currcode in countryList){
        
        let newOption = document.createElement("option");
        newOption.innerText = Currcode;
        newOption.value = Currcode;
        if(select.name === "from" && Currcode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && Currcode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption); 
    }
    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    });
}


const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}


btn.addEventListener("click",(event) => {
   event.preventDefault(); 
   updateExchangeRate();
   
});

window.addEventListener("load" , async() => {
    updateExchangeRate();
 });


