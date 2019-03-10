#!/usr/bin/env node

const smarterJailMail = require('..');

smarterJailMail()
  .then(data => console.log(JSON.stringify(data, null, 4)));
