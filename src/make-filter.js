/** @module ./make-filter */

/**
 * returns markup of filter element template
 * @param {string} name
 * @param {number} number
 * @param {boolean} isChecked
 * @return {Node}
 */
export default (name, number, isChecked) => {
  const element = document.querySelector(`#filter-template`).content.cloneNode(true);
  const fragment = document.createDocumentFragment();
  const label = element.querySelector(`label`);
  const span = element.querySelector(`span`);
  const input = element.querySelector(`input`);

  label.setAttribute(`for`, `filter__${name}`);
  label.insertAdjacentText(`afterbegin`, name);
  span.classList.add(`filter__${name}-count`);
  span.textContent = number;
  input.id = `filter__${name}`;
  input.disabled = !number;
  if (isChecked) {
    input.checked = true;
  }
  fragment.appendChild(element);

  return fragment;
};
