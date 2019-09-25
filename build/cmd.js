"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
const chalk = require('chalk');

const emoji = require('node-emoji');

const {
  blue
} = chalk.bold;
const pink = chalk.hex('#ff94ea');

const extraerParam = (extendido, resumido) => (param1, param2) => param1 === extendido || param2 === extendido || param1 === resumido || param2 === resumido;

const extraerValidate = extraerParam('--validate', '-v');
const extraerStats = extraerParam('--stats', '-s');

var _default = (ruta, param1, param2) => new Promise(resolve => {
  const validate = extraerValidate(param1, param2);
  const stats = extraerStats(param1, param2);
  (0, _index.default)(ruta, {
    validate
  }).then(links => {
    if (stats) {
      resolve(`${emoji.get(':bar_chart:')}   ${blue(`hay ${links.length} links`)}`);

      if (validate) {
        // stats y validate
        console.log('hola stats y validate');
      } else {
        // validate
        console.log('hola validate');
      }
    } else {
      const arrLinks = [];
      links.forEach(element => {
        const linkArr = Object.values(element);
        const linkStr = linkArr.join(' ');
        arrLinks.push(linkStr);
      });
      resolve(`${emoji.get(':link:')}  ${pink(arrLinks.join(`\n${emoji.get(':link:')}  `))}`);
    }
  }).catch(err => {
    resolve(err);
  });
}); // cli(ruta, param1, param2).then(console.log);


exports.default = _default;