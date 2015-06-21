#!/usr/bin/env node
'use strict'

var pkg = require('./package')
var https = require('https')
var argv = require('minimist')(process.argv.slice(2))

var name = argv._[0]

if (argv.help || argv.h) return help()
if (argv.version || argv.v) return version()

if (!name) {
  console.error('ERROR: No module name specified!')
  console.error('Run `' + pkg.name + ' --help` for more info')
  process.exit(1)
  return
}

var opts = {
  method: 'HEAD',
  host: 'www.npmjs.com',
  path: '/package/' + name,
  headers: {
    'User-Agent': pkg.name + '/' + pkg.version
  }
}

var req = https.request(opts, function (res) {
  switch (res.statusCode) {
    case 200:
      console.log('To late! %s is taken :(', name)
      process.exit(1)
      break
    case 404:
      console.log('%s is available :)', name)
      process.exit()
      break
    default:
      console.error('Unknown status code returned from npm: ' + res.statusCode)
      process.exit(1)
  }
})

req.on('error', function (err) {
  console.error('ERROR:', err.message)
  console.error('Check that you are connected to the internet at try again')
  process.exit(1)
})

req.on('close', function () {
  console.error('ERROR: Connection with npm close unexpectedly - try agian')
  process.exit(1)
})

req.end()

function help () {
  console.log(
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
  console.log(pkg.version)
  process.exit()
}
