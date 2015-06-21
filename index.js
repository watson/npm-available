#!/usr/bin/env node
'use strict'

var pkg = require('./package')
var https = require('https')
var argv = require('minimist')(process.argv.slice(2))

var name = argv._[0]

var log = {
  info: function () {
    if (!argv.quiet && !argv.q) console.log.apply(console.log, arguments)
  },
  error: function () {
    if (!argv.quiet && !argv.q) console.error.apply(console.error, arguments)
  }
}

if (argv.help || argv.h) return help()
if (argv.version || argv.v) return version()

if (!name) {
  log.error('ERROR: No module name specified!')
  log.error('Run `' + pkg.name + ' --help` for more info')
  process.exit(1)
  return
}

var opts = {
  method: 'HEAD',
  host: 'registry.npmjs.com',
  path: '/' + name,
  headers: {
    'User-Agent': pkg.name + '/' + pkg.version
  }
}

var req = https.request(opts, function (res) {
  switch (res.statusCode) {
    case 200:
      log.info('Too late! %s is taken :(', name)
      process.exit(1)
      break
    case 404:
      log.info('%s is available :)', name)
      process.exit()
      break
    default:
      log.error('Unknown status code returned from npm: ' + res.statusCode)
      process.exit(1)
  }
})

req.on('error', function (err) {
  log.error('ERROR:', err.message)
  log.error('Check that you are connected to the internet at try again')
  process.exit(1)
})

req.on('close', function () {
  log.error('ERROR: Connection with npm close unexpectedly - try agian')
  process.exit(1)
})

req.end()

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
