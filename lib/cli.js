#!/usr/bin/env node
/* eslint-disable no-console */

import cli from './cmd';

const [, , ruta, param1, param2] = process.argv;

cli(ruta, param1, param2).then(console.log);
