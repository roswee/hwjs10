import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
const DEBOUNCE_DELAY = 300;

var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

const inputCountry = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info")
inputCountry.addEventListener("input", debounce(eventHandle, DEBOUNCE_DELAY));

function eventHandle() {
    if (!inputCountry.value==="")
    fetchCountries(inputCountry.value.trim())
        .then(countries => showCountries(countries))
};

function showCountries(countries) {
    if (countries.length > 10) {
        Notiflix.Notify.failure("Too many matches found. Please enter a more specific name.")
    } else if (countries.length > 1 && countries.length < 10) {
        const generatedList = countries.map(({name, flag}) => 
        `<li>
        <img class="flag" src="${flags.svg}" alt="flag of ${name.common}">
        <spam class="country-name"> ${name}</span>
        </li>`).join("");
        countryList.innerHTML = generatedList;
    } else {
        countryList.innerHTML =
        countries.map(({name, capital, population, flags, languages}) =>
        `<h1>${name.common}</h1> <img src="&{flags.svg} height=45px">
        <p>Capital: ${capital}</p>
        <p> Population: ${population} </p>
        <p> languages: ${languages}</p>`)
    }
}