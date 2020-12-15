const express = require('express');
const router = express.Router();
const path = require('path');
const db = require("../db/connection");

//new delete post router
router.post(`/delete_post`, (req, res) => {

    let sql = `DELETE FROM Posting WHERE ID = '${req.body.id}`;
        
    db.query(sql, (err, rows, results) => {
        if (err){
            console.log(err);
            res.end();
            return;
        }

        res.redirect('/index');
        })

})


module.exports = router;