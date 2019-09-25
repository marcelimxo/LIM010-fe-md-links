#!/usr/bin/env node

/* eslint-disable no-console */
"use strict";

var _cmd = _interopRequireDefault(require("./cmd"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const [,, ruta, param1, param2] = process.argv;
(0, _cmd.default)(ruta, param1, param2).then(console.log);