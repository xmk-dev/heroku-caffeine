
# Heroku Caffeine

Heroku Caffeine ☕️ keeps your Heroku dynos awake by perodically sending HTTP requests to your apps.


## Features ✨
  - Sends HTTP requests to all specified urls (apps) in specified interval
  - Emits events


## Event Types
  - _init_ - object is properly created. Contains HerokuCaffeine (this) object.
  - _pinging_ - starting sending requests. Contains list of urls to ping.
  - _pinged_ - sent request to the certain app. Contains pinged url.
  - _pingedall_ - all urls are pinged. Contains lis of pinged urls.
  - _endedpinginginterval_ - interval has ended. Waiting for another interval. Contains results from pinging the urls.
  - _error_ - error has occurred, e.g. list of urls is not valid
  - _warn_ - warning (doesn't terminate the app), e.g. one of the urls in the list is invalid


## Installation
```sh
$ npm i -S heroku-caffeine
```

## Usage
```
const HerokuCaffeine = require('heroku-caffeine');
const herokuCaffeine = new HerokuCaffeine({ urls: ['https://your-heroku-app.herokuapp.com'] });
herokuCaffeine.run();
```


## Development
Want to contribute? Great! 🔥
If you want you could follow this commit messages [guide](https://gitmoji.carloscuesta.me/).

#### Install:
```sh
$ cd heroku-caffeine
$ npm i
```

#### Run:
```sh
$ npm run dev
```

#### Test Coverage:
```sh
$ npm run test-coverage
```

#### Lint Fix:
```sh
$ npm run lint-fix
```

and many other helpful scripts available in package.json 🤓
