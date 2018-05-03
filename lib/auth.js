const fetch = require('node-fetch');
const LocalStorage = require('node-localstorage').LocalStorage;
const { urlEncode, storageDir } = require('./utils');
const { URI, USER_AGENT } = require('./constants');
const { USERNAME, PASSWORD } = require('./config');


const localStorage = new LocalStorage(storageDir);

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
  localStorage.setItem('Cookie', cookie);

const updateCookie = () =>
  fetchCookie()
    .then(storeCookie);
    /* .catch(console.error); */

const isSessionCurrent = () => {
  if (!localStorage.length) return Promise.reject(false);
  return fetch(`${URI.base}/${URI.received.message}`,
    {
      method: 'GET',
      headers: {
        cookie: localStorage.getItem('Cookie'),
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