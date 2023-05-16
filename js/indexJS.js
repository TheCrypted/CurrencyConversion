document.addEventListener("DOMContentLoaded", ()=>{
    let currencySelectorFrom = document.getElementsByClassName("darkenIMG")[0];
    let currencySelectorTo = document.getElementsByClassName("darkenIMG")[1];
    let fromInput = document.getElementById("FromInputA");
    let toInput = document.getElementById("ToInputA");
    let fromIMG = document.getElementById("FromIMG")
    fetch('https://openexchangerates.org/api/currencies.json')
        .then(response => response.json())
        .then(currencies => {
            for(let currency in currencies){
                const option = document.createElement('div');
                option.setAttribute("data-value", currency);
                option.className = "OptionsFrom"
                option.textContent = currencies[currency];
                currencySelectorFrom.appendChild(option);
                option.addEventListener("mousedown", ()=>{
                    let countryCode = option.getAttribute("data-value").toLowerCase().slice(0, 2);
                    fromInput.value = option.getAttribute("data-value");
                    fromIMG.style.backgroundImage = "url(https://flagcdn.com/w2560/" + countryCode +".png)"
                })
                option.addEventListener("mousemove", ()=>{
                    option.style.fontSize = "10vh";
                })
                option.addEventListener("mouseout", ()=>{
                    option.style.fontSize = "7vh";
                })

                const optionTo = document.createElement('div');
                optionTo.setAttribute("data-value", currency)
                optionTo.className = "OptionsTo"
                optionTo.textContent = currencies[currency];
                currencySelectorTo.appendChild(optionTo);
                optionTo.addEventListener("mousedown", ()=>{
                    toInput.value = optionTo.getAttribute("data-value");
                })
                optionTo.addEventListener("mousemove", ()=>{
                    optionTo.style.fontSize = "10vh";
                })
                optionTo.addEventListener("mouseout", ()=>{
                    optionTo.style.fontSize = "7vh";
                })
            }
        }).catch(error => {
            console.error(error)
    })
    // currencySelectorFrom.addEventListener("change", () => {
    //     let countryCode = currencySelectorFrom.value.toLowerCase().slice(0, 2);
    //     fromIMG.style.backgroundImage = "url(https://flagcdn.com/w2560/" + countryCode +".png)"
    //     console.log("async")
    // })
})