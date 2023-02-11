const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { UserModel, ResetPwEmailModel } = require('../model/model');
const bcrypt = require('bcrypt');
const {
    WorkerProfile,
    validateWorkerProfile,
} = require("../model/workerProfileSchema");

const sendemail = require('../middlewares/emailer');
const crypto = require('crypto');
const moment = require('moment');

const router = express.Router();

const base64Encode = (data) => {
    let buff = new Buffer.from(data);
    return buff.toString('base64');
}

const base64Decode = (data) => {
    let buff = new Buffer.from(data, 'base64');
    return buff.toString('ascii');
}

const sha256 = (salt, password) => {
    var hash = crypto.createHash('sha512', password);
    hash.update(salt);
    var value = hash.digest('hex');
    return value;
}

router.post('/password-reset', async (req, res) => {

    try {
        console.log("sending email");
        const email = req.body.email;
        const user = await UserModel.findOne({ email });

        const today = base64Encode(new Date().toISOString());
        const ident = base64Encode(user._id.toString());
        const data = {
            today: today,
            userId: user._id,
            password: user.password,
            email: user.email
        };
        const hash = sha256(JSON.stringify(data), process.env.TOKENSECRET);
        //HERE SEND AN EMAIL TO THE ACCOUNT
        const resetEmail = await ResetPwEmailModel.create({ email });
        resetEmail.save();
        sendemail(email, { name: user.fname, link: `http://localhost:3000/password-change/${ident}/${today}-${hash}` }, '../middlewares/requestResetPassword.handlebars');
        res.json({
            message: "Email Successful"
        });
    } catch (err) {
        console.log("ERROR", req.url + " - Unexpected error during the password reset process. " + err.message);
        res.status(500).send({ error: "Unexpected error during the password reset process :| " + err.message, errnum: -99 });
        return;
    }
});

router.get('/password-change/:ident/:today-:hash', async (req, res) => {

    try {

        // Check if the link in not out of date
        const today = base64Decode(req.params.today);
        const then = moment(today);
        const now = moment().utc();
        const timeSince = now.diff(then, 'hours');
        if (timeSince > 2) {
            writeLog("ERROR", req.url + " - The link is invalid. Err -1");
            res.status(500).send({ error: "The link is invalid.", errnum: -1 });
            return;
        }

        const userId = base64Decode(req.params.ident);

        const user = await UserModel.findOne({ _id: userId });

        const data = {
            today: req.params.today,
            userId: user._id,
            password: user.password,
            email: user.email
        };
        const hash = sha256(JSON.stringify(data), process.env.TOKENSECRET);

        if (hash !== req.params.hash) {
            console.log("ERROR", req.url + " - The link is invalid. Err -4");
            res.status(500).send({ error: "The link is invalid.", errnum: -4 });
            return;
        }

        //HERE REDIRECT TO THE CHANGE PASSWORD FORM
        return res.redirect('/pwReset');

    } catch (err) {
        console.log("ERROR", req.url + " - Unexpected error during the password reset process. " + err.message);
        res.status(500).send({ error: "Unexpected error during the password reset process :| " + err.message, errnum: -99 });
        return;
    }
});

router.get('/pwReset', (req, res) => {
    return res.redirect('http://localhost:3001/pwReset');
    // return res.json({
    //     message: "SDS"
    // })
})

router.post('/pwReset', async (req, res) => {
    try {
        // console.log(req.body);
        const reEmail = await ResetPwEmailModel.findOne({ email: req.body.email });
        console.log("PRINSDs");
        console.log(reEmail);
        if (reEmail) {
            const user = await UserModel.findOne({ email: reEmail.email });
            console.log(user);
            var pw = await bcrypt.hash(req.body.password, 10);
            user.password = pw;
            user.save();

            reEmail.deleteOne({ email: req.body.email });
            return res.json({
                reset: "success"
            })
        }
        return res.json({
            message: "Reset"
        })
        // console.log(req);
    }
    catch (err) {
        console.log(err);
    }
});

router.post('/signup/:role', async (req, res, next) => {
    try {
        var fname = req.body.fname;
        var lname = req.body.lname;
        var email = req.body.email;
        var access_lvl = req.params.role;
        var hash = req.body.password;

        var password = await bcrypt.hash(hash, 10);
        const user = await UserModel.create({ fname, lname, email, password, access_lvl });

        user.save();

        res.json({
            message: "Success",
            user: req.body
        });
    }
    catch (err) {
        res.json({
            error: err
        });
    }
})

router.post('/login', async (req, res, next) => {
    try {
        var email = req.body.email;
        var password = req.body.password;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.json({ message: 'User not found' });
        }

        const validate = await bcrypt.compare(password, user.password);

        if (!validate) {
            return res.json({ message: 'Wrong Password' });
        }

        var access_lvl = user.access_lvl;
        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, 'TOP_SECRET');
        var isVerified = user.isVerified;
        const jsonResponse = { token, access_lvl, isVerified };
        // user.token=token;
        // user.save();
        return res.json(jsonResponse);
    } catch (err) {
        res.json({
            error: "Login Error"
        });
    }
})

router.post('/admin/addNewAdmin', async (req, res, next) => {
    try {
        var fname = req.body.fname;
        var lname = req.body.lname;
        var email = req.body.email;
        var unHashedpassword = req.body.password;
        var access_lvl = "admin";
        var password = await bcrypt.hash(unHashedpassword, 10);
        var isVerified = "true";
        const user = await UserModel.create({ fname, lname, email, password, access_lvl, isVerified });
        user.save();
        res.json({
            message: "Success",
            user: req.body
        });
    }
    catch (err) {
        console.log(err);
    }
})

// router.get('/getUnverifiedWorkers', async (req, res, next) => {
//     try {
//         const user = await UserModel.find({ isVerified: "false" });
//         if (user) {
//             user.forEach(async (u)=>{
//                 // const workers = await WorkerProfile.find({ email: u.email })
//                 // res.json(workers);
//             })
//         }
//     }
//     catch (err) {
//         res.json({
//             message: "Cant send"
//         })
//     }
// })


// router.post(
//     '/signup',
//     passport.authenticate('signup', { session: false }),
//     async (req, res, next) => {
//         res.json({
//             message: 'Signup successful',
//             user: req.user
//         });
//     }
// );

// router.post(
//     '/login',
//     async (req, res, next) => {
//         passport.authenticate(
//             'login',
//             async (err, user, info) => {
//                 try {
//                     if (err || !user) {
//                         // const error = new Error('An error occurred.');
//                         const error="Error";
//                         return next(error);
//                     }

//                     req.login(
//                         user,
//                         { session: false },
//                         async (error) => {
//                             if (error) return next(error);

//                             const body = { _id: user._id, email: user.email };
//                             const token = jwt.sign({ user: body }, 'TOP_SECRET');

//                             return res.json({ token });
//                         }
//                     );
//                 } catch (error) {
//                     return next(error);
//                 }
//             }
//         )(req, res, next);
//     }
// );

module.exports = router;