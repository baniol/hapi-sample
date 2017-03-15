'use strict';

const Hapi = require('hapi');
const plugin = require('../../api/version');
const testUtils = require('../testUtils');

const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const sinon = require('sinon');
const sinonStubPromise = require('sinon-stub-promise');
sinonStubPromise(sinon);

const experiment = lab.experiment;
const test = lab.test;
const before = lab.before;
const expect = Code.expect;

experiment('Functional tests for version API', () => {
  let server;

  before((done) => {
    const plugins = [plugin];
    server = new Hapi.Server();
    server.connection({ port: 8000 });
    server.register(plugins, (err) => {
      if (err) {
        return done(err);
      }
      server.initialize(done);
    });
  });

  test('/version', done => {
    const options = {
      method: 'GET',
      url: '/version'
    };
    server.inject(options, response => {
      expect(response.headers['content-type']).to.equal('application/json; charset=utf-8');
      expect(response.statusCode).to.equal(200);
      // const resp = testUtils.parseJSON(response.payload);
      // expect(resp).to.be.an.object();
      // expect(resp.msg).to.equal('Endpoint for version');
      done();
    });
  });

});
