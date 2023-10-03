const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'Task3_Bericht_Autohersteller.txt');
const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

readStream.on('data', (chunk) => {
    console.log(chunk);
});

readStream.on('error', (error) => {
    console.log(error);
});

readStream.on('end', () => {
    console.log('End of file');
});

setTimeout(() => readStream.pause(), 5);

setTimeout(() => readStream.resume(), 2000);