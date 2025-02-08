const router = require("express").Router();
const lib = require('jarmlib');

const User = require("../controller/user/main");
const Card = require("../controller/card/main");

router.get("/menu", lib.route.toHttps, Card.menu);

router.post("/create", lib.route.toHttps, User.verify, Card.create);
router.post("/filter", lib.route.toHttps, Card.filter);
router.get("/findById/:id", lib.route.toHttps, Card.findById);
router.get("/list", lib.route.toHttps, Card.list);
router.get("/findByEmpire/:empire_id", lib.route.toHttps, Card.findByEmpireId);

module.exports = router;