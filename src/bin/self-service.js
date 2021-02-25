#!/usr/bin/env node

const { init } = require('../dist/cjs/service/index')

const rawArgv = process.argv.slice(2)
const args = require('minimist')(rawArgv)
const command = args._[0]

init(command, args, rawArgv)