/* eslint-disable no-param-reassign */
import mdLinks from './index';

const chalk = require('chalk');

const emoji = require('node-emoji');

const {
  blue, red, green, magenta, white, cyan,
} = chalk.bold;


const extraerParam = (extendido, resumido) => (param1, param2) => (
  (param1 === extendido || param2 === extendido || param1 === resumido || param2 === resumido)
);
const extraerValidate = extraerParam('--validate', '-v');
const extraerStats = extraerParam('--stats', '-s');

export default (ruta, param1, param2) => new Promise((resolve) => {
  if (!ruta) {
    resolve(`${emoji.get(':no_entry:')}   ${red('Por favor, ingresa una ruta')} `);
  } else {
    const validate = extraerValidate(param1, param2);
    const stats = extraerStats(param1, param2);

    mdLinks(ruta, { validate })
      .then((objLinks) => {
        const validatedLinks = objLinks.map((link) => {
          if (link.status === 200) {
            link.ok = `${green('OK')}`;
            link.status = `${green(link.status)}`;
          } else {
            link.ok = `${red('FAIL')}`;
            link.status = `${red(400)}`;
          }
          return Object.values(link);
        });
        // Creo un array de strings donde estan los valores del objeto link
        const links = [];
        const uniqueLinks = new Set(objLinks.map((link) => link.href));
        const badLinks = new Set(objLinks.map((link) => link.status !== 200));
        // TODO: Cambiar a map
        objLinks.forEach((eachLink) => {
          const linkArr = Object.values(eachLink);
          const linkStr = linkArr.join(' ');
          links.push(linkStr);
        });

        if (stats && validate) {
          resolve(`${emoji.get(':bar_chart:')}   ${blue(`Total: ${links.length}`)} \n${emoji.get(':chart_with_upwards_trend:')}   ${green(`Unique: ${uniqueLinks.size}`)}\n${emoji.get(':chart_with_downwards_trend:')}   ${magenta(`Broken: ${badLinks.size}`)}`);
        } else if (stats) {
          resolve(`${emoji.get(':bar_chart:')}   ${blue(`Total: ${links.length}`)} \n${emoji.get(':chart_with_upwards_trend:')}   ${green(`Unique: ${uniqueLinks.size}`)}`);
        } else if (validate) {
          resolve(`${emoji.get(':link:')}  ${white(links.join(`\n${emoji.get(':link:')}  `))}`);
        } else {
          resolve(`${emoji.get(':link:')}  ${white(validatedLinks.join(`\n${emoji.get(':link:')}  `))}`);
        }
      })
      .catch(() => {
        resolve('hay un error');
      });
  }
});
