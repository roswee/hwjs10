import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
const DEBOUNCE_DELAY = 300;

var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

const inputCountry = document.querySelector("#search-box");

inputCountry.addEventListener("input", debounce(eventHandle, DEBOUNCE_DELAY));

function eventHandle() {
    if (!inputCountry === null) {
        fetchCountries(inputCountry.value)
    }
    return
}

