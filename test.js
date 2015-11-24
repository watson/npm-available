'use strict'

var test = require('tape')
var pkg = require('./package')
var npmAvailable = require('./')

test('taken', function (t) {
  npmAvailable(pkg.name, function (err, available) {
    t.error(err)
    t.equal(available, false)
    t.end()
  })
})

test('available', function (t) {
  npmAvailable(Math.random(), function (err, available) {
    t.error(err)
    t.equal(available, true)
    t.end()
  })
})
