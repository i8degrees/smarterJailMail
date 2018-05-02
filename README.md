# smarterJailMail

> Extract data from smartJailMail.com for your prefered consumption

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Contribute](#contribute)
- [License](#license)

## Background

Born out of the desire to scratch my own itch, I started this as a way to
export sent and received message data/content for both archival purposes and
for arbitrary consumption of the data. For example, exporting all messages to
or from your significant other sent via smartJailMail.com, and then importing 
those messages in to a custom chat client/system.

### See Also

- [`fielding/TBD`](https://github.com/fielding/TBD)

## Install

```
$ npm install smarterJailMail
```

## Usage

```js
const smarterJailMail = require('smarterJailMail');

smarterJailMail()
  .then(data => console.log(JSON.stringify(data, null, 4)));

```

## API

coming soon...

## Contribute

Contributions are welcome!

## License

[MIT © Fielding Johnston.](../LICENSE)
