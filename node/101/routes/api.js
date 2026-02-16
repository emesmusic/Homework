var express = require('express');
var router = express.Router();
module.exports = router;


router.get('/:id', (req, res) => {
    const contact = req.app.locals.contacts.find(contact => contact.id === Number(req.params.id));
    if (!contact) {
        return res.status('404').json(
            {
                error: `Id ${req.params.id} not found.`
            }
        )
    }
    res.json(contact)
});


router.get('/contacts', (req, res) => {
    res.json(req.app.locals.contacts);
});