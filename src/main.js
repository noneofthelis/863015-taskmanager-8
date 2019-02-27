import makeFilter from './make-filter.js';
import makeTask from './make-task.js';

const FilterInterval = {
  MIN: 0,
  MAX: 20
};

const TasksNumber = {
  INITIAL: 7,
  RANDOM_MIN: 1,
  RANDOM_MAX: 12
};

const filtersContainer = document.querySelector(`.main__filter`);
const tasksContainer = document.querySelector(`.board__tasks`);
const filtersNames = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];

/**
 * returns random number between min and max inclusive
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * returns an array of certain number of task element templates
 * @param {number} number
 * @return {string[]}
 */
const generateTasksArray = (number) => {
  return [...new Array(number)].map(() => makeTask());
};

/**
 * inserts the resulting nodes (filter elements) into the DOM tree
 * @param {Array.<string>} array
 */
const renderFilters = (array) => {
  const fragment = document.createDocumentFragment();
  array.forEach((element, index) => {
    fragment.appendChild(makeFilter(element,
        getRandomNumber(FilterInterval.MIN, FilterInterval.MAX), index ? `` : `checked`));
  });
  filtersContainer.appendChild(fragment);
};

/**
 * inserts the resulting nodes (tasks elements) into the DOM tree
 * @param {Array.<string>} array
 */
const renderTasks = (array) => {
  const fragment = document.createDocumentFragment();
  array.forEach((element) => {
    fragment.appendChild(element);
  });
  tasksContainer.appendChild(fragment);
};

/**
 * toggles checked filter
 * @param {MouseEvent} evt
 */
const toggleFilter = (evt) => {
  filtersContainer.querySelector(`input[type="radio"]:checked`).checked = false;
  evt.target.checked = true;
};

/**
 * on click event toggles checked filter and refreshes tasks
 * @param {MouseEvent} evt
 */
const onFilterClick = (evt) => {
  toggleFilter(evt);
  tasksContainer.innerHTML = ``;
  renderTasks(generateTasksArray(getRandomNumber(TasksNumber.RANDOM_MIN, TasksNumber.RANDOM_MAX)));
};

filtersContainer.addEventListener(`click`, onFilterClick);

renderFilters(filtersNames);
renderTasks(generateTasksArray(TasksNumber.INITIAL));
