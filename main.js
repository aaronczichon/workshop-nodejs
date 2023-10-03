const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'Task3_Bericht_Autohersteller.txt');

fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
  console.log(data);
});

const data = fs.readFileSync(filePath, {encoding: 'utf-8'});
console.log(data);

const text = 'Beispieldatei für den NodeJS Workshop';

const newContent = `${text} \r\n${data}`;
fs.writeFile(filePath, newContent, {
  encoding: 'utf-8',
  flag: 'w'
}, (err) => {
  console.log('Datei wurde geschrieben');
});