"use strict";

// *** main dependencies *** //
var fs = require('fs'),
cheerio = require('cheerio'),
request = require('request-promise'),
download = require('url-download');

// *** settings *** //
const targetUrl = 'https://www.iconfinder.com/iconsets/social-media-2070';
const targetDir = './images';
const options = {
    uri: targetUrl,
    method: 'GET',
    resolveWithFullResponse: true
};

// *** main scraper class *** //
class scraper {
    constructor(targetUrl, targetDir) {
        this.targetUrl = targetUrl;
        this.targetDir = targetDir;
    }
    run() {
        console.log('Starting image download script');
        console.log('Target URL: [ ' + this.targetUrl + ' ]');

        request(options)
        .then(function(response) {
            const $ = cheerio.load(response.body);
            const relativeLinks = $('#icons img[src*=".png"]');
            relativeLinks.each(function() {
                const link = $(this).attr('src');
                download(link, targetDir).on('close', function() {
                    console.log(link + ' has been downloaded.');
                });
            });
        });
    }
}


// *** create download directory *** //
class checkDir {
    constructor(targetDir) {
        this.targetDir = targetDir;
    }
    run() {
        try {
            console.log('Checking for download directory [ ' + this.targetDir + ' ]');
            fs.statSync(this.targetDir);
        } catch (e) {
            console.log('No download directory found, creating [ ' + this.targetDir + ' ]');
            fs.mkdirSync(this.targetDir);
        }
    }
}
// *** init script *** //
(() => {
    new checkDir(targetDir).run();
    new scraper(targetUrl, targetDir).run();
})()

exports._test = {
    targetUrl: targetUrl,
    targetDir: targetDir,
    options: options,
    scraper: scraper,
    checkDir: checkDir
}
