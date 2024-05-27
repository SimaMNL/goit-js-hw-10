import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_x9BpX3vIXvolKAhuf6ASLn4QTjXIhRA8CZnS4wfxKsgaFaERZPl1BMtJGTRPIpuT';

import { fetchCatByBreed } from './js/cat-api';
import { renderBreedDesc } from './js/renderBreedDesc';
import { fetchAndRenderBreeds } from './js/fetchAndRenderBreeds';

import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const divPictEl = document.querySelector('.cat-info-pict');
const divDescEl = document.querySelector('.cat-info-desc');
const loaderEl = document.querySelector('.loader');

breedSelect.addEventListener('change', onChangeSelect);

fetchAndRenderBreeds();

function onChangeSelect(event) {
  loaderEl.classList.remove('unvisible');
  divPictEl.innerHTML = '';
  divDescEl.innerHTML = '';
  const breedId = event.target.value;
  console.log('breedId: ', breedId);
  fetchCatByBreed(breedId)
    .then(breed => renderBreedDesc(breed))
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => loaderEl.classList.add('unvisible'));
}

export { breedSelect, divPictEl, divDescEl, loaderEl };
