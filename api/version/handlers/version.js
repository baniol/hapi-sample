const pkg = require('../../../package');

module.exports.index = (request, reply) => {
  return reply({version: pkg.version});
};
