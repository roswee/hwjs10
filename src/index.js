import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import {debounce} from 'lodash';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info")
inputCountry.addEventListener("input", debounce(eventHandle, DEBOUNCE_DELAY));

function eventHandle(e) {
    if (!inputCountry.value.trim()) {
        countryInfo.innerHTML = '';
        countryList = '';
    } else {
    fetchCountries()
        .then(name => showCountries(name))
        .catch(error => {
            return Notiflix.Notify.failure('Oops, there is no country with that name');
          })}
};

function showCountries(countries) {
    if (countries.length > 10) {
        Notiflix.Notify.failure("Too many matches found. Please enter a more specific name.")
    } else if (countries.length > 1 && countries.length < 10) {
        const generatedList = countries.map(({name, flag}) => 
        `<li>
        <img class="flag" src="${flags.svg}" alt="flag of ${name.common}" width=35px>
        <spam class="country__name"> ${name}</span>
        </li>`).join("");
        countryList.innerHTML = generatedList;
        countryInfo.innerHTML = "";
    } else if (countries.length === 1) {
        countryInfo.innerHTML =
        countries.map(({name, capital, population, flags, languages}) =>
        `<h1>${name.common}</h1> <img class="flag" src="${flags.svg}" width=35px>
        <p class="country__capital"> Capital: ${capital}</p>
        <p class="country__pop"> Population: ${population} </p>
        <p class="country__lng"> languages: ${Object.values(languages)}</p>`);
        countryList = "";
    } else {
        countryList.innerHTML = "";
    }
}