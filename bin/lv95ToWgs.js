#!/usr/bin/env node

const run = require('./wrapper')
const { LV95toWGS } = require('../dist/index')

run(LV95toWGS)
