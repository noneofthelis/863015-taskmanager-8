/** @module ./make-task */

/**
 * returns DocumentFragment of task element template
 * @return {string}
 */
export default () => {
  const template = document.querySelector(`#task-template`).content;
  const fragment = document.createDocumentFragment();
  fragment.appendChild(template);
  return fragment;
};
