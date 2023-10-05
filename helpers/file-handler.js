const fs = require('fs/promises');
const path = require('path');
// __dirname = ./helpers/
// filePath = ./helpers/../Task8_data.json
// Resolved = ./Task8_data.json
const filePath = path.join(__dirname, '../Task8_data.json');

const readFile = async () => {
  const content = await fs.readFile(filePath, 'utf8');
  return JSON.parse(content);
}

const writeFile = (data) => {
  const contentString = JSON.stringify(data, null, 2);
  return fs.writeFile(filePath, contentString);
}

const writeLogFile = (data) => {
  return fs.appendFile(path.join(__dirname, '../logs.txt'), data);
}

module.exports = {
  readFile,
  writeFile,
  writeLogFile
}