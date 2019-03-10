/** @module ./data */

import getRandomNumber from './util.js';

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const FIRST_ARRAY_ELEM = 0;
const DAYS_IN_WEEK = 7;
const TagsNumber = {
  MIN: 0,
  MAX: 3
};

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
    'tu': Boolean(Math.round(Math.random())),
    'we': false,
    'th': false,
    'fr': Boolean(Math.round(Math.random())),
    'sa': Boolean(Math.round(Math.random())),
    'su': false},
  isFavorite: Boolean(Math.round(Math.random())),
  isDone: Boolean(Math.round(Math.random())),
  get RandomTags() {
    const randomTags = [];
    const tagsNumber = getRandomNumber(TagsNumber.MIN, TagsNumber.MAX);
    while (randomTags.length < tagsNumber) {
      const randomEl = `#${[...this.tags][getRandomNumber(FIRST_ARRAY_ELEM, this.tags.size - 1)]}`;
      if (!randomTags.includes(randomEl)) {
        randomTags.push(randomEl);
      }
    }
    return randomTags;
  },
  get randomColour() {
    return this.colors[getRandomNumber(FIRST_ARRAY_ELEM, this.colors.length)];
  },
  get randomTitle() {
    return this.titles[getRandomNumber(FIRST_ARRAY_ELEM, this.titles.length)];
  },
  isRepeating() {
    const keys = Object.keys(this.repeatingDays);
    for (const key of keys) {
      if (this.repeatingDays[key]) {
        return true;
      }
    }
    return false;
  }
};
