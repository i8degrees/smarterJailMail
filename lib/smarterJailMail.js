const { fetchMessages } = require('./messages');
const { fetchPhotos } = require('./photos');
const { isSessionCurrent, updateCookie } = require('./auth');

const fetchData = () =>
  Promise.all([fetchMessages(), fetchPhotos()])
    .then(([messages, photos]) =>
      ({ messages, photos }));

const smarterJailMail = () =>
  isSessionCurrent()
    .catch(updateCookie)
    .then(fetchData)

module.exports = { smarterJailMail };

