const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, './text.txt');
const stream = fs.createReadStream(filePath, 'utf-8');

let data = '';
stream.on('data', chunk => data += chunk).on('end', () => console.log(data));