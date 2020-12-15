const express = require('express');
const app = express();
app.use(express.json());
const db = require("../db/connection");
var router = express.Router();

// getting the users postings 
router.get('/postings',(req,res) => {
    
    console.log(req.user)
    res.end()
    // code needs to be retrofitted to specfic user id 
    // const queryString = `SELECT * FROM Posting `
    // db.query(queryString, (err, rows, fields) => {
    //     if (err){
    //         console.log("Failed: " + err);
    //         res.end();
    //         return;
    //     }
      
    //     console.log('Found posting from specfic user...');
    //     res.send(rows);

    // })
    // .then(() => {
    //     // res.json();
    // })
    // .catch((e) => {
    //     // res.json({status:'error'});
    // })
});

// updating a post that the user already had 
// router.get('/update',(req,res) => {})

// // creating a new post , which redirects to newposting
// router.get('/create',(req,res) => {
//     res.redirect('/newpost');
// });

// // delete a post from the user
// router.get('/delete',(req,res) => {
//     const querystring = ""
//     .then(() => {
//         res.json();
//     })
//     .catch((e) => {
//         res.json({status:'error'});
//     })
// });

module.exports = router;