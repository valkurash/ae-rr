const fs = require('fs');
const path = require("path");

function readJsonFileSync(filepath, encoding) {
    const file = fs.readFileSync(filepath, typeof encoding === 'undefined' ? 'utf8' : encoding);
    return JSON.parse(file);
}

function getEndpointData(file) {
    const filepath = path.resolve(__dirname, `../json/${file}.json`);
    return readJsonFileSync(filepath);
}

module.exports = {
    getEndpointData,
    readJsonFileSync,
};
