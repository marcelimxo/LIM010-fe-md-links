#!/usr/bin/env node
/* eslint-disable no-console */

import cli from './cmd';

const chalk = require('chalk');
const emoji = require('node-emoji');

const { red } = chalk.bold;

const [, , ruta, param1, param2] = process.argv;

cli(ruta, param1, param2)
  .then(console.log)
  .catch((error) => console.error(`${emoji.get(':no_entry:')}   ${red(error.message)} `));
