const themeBtn = document.getElementById("themeBtn")
const backBtn = document.getElementById("backBtn")

function themeHandler() {
  document.body.classList.toggle("dark-mode")
  document.querySelector(".nav").classList.toggle("dark-mode")
  document.querySelectorAll(".btn").forEach(element => {
    element.classList.toggle("dark-mode")
  })
}

function addTld(tld) {
  const pageLvlDomain = document.getElementById("top-lvl-domain").querySelector("span")
  pageLvlDomain.textContent = ""
  tld.forEach(element => {
    pageLvlDomain.textContent += element
  })
}

function addLanguages(languages) {
  const languagesSpan = document.getElementById("languages").querySelector("span")
  const languagesArray = []
  languagesSpan.textContent = ""

  for (const key in languages) {
    if (Object.hasOwnProperty.call(languages, key)) {
      const element = languages[key];
      languagesArray.push(element)
      // languagesSpan.textContent += `${element}, `
    }
  }

  languagesArray.forEach((element, index, arr) => {
    if (index == arr.length - 1) {
      languagesSpan.textContent += `${element}`
    }
    else {
      languagesSpan.textContent += `${element}, `
    }
  })
}

function addCurrencies(currencies) {
  // console.log(currencies);
  const currencySpan = document.getElementById("currencies").querySelector("span")
  const currencyArray = []
  currencySpan.textContent = ""

  for (const key in currencies) {
    if (Object.hasOwnProperty.call(currencies, key)) {
      currencyArray.push(key)
      // currencySpan.textContent += `${element}, `
    }
  }

  currencyArray.forEach((element, index, arr) => {
    if (index == arr.length - 1) {
      currencySpan.textContent += `${element}`
    }
    else {
      currencySpan.textContent += `${element}, `
    }
  })
}

function addBorderCountries(countries) {
  const borderCountries = document.getElementById("border-countries")
  borderCountries.innerHTML = ""
  countries.forEach(country => {
    const btn = document.createElement("button")
    btn.classList.add("btn")
    btn.innerHTML += country
    borderCountries.append(btn)
  })
}

function addCountryData(name, population, region, subregion, capital, flag, tld, currencies, languages, borders) {
  document.getElementById("countryName").textContent = name
  document.getElementById("native-name").querySelector("span").textContent = name
  document.getElementById("population").querySelector("span").textContent = population
  document.getElementById("region").querySelector("span").textContent = region
  document.getElementById("sub-region").querySelector("span").textContent = subregion
  document.getElementById("capital").querySelector("span").textContent = capital
  document.getElementById("flag").src = flag
  addTld(tld)
  addLanguages(languages)
  addCurrencies(currencies)
  addBorderCountries(borders)
}

function loadCountryData(name) {
  name = localStorage.getItem("cca2").toLowerCase()
  sendHTTPRequest(`https://restcountries.com/v3.1/alpha/${name}`)
  .then(data => {
    country = data[0]
    // console.log(country);
    addCountryData(
      country.name.common,
      country.population,
      country.region,
      country.subregion,
      country.capital[0],
      country.flags.png,
      country.tld,          // returns an array
      country.currencies,   // returns an object
      country.languages,    // returns an object
      country.borders       // returns an array
    )
  })
  .catch(err => {
    console.log(err);
  })
}

function returnToMainPage() {
  localStorage.clear()
  window.location.replace("./landingPage.html");
}

function sendHTTPRequest(url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", url)

    xhr.setRequestHeader("Access-Control-Allow-Origin", "*")
    xhr.setRequestHeader("Vary", "Origin")

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {  // success
        resolve(JSON.parse(xhr.response))
      }
      else {
        reject(xhr.status)
        // reject(new Error("Something went wrong"))
      }
    }

    xhr.onerror = () => {
      reject(new Error("Failed to send request!"))
    }

    xhr.send(JSON.stringify(data))
  })
}


themeBtn.addEventListener("click", themeHandler)
backBtn.addEventListener("click", returnToMainPage)
loadCountryData(localStorage.getItem("countyName"))