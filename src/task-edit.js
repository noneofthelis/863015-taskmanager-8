/** @module ./task */

import Component from './component.js';

export default class TaskEdit extends Component {

  constructor(data) {
    super(); // засунуть сюда update
    this._title = data.randomTitle;
    this._dueDate = data.dueDate;
    this._tags = data.randomTags;
    this._picture = data.picture;
    this._colour = data.randomColour;
    this._repeatingDays = data.repeatingDays;

    this._state.isDate = false;
    this._state.isRepeated = false;

    this._onSubmit = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);
  }

  _isRepeating() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();

    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = this._processForm(formData);
    if (typeof this._onSubmit === `function`) {
      this._onSubmit();
    }

    this.update(newData);
  }

  _processForm(formData) {
    const entry = {
      title: ``,
      color: ``,
      tags: new Set(),
      dueDate: new Date(),
      repeatingDays: {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false,
      }
    };

    const taskEditMapper = TaskEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }
    return entry;
  }

  static createMapper(target) {
    return {
      hashtag: (value) => target.tags.add(value),
      text: (value) => target.title = value,
      color: (value) => target.color = value,
      repeat: (value) => target.repeatingDays[value] = true,
      date: (value) => target.dueDate[value],
    };
  }

  static _onColourClick(evt) {
    if (evt.target.tagName === `INPUT`) {
      const item = evt.target.closest(`.card`);
      const colorClass = item.classList[2];
      item.classList.remove(colorClass);
      item.classList.add(`card--${evt.target.value}`);
    }
  }
  _onChangeDate(evt) {
    this._state.isDate = !this._state.isDate;
    this.removeListeners();
    this._partialUpdate(evt.target.closest(`.card`));
    this.createListeners();
  }

  _onChangeRepeated(evt) {
    this._state.isRepeated = !this._state.isRepeated;
    this.removeListeners();
    this._partialUpdate(evt.target.closest(`.card`));
    this.createListeners();
  }

  createListeners() {
    this._element.querySelector(`.card__form`)
      .addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__colors-wrap`)
      .addEventListener(`click`, TaskEdit._onColourClick);
    this._element.querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`)
      .addEventListener(`click`, this._onChangeRepeated);
  }

  removeListeners() {
    this._element.querySelector(`.card__save`)
      .removeEventListener(`click`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__colors-wrap`)
      .addEventListener(`click`, TaskEdit._onColourClick);
    this._element.querySelector(`.card__date-deadline-toggle`)
      .removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`)
      .removeEventListener(`click`, this._onChangeRepeated);
  }

  update(data) {
    this._title = data.randomTitle;
    this._dueDate = data.dueDate;
    this._tags = data.randomTags;
    this._picture = data.picture;
    this._colour = data.randomColour;
    this._repeatingDays = data.repeatingDays;
  }

  _partialUpdate(element) {
    document.querySelector(`.board__tasks`)
      .replaceChild(this.render(), element);
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
    details.querySelector(`.card__date-deadline`).disabled = !this._state.isDate;
    details.querySelector(`.card__date-status`).textContent = this._state.isDate ? `yes` : `no`;
    details.querySelector(`.card__repeat-days`).disabled = !this._state.isRepeated;
    details.querySelector(`.card__img-wrap`).insertAdjacentHTML(`beforeend`,
        `<img src="${this._picture}" alt="task picture" class="card__img">`);

    if (this._isRepeating()) {
      template.classList.add(`card--repeat`);
    }
    if (this._state.isDate) {
      details.querySelector(`.card__date`).setAttribute(`placeholder`, this._dueDate);
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

