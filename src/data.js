/** @module ./data */

import util from './util.js';

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const FIRST_ARRAY_ELEM = 0;
const DAYS_IN_WEEK = 7;
const TagsNumber = {
  MIN: 0,
  MAX: 3
};

const getRandomBoolean = () => Boolean(Math.round(Math.random()));

export default {
  titles: [`Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`],
  dueDate: new Date() + 1 + Math.floor(Math.random() * DAYS_IN_WEEK) * MS_PER_DAY,
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
    `жизньболь`,
    `всетлен`,
    `цойжив`
  ]),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  colors: [`black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`],
  repeatingDays: {
    'mo': false,
    'tu': false,
    'we': false,
    'th': false,
    'fr': false,
    'sa': false,
    'su': false},
  isFavorite: getRandomBoolean(),
  isDone: getRandomBoolean(),
  get randomTags() {
    const randomTags = [];
    const tagsNumber = util.getRandomNumber(TagsNumber.MIN, TagsNumber.MAX);
    while (randomTags.length < tagsNumber) {
      const randomEl = `#${[...this.tags][util.getRandomNumber(FIRST_ARRAY_ELEM, this.tags.size - 1)]}`;
      if (!randomTags.includes(randomEl)) {
        randomTags.push(randomEl);
      }
    }
    return randomTags;
  },
  get randomColour() {
    return this.colors[util.getRandomNumber(FIRST_ARRAY_ELEM, this.colors.length - 1)];
  },
  get randomTitle() {
    return this.titles[util.getRandomNumber(FIRST_ARRAY_ELEM, this.titles.length - 1)];
  },
  get formatedDate() {
    return this.dueDate.slice(0, 10);
  }
};
