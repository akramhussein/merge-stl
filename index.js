const fs = require('fs');

const stl = require('./stl');

const first = fs.readFileSync('./first.stl');
const second = fs.readFileSync('./second.stl');
const third = fs.readFileSync('./third.stl');

fs.writeFileSync('./output.stl', stl.merge([first, second, third]));