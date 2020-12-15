var express = require('express');
var router = express.Router();
const path = require('path');


/*------------------------------------------------ GET home page. */
router.get('/', (req, res, next) => {
    res.render('index')
});

router.get('/index', (req, res, next) => {
    res.render('index')
});




/*------------------------------------------------ GET search page. */
router.get('/search', (req, res, next) => {
    res.render("search")
});



/*------------------------------------------------ GET login page. */
router.get('/login', (req, res, next) => {
    res.render("loginpage")
});


/*------------------------------------------------ GET register page. */
router.get('/register', (req, res, next) => {
    res.render('registerpage')
});

/*------------------------------------------------ GET newpost page. */
router.get('/newpost', (req, res, next) => {
    res.render("newpost")
});




/*------------------------------------------------ GET dashboard */
router.get('/dashboard', (req, res, next) => {
    res.render('dashboard')
});

/*------------------------------------------------ GET Manage post */
router.get('/manage-post', (req, res, next) => {
    res.render('manage-post')
});

router.get('/details/:id', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../views/detail.html'));
  
  });

  
/*------------------------------------------------ GET Manage post */
router.get('/manage-post', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/manage-post.html'));
});


/*------------------------------------------------ GET Manage post */
router.get('/contact/edit/:pid/:mid', function(req, res, next) {
    res.render('messaging')
  });

/*------------------------------------------------ GET about pages */
router.get('/about', (req, res, next) => {
    res.render('about')
});

router.get('/about/roderic', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/about/roderic.html'));
});

router.get('/about/chris', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/about/chris.html'));
});

router.get('/about/deep', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/about/deep.html'));
});

module.exports = router;
