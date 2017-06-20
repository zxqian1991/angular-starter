const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const zlib = require('zlib');
const co = require("co");
const htmlpath = path.join(__dirname, "./dist/index.html");
let text = fs.readFileSync(htmlpath).toString();
let $ = cheerio.load(text);
let scripts = {
    "script": "src"
};
co(function*() {
        console.log("开始Gzip压缩");
        for (let key in scripts) {
            let attr = scripts[key];
            yield $(key).toArray().map(function(ele, index) {
                return new Promise((resolve, reject) => {
                    let filename = ele.attribs[attr];
                    let newfilename = path.join(__dirname, `./dist/${filename}.gz`);
                    fs.createReadStream(path.join(__dirname, `./dist/${filename}`))
                        .pipe(zlib.createGzip())
                        .pipe(fs.createWriteStream(newfilename))
                        .on("error", function(error) {
                            console.log(error);
                            reject();
                        })
                        .on("finish", function() {
                            // console.log("ok");
                            ele.attribs[attr] = `${filename}.gz`;
                            resolve();
                        })
                })
            });
        }
        // console.log($.html());
        fs.writeFileSync(htmlpath, $.html());
        console.log("Gzip压缩完毕");
    })
    .catch("error", function(e) { console.log(e) });