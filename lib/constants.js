const { name, version, homepage } = require('../package.json');

const constants = {};
// CONSTANTS
constants.BASE_URI = 'https://www.smartjailmail.com'
constants.USER_AGENT = `${name}/${version} (+${homepage})`;


module.exports = constants;