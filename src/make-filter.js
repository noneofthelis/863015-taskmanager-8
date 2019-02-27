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
  const label = element.querySelector(`label`);
  const span = element.querySelector(`span`);

  element.id = `filter__${name}`;
  label.setAttribute(`for`, `filter__${name}`);
  label.textContent = name;
  span.classList.add(`filter__${name}-count`);
  span.textContent = number;
  element.setAttribute(`checked`, number ? isChecked : `disabled`);
  fragment.appendChild(element);

  return fragment;
};
