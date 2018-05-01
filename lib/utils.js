const { writeFile } = require('fs');
const { promisify } = require('util');

const urlEncode = params =>
  Object.keys(params)
    .map( key =>
      encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&');

const writeFileAsync = promisify(writeFile);

module.exports = {
  urlEncode,
  writeFileAsync,
};