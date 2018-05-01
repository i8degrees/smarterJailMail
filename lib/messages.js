const cheerio = require('cheerio');
const fetch = require('node-fetch');
const LocalStorage = require('node-localstorage').LocalStorage;
const { URI } = require('./constants');
const { FULLNAME } = require('./config');

const localStorage = new LocalStorage('./localstorage');

const parseMessageIds = html => {
  const $ = cheerio.load(html);
  return cheerio.load(html)('.list-group-item')
    .map( (i, elem) =>
      $(elem).attr('href').split('?')[1].split('=')[1]
    ).get();
};

const fetchMessageIds = uri =>
  fetch(`${URI.base}/${URI[mailbox].list}`,
    {
      method: 'GET',
      headers: {
        Cookie: localStorage.getItem('Cookie'),
      },
    })
    .then(res => res.text())
    .then(parseMessageIds)
    .catch(console.error);

const parseMessageData = (html, id, type) => {
  const $ = cheerio.load(html);
  const [otherParty, facility, datetime] = $('#container p').first().text().split('\n');
  const sender = type === 'sent' ? FULLNAME : otherParty;
  const receiver = type === 'received' ? FULLNAME : otherParty;
  const subject = $('#container h2').text();
  const body = $('#container p').slice(1).text();

  return { id, datetime, sender, facility, receiver, subject, body };
};

const fetchMessageData = (id, type = 'received') => {
  return fetch(`${URI.base}/${URI[mailbox].message}${id}`,
    {
      method: 'GET',
      headers: {
        Cookie: localStorage.getItem('Cookie'),
      },
    })
    .then(res => res.text())
    .then(html => parseMessageData(html, id, type))
    .catch(console.error);
};

const fetchMessages = () => {
  const received = fetchMessageIds('my-messages.cfm')
    .then(ids =>
      Promise.all(ids.map(id =>
        fetchMessageData(id)
      ))
    );
  const sent = fetchMessageIds('sent-messages.cfm')
    .then(ids =>
      Promise.all(ids.map(id =>
        fetchMessageData(id, 'sent')
      ))
    );
  return Promise.all([received, sent]);
};


module.exports = { fetchMessages };