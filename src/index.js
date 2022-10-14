const debounce = require('lodash.debounce');

import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import countriesListMarkup from './templates/countries-list-markup.hbs';
import oneCountryMarkup from './templates/one-country-markup.hbs';

const DEBOUNCE_DELAY = 300;
let searchCountry = '';

const refs = {
  searchQuery: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
};
refs.searchQuery.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

const notification = {
  infoMessage() {
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  },

  failureMessage() {
    return Notiflix.Notify.failure('Oops, there is no country with that name');
  },
};

function onSearch(evt) {
  searchCountry = evt.target.value.trim();

  if (searchCountry === '') {
    clearMarkup();
    return;
  }

  fetchCountries(searchCountry)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then(countries => {
      renderMarkup(countries);
    })
    .catch(error => notification.failureMessage());
}

function clearMarkup() {
  refs.countryList.innerHTML = '';
}

function appendCountriresListMarkup(array) {
  refs.countryList.insertAdjacentHTML('beforeend', countriesListMarkup(array));
}

function appendOneCountryMarkup(array) {
  refs.countryList.insertAdjacentHTML('beforeend', oneCountryMarkup(array));
}

function renderMarkup(array) {
  clearMarkup();
  if (array.length === 1) {
    appendOneCountryMarkup(array[0]);
  } else if (array.length >= 2 && array.length <= 10) {
    appendCountriresListMarkup(array);
  } else if (array.length > 10) {
    notification.infoMessage();
  }
}
