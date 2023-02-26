# babel-plugin-inline-all-functions

[![NPM Version](https://img.shields.io/npm/v/babel-plugin-inline-all-functions.svg)](https://www.npmjs.org/package/babel-plugin-inline-all-functions)

<!-- toc -->

- [NAME](#name)
- [INSTALLATION](#installation)
- [SYNOPSIS](#synopsis)
- [DESCRIPTION](#description)
- [OPTIONS](#options)
- [USAGE](#usage)
  - [.babelrc](#babelrc)
  - [CLI](#cli)
  - [API](#api)
- [DEVELOPMENT](#development)
  - [NPM Scripts](#npm-scripts)
- [COMPATIBILITY](#compatibility)
- [SEE ALSO](#see-also)
- [VERSION](#version)
- [AUTHOR](#author)
- [COPYRIGHT AND LICENSE](#copyright-and-license)

<!-- tocstop -->

# NAME

babel-plugin-inline-all-functions - a Babel plugin to inline one-liner arrow functions

# INSTALLATION

```sh
$ npm install babel-plugin-inline-all-functions
```

# SYNOPSIS

`$ cat test.js`

```javascript
const square = number => number ** 2;

console.log(square(4) + square(8));
```

`$ babel --plugins inline-all-functions test.js`

```javascript
console.log(4 ** 2 + 4 ** 2);
```

# DESCRIPTION

This is a [Babel](https://babeljs.io/)
[plugin](https://babeljs.io/docs/plugins/) which inlines calls to one-liner
arrow functions (these are arrow functions defined using an expression following
the arrow, without a return keyword).

I started by forking the inline-functions Babel plugin from @chocolateboy on
GitHub then ended up re-writing most of the transformation to serve my goals as
a Javascript teacher.

# OPTIONS

The original plugin by @chocolateboy had a number of options which I had removed.
My rewrite does not support any options.

# USAGE

<details>

## .babelrc

`$ cat .babelrc`

```json
{
    "plugins": ["inline-all-functions"]
}
```

## CLI

```sh
$ babel --plugins inline-all-functions script.js
```

## API

```javascript
require('@babel/core').transform(code, {
    plugins: ['inline-all-functions']
})
```

</details>

# DEVELOPMENT

<details>

## NPM Scripts

The following NPM scripts are available:

- doctoc - generate the TOC (table of contents) in the README
- test - run the test suite

</details>

# COMPATIBILITY

- Babel 6+ (only Babel 7+ is tested/supported)
- [Maintained node versions](https://github.com/nodejs/Release#release-schedule)

# SEE ALSO

- [babel-plugin-inline-functions]()
- [babel-plugin-nofn](https://www.npmjs.com/package/babel-plugin-nofn) - convert some array-method calls to inline loops

# VERSION

1.0.4

# AUTHOR

- [Emile Cantin](https://github.com/emilecantin)
- [chocolateboy](https://github.com/chocolateboy)
- [diraneyya](https://github.com/diraneyya) - MAINTAINER

# COPYRIGHT AND LICENSE

Copyright © 2016-2020 by Emile Cantin.

This is free software; you can redistribute it and/or modify it under the terms
of the [ISC License](https://opensource.org/licenses/ISC).
