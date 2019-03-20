/** @module ./component */

export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }
    this._element = null;
    this._state = {};
  }

  render() {
    this._element = this.template;
    this.createListeners();
    return this._element;
  }

  unrender() {
    this.removeListeners();
    this._element = null;
  }

  createListeners() {}

  removeListeners() {}

  update() {}

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }
}
