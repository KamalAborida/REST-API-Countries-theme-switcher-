const countriesDiv = document.getElementById("countries")
const themeBtn = document.getElementById("themeBtn")

function themeHandler() {
  document.body.classList.toggle("dark-mode")
  document.querySelector(".nav").classList.toggle("dark-mode")
  document.querySelector(".filter__sDiv").classList.toggle("dark-mode")
  document.querySelector("#regions").classList.toggle("dark-mode")
}

function createCountry(name, population, region, capital, img) {
  const countryDiv = document.createElement("div")
  countryDiv.classList.add("countryBox")
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

function AddAllCountries() {
  sendHTTPRequest("https://restcountries.com/v3.1/all")
  .then(data => {
    console.log(data);
    data.forEach(element => {
      const country = createCountry(element.name.common, element.population, element.region, element.capital, element.flags.png)
      countriesDiv.append(country)
    });
  })
  .catch(err => {
    console.log(err);
  })
}

function sendHTTPRequest(url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", url)

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
AddAllCountries()