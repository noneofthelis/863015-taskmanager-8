/** @module ./task */

import Component from './component.js';

export default class Task extends Component {
  constructor(data) {
    super();
    this._title = data.randomTitle;
    this._tags = data.randomTags;
    this._colour = data.randomColour;
    this._repeatingDays = data.repeatingDays;

    this._onEdit = null;

    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  _isRepeating() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _onEditButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  createListeners() {
    this._element.querySelector(`.card__btn--edit`)
      .addEventListener(`click`, this._onEditButtonClick);
  }

  removeListeners() {
    this._element.querySelector(`.card__btn--edit`)
      .removeEventListener(`click`, this._onEditButtonClick);
  }

  get template() {
    const template = document.querySelector(`#task-template`).content
      .cloneNode(true).querySelector(`.card`);

    template.querySelector(`.card__text`).textContent = this._title;
    template.classList.add(`card--${this._colour}`);

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
    return template;
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }
}

