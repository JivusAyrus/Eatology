const router = require('express').Router();
let User = require('../models/user.model');
var multer = require('multer')
var fs = require('fs')
var mailer = require("nodemailer")


const memoryStorage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: memoryStorage,
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
        .then(user => {
            res.json(user)
        })
        .catch(err => res.status(404).json('Error : ' + err))
})

// localhost/users/add will add a user whose object is specified in the request body.
router.route('/add').post(upload.single('userImage'), (req, res) => {
    if (req.file != undefined) {
        const username = req.body.username
        const fullname = req.body.fullname
        const email = req.body.email
        const password = req.body.password
        const profile_img = req.file.buffer
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
router.route('/update/:id').post(upload.single('profile_img'), (req, res) => {
    var username
    User.findById(req.params.id)
        .then(users => {
            username = users.username
            var postObj = req.body
            if (req.file != undefined)
                postObj.profile_img = req.file.buffer
            User.findOneAndUpdate({ _id: req.params.id }, postObj)
                .then(() => {
                    User.findById(req.params.id)
                        .then(users => {
                            res.json(users)
                        })
                        .catch(err => res.status(400).json('Error : ' + err));
                })
                .catch(err => res.status(400).json('Error : ' + err));
        })
        .catch(err => res.status(400).json('Error : ' + err));

})

router.route('/update/add-favourite/:id').post((req, res) => {
    var username
    User.findById(req.params.id)
        .then(users => {
            username = users.username
            if (users.favourites.includes(req.body.favourite)) {
                res.json(users)
            }
            else {
                User.findOneAndUpdate({ _id: req.params.id }, {
                    $push: { favourites: req.body.favourite }

                }, {
                    new: true
                })
                    .then(updatedUser => {
                        res.json(updatedUser)
                    })
                    .catch(err => res.status(400).json('Error : ' + err));

            }
        })
        .catch(err => res.status(400).json('Error : ' + err));


})

router.route('/update/remove-favourite/:id').post((req, res) => {
    var username
    User.findById(req.params.id)
        .then(async users => {
            username = users.username
            User.findOneAndUpdate({ _id: req.params.id }, {
                $pull: { favourites: { $in: [req.body.favourite] } }

            }, {
                new: true
            })
                .then(updatedUser => {
                    res.json(updatedUser)
                })
                .catch(err => res.status(400).json('Error : ' + err));

        })
        .catch(err => res.status(400).json('Error : ' + err));

})

router.route('/send-otp/:email').post((req, res) => {
    var email = req.params.email
    var transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'eatologyhq@gmail.com',
            pass: 'eatology#pass'
        }
    });

    var otp = genOtp()
    var mailOptions = {
        from: 'eatologyhq@gmail.com',
        to: email,
        subject: "Reset password",
        html: "<h3>Your one time password is " + otp + "</h3>"+
            "<h3>Regards,</h3><h3>Team Eatology.</h3>"
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.json({ "otp": otp })
        }
    });
})

function genOtp() {
    var otp = ""
    for (var i = 0; i < 6; i++) {
        otp += Math.trunc(Math.random() * 10)
    }
    return otp
}

module.exports = router;