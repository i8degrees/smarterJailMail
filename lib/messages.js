const cheerio = require('cheerio');
const fetch = require('node-fetch');
const LocalStorage = require('node-localstorage').LocalStorage;
const { URI } = require('./constants');
const { FULLNAME } = require('./config');

const localStorage = new LocalStorage('./localstorage');

const parseMessageList = html => {
  const $ = cheerio.load(html);
  return cheerio.load(html)('.list-group-item')
    .map( (i, elem) =>
      $(elem).attr('href').split('?')[1].split('=')[1]
    ).get();
};

const fetchMessageList = mailbox =>
  fetch(`${URI.base}/${URI[mailbox].list}`,
    {
      method: 'GET',
      headers: {
        Cookie: localStorage.getItem('Cookie'),
      },
    })
    .then(res => res.text())
    .then(parseMessageList)
    .catch(console.error);

const parseMessage = (html, id, mailbox) => {
  const $ = cheerio.load(html);
  const [otherParty, facility, datetime] = $('#container p').first().text().split('\n');
  const sender = mailbox === 'sent' ? FULLNAME : otherParty;
  const receiver = mailbox === 'received' ? FULLNAME : otherParty;
  const subject = $('#container h2').text();
  const body = $('#container p').slice(1).text();

  return { id, datetime, sender, facility, receiver, subject, body };
};

const fetchMessage = (id, mailbox) =>
  fetch(`${URI.base}/${URI[mailbox].message}${id}`,
    {
      method: 'GET',
      headers: {
        Cookie: localStorage.getItem('Cookie'),
      },
    })
    .then(res => res.text())
    .then(html => parseMessage(html, id, mailbox))
    .catch(console.error);

const fetchMailbox = mailbox =>
  fetchMessageList(mailbox)
    .then(ids => Promise.all(ids.map(id => fetchMessage(id, mailbox))));


const fetchMessages = () =>
  Promise.all(['received', 'sent'].map(fetchMailbox));


module.exports = { fetchMessages };