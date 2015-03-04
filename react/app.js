/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');

var CFAApp = require('./components/CFAApp.react');

React.render(
  <CFAApp />,
  document.getElementById('container')
);


document.addEventListener("deviceready", function() {
  var DataSource = require('./data_source');
  window.dataSource = new DataSource();
  window.dataSource.createSchema();

  let connection = dataSource.getConnection();
  dataSource.transaction(connection)
    .then(tx => dataSource.executeSql(tx, "INSERT INTO interactions (start_date) VALUES (?)", [new Date().toISOString()]))
    .then((obj) => dataSource.executeSql(obj.transaction, "INSERT INTO interactions (start_date) VALUES (?)", [new Date().toISOString()]))
    .then((obj) => dataSource.executeSql(obj.transaction, "SELECT * FROM interactions", []))
    .then((obj) => console.log(obj.result.rows.length));
});