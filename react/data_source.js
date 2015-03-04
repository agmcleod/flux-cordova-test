class DataSource {

  createSchema () {
    var connection = this.getConnection();
    this.transaction(connection).then((tx) => {
      tx.executeSql("CREATE TABLE IF NOT EXISTS interactions (id integer PRIMARY KEY, start_date varchar(50), end_date varchar(50), first_name varchar(100), last_name varchar(100), email varchar(150))");
    }).catch(() => {
      console.log("Could not create table");
    });
  }

  executeSql (transaction, query, args) {
    return new Promise((resolve, reject) => {
      transaction.executeSql(query, args, (t, r) => resolve({
        transaction: t,
        result: r
      }), reject);
    });
  }

  getConnection () {
    return window.openDatabase("cfa.db", "1.0", "CFA Database", 1000000);
  }

  singleQuery (query, args) {
    let connection = this.getConnection();
    this.transaction(connection)
      .then(tx => this.executeSql(tx, query, args))
      .then((obj) => {
        console.log(obj.transaction, obj.result.rows.length)
      }, e => console.log(e));
  }

  transaction (connection) {
    return new Promise((resolve, reject) => {
      connection.transaction(resolve, reject);
    });
  }
}

module.exports = DataSource;