import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1/name/';
const filterOptions = 'fields=name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}?${filterOptions}`);
}
// ?fields=name,capital,population,flag,languages
