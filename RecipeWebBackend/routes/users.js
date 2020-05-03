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

//localhost/users/update-by-email/:email will update the user whose email is specified.
router.route('/update-by-email/:email').post((req, res) => {
    var postObj = req.body
    if (req.file != undefined)
        postObj.profile_img = req.file.buffer
    User.findOneAndUpdate({ email: req.params.email }, postObj, {
        new: true
    })
        .then(user => {
            if (user) {
                res.json({
                    "success": true,
                    "user": user
                })
            }
            else {
                res.json({ "success": false })
            }
        })
        .catch(err => res.status(400).json('Error : ' + err));

})

//localhost/update/add-favourite/:id will add a favourite to the user that is specified.
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

//localhost/users/update/remove-favourite/:id will remove a favourite from the user that is specified.
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

//localhost/users/send-otp/:email will send a otp to the specified user email if it is registered.
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
            if (user) {
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response + " ");
                        res.json({
                            "otp": otp,
                            "success": true
                        })
                    }
                });
            }
            else {
                res.json({
                    "success": false,
                    "msg": "This email has not been registered !"
                })
            }
        })
        .catch(error => {
            res.status(400).json('Error : ' + err)
        })


})

//localhost/users/contact-us will allow the sepecified user to contact eatology via email.
router.route('/contact-us').post((req, res) => {
    var from = req.body.username;
    var email_body = req.body.email_body;

    var mailOptions = {
        from: 'eatologyhq@gmail.com',
        to: "vkalghat@gmail.com",
        subject: "User Query/Feedback from " + from,
        text: email_body
    };

    transporter.sendMail(mailOptions, function (error, info) {

        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response + " ");
            res.json({
                "success": true,
            })
        }
    });

})

//localhost/users/send-mail will send a registration mail to th specified user email.
router.route('/send-registration-mail').post((req, res) => {

    var userEmail = req.body.email
    var htmlBody = "initial"
    htmlBody = fs.readFileSync("RecipeWebBackend\\EatologyTemplate.html")
    var mailOptions = {
        from: 'eatologyhq@gmail.com',
        to: userEmail,
        subject: "Welcome to Eatology!",
        html: htmlBody
    };


    User.findOne({ "email": userEmail })
        .then(user => {
            if (user) {
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response + " ");
                        res.json({
                            "success": true
                        })
                    }
                });
            }
            else {
                res.json({
                    "success": false,
                    "msg": "This email has not been registered !"
                })
            }
        })
        .catch(error => {
            res.status(400).json('Error : ' + err)
        })
})


//localhost/users/update/add-fav-cuisines/:id will add an array of favourite cuisines to the user whose id is specified.
router.route('/update/add-fav-cuisines/:id').post((req, res) => {

    User.findById(req.params.id)
        .then(user => {
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

router.route('/update/add-search-history/:id').post((req, res) => {

    const size = 5

    User.findByIdAndUpdate(req.params.id,
        {
            $push:
            {
                search_history: {
                    $each: [req.body.history_item]
                },
                $position: 0
            }
        },
        {
            new: true
        })
        .then(user => {
            if (user.search_history.length >= size) {
                User.findByIdAndUpdate(req.params.id, { $pop: { search_history: -1 } })
                    .then(user => {
                        res.json({
                            "success": true,
                            "search_history": user.search_history
                        })
                    })
            }
            else {
                res.json({
                    "success": true,
                    "search_history": user.search_history
                })
            }
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