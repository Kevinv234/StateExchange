var express = require('express');
var router = express.Router();
var db = require('../db/connection');
const path = require('path');
const jwt      = require('jsonwebtoken');

router.post('/index', function(req, res, next) {

        var sql = "SELECT * FROM Messages INNER JOIN `User` ON SenderID = `User`.ID WHERE MessagesIndexID=" + req.body.MessagesIndexID + " Order By Timestamp DESC";

        db.connect(function(err) {

            db.query(sql, function (err, result) {

                if (err) {
                  console.log(err);
                } 

                res.send(result);

            });

        });
  
});

router.post('/store', function(req, res, next) {

  
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  var decoded = jwt.decode(token, {complete: true});

  var sql = "INSERT INTO `Messages`(`MessagesIndexID`, `SenderID`, `Message`) VALUES("+ req.body.MessagesIndexID + ", " + decoded.payload.id + ",'" + req.body.Message + "')";

  db.connect(function(err) {

      db.query(sql, function (err, result) {

          if (err) {
            console.log(err);
          } 

          res.send(result);

      });

  });

});


module.exports = router;
