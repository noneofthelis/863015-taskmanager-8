/** @module ./task */

import Component from './component.js';

export default class TaskEdit extends Component {

  constructor(data) {
    super();
    this._title = data.randomTitle;
    this._dueDate = data.dueDate;
    this._tags = data.randomTags;
    this._picture = data.picture;
    this._colour = data.randomColour;
    this._repeatingDays = data.repeatingDays;

    this._onSubmit = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
  }

  _isRepeating() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onSubmit === `function`) {
      this._onSubmit();
    }
  }

  static _onColourClick(evt) {
    if (evt.target.tagName === `INPUT`) {
      const item = evt.target.closest(`.card`);
      const colorClass = item.classList[2];
      item.classList.remove(colorClass);
      item.classList.add(`card--${evt.target.value}`);
    }
  }
  _onChangeDate() {

  }

  _onChangeRepeated() {

  }

  createListeners() {
    this._element.querySelector(`.card__save`)
      .addEventListener(`click`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__colors-wrap`)
      .addEventListener(`click`, this._onColourClick);
  }

  removeListeners() {
    this._element.querySelector(`.card__save`)
      .removeEventListener(`click`, this._onSubmitButtonClick);
  }

  get element() {
    return this._element;
  }

  get template() {
    const template = document.querySelector(`#task-edit-template`).content
      .cloneNode(true).querySelector(`.card`);
    const details = template.querySelector(`.card__details`);
    const daysOfWeek = Object.keys(this._repeatingDays);

    template.querySelector(`.card__text`).textContent = this._title;
    template.classList.add(`card--${this._colour}`);
    template.querySelector(`.card__date`).setAttribute(`placeholder`, this._dueDate);
    details.querySelector(`.card__img-wrap`).insertAdjacentHTML(`beforeend`,
        `<img src="${this._picture}" alt="task picture" class="card__img">`);

    if (this._isRepeating()) {
      template.classList.add(`card--repeat`);
    }
    if (this._tags.length) {
      for (const tag of this._tags) {
        const hashtagTemplate = document.querySelector(`#hashtag-template`).content.cloneNode(true);
        hashtagTemplate.querySelector(`.card__hashtag-name`).textContent = tag;
        template.querySelector(`.card__hashtag-list`).appendChild(hashtagTemplate);
      }
    }
    for (let day of daysOfWeek) {
      if (this._repeatingDays[day]) {
        details.querySelector(`input[value="${day}"]`).setAttribute(`checked`, ``);
      }
    }

    return template;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }
}

