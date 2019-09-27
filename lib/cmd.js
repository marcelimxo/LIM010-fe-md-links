/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import mdLinks from './index';

const chalk = require('chalk');

const emoji = require('node-emoji');

const {
  blue, red, green, magenta,
} = chalk.bold;

const { underline, italic } = chalk;

const { white, cyan, gray } = chalk;

const extraerParam = (extendido, resumido) => (param1, param2) => param1 === extendido
|| param2 === extendido || param1 === resumido || param2 === resumido;
const extraerValidate = extraerParam('--validate', '-v');
const extraerStats = extraerParam('--stats', '-s');

export default (ruta, param1, param2) => new Promise((resolve, reject) => {
  if (!ruta) {
    resolve(
      `${emoji.get(':no_entry:')}   ${red('Por favor, ingresa una ruta')} `,
    );
  } else {
    const validate = extraerValidate(param1, param2);
    const stats = extraerStats(param1, param2);

    mdLinks(ruta, { validate })
      .then((objLinks) => {
        const links = objLinks.map((link) => {
          link.file = `${gray(link.file)}`;
          link.href = `${underline(link.href)}`;
          link.text = `${italic(link.text)}`;
          if (link.status === 200) {
            link.ok = `${green(link.ok)}`;
            link.status = `${green(link.status)}`;
          } else if (link.ok === 'FAIL') {
            link.ok = `${red(link.ok)}`;
            link.status = `${red(400)}`;
          }
          return Object.values(link).join(' ');
        });

        const uniqueLinks = new Set(objLinks.map((link) => link.href));
        const badLinks = new Set(objLinks.map((link) => link.status !== 200 || link.status == null));

        if (stats && validate) {
          resolve(
            `${emoji.get(':bar_chart:')}   ${blue(
              `Total: ${objLinks.length}`,
            )} \n${emoji.get(':chart_with_upwards_trend:')}   ${green(
              `Unique: ${uniqueLinks.size}`,
            )}\n${emoji.get(':chart_with_downwards_trend:')}   ${magenta(
              `Broken: ${badLinks.size}`,
            )}`,
          );
        } else if (stats) {
          resolve(
            `${emoji.get(':bar_chart:')}   ${blue(
              `Total: ${objLinks.length}`,
            )} \n${emoji.get(':chart_with_upwards_trend:')}   ${green(
              `Unique: ${uniqueLinks.size}`,
            )}`,
          );
        } else if (validate) {
          resolve(`${emoji.get(':link:')}  ${white(
            links.join(`\n${emoji.get(':link:')}  `),
          )}`);
        } else {
          resolve(
            `${emoji.get(':link:')}  ${cyan(
              links.join(`\n${emoji.get(':link:')}  `),
            )}`,
          );
        }
      })
      .catch((err) => {
        reject(err);
      });
  }
});
