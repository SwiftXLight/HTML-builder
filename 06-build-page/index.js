const path = require('path');
const fs = require('fs');
const {mkdir, copyFile, readdir} = require('fs/promises');
const fsP = require('fs').promises;
const pathDist = path.join(__dirname, 'project-dist');
const filesCss = path.join(__dirname, 'styles');
const indexHtml = path.join(pathDist, 'index.html');
const componentsSrc = path.join(__dirname, 'components');
const templateSrc = path.join(__dirname, 'template.html');
const bundle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
const newAssets = path.join(pathDist, 'assets');
const assets = path.join(__dirname, 'assets');

async function MakeIndex() {
    let template = await fsP.readFile(templateSrc, 'utf-8');
  
    const Tegs = template.match(/{{(.*?)}}/g);
  
    for (let teg of Tegs) {
      let component = await fsP.readFile(path.join(componentsSrc, `${teg.slice(2, -2)}.html`), 'utf-8');
      template = template.replace(teg, component);
    }
    fs.writeFile(indexHtml, template, (err) => {
      if (err) throw err;
    });
  }

async function buildCss() {
    try {
        fs.readdir(filesCss, { withFileTypes: true }, (err, files) => {
            if (err) console.log(err);
            files.forEach((file) => {
                if (file.isFile() && path.extname(file.name) === '.css') {
                    const data = path.join(filesCss, file.name);
                    const pathNewFile = fs.createReadStream(data, 'utf-8');
                    pathNewFile.pipe(bundle);
                }
            });
        });
    } catch(err) {
        console.log(err);
    }
}

async function copyAssets(src, dest) {
    try {
        await mkdir(dest, {recursive: true});
        const folders = await readdir(src, { withFileTypes: true });
        for (let file of folders) {
            if (file.isFile()) {
                await copyFile(path.join(src, file.name), path.join(dest, file.name));
            } else {
                copyAssets(path.join(src, file.name), path.join(dest, file.name));
            }
        }
    } catch(err) {
        console.log(err);
    }
}

async function createPage() {
    await mkdir(pathDist, {recursive: true});
    await mkdir(newAssets, {recursive: true});
    copyAssets(assets, newAssets);
    buildCss();
    MakeIndex();
}

createPage();
