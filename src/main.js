"use strict";

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

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getFilterTemplate = (name, number, isChecked) => {
  const state = number ? isChecked : `disabled`;
  return `<input type="radio" 
    id="filter__${name}"
    class="filter__input visually-hidden"
    name="filter"
    ${state} />
    <label for="filter__${name}" class="filter__label">${name}
    <span class="filter__${name}-count">${number}</span></label>`;
};

const getCardTemplate = () =>
  `<article class="card card--pink card--repeat">\n    <form class="card__form" method="get">\n      <div class="card__inner">\n        <div class="card__control">\n          <button type="button" class="card__btn card__btn--edit">\n            edit\n          </button>\n          <button type="button" class="card__btn card__btn--archive">\n            archive\n          </button>\n          <button\n            type="button"\n            class="card__btn card__btn--favorites card__btn--disabled"\n          >\n            favorites\n          </button>\n        </div>\n\n        <div class="card__color-bar">\n          <svg class="card__color-bar-wave" width="100%" height="10">\n            <use xlink:href="#wave"></use>\n          </svg>\n        </div>\n\n        <div class="card__textarea-wrap">\n          <label>\n            <textarea\n              class="card__text"\n              placeholder="Start typing your text here..."\n              name="text"\n            >\n  It is example of repeating task. It marks by wave.</textarea\n            >\n          </label>\n        </div>\n\n        <div class="card__settings">\n          <div class="card__details">\n            <div class="card__dates">\n              <button class="card__date-deadline-toggle" type="button">\n                date: <span class="card__date-status">no</span>\n              </button>\n\n              <fieldset class="card__date-deadline" disabled>\n                <label class="card__input-deadline-wrap">\n                  <input\n                    class="card__date"\n                    type="text"\n                    placeholder="23 September"\n                    name="date"\n                  />\n                </label>\n                <label class="card__input-deadline-wrap">\n                  <input\n                    class="card__time"\n                    type="text"\n                    placeholder="11:15 PM"\n                    name="time"\n                  />\n                </label>\n              </fieldset>\n\n              <button class="card__repeat-toggle" type="button">\n                repeat:<span class="card__repeat-status">no</span>\n              </button>\n\n              <fieldset class="card__repeat-days" disabled>\n                <div class="card__repeat-days-inner">\n                  <input\n                    class="visually-hidden card__repeat-day-input"\n                    type="checkbox"\n                    id="repeat-mo-2"\n                    name="repeat"\n                    value="mo"\n                  />\n                  <label class="card__repeat-day" for="repeat-mo-2"\n                    >mo</label\n                  >\n                  <input\n                    class="visually-hidden card__repeat-day-input"\n                    type="checkbox"\n                    id="repeat-tu-2"\n                    name="repeat"\n                    value="tu"\n                    checked\n                  />\n                  <label class="card__repeat-day" for="repeat-tu-2"\n                    >tu</label\n                  >\n                  <input\n                    class="visually-hidden card__repeat-day-input"\n                    type="checkbox"\n                    id="repeat-we-2"\n                    name="repeat"\n                    value="we"\n                  />\n                  <label class="card__repeat-day" for="repeat-we-2"\n                    >we</label\n                  >\n                  <input\n                    class="visually-hidden card__repeat-day-input"\n                    type="checkbox"\n                    id="repeat-th-2"\n                    name="repeat"\n                    value="th"\n                  />\n                  <label class="card__repeat-day" for="repeat-th-2"\n                    >th</label\n                  >\n                  <input\n                    class="visually-hidden card__repeat-day-input"\n                    type="checkbox"\n                    id="repeat-fr-2"\n                    name="repeat"\n                    value="fr"\n                    checked\n                  />\n                  <label class="card__repeat-day" for="repeat-fr-2"\n                    >fr</label\n                  >\n                  <input\n                    class="visually-hidden card__repeat-day-input"\n                    type="checkbox"\n                    name="repeat"\n                    value="sa"\n                    id="repeat-sa-2"\n                  />\n                  <label class="card__repeat-day" for="repeat-sa-2"\n                    >sa</label\n                  >\n                  <input\n                    class="visually-hidden card__repeat-day-input"\n                    type="checkbox"\n                    id="repeat-su-2"\n                    name="repeat"\n                    value="su"\n                    checked\n                  />\n                  <label class="card__repeat-day" for="repeat-su-2"\n                    >su</label\n                  >\n                </div>\n              </fieldset>\n            </div>\n\n            <div class="card__hashtag">\n              <div class="card__hashtag-list">\n                <span class="card__hashtag-inner">\n                  <input\n                    type="hidden"\n                    name="hashtag"\n                    value="repeat"\n                    class="card__hashtag-hidden-input"\n                  />\n                  <button type="button" class="card__hashtag-name">\n                    #repeat\n                  </button>\n                  <button type="button" class="card__hashtag-delete">\n                    delete\n                  </button>\n                </span>\n\n                <span class="card__hashtag-inner">\n                  <input\n                    type="hidden"\n                    name="hashtag"\n                    value="repeat"\n                    class="card__hashtag-hidden-input"\n                  />\n                  <button type="button" class="card__hashtag-name">\n                    #cinema\n                  </button>\n                  <button type="button" class="card__hashtag-delete">\n                    delete\n                  </button>\n                </span>\n\n                <span class="card__hashtag-inner">\n                  <input\n                    type="hidden"\n                    name="hashtag"\n                    value="repeat"\n                    class="card__hashtag-hidden-input"\n                  />\n                  <button type="button" class="card__hashtag-name">\n                    #entertaiment\n                  </button>\n                  <button type="button" class="card__hashtag-delete">\n                    delete\n                  </button>\n                </span>\n              </div>\n\n              <label>\n                <input\n                  type="text"\n                  class="card__hashtag-input"\n                  name="hashtag-input"\n                  placeholder="Type new hashtag here"\n                />\n              </label>\n            </div>\n          </div>\n\n          <label class="card__img-wrap card__img-wrap--empty">\n            <input\n              type="file"\n              class="card__img-input visually-hidden"\n              name="img"\n            />\n            <img\n              src="img/add-photo.svg"\n              alt="task picture"\n              class="card__img"\n            />\n          </label>\n\n          <div class="card__colors-inner">\n            <h3 class="card__colors-title">Color</h3>\n            <div class="card__colors-wrap">\n              <input\n                type="radio"\n                id="color-black-2"\n                class="card__color-input card__color-input--black visually-hidden"\n                name="color"\n                value="black"\n              />\n              <label\n                for="color-black-2"\n                class="card__color card__color--black"\n                >black</label\n              >\n              <input\n                type="radio"\n                id="color-yellow-2"\n                class="card__color-input card__color-input--yellow visually-hidden"\n                name="color"\n                value="yellow"\n              />\n              <label\n                for="color-yellow-2"\n                class="card__color card__color--yellow"\n                >yellow</label\n              >\n              <input\n                type="radio"\n                id="color-blue-2"\n                class="card__color-input card__color-input--blue visually-hidden"\n                name="color"\n                value="blue"\n              />\n              <label\n                for="color-blue-2"\n                class="card__color card__color--blue"\n                >blue</label\n              >\n              <input\n                type="radio"\n                id="color-green-2"\n                class="card__color-input card__color-input--green visually-hidden"\n                name="color"\n                value="green"\n              />\n              <label\n                for="color-green-2"\n                class="card__color card__color--green"\n                >green</label\n              >\n              <input\n                type="radio"\n                id="color-pink-2"\n                class="card__color-input card__color-input--pink visually-hidden"\n                name="color"\n                value="pink"\n                checked\n              />\n              <label\n                for="color-pink-2"\n                class="card__color card__color--pink"\n                >pink</label\n              >\n            </div>\n          </div>\n        </div>\n\n        <div class="card__status-btns">\n          <button class="card__save" type="submit">save</button>\n          <button class="card__delete" type="button">delete</button>\n        </div>\n      </div>\n    </form>\n  </article>`;

const generateTasksArray = (number) => {
  return [...new Array(number)].map(() => getCardTemplate());
};

const renderFilters = (array) => {
  array.forEach((element, index) => {
    filtersContainer.insertAdjacentHTML(`beforeend`, getFilterTemplate(element,
        getRandomNumber(FilterInterval.MIN, FilterInterval.MAX), index ? `` : `checked`));
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
  renderTasks(generateTasksArray(getRandomNumber(TasksNumber.RANDOM_MIN, TasksNumber.RANDOM_MAX)));
};

filtersContainer.addEventListener(`click`, onFilterClick);

renderFilters(filtersNames);
renderTasks(generateTasksArray(TasksNumber.INITIAL));
