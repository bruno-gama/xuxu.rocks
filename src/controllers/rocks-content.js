/**
 * @fileoverview A 'controller' that grabs a page's content and data from a .md file
 * @author brunogama@fastmail.fm (Bruno Gama)
 */

'use strict';

// requires
const promisify = require('es6-promisify');
const fs = require('fs');
const marked = require('marked');
const mdMeta = require('./../helpers/mdMeta.js');

// promisified functions
const readFile = promisify(fs.readFile);


/**
 * Grabs text from a .md file based on the requested URL, 
 * then transforms it and returns it as HTML text and a metadata object
 *
 * @private
 * @param {path} string Path from the server request
 * @returns {Promise} Fullfils on read file succes, rejects on read file error
 */
const get = (path = '/') => {
    const contentPath = './src/content';
    const filename = path === '/' ? '/index.md' : path + '.md';

    return new Promise( async (resolve) => {
        let data;
        
        try {
            data = await readFile(contentPath + filename, 'utf8');

            let content = marked(mdMeta.stripComments(data));
            let meta = mdMeta.getMdMeta(data);

            resolve({
                status: 1,
                content,
                meta
            });
        }
        catch(err) {

            if(path !== '/404') {
                resolve({status: 0});
            }
            else {
                resolve({
                    status: 0,
                    content: '404',
                    meta: {}
                });
            }
        }

    });
}

/**
 * Middleware interface for the get() function.
 * Awaits the function and adds the data to the request object.
 * Also handles read errors with a 404
 *
 * @private
 * @param {path} string Regex pattern or string to match
 * @param {complete} function Function that runs after our process is done
 * @returns {function} Function that matches according to the given pattern.
 */
const getContent = async (req, res, next) => {
    let data = await get(req.path);
    
    if(!data.status) {
        res.status(404);
        data = await get('/404');
    }

    req.rocksContent = data;
    next();
};

// Public module functions
module.exports.get = get;
module.exports.getContent = getContent;