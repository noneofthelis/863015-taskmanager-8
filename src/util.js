/** @module ./util */

/**
 * returns random number between min and max inclusive
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export default (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
