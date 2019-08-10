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
    photos: 'photos.cfm',
  },
  delete: 'account-delete-token.cfm?btnSubmit=End+Activity&tokID=',
};

module.exports = constants;
