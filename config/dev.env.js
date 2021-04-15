'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HOST: 'localhost',
  PORT: 9001,
  API_ROOT: 'http://192.168.3.176:9001'
});
