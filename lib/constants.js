const { name, version, homepage } = require('../package.json');

const constants = {};
// CONSTANTS
constants.USER_AGENT = `${name}/${version} (+${homepage})`;

constants.URI = {
  base: 'https://www.smartjailmail.com',
  login: 'log-in.cfm?',
  received: {
    list: 'my-messages.cfm',
    message: 'read-message.cfm?mesID=',
  },
  sent: {
    list: 'sent-messages.cfm',
    message: 'read-message-sent.cfm?mesID=',
  },
};

module.exports = constants;
