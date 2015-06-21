# npm-available

CLI to check if a given module name is available on npm.

## Installation

```
npm install -g npm-available
```

## Usage

After you've installed npm-available globally, just run:

```
npm-available [options] [name]
```

Where `name` is the name of a module you whish to check.

**Options:**

```
  --help, -h     show this help
  --version, -v  show version
```

The command will exit with a non-zero exit code if the module name is
already taken.

## License

MIT
