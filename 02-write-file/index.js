const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = process;

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));
stdout.write('Hi! Write input please: ');
stdin.on('data', data => {
   if (data.toString().trim() === 'exit') {
      exit();
   }
   output.write(data.toString());
});

process.on('exit', () => {
   stdout.write('Bye!');
});
process.on('SIGINT', exit); 