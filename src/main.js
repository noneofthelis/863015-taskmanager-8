import makeFilter from './make-filter.js';
import makeTask from './make-task.js';

const filtersContainer = document.querySelector(`.main__filter`);
const cardsContainer = document.querySelector(`.board__tasks`);
const filtersNames = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];

const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const renderFilters = (array) => {
  array.forEach((element, index) => {
    const randomNumber = generateRandomNumber(0, 20);
    const isChecked = index ? `` : `checked`;
    filtersContainer.insertAdjacentHTML(`beforeend`, makeFilter(element, randomNumber, isChecked));
  });
};

const renderTasks = (number) => {
  for (let i = 0; i < number; i++) {
    cardsContainer.insertAdjacentHTML(`beforeend`, makeTask());
  }
};

const toggleFilter = (evt) => {
  filtersContainer.querySelector(`input[type="radio"]:checked`).checked = false;
  evt.target.checked = true;
};

const onFilterClick = (evt) => {
  toggleFilter(evt);
  cardsContainer.innerHTML = ``;
  renderTasks(generateRandomNumber(1, 12));
};

filtersContainer.addEventListener(`click`, onFilterClick);

renderFilters(filtersNames);
renderTasks(7);
