#!/usr/bin/env node
'use strict'

var argv = require('minimist')(process.argv.slice(2))
var pkg = require('./package')
var npmAvailable = require('./')

var name = argv._[0]

var log = {
  info: function () {
    if (!argv.quiet && !argv.q) console.log.apply(console.log, arguments)
  },
  error: function () {
    if (!argv.quiet && !argv.q) console.error.apply(console.error, arguments)
  }
}

if (argv.help || argv.h) help()
else if (argv.version || argv.v) version()
else if (!name) noName()
else run()

function run () {
  npmAvailable(name, function (err, available) {
    if (err) {
      log.error(err.message)
      if (err.code) log.error('Check that you are connected to the internet at try again')
      process.exit(1)
    } else if (!available) {
      log.info('Too late! %s is taken :(', name)
      process.exit(1)
    } else {
      log.info('%s is available :)', name)
      process.exit()
    }
  })
}

function noName () {
  log.error('ERROR: No module name specified!')
  log.error('Run `' + pkg.name + ' --help` for more info')
  process.exit(1)
}

function help () {
  log.info(
    pkg.name + ' ' + pkg.version + '\n' +
    pkg.description + '\n\n' +
    'Usage:\n' +
    '  ' + pkg.name + ' [options] [name]\n\n' +
    'Options:\n' +
    '  --help, -h     show this help\n' +
    '  --version, -v  show version\n' +
    '  --quiet, -q    don\'t output anything (check the exit code instead)'
  )
  process.exit()
}

function version () {
  log.info(pkg.version)
  process.exit()
}
