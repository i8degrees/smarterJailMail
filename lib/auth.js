const fetch = require('node-fetch');
const { storage } = require('./storage.js');
const { urlEncode } = require('./utils');
const { URI, USER_AGENT } = require('./constants');
const { USERNAME, PASSWORD } = require('./config');

const fetchCookie = () =>
  fetch(`${URI.base}/${URI.login}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'User-Agent': USER_AGENT,
      },
      body: urlEncode({
        btnSumbit: 'Log+In',
        memPassword: PASSWORD,
        memUsername: USERNAME,
        myaction: 'doLogin',
      }),
      redirect: 'manual',
    })
    .then(res => res.headers.get('set-cookie'))
    .catch(console.error);

const storeCookie = cookie =>
  storage.setItem('Cookie', cookie);

const updateCookie = () =>
  fetchCookie()
    .then(storeCookie);
    /* .catch(console.error); */

const isSessionCurrent = () => {
  if (!storage.length) return Promise.reject(false);
  return fetch(`${URI.base}/${URI.received.list}`,
    {
      method: 'GET',
      headers: {
        cookie: storage.getItem('Cookie'),
      },
      redirect: 'manual',
    })
    .then(res => {
      if (!res.ok) return Promise.reject(false);
      return true;
    });
};

module.exports = {
  updateCookie,
  isSessionCurrent,
};