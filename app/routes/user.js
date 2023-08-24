const router = require("express").Router();
const lib = require('jarmlib');

const passport = require('../../config/passport');

const userController = require("../controller/user/main");
userController.deck = require("../controller/user/deck/main");
userController.deck.empire = require("../controller/user/deck/empire");
userController.deck.leader = require("../controller/user/deck/leader");

router.post("/", lib.route.toHttps, userController.profile);
router.get("/get", lib.route.toHttps, userController.get);

router.post('/login', lib.route.toHttps, passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));

router.get("/deck/get", lib.route.toHttps, userController.deck.get);
router.get("/deck/add/:card_id", lib.route.toHttps, userController.deck.add);
router.get("/deck/remove/:card_id", lib.route.toHttps, userController.deck.remove);
router.get("/deck/list/:empire_id", lib.route.toHttps, userController.deck.list);
router.get("/empire/set/:empire_id", lib.route.toHttps, userController.deck.empire.set);
router.get("/deck/leader/get", lib.route.toHttps, userController.deck.leader.get);
router.get("/deck/leader/set/:leader_id", lib.route.toHttps, userController.deck.leader.set);

module.exports = router;