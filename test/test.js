// *** env variable is set to test *** //
process.env.NODE_ENV = 'test';

// *** dev-dependencies *** //
let chai = require('chai');
let chaiHttp = require('chai-http');
let mocha = require('mocha');
let fs = require('fs');
let path = require('path');
let _ = require('underscore');
let cheerio = require('cheerio');
let request = require('request-promise');
let download = require('url-download');

let should = chai.should();
let expect = chai.expect();

let app = require('../app.js');

const targetDir = app._test.targetDir;
const targetUrl = app._test.targetUrl;
const options = app._test.options;

chai.use(chaiHttp);

class rmDir {
    constructor(targetDir) {
        this.targetDir = targetDir;
    }
    run() {

        try {
            var files = fs.readdirSync(targetDir);
        } catch (e) {
            return;
        }
        if (files.length > 0)
            for (var i = 0; i < files.length; i++) {

                const filePath = path.join(targetDir, files[i]);
                fs.unlinkSync(filePath);

            }
        fs.rmdirSync(targetDir);

    }
}


describe('Files', () => {
    beforeEach((done) => {
        // *** remove files from ./images directory *** //
        new rmDir(targetDir).run();
        done();
    });

    // *** test file download *** //
    describe('File Download', () => {
        it('Target URL available?', (done) => {
            chai.request(targetUrl)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('Scraped PNG items count matches downloaded files count', (done) => {
            done()
        });
    });
});
