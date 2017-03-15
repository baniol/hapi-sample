'use strict';

const Glue = require('glue');
const manifest = require('./manifest');
const pkg = require('./package');

if (process.env.NODE_ENV !== 'production') {
  manifest.registrations.push({
    "plugin": {
      "register": "blipp",
      "options": {}
    }
  });
}

Glue.compose(manifest, { relativeTo: __dirname }, (err, server) => {
  if (err) {
    console.log('server.register err:', err);
  }
  server.start(() => {
    console.log(`Server started on ${server.info.uri.toLowerCase()}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`App version: ${pkg.version}`);
  });
});
