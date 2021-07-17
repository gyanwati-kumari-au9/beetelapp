const xlsx = require('node-xlsx');

const fileData = xlsx.parse(__dirname + '/BeetleNut_Data.xlsx'); // parses a file

var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

console.log(fileData);