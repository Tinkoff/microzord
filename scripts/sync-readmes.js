const fs = require('fs');

const README_PATH = 'README.md';

copyExtraFiles();

function copyExtraFiles() {
  if (!fs.existsSync(README_PATH)) {
    throw new Error('README.md does not exist');
  } else {
    copyReadmeIntoLibFolder(README_PATH, 'core');
    copyReadmeIntoLibFolder(README_PATH, 'angular');
    copyReadmeIntoLibFolder(README_PATH, 'react');
    copyReadmeIntoLibFolder(README_PATH, 'vue');
    copyReadmeIntoLibFolder(README_PATH, 'svelte');
    copyReadmeIntoLibFolder(README_PATH, 'webpack-plugin');
  }
}

function copyReadmeIntoLibFolder(srcPath, lib) {
  try {
    const fileBody = fs.readFileSync(srcPath).toString();

    fs.writeFileSync(`dist/libs/${lib}/${README_PATH}`, fileBody);
  } catch (_) {}
}
