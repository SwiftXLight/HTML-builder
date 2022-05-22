const path = require('path');
const fsP = require('fs').promises;
const srcDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files-copy');

async function listDir(dir) {                 // return array of directory files
  const files = await fsP.readdir(dir);
  return files;
}

async function CopyDir(src, dest) {

  fsP.mkdir(dest, { recursive: true });       // check if dest dir exist if no create

  for (const file of await listDir(dest)) {   // clear dest dir
    fsP.unlink(path.join(dest, file));
  }

  for (const file of await listDir(src)) {    // copy from src to dest dir
    fsP.copyFile(path.join(src, file), path.join(dest, file));
  }
}

CopyDir(srcDir, destDir);