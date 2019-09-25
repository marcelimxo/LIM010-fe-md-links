"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.objLinks = exports.linksFromFile = exports.pathFiles = exports.pathIsMarkdown = exports.transformPath = exports.pathExist = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const path = require('path');

const fs = require('fs');

const pathExist = userPath => {
  if (fs.existsSync(userPath)) {
    return true;
  }

  return false;
};

exports.pathExist = pathExist;

const transformPath = userPath => {
  if (!path.isAbsolute(userPath)) {
    const resolved = path.resolve(userPath);
    return resolved;
  }

  return userPath;
};

exports.transformPath = transformPath;

const pathFiles = userPath => {
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

exports.pathFiles = pathFiles;

const pathIsMarkdown = userPath => {
  const pathExt = path.extname(userPath);

  if (pathExt === '.md') {
    return true;
  }

  return false;
};

exports.pathIsMarkdown = pathIsMarkdown;

const linksFromFile = userPath => {
  const content = fs.readFileSync(userPath, 'utf8'); // This is the regex for links inside a .md file

  const linksRegex = /((!?\[[^\]]*?\])\((?:.)*?\))/g;
  const link = content.match(linksRegex);
  return link || [];
};

exports.linksFromFile = linksFromFile;

const objLinks = (link, file, validate) => new Promise(resolve => {
  const textRegex = /(?<=\[).+?(?=\])/g;
  const [text] = link.match(textRegex);
  const hrefRegex = /(?<=\().+?(?=\))/g;
  const [href] = link.match(hrefRegex);

  if (validate) {
    (0, _nodeFetch.default)(href).then(res => {
      resolve({
        href,
        text,
        file,
        status: res.status,
        ok: res.statusText === 'OK'
      });
    }).catch(() => {
      resolve({
        href,
        text,
        file,
        status: null,
        ok: false
      });
    });
  } else {
    resolve({
      href,
      text,
      file
    });
  }
});

exports.objLinks = objLinks;