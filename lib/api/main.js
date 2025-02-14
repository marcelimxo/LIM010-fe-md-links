import fetch from 'node-fetch';

const path = require('path');
const fs = require('fs');

const pathExist = (userPath) => {
  if (fs.existsSync(userPath)) {
    return true;
  }
  return false;
};

const transformPath = (userPath) => {
  if (!path.isAbsolute(userPath)) {
    const resolved = path.resolve(userPath);
    return resolved;
  }
  return userPath;
};

const pathFiles = (userPath) => {
  if (fs.lstatSync(userPath).isDirectory()) {
    const filesPathsArr = fs.readdirSync(userPath);
    const allPaths = filesPathsArr.reduce((allPathsArray, currentFilePath) => {
      const absoluteFilePath = path.resolve(userPath, currentFilePath);
      const pathsArr = pathFiles(absoluteFilePath);
      return allPathsArray.concat(pathsArr);
    }, []);
    return allPaths;
  }
  const filePath = transformPath(userPath);
  return [filePath];
};

const pathIsMarkdown = (userPath) => {
  const pathExt = path.extname(userPath);

  if (pathExt === '.md') {
    return true;
  }
  return false;
};

const linksFromFile = (userPath) => {
  const content = fs.readFileSync(userPath, 'utf8');

  // This is the regex for links inside a .md file
  const linksRegex = /((!?\[[^\]]*?\])\((?:.)*?\))/g;
  const link = content.match(linksRegex);

  return link || [];
};

const objLinks = (link, file, validate) => new Promise((resolve) => {
  const textRegex = /(?<=\[).+?(?=\])/g;
  const [text] = link.match(textRegex);
  const hrefRegex = /(?<=\().+?(?=\))/g;
  const [href] = link.match(hrefRegex);

  if (validate) {
    fetch(href)
      .then((res) => {
        resolve({
          file,
          href,
          text,
          status: res.status,
          ok: res.statusText === 'OK' ? 'OK' : 'FAIL',
        });
      })
      .catch(() => {
        resolve({
          file,
          href,
          text,
          status: null,
          ok: 'FAIL',
        });
      });
  } else {
    resolve({ file, href, text });
  }
});


export {
  pathExist,
  transformPath,
  pathIsMarkdown,
  pathFiles,
  linksFromFile,
  objLinks,
};
