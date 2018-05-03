const cheerio = require('cheerio');
const fetch = require('node-fetch');
const { storage } = require('./storage');
const { URI } = require('./constants');
const { FULLNAME } = require('./config');

const parseMessageList = html => {
  const $ = cheerio.load(html);
  return $('.list-group-item')
    .map( (i, elem) =>
      $(elem).attr('href').split('?')[1].split('=')[1]
    ).get();
};

const fetchMessageList = mailbox =>
  fetch(`${URI.base}/${URI[mailbox].list}`,
    {
      method: 'GET',
      headers: {
        Cookie: storage.getItem('Cookie'),
      },
    })
    .then(res => res.text())
    .then(parseMessageList)
    .catch(console.error);

const parseMessage = (html, id, mailbox) => {
  const $ = cheerio.load(html);
  const [otherParty, facility, datetime] = $('#container p').first().text().split('\n');
  const sender = mailbox === 'sent' ? FULLNAME : otherParty;
  const recipient = mailbox === 'received' ? FULLNAME : otherParty;
  const subject = $('#container h2').text();
  const body = $('#container p').slice(1).text();

  return { id, datetime, sender, facility, recipient, subject, body };
};

const fetchMessage = (id, mailbox) =>
  fetch(`${URI.base}/${URI[mailbox].message}${id}`,
    {
      method: 'GET',
      headers: {
        Cookie: storage.getItem('Cookie'),
      },
    })
    .then(res => res.text())
    .then(html => parseMessage(html, id, mailbox))
    .catch(console.error);

const fetchMailbox = mailbox =>
  fetchMessageList(mailbox)
    .then(ids => Promise.all(ids.map(id => fetchMessage(id, mailbox))));


const fetchMessages = () =>
  Promise.all(['received', 'sent'].map(fetchMailbox))
    .then(([received, sent]) => ({ received, sent }));


module.exports = { fetchMessages };