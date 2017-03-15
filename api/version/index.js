const Joi = require('joi');
const schemas = require('../../schemas');
const version = require('./handlers/version');

exports.register = (plugin, options, next) => {

  plugin.route([
    {
      method: 'Get',
      path: '/version',
      config: {
        handler: version.index,
        description: 'version endpoint description',
        notes: 'version endpoint notes',
        tags: ['api'],
        plugins: {
          'hapi-swagger': {
            responses: {
              '200': {
                description: 'OK',
                schema: schemas.version
              },
              '400': { description: 'Bad Request', schema: schemas.Error }
            }
          }
        },
        validate: {}
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'version'
};
