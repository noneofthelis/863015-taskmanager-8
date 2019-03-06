import makeFilter from './make-filter.js';
import makeTask from './make-task.js';

const ENTER_KEYCODE = 13;

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
 * @param {Array.<Node>} elements
 */
const renderFilters = (elements) => {
  const fragment = document.createDocumentFragment();
  let wasChecked = false;
  elements.forEach((element) => {
    const number = getRandomNumber(FilterInterval.MIN, FilterInterval.MAX);
    fragment.appendChild(makeFilter(element, number, !wasChecked && number));
    
    if (!wasChecked && number) {
      wasChecked = true;
    }
  });
  filtersContainer.appendChild(fragment);
};

/**
 * inserts the resulting nodes (tasks elements) into the DOM tree
 * @param {Array.<Node>} elements
 */
const renderTasks = (elements) => {
  const fragment = document.createDocumentFragment();
  elements.forEach((element) => {
    fragment.appendChild(element);
  });
  tasksContainer.appendChild(fragment);
};

/**
 * toggles checked filter
 * @param {MouseEvent} evt
 */
const toggleFilter = (evt) => {
  const targetEl = evt.target;
  if (targetEl.classList.contains(`filter__label`)) {
    const selector = targetEl.getAttribute(`for`);
    filtersContainer.querySelector(`input[type="radio"]:checked`).checked = false;
    filtersContainer.querySelector(`#${selector}`).checked = true;
  }
};

/**
 * creates a random number of tasks
 */
const refreshTasks = () => {
  tasksContainer.innerHTML = ``;
  renderTasks(generateTasksArray(getRandomNumber(TasksNumber.RANDOM_MIN, TasksNumber.RANDOM_MAX)));
};

const onFilterClick = (evt) => {
  toggleFilter(evt);
  refreshTasks();
};

const onFilterPress = (evt) => {
  if (evt.keyCode === ENTER_KEYCODE) {
    toggleFilter(evt);
    refreshTasks();
  }
};

filtersContainer.addEventListener(`click`, onFilterClick);
filtersContainer.addEventListener(`keypress`, onFilterPress);

renderFilters(filtersNames);
renderTasks(generateTasksArray(TasksNumber.INITIAL));
