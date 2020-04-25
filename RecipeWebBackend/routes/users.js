const router = require('express').Router();
let User = require('../models/user.model');
var multer = require('multer')
var fs = require('fs')
var mailer = require("nodemailer")


const memoryStorage = multer.memoryStorage()

//Filters file type to be only jpeg or png.
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

//Setting up multer to upload binary data (images).
const upload = multer({
    storage: memoryStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

//Setting up nodemailer.
var transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'eatologyhq@gmail.com',
        pass: 'eatology#pass'
    }
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
router.route('/add').post(upload.single('profile_img'), (req, res) => {
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
            .then(user => {
                res.json({
                    success: true,
                    id: user._id
                })
            })
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
        .then(users => {
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
    var userEmail = req.params.email
    var otp = genOtp()

    var mailOptions = {
        from: 'eatologyhq@gmail.com',
        to: userEmail,
        subject: "Reset password",
        html: "<h3>Your one time password is " + otp + "</h3>" +
            "<h3>Regards,</h3><h3>Team Eatology.</h3>"
    };

    User.findOne({ "email": userEmail })
        .then(user => {
            if(user){
                transporter.sendMail(mailOptions, function (error, info) {
                    console.log("The returned document is " + JSON.stringify(user))

                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response + " ");
                        res.json({ "otp": otp ,
                                "success":true
                        })
                    }
                });
            }
            else
            {
                res.json({
                    "success" : false,
                    "msg" : "This email has not been registered !"
                })
            }
        })
        .catch(error => {
            res.status(400).json('Error : ' + err)
        })


})

router.route('/update/add-fav-cuisines/:id').post((req, res) => {

    User.findById(req.params.id)
        .then(user => {
            console.log("BODY IS " + JSON.stringify(req.body))
            User.findOneAndUpdate({ _id: req.params.id }, {
                $push: {
                    pref_cuisines: { $each: req.body.cuisines },
                    "success": true
                }

            }, {
                new: true
            })
                .then(user => {
                    res.json({
                        "success": false,
                        "user": user
                    })
                })
        })

})

//Helper funtion to generate a random 6 digit otp.
function genOtp() {
    var otp = ""
    for (var i = 0; i < 6; i++) {
        otp += Math.trunc(Math.random() * 10)
    }
    return otp
}

module.exports = router;