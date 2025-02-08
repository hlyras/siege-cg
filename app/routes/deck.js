const router = require("express").Router();
const lib = require('jarmlib');

const User = require("../controller/user/main");
const Deck = require("../controller/deck/main");

router.get("/", lib.route.toHttps, User.verify, Deck.index);
router.post("/create", lib.route.toHttps, User.verify, Deck.create);
router.post("/filter", lib.route.toHttps, User.verify, Deck.filter);

module.exports = router;