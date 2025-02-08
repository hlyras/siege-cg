const router = require("express").Router();
const lib = require('jarmlib');

const passport = require('../../config/passport');

const User = require("../controller/user/main");

router.post("/update", lib.route.toHttps, User.verify, User.update);
router.post("/filter", lib.route.toHttps, User.verify, User.filter);

router.post('/login', lib.route.toHttps, passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));

module.exports = router;