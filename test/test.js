'use strict';

const assert = require('assert');

const rocksContent = require('./../src/controllers/rocks-content.js')

describe('rocksContent', function() {

  describe('#getContent()', function() {

    it('should return object with status 1 indicating that it read the file', function(done) {
	  	rocksContent.get('/index', function (data) {
	  		if(data.status) {
	  			done();
	  		}
	  		else(done('failed'));
	  	});
    });

    it('should return object with status 0 indicating that it opened the 404 page', function(done) {
	  	rocksContent.get('/asd', function (data) {
	  		if(!data.status) {
	  			done();
	  		}
	  		else(done('failed'));
	  	});
    });

  });
});