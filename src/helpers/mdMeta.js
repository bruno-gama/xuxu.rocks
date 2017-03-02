/**
 * @fileoverview Custom functions for parsing Markdown text
 * @author brunogama@fastmail.fm (Bruno Gama)
 */

'use strict';

// Include lodash's functions
const fp = require('lodash/fp');
const curry = fp.curry;
const compose = fp.compose;
const head = fp.head;
const map = fp.map;

// Private function

/**
 * Generates a function that returns array with matches, or array with one empty string
 *
 * @private
 * @param {pattern} string Regex pattern or string to match
 * @returns {function} Function that matches according to the given pattern.
 */
const regMatch = curry(pattern => text => {
	let matches = text.match(pattern);
	if(matches === null) return [''];
	return matches;
});

/**
 * Returns matches between comments brackets
 *
 * @private
 * @param {text} string Text to be matched
 * @returns {array} array with all matches or one empty string
 */
const matchMeta = regMatch(/<!--[\s\S]*?-->/g);

/**
 * Generates function that cleans text according to a pattern
 *
 * @private
 * @param {pattern} string Regex pattern or string to match
 * @returns {function} Function that deletes the given pattern.
 */
const stripText = curry(pattern => text => text.replace(pattern,''));

/**
 * Clears all comment text
 *
 * @private
 * @param {text} string Text with comments to be cleared
 * @returns {string} Clean text
 */
const stripComments = stripText(/<!--[\s\S]*?-->[\n|\r]/g);

/**
 * Clears all comment markup and tabs but keeps the text from inside
 *
 * @private
 * @param {text} string Text with markup to be cleared
 * @returns {string} Clean text
 */
const stripCommentMarkup = stripText(/<!--|-->|\t|\r/g);

/**
 * Makes an object from stripped comment text
 *
 * @private
 * @param {text} string Comment text to be parsed
 * @returns {object} Object containing the data parsed from the text
 */
const commentTextToObj = text => {
	if(text === '') return {};

	let obj = {};
	text.split('\n').forEach( val => {
		if(val.includes(':')) {
			let pair = val.split(':');
			obj[pair[0].trim()] = pair[1].trim();
		}
	});
	return obj;
};

// Public module functions

/**
 * Parses full markdown text and makes an object with the meta inside comments
 *
 * @public
 * @param {markdown} string Markdown data to be parsed
 * @returns {object} Object containing the metadata parsed from the text
 */
module.exports.getMdMeta = compose(commentTextToObj, stripCommentMarkup, head, matchMeta);

/**
 * Cleans markdown text from all comments
 *
 * @public
 * @param {markdown} string Markdown data to be cleaned
 * @returns {string} New clean markdown text
 */
module.exports.stripComments = text => stripComments(text);