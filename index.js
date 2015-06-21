#!/usr/bin/env node
'use strict'

var https = require('https')
var pkg = require('./package')

var name = process.argv[2]

if (!name) {
  console.error('ERROR: No module name specified!')
  console.error('Usage: ' + pkg.name + ' [module-name]')
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
      break
    case 404:
      console.log('%s is available :)', name)
      break
    default:
      console.error('Unknown status code returned from npm: ' + res.statusCode)
  }

  res.on('end', function () {
    if (!~[200, 404].indexOf(res.statusCode)) process.exit(1)
  })

  res.resume()
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
