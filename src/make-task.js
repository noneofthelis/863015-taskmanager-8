/** @module ./make-task */

/**
 * returns markup of task element template
 * @return {Node}
 */

export default (task) =>{
  const template = document.querySelector(`#task-template`).content.cloneNode(true);
  const fragment = document.createDocumentFragment();
  const card = template.querySelector(`.card`);
  const details = card.querySelector(`.card__details`);
  const daysOfWeek = Object.keys(task.repeatingDays);
  const tags = task.RandomTags;

  card.classList.add(`card--${task.randomColour}`);
  details.querySelector(`.card__img-wrap`).insertAdjacentHTML(`beforeend`,
      `<img src="${task.picture}" alt="task picture" class="card__img">`);
  card.querySelector(`.card__date`).setAttribute(`placeholder`, task.dueDate);
  if (task.isRepeating()) {
    card.classList.add(`card--repeat`);
  }
  if (tags.length) {
    const container = card.querySelector(`.card__hashtag-list`);
    for (const tag of tags) {
      const templ = document.querySelector(`#hashtag-template`).content.cloneNode(true);
      templ.querySelector(`.card__hashtag-name`).textContent = tag;
      container.appendChild(templ);
    }
  }
  for (let day of daysOfWeek) {
    if (task.repeatingDays[day]) {
      details.querySelector(`input[value="${day}"]`).setAttribute(`checked`, ``);
    }
    // details.querySelector(`input[value="${day}"]`).checked = task.repeatingDays[day]; - не работает
  }

  fragment.appendChild(template);

  return fragment;
};
