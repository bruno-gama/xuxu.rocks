'use strict';

const assert = require('assert');

const rocksContent = require('./../src/controllers/rocks-content.js');
const mdMeta = require('./../src/helpers/mdMeta.js');

describe('rocksContent', function() {

  describe('#getContent()', function() {

    it('should fulfill promise indicating that it found and read the file', function(done) {
	  	rocksContent.get('/index')
		  	.then(function (data) {
		  		done();
		  	})
		  	.catch(function (data) {
		  		done('failed');
		  	});
    });

    it('should reject promise indicating that it did not find and did not read the file', function(done) {
	  	rocksContent.get('/thisthingwillneverexist')
	  		.then(function (data) {
		  		done('failed');
		  	})
		  	.catch(function (data) {
		  		done();
		  	});
    });

  });
});

describe('mdMeta', function() {
	const text = 
	`<!--
	key1:value1
	key2:value2
	key3:value3
	-->
	This is a mock markdown file

	<!--
	key1:value1
	key2:value2
	key3:value3
	-->

	File will end here`.replace(/\t/g,'');

	const noMetaText = 
	`This is a mock markdown file
	File will end here`.replace(/\t/g,'');

	describe('#getMdMeta()', function () {

		it('should return an object from provided first comment in text data', function () {
			const expected = {key1: 'value1', key2: 'value2', key3: 'value3'};
			const actual = mdMeta.getMdMeta(text);
			assert.deepEqual(actual, expected);
		});

		it('should return an empty object when there is no meta in the file', function () {
			const expected = {};
			const actual = mdMeta.getMdMeta(noMetaText);
			assert.deepEqual(actual, expected);
		});

	});

	describe('#stripComments()', function () {

		it('should return the text stripped from all comments', function () {
			const expected = 
			`This is a mock markdown file

			
			File will end here`.replace(/\t/g,'');
			
			const actual = mdMeta.stripComments(text);

			assert.equal(actual, expected);
		});

	});

});