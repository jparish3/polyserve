/**
 * @license
 * Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

var express = require('express');
var http = require('http');
var makeApp = require('./make_app');
var open = require('open');
var util = require('util');

function startServer(port, openPage, componentDir, packageName) {
  port = port || 8080;
  console.log('Starting Polyserve on port ' + port);

  var app = express();
  var polyserve = makeApp(componentDir, packageName);

  app.use('/components/', polyserve);

  var server = http.createServer(app);
  server = app.listen(port);

  var baseUrl = util.format('http://localhost:%d/components/%s/', port, polyserve.packageName);
  console.log('Files in this directory are available under ' + baseUrl);

  if (openPage) {
    open(baseUrl + openPage);
  }
}

module.exports = startServer;
