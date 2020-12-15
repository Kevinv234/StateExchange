const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const myData = require("../Model/database.js");

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname, '/about.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/testmysql', async function(req, res){
  console.log("Found database.js and currently working to get database");

  //fetchData(response);
  try {
    let results = await myData.all();
    res.json(results);
  }
  catch(e){
    console.log(e);
    res.sendStatus(500);
  }
});




//add the router
app.use('/', router, express.static(path.join(__dirname, '../public')));
app.listen(process.env.port || 3003);

console.log('Running at Port 3000');

//module.exports = router;