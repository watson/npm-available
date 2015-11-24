# npm-available

Check if a given module name is available on npm. Available as CLI and
module API.

[![Build status](https://travis-ci.org/watson/npm-available.svg?branch=master)](https://travis-ci.org/watson/npm-available)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Installation

To use on the command line, install globally using:

```
npm install -g npm-available
```

To use programmatically, install locally:

```
npm install --save npm-available
```

## CLI

After you've installed npm-available globally, just run:

```
$ npm-available my-awesome-module
Too late! my-awesome-module is taken :(
```

### Usage

```
npm-available [options] [name]
```

Where `name` is the name of a module you whish to check.

**Options:**

```
  --help, -h     show this help
  --version, -v  show version
  --quiet, -q    don't output anything (check the exit code instead)
```

The command will exit with a non-zero exit code if the module name is
already taken.

## Programmatic Usage

```js
var npmAvailable = require('npm-available')

npmAvailable('my-awesome-module', function (err, available) {
  if (err) throw err
  if (available) console.log('%s is available', name)
  else console.log('%s is already taken', name)
})
```

## License

MIT
