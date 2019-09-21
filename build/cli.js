#!/usr/bin/env node

/* eslint-disable no-console */
"use strict";

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _index.default)(process.argv[2], `{ ${process.argv[3]} }`).then(links => console.log(links)).catch(err => console.error(err));