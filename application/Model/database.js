const express = require('express');
const mysql = require('mysql');
//const
//const cors = require('cors');

const connection = mysql.createPool({

    connectionLimit: 10,        //Limits connection towards mysql
    user: 'ubuntu',
    password: 'csc648.07!',
    database: 'sfsuDatabase',
    host: 'localhost',
    port: '3306'
});

const app = express();
//app.use(cors());

app.get('/testmysql', function (req, res) {
  
  connection.getConnection(function (err, connection) {

    connection.query('SELECT * FROM Posting', function (error, results, fields) {
      if (error) throw error;


      res.set('Access-Control-Allow-Origin', '*');
      res.send(results);
    });
  });
});

app.listen(3001, () => {
  console.log('http://ec2-18-224-39-11.us-east-2.compute.amazonaws.com:3001/testmysql is now running!');
 });

