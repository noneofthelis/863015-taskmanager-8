/** @module ./make-task */

/**
 * returns markup of task element template
 * @return {Node}
 */
export default () =>{
  const template = document.querySelector(`#task-template`).content.cloneNode(true);
  const fragment = document.createDocumentFragment();
  fragment.appendChild(template);
  return fragment;
};
