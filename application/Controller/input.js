const express = require('express');
const routes = require('../Routes/index.js');

const app = express();

app.use(express.json());

app.listen(process.env.PORT || '3000', () => {

    console.log('Server is running on port: ${process.env.PORT || 3000 }');

});