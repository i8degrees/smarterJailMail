const { writeFile } = require('fs');
const { promisify } = require('util');
const { homedir, tmpdir } = require('os');
const { join } = require('path');

const env = process.env;
const home = homedir();

const cacheDir = env.XDG_CACHE_HOME || (home ? join(home, '.cache') : tmpdir());

const urlEncode = params =>
  Object.keys(params)
    .map( key =>
      encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&');

const writeFileAsync = promisify(writeFile);

module.exports = {
  cacheDir,
  urlEncode,
  writeFileAsync,
};