#!/usr/bin/env node
/* eslint-disable no-console */


import mdLinks from './index';

mdLinks(process.argv[2], `{ ${process.argv[3]} }`)
  .then((links) => console.log(links)).catch((err) => console.error(err));
