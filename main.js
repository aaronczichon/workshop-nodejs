const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, 'Task3_Bericht_Autohersteller.txt');

const readReportFile = async (path) => {
  return fs.readFile(path, 'utf8').catch(err => console.log(err));
};

readReportFile(filePath).then(data => console.log(data));