/** @module ./make-filter */

/**
 * returns markup of filter element template
 * @param {string} name
 * @param {number} number
 * @param {boolean} isChecked
 * @return {string}
 */
export default (name, number, isChecked) => {
  const template = document.querySelector(`#filter-template`).content;
  const fragment = document.createDocumentFragment();
  const element = template.cloneNode(true);
  element.id = `filter__${name}`;
  element.querySelector(`label`).setAttribute(`for`, `filter__${name}`);
  element.querySelector(`label`).textContent = name;
  element.querySelector(`span`).classList.add(`filter__${name}-count`);
  element.querySelector(`label`).textContent = number;
  element.setAttribute(`checked`, number ? isChecked : `disabled`);
  fragment.appendChild(element);
  return fragment;
};
