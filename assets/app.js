const countriesDiv = document.getElementById("countries")
const themeBtn = document.getElementById("themeBtn")
const searchInpt = document.getElementById("search-inpt")
const filterBtn = document.getElementById("regions")
let countriesData = []

function themeHandler() {
  document.body.classList.toggle("dark-mode")
  document.querySelector(".nav").classList.toggle("dark-mode")
  document.querySelector(".filter__sDiv").classList.toggle("dark-mode")
  document.querySelector("#regions").classList.toggle("dark-mode")
}

function createCountry(name, population, region, capital, img, cca2) {
  const countryDiv = document.createElement("div")
  countryDiv.classList.add("countryBox")
  countryDiv.setAttribute('id', `${cca2}`)
  countryDiv.innerHTML = `
    <img src=${img} alt="">
    <div class="countryBox__infoDiv">
      <h2 class="countryName">${name}</h2>
      <p class="population">Population: <span>${population}</span></p>
      <p class="region">Region: <span>${region}</span></p>
      <p class="capital">Capital: <span>${capital}</span></p>
    </div>
  `
  return countryDiv
}

function showCountryInfo(e) {
  localStorage.setItem("cca2", e.target.closest(".countryBox").id)
  window.location.replace("./Pages/countryPage.html");
}

function AddAllCountries() {
  sendHTTPRequest("https://restcountries.com/v3.1/all")
  .then(data => {
    countriesData = [...data]
    console.log(countriesData);
    data.forEach((element, indx) => {
      if (element.name.common.toLowerCase() == "israel") {
        data.splice(indx, 1)
        countriesData.splice(indx, 1)
        return
      }
      const country = createCountry(element.name.common, element.population, element.region, element.capital, element.flags.png, element.cca2)
      country.addEventListener("click", showCountryInfo)
      countriesDiv.append(country)
    });
  })
  .catch(err => {
    console.log(err);
  })
}

function search(e) {
  let countriesArray2 = countriesData.filter(element => {
    if (element.name.common.toLowerCase().includes(searchInpt.value.trim().toLowerCase())) {
      return element
    }
  })
  console.log(countriesArray2);
  document.getElementById("countries").innerHTML = ""
  countriesArray2.forEach(element => {
  const country = createCountry(element.name.common, element.population, element.region, element.capital, element.flags.png, element.cca2)
  country.addEventListener("click", showCountryInfo)
  countriesDiv.append(country)
  })
}

function filter(e) {
  if (e.target.value.trim().toLowerCase() == "all") {
    document.getElementById("countries").innerHTML = ""
    countriesData.forEach(element => {
      const country = createCountry(element.name.common, element.population, element.region, element.capital, element.flags.png, element.cca2)
      country.addEventListener("click", showCountryInfo)
      countriesDiv.append(country)
    })
    return
  }

  let countriesArray2 = countriesData.filter(element => {
    if (element.region.trim().toLowerCase() == e.target.value.trim().toLowerCase()) {
      return element
    }
  })
  console.log(countriesArray2);
  document.getElementById("countries").innerHTML = ""
  countriesArray2.forEach(element => {
    const country = createCountry(element.name.common, element.population, element.region, element.capital, element.flags.png, element.cca2)
    country.addEventListener("click", showCountryInfo)
    countriesDiv.append(country)
  })
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


filterBtn.addEventListener("change", filter)
searchInpt.addEventListener("input", search)
themeBtn.addEventListener("click", themeHandler)
// console.log(countriesData);
localStorage.clear()
AddAllCountries()