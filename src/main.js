import makeFilter from './make-filter.js';
import data from './data.js';
import Task from './task.js';
import TaskEdit from './task-edit.js';

import util from './util.js';

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
 * returns an array of certain number of task element templates
 * @param {number} number
 * @return {string[]}
 */
const generateTasksArray = (number) => {
  return [...new Array(number)].map(renderComponents);
};

/**
 * creates task and task-edit components
 */
const renderComponents = () => {

  const taskComponent = new Task(data);
  const editTaskComponent = new TaskEdit(data);

  tasksContainer.appendChild(taskComponent.render());

  taskComponent.onEdit = () => {
    editTaskComponent.render();
    tasksContainer.replaceChild(editTaskComponent.element, taskComponent.element);
    taskComponent.unrender();
  };

  editTaskComponent.onSubmit = (newObject) => {
    Object.assign(data, newObject);

    taskComponent.update(data);
    taskComponent.updateState(editTaskComponent.state);
    taskComponent.render();
    tasksContainer.replaceChild(taskComponent.element, editTaskComponent.element);
    editTaskComponent.unrender();
  };

};

/**
 * inserts the resulting nodes (filter elements) into the DOM tree
 * @param {Array.<Node>} elements
 */
const renderFilters = (elements) => {
  const fragment = document.createDocumentFragment();
  let wasChecked = false;
  elements.forEach((element) => {
    const number = util.getRandomNumber(FilterInterval.MIN, FilterInterval.MAX);
    fragment.appendChild(makeFilter(element, number, !wasChecked && number));
    if (!wasChecked && number) {
      wasChecked = true;
    }
  });
  filtersContainer.appendChild(fragment);
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
  generateTasksArray(util.getRandomNumber(TasksNumber.RANDOM_MIN, TasksNumber.RANDOM_MAX));
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
generateTasksArray(TasksNumber.INITIAL);
