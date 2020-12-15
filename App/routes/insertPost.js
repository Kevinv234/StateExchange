const express = require('express');
const router = express.Router();
const path = require('path');
const db = require("../db/connection");
var mkdirp = require('mkdirp');

//new post router, id is a unique id generated on frontend for each post
router.post(`/newpost`, (req, res) => {

    //encapsulate req data into object
    let data = {
        Name: req.body.title,
        Category: req.body.category,
        UserID: 'Email@email.com', //needs to be changed later, this is a test value
        Comment: req.body.description,
        Price: req.body.price
    }

    // //if photo was uploaded, move to public directory & add filepath to data object
    if (req.files != null) {
        //create path to move photo to
        let filePath = path.join(__dirname, '../', 'public', 'images', 'post_img', req.files.photo.name)

        //move photo from req into new directory
        let photo = req.files.photo
        photo.mv(filePath)

        //add filepath to data object
        data.image_name = path.join('images', 'post_img', req.files.photo.name)
    }

    let sql = "INSERT INTO Posting SET ?";
        
    db.query(sql, [data], (err, rows, results) => {
        if (err){
            console.log(err);
            res.end();
            return;
        }

        res.redirect('/index');
        })

})


module.exports = router;