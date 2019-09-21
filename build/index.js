"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _main = require("./api/main");

var _default = (path, options = {
  validate: false
}) => new Promise((resolve, reject) => {
  if ((0, _main.pathExist)(path)) {
    const {
      validate
    } = options;
    const absolutePath = (0, _main.transformPath)(path);
    const arrPaths = (0, _main.pathFiles)(absolutePath);
    let arrLinks = [];
    arrPaths.forEach(paths => {
      if ((0, _main.pathIsMarkdown)(paths)) {
        const links = (0, _main.linksFromFile)(paths).map(link => (0, _main.objLinks)(link, paths, validate));
        arrLinks = arrLinks.concat(links);
      }
    });

    if (arrLinks.length > 0) {
      Promise.all(arrLinks).then(res => resolve(res));
    } else {
      reject(new Error('No links found'));
    }
  } else {
    reject(new Error('The path does not exists'));
  }
});

exports.default = _default;