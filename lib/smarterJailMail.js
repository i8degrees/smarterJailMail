const { fetchMessages } = require('./messages');
const { fetchPhotos } = require('./photos');
const { fetchDeviceList } = require('./devices');
const { isSessionCurrent, updateCookie } = require('./auth');

const fetchData = () =>
  Promise.all([fetchMessages(), fetchPhotos(), fetchDeviceList()])
    .then(([messages, photos, devices]) =>
      ({ messages, photos, devices }));

const smarterJailMail = () =>
  isSessionCurrent()
    .catch(updateCookie)
    .then(fetchData)

module.exports = smarterJailMail;

