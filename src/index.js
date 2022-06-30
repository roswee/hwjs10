import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import {debounce} from 'lodash';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info")
inputCountry.addEventListener("input", debounce(eventHandle, DEBOUNCE_DELAY));

function eventHandle({ target: { value } }) {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
        countryInfo.innerHTML = '';
        countryList.innetHTML = '';
    }
    fetchCountries(trimmedValue).then(showCountries).catch(Notiflix.Notify.failure('Oops, there is no country with that name'));
};

function showCountries(data) {
    if (data.length > 10) {
        Notiflix.Notify.failure("Too many matches found. Please enter a more specific name.")
    } else if (data.length > 1 && data.length < 10) {
        const generatedList = data.map(({name, flags}) => 
        `<li>
        <img class="flag" src="${flags.svg}" alt="flag of ${name.common}" width=35px>
        <spam class="country__name"> ${name.common}</span>
        </li>`).join("");
        countryList.innerHTML = generatedList;
        countryInfo.innerHTML = "";
    } else if (data.length === 1) {
        countryInfo.innerHTML =
        data.map(({name, capital, population, flags, languages}) =>
        `<h1>${name.common}</h1> <img class="flag" src="${flags.svg}" width=35px>
        <p class="country__capital"> Capital: ${capital}</p>
        <p class="country__pop"> Population: ${population} </p>
        <p class="country__lng"> languages: ${Object.values(languages)}</p>`);
        countryList = "";
    } else {
        countryList.innerHTML = "";
    }
}