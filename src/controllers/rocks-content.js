'use strict';

const fs = require('fs');
const marked = require('marked');
const mdMeta = require('./../helpers/mdMeta.js');


module.exports.get = function(path = '/', complete) {
    const contentPath = './src/content';
    const filename = path === '/' ? '/index.md' : path + '.md';

    if(fs.existsSync(contentPath + filename)) {

        fs.readFile(contentPath + filename, 'utf8', function(err, data) {
            if(err) {
                complete({
                    status: 0,
                    content: '404',
                    meta: {}
                });
            }
            else{
                let content = marked(mdMeta.stripComments(data));
                let meta = mdMeta.getMdMeta(data);

                complete({
                    status: 1,
                    content,
                    meta
                });
            }
        });

    }
    else {

        fs.readFile(contentPath + '/404.md', 'utf8', function(err, data) {
            if(err) {
                complete({
                    status: 0,
                    content: '404',
                    meta: {}
                });
            }
            else {
                let content = marked(mdMeta.stripComments(data));
                let meta = mdMeta.getMdMeta(data);

                complete({
                    status: 0,
                    content,
                    meta
                });
            }
        });

    }

}