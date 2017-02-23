'use strict';

const fs = require('fs');
const marked = require('marked');


module.exports.get = function(path = '/', complete) {
    const contentPath = './src/content';
    const filename = path === '/' ? '/index.md' : path + '.md';

    if(fs.existsSync(contentPath + filename)) {

        fs.readFile(contentPath + filename, 'utf8', function(err, data) {
            if(err) {
                complete({
                    status: 0,
                    title: 'Nothing Here',
                    content: '404',
                    meta: {title: 'Nothing here'}
                });
            }
            else{
                complete({
                    status: 1,
                    title: 'YES, HE DOES!!',
                    content: marked(data),
                });
            }
        });

    }
    else {

        fs.readFile(contentPath + '/404.md', 'utf8', function(err, data) {
            if(err) {
                complete({
                    status: 0,
                    title: 'Nothing Here',
                    content: '404',
                });
            }
            else {
                complete({
                    status: 0,
                    title: 'Nothing Here',
                    content: marked(data),
                });
            }
        });

    }

}