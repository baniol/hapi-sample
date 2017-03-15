'use strict';

const Pack = require('./package');

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8000;

const manifest = {
  connections: [{
    host,
    port,
    routes: {
      cors: true
    },
    router: {
      stripTrailingSlash: true
    }
  }],
  registrations: [
    // ====yoPlugin. Do not remove ====
    {
      plugin: './api/version'
    },
    {
      plugin: {
        register: 'inert'
      }
    },
    // @TODO vision - template plugin used only for swagger docs
    // consider removing for prod (dev only) - move to server.js
    {
      plugin: {
        register: 'vision'
      }
    },
    {
      plugin: {
        register: 'hapi-swagger',
        options: {
          info: {
            'title': 'ResourceStrings service API',
            'version': Pack.version,
          }
        }
      }
    },
    {
      plugin: {
        register: 'good',
        options: {
          reporters: {
            console: [{
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [{
                error: '*',
                log: '*',
                response: '*',
                request: '*'
              }]
            },
            {
              module: 'good-console'
            }, 'stdout'
            ]
          }
        }
      }
    }
  ]
};

module.exports = manifest;
