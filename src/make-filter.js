/** @module ./make-filter */

/**
 * returns markup of filter element template
 * @param {string} name
 * @param {number} number
 * @param {boolean} isChecked
 * @return {string}
 */
export default (name, number, isChecked) => {
  return `<input type="radio" 
    id="filter__${name}"
    class="filter__input visually-hidden"
    name="filter"
    ${number ? isChecked : `disabled`} />
    <label for="filter__${name}" class="filter__label">${name}
    <span class="filter__${name}-count">${number}</span></label>`;
};
