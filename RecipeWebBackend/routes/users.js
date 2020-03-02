const router = require('express').Router();
let User = require('../models/user.model');

// localhost/users/ will return all the users in the response body.
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error : ' + err));
});

// localhost/users/id will return a user having that id.
router.route('/:id').get((req,res) => {
    User.findById(req.params.id)
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error : ' + er));
})

router.route('/update').get((req,res) => {

})

// localhost/users/add will add a user whose object is specified in the request body.
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const newUser = User({
        username,
        email,
        password,
    });
    newUser.save()
        .then(() => res.json(`${username} has been successfully added !`))
        .catch(err => res.status(400).json('Error : ' + err));
})

module.exports = router;