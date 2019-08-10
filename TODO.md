# TODO

- [ ] Implement storage of user-specific config with `node-localstorage`, or... setup user config path at some given path, such as `~/.config/smarterJailMail/config.js`?

- [ ] Store the list of authenticated devices under account settings; introduce
a new top-level key, "devices" for holding onto the date and user agent
strings that identify our hardware.

```json
{
  "devices": {
    "authenticated": {
      "8138961": [
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
      ],
      "8130031": [
        "Mozilla/5.0 (Linux; Android 8.0.0; SM-G930T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.143 Mobile Safari/537.36",
        "smarterjailmail/0.0.1 (+https://github.com/fielding/smarterjailmail)",
      ],
    },
  },
  "messages": {
    "received": {
    },
    "sent": {
    },
    "photos": {
    },
  },
}
```

We can then introduce a feature for pruning our list of authenticated devices with multiple selections, if necessary -- much unlike the original web portal
offered.
