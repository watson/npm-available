'use strict'

var https = require('https')
var once = require('once')
var pkg = require('./package')

module.exports = function (name, cb) {
  cb = once(cb)

  var opts = {
    method: 'HEAD',
    host: 'registry.npmjs.com',
    path: '/' + name,
    headers: {
      'User-Agent': pkg.name + '/' + pkg.version
    }
  }

  var req = https.request(opts, function (res) {
    res.resume()
    switch (res.statusCode) {
      case 200: return cb(null, false)
      case 404: return cb(null, true)
      default: return cb(new Error('Unknown status code returned from npm: ' + res.statusCode))
    }
  })

  req.on('error', cb)
  req.on('close', function () {
    cb(new Error('Connection with npm close unexpectedly'))
  })

  req.end()
}
