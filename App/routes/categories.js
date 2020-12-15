var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
var db = require("../db/connection");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false}));

router.post('/categories', (req, res) => {
   
    const queryString = `SELECT * FROM Categories`
    db.query(queryString, (err, rows, fields) => {
        if (err){
            console.log("Failed: " + err);
            res.end();
            return;
        }
        
        console.log('Found database fetch');
        res.send(rows);

    })
    
});
   
module.exports = router;
