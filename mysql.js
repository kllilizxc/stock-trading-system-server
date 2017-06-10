var mysql = require('mysql');
var moment = require('moment');

var SqlManager = {
  connection: null,
  connect: function(host, user, pwd, db) {
    connection = mysql.createConnection({
      host: host,
      user: user,
      password: pwd,
      database: db
    });
    connection.connect(function(err) {
      if(err)
        console.log('Error connection:' + err);
    });
  },
  handleSql(sql, data, callback) {
    if(!connection) {
      console.log('connection has not been established yet!');
      return null;
    }
    connection.query(sql, data, function(err, result, fields) {
      if(err) {
        console.log(err);
        callback({ code: 0, err: err });
        return;
      }

      callback({ code: 1, result: result });
      return;
    })
  },
  validateUser: function(username, pwd, callback) {
    this.handleSql('SELECT usrname from normalusr where usrname="' + username + '"and pwd="' + pwd + '" limit 1', [], callback);
  },
  getUserInfo: function(username, callback) {
    this.handleSql('SELECT * from normalusr where usrname="' + username + '" limit 1', [], callback);
  },
  addUser: function(data, callback) {
    var sql = 'INSERT INTO normalusr VALUES ( ?,?,?,?,?,?,?,?,?,? )';
    this.handleSql(sql, data, callback);
  },
  updateUserInfo(username, data, callback) {
    var sql = 'UPDATE normalusr SET name=?, idnum=?, phone=?, accountname=?, fmaddr=? WHERE usrname=?';
    this.handleSql(sql, [data.name, data.idnum, data.phone, data.accountname, data.fmaddr, username], callback);
  },
  getStocksHold(username, callback) {
    var sql = 'SELECT * FROM stockhold WHERE usrname=' + username;
    this.handleSql(sql, [], callback);
  },
  addStockHold(data, callback) {
    var sql = 'INSERT INTO stockhold VALUES ( ?,?,?,?,?,? )';
    console.log(data);
    this.handleSql(sql, data, callback);
  },
  getStockInfo(callback) {
    var sql = 'SELECT * FROM stockInfo';
    this.handleSql(sql, [], callback);
  }
}

module.exports = SqlManager;