const path = require('path');
const fs = require('fs');
const srcDir = path.join(__dirname, 'styles');
const destFile = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(srcDir, (err, files) => {
    const creatingFile = fs.createWriteStream(`${destFile}`);
    if (err)
        console.log(err);
    else {
        files.forEach((file) => {
            file = path.join(srcDir, file);
            fs.stat(file, (err, stats) => {
                if (err) throw err;
                if (stats.isFile() && path.extname(file) === '.css') {
                    const readableFile = fs.createReadStream(
                        file, 'utf-8'
                    );

                    let data = [];  // create | reset data
                    readableFile.on('data', chunk => data += chunk) // write | overwrite data
                                .on('end', () => creatingFile.write(data.toString())); // write data to bundle.css
                };
            });
        });
    }
})
