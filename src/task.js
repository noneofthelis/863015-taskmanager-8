/** @module ./task */

export default class Task {
  constructor(data) {
    this._title = data.randomTitle;
    this._tags = data.randomTags;
    this._colour = data.randomColour;
    this._repeatingDays = data.repeatingDays;

    this._element = null;
    this._onEdit = null;

    this._state = {
      isEdit: false
    };
  }

  _isRepeating() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _onEditButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  render() {
    this._element = this.template;
    this.bind();

    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }

  bind() {
    this._element.querySelector(`.card__btn--edit`)
      .addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  unbind() {
    this._element.querySelector(`.card__btn--edit`)
      .removeEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  get element() {
    return this._element;
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

