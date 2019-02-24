export default (name, number, isChecked) => {
  const state = number ? isChecked : `disabled`;
  return `<input type="radio" 
    id="filter__${name}"
    class="filter__input visually-hidden"
    name="filter"
    ${state} />
    <label for="filter__${name}" class="filter__label">${name}
    <span class="filter__${name}-count">${number}</span></label>`;
};
