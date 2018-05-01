const { fetchMessages } = require('./messages');
const { isSessionCurrent, updateCookie } = require('./auth');

const smarterJailMail = () =>
  isSessionCurrent()
    .catch(updateCookie)
    .then(fetchMessages)

module.exports = { smarterJailMail };

