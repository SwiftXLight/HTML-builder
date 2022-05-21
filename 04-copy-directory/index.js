const path = require('path');
const fs = require('fs');
const srcDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files-copy');

// check if directory already exist and if no create it

fs.mkdir(destDir, { recursive: true }, err => {
    if (err) console.log(err);
});

// clear destination directory before running the copy function

fs.readdir(destDir, (err, files) => {
    if (err) console.log(err);
    files.forEach((file) => {
        fs.unlink(`${destDir}/${file}`, (err) => {
            if (err) console.log(err);
        });
    });
});

// copy from source directory to destination directory

fs.readdir(srcDir, (err, files) => {    // read src dir files
    if (err)
        console.log(err);
    else {
        files.forEach((file) => {       // copy files from src dir to dest dir
            fs.copyFile(`${srcDir}/${file}`, `${destDir}/${file}`, (err) => {
                if (err) console.log(err);
            });
        });
    }
})

