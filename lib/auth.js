const fetch = require('node-fetch');
const LocalStorage = require('node-localstorage').LocalStorage;
const { urlEncode } = require('./utils');
const { BASE_URI, USER_AGENT } = require('./constants');
const { USERNAME, PASSWORD } = require('./config');

const localStorage = new LocalStorage('./localstorage');

const fetchCookie = () =>
  fetch(`${BASE_URI}/log-in.cfm?`,
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
  if (!localStorage.length) return false;
  return fetch(`${BASE_URI}/my-messages.cfm`,
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