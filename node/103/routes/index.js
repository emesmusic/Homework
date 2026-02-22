var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  let views = req.signedCookies.views || 0;
  views++;

  res.cookie('views', views, {
    secure: true,
    httpOnly: true,
    signed: true,
    maxAge: 600000

  })

  res.render('index', { title: 'Cookies', views });
});


router.get('/name-page', (req, res) => {
  const name = req.query.name || req.signedCookies.name || null;

  if (name) {
    res.cookie('name', name, {
      signed: true,
      httpOnly: true,
      secure: true,
      maxAge: 600000
    })
  }
  res.render('namePage', { title: 'Name Page', name })
})





module.exports = router;
