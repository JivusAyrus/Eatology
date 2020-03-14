const router = require('express').Router();
let User = require('../models/user.model');
var multer = require('multer')
var gridfs = require('multer-gridfs-storage')

//Setting up multer to store images in /uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'RecipeWebBackend/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// localhost/users/ will return all the users in the response body.
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error : ' + err));
});

// localhost/users/id will return a user having that id.
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error : ' + err));
})

// localhost/users/email will return user with that email.
router.route('/by-email/:email').get((req, res) => {
    console.log(req.param.email)
    User.find({ email: req.params.email })
        .then(user => res.json(user))
        .catch(err => res.status(404).json('Error : ' + err))
})

// localhost/users/add will add a user whose object is specified in the request body.
router.route('/add').post(upload.single('userImage'), (req, res) => {
    if (req.file != undefined) {
        const username = req.body.username
        const fullname = req.body.fullname
        const email = req.body.email
        const password = req.body.password
        const profile_img = req.file.path
        console.log(req.file)
        const newUser = User({
            username,
            fullname,
            email,
            password,
            profile_img
        });
        newUser.save()
            .then(() => res.json(`${username} has been successfully added !`))
            .catch(err => res.status(400).json('Error : ' + err));
    }
    else {
        const username = req.body.username
        const fullname = req.body.fullname
        const email = req.body.email
        const password = req.body.password
        console.log(req.file)
        const newUser = User({
            username,
            fullname,
            email,
            password,

        });
        newUser.save()
            .then(() => res.json(`${username} has been successfully added !`))
            .catch(err => res.status(400).json('Error : ' + err));
    }
})

// localhost/users/update/:id will update the user whose id is specified
router.route('/update/:id').post(upload.single('userImage'), (req, res) => {
    console.log(req.file)
    var username
    User.findById(req.params.id)
        .then(users => {
            username = users.username
            if (req.file != undefined) {
                User.findOneAndUpdate({ _id: req.params.id }, {
                    username: req.body.username,
                    fullname: req.body.fullname,
                    email: req.body.email,
                    profile_img: req.file.path
                })
                    .then(() => res.json(`${username} has been successfully updated !`))
                    .catch(err => res.status(400).json('Error : ' + err));
            }
            else {
                User.findOneAndUpdate({ _id: req.params.id }, {
                    username: req.body.username,
                    fullname: req.body.fullname,
                    email: req.body.email,
                })
                    .then(() => res.json(`${username} has been successfully updated !`))
                    .catch(err => res.status(400).json('Error : ' + err));
            }
        })
        .catch(err => res.status(400).json('Error : ' + err));

})

module.exports = router;