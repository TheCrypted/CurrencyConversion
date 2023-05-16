document.addEventListener("DOMContentLoaded", ()=>{
    let currencySelectorFrom = document.getElementById("FromInputA");
    let currencySelectorTo = document.getElementById("ToInputA");
    let fromIMG = document.getElementById("FromIMG");
    let toIMG = document.getElementById("ToIMG");
    fetch('https://openexchangerates.org/api/currencies.json')
        .then(response => response.json())
        .then(currencies => {
            for(let currency in currencies){
                const option = document.createElement('option');
                option.value = currency;
                option.text = currencies[currency];
                currencySelectorFrom.appendChild(option);

                const optionTo = document.createElement('option')
                optionTo.value = currency;
                optionTo.text = currencies[currency];
                currencySelectorTo.appendChild(optionTo);
            }
        }).catch(error => {
        console.error(error)
    })
    currencySelectorFrom.addEventListener("change", () => {
        let countryCode = currencySelectorFrom.value.toLowerCase().slice(0, 2);
        fromIMG.style.backgroundImage = "url(https://flagcdn.com/w2560/" + countryCode +".png)"
        console.log("async")
    })
    currencySelectorTo.addEventListener("change", () => {
        let countryCode = currencySelectorTo.value.toLowerCase().slice(0, 2);
        toIMG.style.backgroundImage = "url(https://flagcdn.com/w2560/" + countryCode +".png)"
        console.log("async")
    })

})