'use strict';

module.exports.getMdMeta = text => {
	let result = {};

	let matches = text.match(/<!--[\s\S]*?-->/g);

	if(matches !== null) {
		matches = matches.map( val => val.replace(/<!--|-->|\t|\r/g,'') );

		matches[0].split('\n').forEach( val => {
			if(val.includes(':')) {
				let pair = val.split(':');
				result[pair[0].trim()] = pair[1].trim();
			}
		});
	}

	return result;
}

module.exports.stripComments = text => text.replace(/<!--[\s\S]*?-->[\n|\r]/g, '');