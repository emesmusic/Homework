var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('layout', {
    title: 'Contact List',
    noContacts: !req.app.locals.contacts?.length,
    partials: { content: 'index.hjs' }
  });
});

router.get('/addContact', (req, res, next) => {
  res.render('layout', {
    title: 'Add Contact',
    partials: { content: 'addContact.hjs' }
  });
});

router.post('/addContact', (req, res, next) => {
  const newContact = { ...req.body, id: req.app.locals.contacts.length + 1 }
  req.app.locals.contacts.push(newContact);

  res.writeHead(301, {
    location: '/'
  });

  res.end();
});

router.post('/deleteContact/:id', (req, res, next) => {
  req.app.locals.contacts = req.app.locals.contacts.filter(c => c.id !== Number(req.params.id));

  res.redirect('/')
  
});

router.post('/editContact/:id', (req, res) => {
  const index = req.app.locals.contacts.findIndex(contact => contact.id === Number(req.params.id));
  if(index !== -1){
    req.app.locals.contacts[index] = { ...req.body, id: Number(req.params.id)  };
    res.redirect('/');
  }
});


router.get('/editContact/:id', (req, res, next) => {
  res.render('layout', { title: 'Edit Contact', partials: { content: 'editContact.hjs' }, contact: req.app.locals.contacts.find(contact => contact.id === Number(req.params.id)) })


})



module.exports = router;
