const router = require("express").Router();
const lib = require('jarmlib');

const empireController = require("../controller/empire/main");

router.get("/list", lib.route.toHttps, empireController.list);

module.exports = router;