const HerokuCaffeine = require('./index');


// eslint-disable-next-line no-console
console.log('Starting heroku-caffeine on DEV env');
const herokuCaffeine = new HerokuCaffeine({ urls: ['https://your-heroku-app.herokuapp.com'] });
herokuCaffeine.run();
