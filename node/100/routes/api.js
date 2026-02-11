var express = require('express');
var router = express.Router();
module.exports = router;

router.get('/contacts',(req,res)=>{

res.send(req.app.locals.contacts);


});