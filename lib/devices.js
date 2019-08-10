const cheerio = require('cheerio');
const fetch = require('node-fetch');
const { storage } = require('./storage');
const { URI } = require('./constants');

 // NOTE(jeff): This is a sample text stream sourced from the web site [1] for
 // us to parse; we are interested in only two things here:
 //
 // a) The inner HTML text in between the `<td></td>` tags is the "device name"
 // b) the token identifying number; we can dump our authenticated devices
 // list as well as individually remove devices from our account with this.
 //
 // 1. https://www.smartjailmail.com/account-settings.cfm

 /*
<table>
  <tr style="background-color: #eee;">
    <td nowrap="nowrap" valign="top">08/03/2019 6:08 PM</td>
    <td>Mozilla/5.0 (Linux; Android 8.0.0; SM-G930T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.143 Mobile Safari/537.36</td>
    <td nowrap="nowrap" valign="top">
      <form action="account-delete-token.cfm" method="post">
        <input type="hidden" name="tokID" value="8108815">
        <input type="submit" name="btnSubmit" value="End Activity" onclick="return confirm('Force this device to log off?\n\nMozilla/5.0 (Linux; Android 8.0.0; SM-G930T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.143 Mobile Safari/537.36');" class="button">
      </form>
    </td>
  </tr>
</table>
*/

const parseDevice = (i, elem) => {
  const $ = cheerio.load(elem);
  const url = $('input').attr('value');
  const id = url.match(/([\w\d_-]*)\.?[^\\\/]*$/i)[1];
  const info = $('td')
    .text()
    .split('\n')[0];
  const recipient = ``;
  const date = ``;
  // const recipient = info.match(/\w*\s\w*(?= on )/)[0];
  // const date = info.match(/\w*\s\d*,\s\d*/)[0];

  return {
    id,
    date,
    recipient,
    url,
  };
};

const parseDevices = html => {
  const $ = cheerio.load(html);
  return $('tr td input')
    .children()
    .map(parseDevice)
    .get();
};

const stubObj = {
  "authenticated": {
    "8138961": [
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
    ],
    "8130031": [
      "Mozilla/5.0 (Linux; Android 8.0.0; SM-G930T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.143 Mobile Safari/537.36",
      "smarterjailmail/0.0.1 (+https://github.com/fielding/smarterjailmail)",
    ],
  },
};

const fetchDeviceList = () => {
  return stubObj;
  fetch(`${URI.base}/${URI.delete}`, {
    method: 'POST',
    headers: {
      Cookie: storage.getItem('Cookie'),
    },
  }).then(res => res.text())
    .then(parseDevices)
    .catch(console.error);
};

module.exports = { fetchDeviceList };
