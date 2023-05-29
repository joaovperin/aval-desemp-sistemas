const fs = require('fs');

module.exports.saveFile = async function saveFile(name, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(name, content, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}

module.exports.readFile = async function readFile(name) {
    return new Promise((resolve, reject) => {
        fs.readFile(name, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}