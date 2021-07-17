const xlsx = require('node-xlsx');

const fileData = xlsx.parse(__dirname + '/BeetleNut_Data.xlsx'); // parses a file

console.log(fileData);