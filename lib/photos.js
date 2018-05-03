const cheerio = require('cheerio');
const fetch = require('node-fetch');
const { storage } = require('./storage');
const { URI } = require('./constants');

const parsePhoto = (i, elem) => {
  const $ = cheerio.load(elem);
  const url = $('img').attr('src');
  const id = url.match(/([\w\d_-]*)\.?[^\\\/]*$/i)[1];
  const info = $('.text')
    .text()
    .split('\n')[0];
  const recipient = info.match(/\w*\s\w*(?= on )/)[0];
  const date = info.match(/\w*\s\d*,\s\d*/)[0];

  return {
    id,
    date,
    recipient,
    url,
  };
};

const parsePhotos = html => {
  const $ = cheerio.load(html);
  return $('#container div ul')
    .children()
    .map(parsePhoto)
    .get();
};

const fetchPhotos = () =>
  fetch(`${URI.base}/${URI.sent.photos}`, {
    method: 'GET',
    headers: {
      Cookie: storage.getItem('Cookie'),
    },
  })
    .then(res => res.text())
    .then(parsePhotos)
    .catch(console.error);

module.exports = { fetchPhotos };