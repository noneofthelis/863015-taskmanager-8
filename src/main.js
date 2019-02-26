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

const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateTasksArray = (number) => {
  return [...new Array(number)].map(() => makeTask());
};

const renderFilters = (array) => {
  array.forEach((element, index) => {
    filtersContainer.insertAdjacentHTML(`beforeend`, makeFilter(element,
        generateRandomNumber(FilterInterval.MIN, FilterInterval.MAX), index ? `` : `checked`));
  });
};

const renderTasks = (array) => {
  array.forEach((element) => {
    tasksContainer.insertAdjacentHTML(`beforeend`, element);
  });
};

const toggleFilter = (evt) => {
  filtersContainer.querySelector(`input[type="radio"]:checked`).checked = false;
  evt.target.checked = true;
};

const onFilterClick = (evt) => {
  toggleFilter(evt);
  tasksContainer.innerHTML = ``;
  renderTasks(generateTasksArray(generateRandomNumber(TasksNumber.RANDOM_MIN, TasksNumber.RANDOM_MAX)));
};

filtersContainer.addEventListener(`click`, onFilterClick);

renderFilters(filtersNames);
renderTasks(generateTasksArray(TasksNumber.INITIAL));
