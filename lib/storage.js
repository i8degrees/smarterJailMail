const { join } = require('path');
const LocalStorage = require('node-localstorage').LocalStorage;
const { cacheDir } = require('./utils');

const storage = new LocalStorage(join(cacheDir, 'smarterJailMail'));

module.exports = { storage };