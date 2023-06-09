document.addEventListener("DOMContentLoaded", ()=>{
    let currencySelectorFrom = document.getElementsByClassName("darkenIMG")[0];
    let currencySelectorTo = document.getElementsByClassName("darkenIMG")[1];
    let fromInput = document.getElementById("FromInputA");
    let toInput = document.getElementById("ToInputA");
    let fromIMG = document.getElementById("FromIMG")
    let toIMG = document.getElementById("ToIMG")
    let url = 'https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=USD&want=EUR&amount=5000';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': 'currency-converter-by-api-ninjas.p.rapidapi.com'
        }
    };
    async function pullData(fromInput, toInput){
        if(fromInput.value !== "") {
            try {
                url = `https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=${fromInput.placeholder}&want=${toInput.placeholder}&amount=${fromInput.value}`
                console.log(fromInput.placeholder);
                const response = await fetch(url, options);
                const {new_amount} = await response.json();
                toInput.value = new_amount;
            } catch (error) {
                console.error(error);
            }
        } else {
            toInput.value = ""
        }
    }
    function change(option){
        option.style.fontSize = "10vh";
        option.style.opacity = "1";
    }
    function revert(optionTo){
        optionTo.style.fontSize = "7vh";
        optionTo.style.opacity = "0.5";
    }
    
    fetch('https://openexchangerates.org/api/currencies.json')
        .then(response => response.json())
        .then(currencies => {
            for(let currency in currencies){
                const option = document.createElement('div');
                option.setAttribute("data-value", currency);
                option.className = "OptionsFrom"
                option.style.opacity = "0.5";
                option.textContent = currencies[currency];
                currencySelectorFrom.appendChild(option);
                option.addEventListener("mousedown", ()=>{
                    let countryCode = option.getAttribute("data-value").toLowerCase().slice(0, 2);
                    fromInput.placeholder = option.getAttribute("data-value");
                    fromIMG.style.backgroundImage = "url(https://flagcdn.com/w2560/" + countryCode +".png)"
                    pullData(fromInput, toInput).then(r => {})
                })
                option.addEventListener("mousemove", ()=>{
                    change(option)
                })
                option.addEventListener("mouseout", ()=>{
                    revert(option)
                })

                const optionTo = document.createElement('div');
                optionTo.setAttribute("data-value", currency)
                optionTo.className = "OptionsTo"
                optionTo.style.opacity = "0.5";
                optionTo.textContent = currencies[currency];
                currencySelectorTo.appendChild(optionTo);
                optionTo.addEventListener("mousedown", ()=>{
                    let countryCode = optionTo.getAttribute("data-value").toLowerCase().slice(0, 2);
                    toInput.placeholder = optionTo.getAttribute("data-value");
                    toIMG.style.backgroundImage = "url(https://flagcdn.com/w2560/" + countryCode +".png)"
                    pullData(toInput, fromInput).then(r => {})
                })
                optionTo.addEventListener("mousemove", ()=>{
                    change(optionTo)
                })
                optionTo.addEventListener("mouseout", ()=>{
                    revert(optionTo)
                })
            }
        }).catch(error => {
            console.error(error)
    })
    fromInput.addEventListener("input", async () => {
        await pullData(fromInput, toInput)
    })
    toInput.addEventListener("input", async () => {
        await pullData(toInput, fromInput)
    })
    // currencySelectorFrom.addEventListener("change", () => {
    //     let countryCode = currencySelectorFrom.value.toLowerCase().slice(0, 2);
    //     fromIMG.style.backgroundImage = "url(https://flagcdn.com/w2560/" + countryCode +".png)"
    //     console.log("async")
    // })
})
