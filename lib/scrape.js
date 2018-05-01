const { fetchMessages } = require('./messages');
const { isSessionCurrent, updateCookie } = require('./auth');
const { writeFileAsync } = require('./utils');

const writeData = ([received, sent]) =>
  writeFileAsync('./smarterjailmail.json',
    JSON.stringify({ received, sent }, null, 4))

const printData = ([received, sent]) =>
  console.log(JSON.stringify({ received, sent }, null, 4));

isSessionCurrent()
  .catch(updateCookie)
  .then(fetchMessages)
  .then(printData)
  .catch(console.error);
