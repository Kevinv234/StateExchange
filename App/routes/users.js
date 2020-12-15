var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var db = require("../db/connection");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false}));

router.get('/details', function(req, res, next) {

  res.send('Details of resource here resource...');
  res.end();
  
});

router.post('/register', function(req, res) {

  let data = {   
    email: req.body.email,
    password: req.body.password,
    name: req.body.name
  }
  
  let sql = "INSERT INTO User SET ?";

  db.connect(function(err) {

    db.query(sql, [data], function (err, result) {

        var resObj = {status: "ok", message: ''};

        if (err) {
          resObj.status = "error: user.js";
          resObj.message = err.message;
        } else {
          resObj.status = "ok";
          resObj.message = "Registration successfull!";
        }

        res.send(resObj);

    })

});

})

module.exports = router;
