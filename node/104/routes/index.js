var express = require('express');
var router = express.Router();
var session = require('express-session')

router.use(session({
  secret: 'password',
  resave: false,
  saveUninitialized: false
})
)

/* GET home page. */
router.get('/', function (req, res, next) {
  if(req.session.views){
    ++req.session.views;
  }
  else{
    req.session.views = 1;
  }
  res.render('index', { title: 'Cookies', views: req.session.views });
});

router.get('/name-page', (req, res) => {
  req.session.name = req.query.name || req.session.name || null;
  res.render('namePage', { title: 'Name Page', name: req.session.name })
})

module.exports = router;
